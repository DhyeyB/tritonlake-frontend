import { AsyncPaginateCreatableType, BaseSelectPropType, Option } from "@/_types/common/SelectBox"
import { FetchHelper } from "@/app/_services/FetchHelper"
import { sliceWithEllipsis } from "@/app/_utils/Common"
import { CONFIG } from "@/app/_utils/Constants"
import { handleError } from "@/app/_utils/Helpers"
import { useState } from "react"
import { MultiValue, SingleValue } from "react-select"
import { withAsyncPaginate } from "react-select-async-paginate"
import Creatable from "react-select/creatable"

const AsyncPaginate = withAsyncPaginate(Creatable) as AsyncPaginateCreatableType
/**
 * BaseSelect Component
 *
 * A reusable select component with support for async loading, creation of new options, and pagination.
 *
 * @param {BaseSelectPropType} props - Props passed to the component
 */
const BaseSelect: React.FC<BaseSelectPropType> = (props) => {
    const [previousSearchTerm, setpreviousSearchTerm] = useState("")
    const { onSelected, params, isMulti, creatable, endpoint, getOptionLabel, getOptionValue, onCreate, getOptionData } = props

    /**
     * Parse options from API response to the format required by the select component
     *
     * @param {any[]} results - The results array from the API response
     * @returns {Option[]} - The parsed options array
     */

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const parseOptions = (results: any[]) => {
        return results.map((result) => ({
            label: sliceWithEllipsis(getOptionLabel(result), CONFIG.DROPDOWN_LABEL_SLICE_LIMIT),
            value: getOptionValue(result),
            data: getOptionData(result),
        }))
    }

    /**
     * Load options asynchronously from the API endpoint
     *
     * @param {string} search_term - The current search term
     * @param {object} options - The current options
     * @param {{ page: number }} additional - Additional pagination data
     * @returns {Promise<{options: Option[], hasMore: boolean, additional: {page: number}}>} - The loaded options and pagination info
     */
    const loadOptions = async (search_term: string, options: object, { page }: { page: number }) => {
        try {
            // Check if the search term has changed, and update the state if it has
            // This ensures that the component properly handles new searches by resetting the pagination
            // when the search term changes, avoiding issues with stale data from previous searches
            if (previousSearchTerm !== search_term) {
                setpreviousSearchTerm(search_term)
            }

            // Determine the next page number, defaulting to the initial page if not provided
            const nextPage = page || CONFIG.PAGINATION.PAGE

            // Make the API call to fetch options based on the search term and pagination parameters
            const response = await FetchHelper.get(endpoint, {
                search_term,
                pagination_type: CONFIG.PAGINATION.TYPE,
                page_size: CONFIG.PAGINATION.SIZE,
                page: page || CONFIG.PAGINATION.PAGE,
                ...params,
            })

            // If the response contains results, parse them and construct the payload
            if (response.results) {
                const payload = {
                    hasMore: response.next !== null,
                    options: parseOptions(response.results),
                    // Set the page number for the next request, resetting if the search term has changed
                    additional: {
                        page: search_term && search_term !== previousSearchTerm ? CONFIG.PAGINATION.PAGE : nextPage + 1,
                    },
                }
                return payload
            }
        } catch (error) {
            handleError(error)
            return {
                options: [],
                hasMore: false,
            }
        }
    }

    /**
     * Handle changes in selected options
     *
     * @param {SingleValue<Option> | MultiValue<Option>} option - The selected option(s)
     */
    const handleChange = (option: SingleValue<Option> | MultiValue<Option>) => {
        // Check if the select box is in multi-select mode
        if (isMulti) {
            // Typecast the option to an array of options
            const _options = option as Option[]
            // If there are selected options, map through them and extract the data property
            // This transforms the array of options into an array of the raw data objects
            if (_options.length) {
                const selectedOptionsData = _options.map((_option) => _option.data)
                onSelected(selectedOptionsData)
            } else {
                // If no options are selected, call the onSelected callback with an empty array
                onSelected([])
            }
        } else {
            // Typecast the option to a single option
            const _option = option as Option

            // If an option is selected and it contains data, call the onSelected callback with the data object
            if (_option?.data) {
                onSelected(_option.data)
            } else {
                // If no option is selected or the selected option has no data, call the onSelected callback with null
                onSelected(null)
            }
        }
    }
    // this is required because the {...props} in the end will override the options array
    const modifiedProps = { ...props } as Partial<BaseSelectPropType>
    delete modifiedProps.getOptionLabel
    delete modifiedProps.getOptionValue
    return (
        <>
            <AsyncPaginate
                className="text-primary fs-base lh-1 py-0 w-auto dropdown-font"
                styles={{
                    ...CONFIG.DROPDOWN_STYLE,
                }}
                placeholder={"Select an option"}
                isSearchable={true}
                classNames={{
                    control: () => "form-input-dropdown",
                    multiValue: () => "multivalue-dropdown-pills",
                }}
                // this input.trim condition prevents the select to show empty create option in dropdown e.g Create ""
                isValidNewOption={(input) => (creatable && input.trim().length ? true : false)}
                isClearable={true}
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                hideSelectedOptions={false}
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                loadOptions={loadOptions as any}
                debounceTimeout={CONFIG.DEBOUNCE_TIMEOUT}
                // this is reqiuired, otherwise the options will not load
                additional={{ page: CONFIG.PAGINATION.PAGE }}
                closeMenuOnSelect={!isMulti}
                onChange={handleChange}
                onCreateOption={onCreate}
                {...modifiedProps}
            />
        </>
    )
}

export default BaseSelect

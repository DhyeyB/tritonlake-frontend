import { BaseStaticSelectPropType, Option } from "@/_types/common/SelectBox"
import { CONFIG } from "@/app/_utils/Constants"
import ReactSelect, { MultiValue, SingleValue } from "react-select"

const BaseStaticSelect: React.FC<BaseStaticSelectPropType> = (props) => {
    const { onSelected, isMulti, options, selectedOptionValue, className } = props
    const handleChange = (option: SingleValue<Option> | MultiValue<Option>) => {
        if (isMulti) {
            const _options = option as Option[]
            if (_options.length) {
                const selectedOptionsData = _options.map((_option) => _option.data)
                onSelected(selectedOptionsData)
            } else {
                onSelected([])
            }
        } else {
            const _option = option as Option
            if (_option?.data) {
                onSelected(_option.data)
            } else {
                onSelected(null)
            }
        }
    }
    // this is required because the {...props} in the end will override the options array
    const modifiedProps = { ...props } as Partial<BaseStaticSelectPropType>
    delete modifiedProps.className
    return (
        <>
            <ReactSelect
                className={`text-primary fs-base lh-1 py-0 ps-1 w-auto ${className}`}
                styles={{
                    ...CONFIG.DROPDOWN_STYLE,
                }}
                options={options}
                placeholder={"Select an option"}
                isSearchable={true}
                classNames={{
                    control: () => "form-input-dropdown custom-border",
                    multiValue: () => "multivalue-dropdown-pills",
                }}
                isClearable={true}
                hideSelectedOptions={false}
                closeMenuOnSelect={!isMulti}
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                onChange={handleChange as any}
                value={selectedOptionValue}
                {...modifiedProps}
            />
        </>
    )
}

export default BaseStaticSelect

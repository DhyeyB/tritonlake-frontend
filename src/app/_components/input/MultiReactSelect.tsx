import { type CustomReactMultiSelect } from "@/_types/common/SelectBox"
import { CONFIG } from "@/app/_utils/Constants"
import ReactSelect from "react-select"

const CustomReactMultiSelect: React.FC<CustomReactMultiSelect> = (props) => {
    const { selectedOptionValue, onDropdownChange, optionsData, placeholder, isClearable } = props
    const getSelectedOptions = optionsData.map((item) => {
        if (selectedOptionValue?.includes(item.value)) {
            return item
        }
    })
    return (
        <ReactSelect
            className="text-primary fs-base lh-1 py-0 ps-0 w-auto"
            placeholder={placeholder ?? "Select an option"}
            classNames={{
                control: () => "form-input-dropdown",
                multiValue: () => "multivalue-dropdown-pills",
            }}
            isClearable={isClearable || true}
            value={getSelectedOptions}
            isMulti
            closeMenuOnSelect={false}
            hideSelectedOptions={false}
            options={optionsData}
            onChange={(newValues) => {
                if (newValues.length) {
                    const values: string[] = []
                    newValues.forEach((item) => {
                        if (item?.value) {
                            values.push(item.value)
                        }
                    })
                    onDropdownChange(values)
                } else {
                    onDropdownChange([])
                }
            }}
            styles={{
                ...CONFIG.DROPDOWN_STYLE,
            }}
        />
    )
}

export default CustomReactMultiSelect

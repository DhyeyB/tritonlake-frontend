import { type CustomReactSelect } from "@/_types/common/SelectBox"
import { CONFIG } from "@/app/_utils/Constants"
import ReactSelect from "react-select"

const CustomReactSelect: React.FC<CustomReactSelect> = (props) => {
    const { selectedOptionValue, onDropdownChange, optionsData, placeholder, isClearable, isDisabled } = props
    return (
        <ReactSelect
            className="text-primary fs-base py-0 w-auto"
            classNames={{
                control: () => "form-input-dropdown",
            }}
            placeholder={placeholder ?? "Select an option"}
            isClearable={isClearable || true}
            isDisabled={isDisabled || false}
            isSearchable={true}
            value={optionsData.map((item) => (item.value == selectedOptionValue ? { ...item } : undefined))}
            options={optionsData}
            onChange={(newValue) => {
                if (newValue?.value && newValue.value !== selectedOptionValue) onDropdownChange(newValue.value)
                else {
                    onDropdownChange("")
                }
            }}
            styles={{
                ...CONFIG.DROPDOWN_STYLE,
            }}
        />
    )
}

export default CustomReactSelect

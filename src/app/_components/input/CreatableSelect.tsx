// All creatable dropdown components will be built from this component
import { CreatableSelectPropType } from "@/_types/common/SelectBox"
import BaseSelect from "./BaseSelect"

const CreatableSelect: React.FC<CreatableSelectPropType> = (props) => {
    const { onCreate, selectedOptionValue, optionName } = props
    return (
        <>
            <BaseSelect
                value={selectedOptionValue}
                getOptionData={(result) => result}
                {...props}
                creatable={true} // passing creatable true to make is creatable
            />

            {optionName?.length > 0 && (
                <a
                    role="button"
                    className="d-block mt-2"
                    onClick={() => {
                        onCreate("")
                    }}
                >
                    Add a new {optionName}
                </a>
            )}
        </>
    )
}

export default CreatableSelect

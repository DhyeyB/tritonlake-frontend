import React from "react"
import BaseSelect from "./BaseSelect"
import { CONFIG } from "@/app/_utils/Constants"
import { EmrSelectPropType } from "@/app/_types/common/SelectBox"

const OriginatorSelect: React.FC<EmrSelectPropType> = (props) => {
    const { selectedOptionValue } = props
    return (
        <BaseSelect
            endpoint={CONFIG.API_ENDPOINTS.OPPORTUNITY_FORM.DROPDOWN_LIST}
            getOptionData={(item) => item}
            getOptionLabel={(item) => item.name}
            getOptionValue={(item) => item.id}
            value={selectedOptionValue}
            {...props}
        />
    )
}

export default OriginatorSelect

import React from "react"
import BaseSelect from "./BaseSelect"
import { CONFIG } from "@/app/_utils/Constants"
import { EmrSelectPropType } from "@/app/_types/common/SelectBox"

const CurrencySelect: React.FC<EmrSelectPropType> = (props) => {
    const { selectedOptionValue } = props
    return (
        <BaseSelect
            endpoint={CONFIG.API_ENDPOINTS.OPPORTUNITY_FORM.CURRENCY_DROPDOWN}
            getOptionData={(item) => item}
            getOptionLabel={(item) => item.code}
            getOptionValue={(item) => item.id}
            value={selectedOptionValue}
            {...props}
        />
    )
}

export default CurrencySelect

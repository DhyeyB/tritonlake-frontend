import React from "react"
import BaseSelect from "./BaseSelect"
import { CONFIG } from "@/app/_utils/Constants"
import { EmrSelectPropType } from "@/app/_types/common/SelectBox"

const FirmSelect: React.FC<EmrSelectPropType> = (props) => {
    const { selectedOptionValue } = props
    return (
        <BaseSelect
            endpoint={CONFIG.API_ENDPOINTS.FIRM}
            getOptionData={(item) => item}
            getOptionLabel={(item) => item.name}
            getOptionValue={(item) => item.id}
            value={selectedOptionValue}
            {...props}
        />
    )
}

export default FirmSelect

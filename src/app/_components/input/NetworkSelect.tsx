import React from "react"
import BaseSelect from "./BaseSelect"
import { CONFIG } from "@/app/_utils/Constants"
import { BaseWrapperSelectPropType } from "@/app/_types/common/SelectBox"

const NetworkSelect: React.FC<BaseWrapperSelectPropType> = (props) => {
    const { selectedOptionValue } = props
    return (
        <BaseSelect
            endpoint={CONFIG.API_ENDPOINTS.NETWORK.LIST}
            getOptionData={(item) => item}
            getOptionLabel={(item) => item.name}
            getOptionValue={(item) => item.id}
            value={selectedOptionValue}
            {...props}
        />
    )
}

export default NetworkSelect

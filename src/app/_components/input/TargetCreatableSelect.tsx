import { CONFIG } from "@/app/_utils/Constants"
import React from "react"
import CreatableSelect from "./CreatableSelect"
import { handleError } from "@/app/_utils/Helpers"
import { FetchHelper } from "@/app/_services/FetchHelper"
import { Any } from "@/app/_types/common/Common"

const TargetCreatableSelect = (props: Any) => {
    const { params, onSelected, selectedOptionValue } = props
    const createNewTarget = async (value: string) => {
        try {
            const url = new URL(`${CONFIG.API_ENDPOINTS.OPPORTUNITY_FORM.DROPDOWN_LIST}`)
            const response = await FetchHelper.post(url, { name: value, type: params?.type })
            return response
        } catch (error) {
            handleError(error)
        }
    }
    return (
        <>
            <CreatableSelect
                value={selectedOptionValue}
                endpoint={CONFIG.API_ENDPOINTS.OPPORTUNITY_FORM.DROPDOWN_LIST}
                getOptionLabel={(item) => item.name}
                getOptionValue={(item) => item.id}
                onCreate={async (value) => {
                    const target = await createNewTarget(value)
                    if (props.isMulti) {
                        if (Array.isArray(selectedOptionValue) && selectedOptionValue.length > 0) {
                            onSelected([...selectedOptionValue.map((item) => item.data), target])
                        } else {
                            onSelected([target])
                        }
                    } else {
                        onSelected(target)
                    }
                }}
                {...props}
            />
        </>
    )
}

export default TargetCreatableSelect

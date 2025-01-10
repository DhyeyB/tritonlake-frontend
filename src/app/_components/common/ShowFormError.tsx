import { ShowFormErrorPropType } from "@/_types/common/ShowFormError"
import React from "react"

const ShowFormError: React.FC<ShowFormErrorPropType> = ({ message, className }) => {
    if (message?.length) {
        return <span className={`text-danger ${className}`}>{message}</span>
    }
    return <></>
}

export default ShowFormError

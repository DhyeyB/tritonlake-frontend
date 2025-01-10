/* eslint-disable react/display-name */
import { forwardRef, InputHTMLAttributes } from "react"
import ShowFormError from "../common/ShowFormError"
import Label from "./Label"
import { Any } from "@/app/_types/common/Common"

interface HttpInputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string
    errorMsg?: Any
    className?: string
    labelClass?: string
    isRequired?: boolean
}

const HttpInputField = forwardRef<HTMLInputElement, HttpInputFieldProps>(({ label, errorMsg, className, labelClass, isRequired = false, ...props }, ref) => {
    return (
        <>
            {!!label?.length && <Label label={label} labelClass={labelClass} isRequired={isRequired} />}
            <div className="input-group input-group-solid mb-5">
                <span className="input-group-text">https://</span>
                <input className={`form-control form-control-solid position-relative ${className}`} ref={ref} {...props} type="text" autoComplete="off" />
            </div>
            <ShowFormError message={errorMsg} />
        </>
    )
})

export default HttpInputField

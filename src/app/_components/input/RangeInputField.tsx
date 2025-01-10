/* eslint-disable react/display-name */
import { forwardRef } from "react"
import ShowFormError from "../common/ShowFormError"
import { RangeInputFieldProps } from "@/app/_types/common/RangeInputField"

const RangeInputField = forwardRef<HTMLInputElement, RangeInputFieldProps>(({ label, errorMsg, className, labelClass, rangeLabel = "Low Value", ...props }, ref) => {
    // Handler to allow only digits
    const handleInput = (e: React.FormEvent<HTMLInputElement>) => {
        e.currentTarget.value = e.currentTarget.value.replace(/\D/g, "")
    }

    return (
        <>
            {!!label?.length && <label className={`${labelClass} form-label`}>{label}</label>}
            <div className="input-group input-group-solid">
                <span className="input-group-text">{rangeLabel}</span>
                <input className={`form-control form-control-solid ${className}`} ref={ref} {...props} onInput={handleInput} />
            </div>
            <div className="d-flex justify-content-between mt-1">
                <div className="mr-auto pe-3"></div>
            </div>
            <ShowFormError message={errorMsg} />
        </>
    )
})

export default RangeInputField

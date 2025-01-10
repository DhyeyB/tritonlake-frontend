/* eslint-disable react/display-name */
import { forwardRef } from "react"
import ShowFormError from "../common/ShowFormError"
import { RadioFieldProps } from "@/app/_types/common/RadioInput"

const InputRadioField = forwardRef<HTMLInputElement, RadioFieldProps>(({ label, errorMsg, labelClassName, ...props }, ref) => {
    return (
        <>
            <input className="form-check-input cursor-pointer" type="radio" ref={ref} {...props} />
            <label className={`${labelClassName} form-check-label text-capitalize`}>{label}</label>
            <ShowFormError message={errorMsg} />
        </>
    )
})
export default InputRadioField

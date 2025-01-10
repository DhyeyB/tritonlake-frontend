/* eslint-disable react/display-name */
import { CheckBoxInputPropTypes } from "@/app/_types/common/CheckboxInput"
import { forwardRef } from "react"

const CheckboxInput = forwardRef<HTMLInputElement, CheckBoxInputPropTypes>(({ inputClassName, ...props }, ref) => {
    return <input className={`form-check-input checkbox-input custom-border ${inputClassName || ""}`} ref={ref} {...props} type="checkbox" />
})

export default CheckboxInput

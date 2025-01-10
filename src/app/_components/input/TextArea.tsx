/* eslint-disable react/display-name */
import { forwardRef } from "react"
import ShowFormError from "../common/ShowFormError"
import { TextAreaFieldProps } from "@/app/_types/common/TextAreaInput"
const TextAreaField = forwardRef<HTMLTextAreaElement, TextAreaFieldProps>(({ label, errorMsg, className, maxChars, currentChars, labelClassName, ...props }, ref) => {
    return (
        <>
            {!!label?.length && <label className={`form-label ${labelClassName}`}>{label}</label>}
            <textarea className={`form-control form-control-solid ${className}`} ref={ref} {...props} />
            <div className="d-flex justify-content-between mt-1">
                <div className="mr-auto pe-3">
                    <ShowFormError message={errorMsg} />
                </div>
                {maxChars && (
                    <div className={`char-count ${(currentChars as number) > maxChars ? "text-danger" : ""}`}>
                        {currentChars} / {maxChars} characters
                    </div>
                )}
            </div>
        </>
    )
})

export default TextAreaField

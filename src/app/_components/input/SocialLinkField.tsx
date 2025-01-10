/* eslint-disable react/display-name */
import { forwardRef } from "react"
import ShowFormError from "../common/ShowFormError"
import { Any } from "@/app/_types/common/Common"

interface SocialLinkFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string
    errorMsg?: Any
    className?: string
    labelClass?: string
    isRequired?: boolean
    icon: JSX.Element // Pass the social logo as a JSX element
}

const SocialLinkField = forwardRef<HTMLInputElement, SocialLinkFieldProps>(({ label, errorMsg, className, labelClass, icon, isRequired = false, ...props }, ref) => {
    return (
        <>
            {!!label?.length && (
                <label className={`${labelClass} form-label`}>
                    {label} {isRequired && <span className="text-danger">*</span>}
                </label>
            )}
            <div className="input-group input-group-solid">
                <span className="input-group-text">{icon}</span>
                <input
                    className={`form-control form-control-solid ${className}`}
                    ref={ref}
                    {...props}
                    type="url" // Enforces a URL input type
                    autoComplete="off"
                />
            </div>
            <ShowFormError message={errorMsg} />
        </>
    )
})

export default SocialLinkField

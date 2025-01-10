/* eslint-disable react/display-name */
import Image from "next/image"
import { InputHTMLAttributes, forwardRef, useState } from "react"
import EyeClose from "../../../../public/assets/media/svg/password-icon/eye-close.svg"
import Eye from "../../../../public/assets/media/svg/password-icon/eye.svg"
import ShowFormError from "../common/ShowFormError"
import Label from "./Label"

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    errorMsg?: any
    className?: string
    labelClass?: string
    isRequired?: boolean
}

const TextInputField = forwardRef<HTMLInputElement, InputFieldProps>(({ label, errorMsg, className, labelClass, type, isRequired = false, ...props }, ref) => {
    const [inputType, setInputType] = useState(type || "text")
    const toggleInputType = (type: string) => {
        setInputType(type)
    }
    return (
        <>
            {!!label?.length && <Label label={label} labelClass={labelClass} isRequired={isRequired} />}
            <div className="position-relative">
                <input className={`form-control form-control-solid position-relative ${className}`} ref={ref} {...props} type={inputType} autoComplete="off" />
                {type === "password" && (
                    <button className="position-absolute password-eye-icon cursor-pointer" type="button" onClick={() => toggleInputType(inputType === "text" ? "password" : "text")}>
                        {inputType === "password" ? <Image src={EyeClose} alt="eye icon" width={20} height={20} /> : <Image src={Eye} alt="eye close icon" width={20} height={20} />}
                    </button>
                )}
            </div>
            <ShowFormError message={errorMsg} />
        </>
    )
})

export default TextInputField

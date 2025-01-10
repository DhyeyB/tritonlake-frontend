import { InputHTMLAttributes } from "react"
import { Any } from "./Common"

export interface RadioFieldProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string
    errorMsg?: Any
    className?: string
    labelClassName?: string
}

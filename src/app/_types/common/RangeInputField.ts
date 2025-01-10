import { InputHTMLAttributes } from "react"
import { Any } from "./Common"

export interface RangeInputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string
    errorMsg?: Any
    className?: string
    labelClass?: string
    isRequired?: boolean
    rangeLabel?: string
}

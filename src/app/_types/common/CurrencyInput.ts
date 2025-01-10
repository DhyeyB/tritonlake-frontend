import { InputHTMLAttributes } from "react"
import { Any } from "./Common"

export interface CurrencyInputProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string
    errorMsg?: Any
    className?: string
    labelClass?: string
    isRequired?: boolean
    currencySymbol?: string
}

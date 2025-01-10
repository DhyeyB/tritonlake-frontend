import { TextareaHTMLAttributes } from "react"

export interface TextAreaFieldProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    label: string
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    errorMsg?: any
    className?: string
    maxChars?: number
    currentChars?: number
    labelClassName?: string
    rows?: number
}

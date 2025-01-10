import { Any } from "./Common"

export interface CustomInputDropzoneProps {
    label: string
    isRequired?: boolean
    maxSize: number
    setFile: React.Dispatch<React.SetStateAction<File | null>>
    file: File | null
    errorMsg?: Any
    onDrop?: (files: File | Any) => void
    labelClassName?: string
}

export interface CustomPdfDropzoneProps {
    label: string
    isRequired?: boolean
    maxSize: number
    // setDocFile: React.Dispatch<React.SetStateAction<File[] | null>>
    // docFiles: File[] | null
    errorMsg?: string
    onDrop?: (files: File[]) => void
}

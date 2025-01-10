import { Any } from "./Common"

export interface PdfFilePreviewProps {
    setFile: React.Dispatch<React.SetStateAction<Any>>
    file: File | null
    isDisabled?: boolean
    index?: number
    onRemove?: (file: File) => void
}

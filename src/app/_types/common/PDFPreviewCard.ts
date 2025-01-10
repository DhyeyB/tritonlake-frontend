export interface PDFPreviewCardType {
    showDelete?: boolean
    title: string
    description: string
    subDescription?: string
    onDelete?: (id: string | number, name?: string) => void
    id: string | number
    imgSource: string
    fileUrl?: string
}

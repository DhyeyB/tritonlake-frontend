export interface CustomToastPropTypes {
    show: boolean
    onClose: () => void
    header: string
    body: string
    delay?: number
}

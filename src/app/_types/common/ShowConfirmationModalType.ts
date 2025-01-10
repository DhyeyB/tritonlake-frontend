import { SweetAlertIcon } from "sweetalert2"
import { Any } from "./Common"

export interface ShowConfirmationModalType {
    title?: string
    text?: string
    icon?: SweetAlertIcon
    confirmButtonText?: string
    cancelButtonText?: string
    confirmButtonColor?: string
    cancelButtonColor?: string
    onConfirm?: () => void
    path: string
    router: Any
}

export interface SuccessDialogOptions {
    title?: string
    text?: string
    icon?: SweetAlertIcon
    confirmButtonText?: string
    cancelButtonText?: string
    confirmButtonColor?: string
    cancelButtonColor?: string
    onConfirm?: () => Promise<void>
    router: Any
    path?: string
}

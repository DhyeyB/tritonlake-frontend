import { AnyObject } from "../../common/Common"

export interface ChangeEmailType {
    handleClose: () => void
    email: string
}

export interface ResetPasswordType {
    handleClose: () => void
    userId: string
}

export interface UserInfoTypes {
    userInfo: AnyObject | undefined
    setRefetch: React.Dispatch<React.SetStateAction<boolean>>
}

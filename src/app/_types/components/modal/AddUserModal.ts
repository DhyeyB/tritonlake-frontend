import { UserType } from "../../data/User"
import { DefaultModalPropType } from "./Modal"

export interface AddUserModalPropTypes extends DefaultModalPropType {
    rowData?: UserType | null
}

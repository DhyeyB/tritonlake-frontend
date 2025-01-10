import { createContext } from "react"
import { AnyObject } from "../_types/common/Common"

export type ContextType = AnyObject
export const AppContext = createContext<ContextType>({})

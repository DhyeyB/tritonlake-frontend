import React from "react"

export interface DragAndDropPropTypes {
    index: number
    id: string
    children: React.ReactNode
    successCallback: (hoverIndex: number, dragIndex: number) => void
}

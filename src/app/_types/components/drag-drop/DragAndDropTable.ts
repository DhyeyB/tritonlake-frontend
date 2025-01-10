import { HeaderGroup, RowModel } from "@tanstack/react-table"

export interface DragAndDropPropType<T> {
    data: T[]
    setData: React.Dispatch<React.SetStateAction<T[]>>
    callback?: (oldIndex: number, newIndex: number) => void
    getHeaderGroups: () => HeaderGroup<T>[]
    getRowModel: () => RowModel<T>
    loading?: boolean
    disabled?: boolean
}

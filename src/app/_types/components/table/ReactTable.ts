import { ColumnDef, HeaderGroup, RowModel } from "@tanstack/react-table"
import React from "react"
import { TablePaginationPropType } from "./Pagination"
import { Any, AnyObject } from "../../common/Common"

export interface ReactTableProps<T> extends ExpandedRowWithTablePropType {
    getHeaderGroups: () => HeaderGroup<T>[]
    getRowModel: () => RowModel<T>
    getFooterGroups: () => HeaderGroup<T>[]
    className?: string
    loading?: boolean
    rowCount?: number
    stopVh?: boolean
}

export interface ExpandedRowWithTablePropType {
    expandedRowId?: string
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    renderExpandedRow?: (id: string, data?: Any) => React.ReactNode
}

export interface RowId {
    id: string
}

export interface MediaTableWithPaginationPropType extends Pick<TablePaginationPropType, "paginationContainerClass"> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    columns: ColumnDef<any, any>[]
    /**
     * API endpoint which fetches data
     */
    endpoint: URL
    /**
     * works as dependency array for useEffect
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    dependencies?: any[]
    /**
     * return response from api call
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    getFetchResponse?: (response: any) => void
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    filters: Record<string, any>
    className?: string
    expandedRowId?: string
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    renderExpandedRow?: (id: string) => React.ReactNode
    isTableView?: boolean
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    renderGridView?: (asset: any) => React.ReactNode
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setFilters: React.Dispatch<React.SetStateAction<any>>
    assetDeleted?: boolean
    /**
     * Default sorting key
     */
    sortingId?: string | null
    /**
     * Classname for Thumbnail view container e.g can be used to display
     * number of cards in a row
     * @default col-sm-6 col-md-4 col-lg-3
     */
    columnClassName?: string
    /**
     * Optional callback function for handle checkmark functionality
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    handleCheckBoxState?: (args: RowModel<any>) => void
    showSelectedMedia?: boolean
    /**
     * Optional filters, this will not cause re-rendering issues
     */
    extraFilters?: AnyObject

    /**
     * Optional props, to render JSX above table
     */
    renderTableHeader?: (response: AnyObject) => React.ReactNode
}

export interface ProposalTablePropType extends MediaTableWithPaginationPropType {
    data: AnyObject[]
    setData: React.Dispatch<React.SetStateAction<AnyObject[]>>
}

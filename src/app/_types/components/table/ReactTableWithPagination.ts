/* eslint-disable @typescript-eslint/no-explicit-any */
import { ColumnDef, RowModel } from "@tanstack/react-table"
import { ExpandedRowWithTablePropType } from "./ReactTable"
import { AnyObject } from "../../common/Common"
import { ReactNode } from "react"

/**
 * Base properties for the React table with pagination.
 */
interface BaseProps extends ExpandedRowWithTablePropType {
    /** The column definitions for the table */
    columns: ColumnDef<any, any>[]
    /** The endpoint URL for data fetching */
    endpoint: URL
    /** Optional dependencies for the table */
    dependencies?: any[]
    /** Optional callback to handle fetch response */
    getFetchResponse?: (response: any) => void
    /** Optional flag to show search bar */
    showSearchBar?: boolean
    /** Optional flag to show add button */
    showAddButton?: boolean
    /** Optional flag to indicate if an asset has been deleted */
    assetDeleted?: boolean
    /** Optional extra filters for the table */
    extraFilters?: object
    /** Optional class name for the table */
    tableClassName?: string
    /** Optional row count for the table */
    rowCount?: number
    /** Optional sorting ID for the table */
    sortingId?: string | null
    stopVh?: boolean
    /** Optional checkboxes for the table */
    handleCheckBoxState?: (args: RowModel<any>, rowSelection?: AnyObject) => void
    /** Optional handling extra button for the table */
    renderExtraButton?: () => ReactNode
}

/**
 * Properties for the React table with pagination when the table header is shown.
 */
interface WithTableHeaderProps extends BaseProps {
    /** Flag to show the table header */
    showTableHeader?: true
    /** Title of the table header */
    tableHeaderTitle: string
    /** Callback for the add button click */
    onAddButtonClick?: () => void
    /** Label for the add button */
    addButtonLabel?: string
    /** Class name for the add button */
    addButtonClassName?: string
    /** Class name for the table container */
    tableContainerClassName?: string
}

/**
 * Properties for the React table with pagination when the table header is not shown.
 */
interface WithoutTableHeaderProps extends BaseProps {
    /** Optional flag to hide the table header */
    showTableHeader?: false
    /** Title of the table header */
    tableHeaderTitle?: never
    /** Callback for the add button click */
    onAddButtonClick?: never
    /** Label for the add button */
    addButtonLabel?: never
    /** Class name for the add button */
    addButtonClassName?: never
    /** Class name for the table container */
    tableContainerClassName?: never
}

/**
 * React table with pagination properties.
 * Includes conditional properties based on whether the table header is shown.
 */
export type ReactTableWithPaginationPropType = WithTableHeaderProps | WithoutTableHeaderProps

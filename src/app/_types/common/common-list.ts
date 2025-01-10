import { ColumnDef } from "@tanstack/react-table"
import { AnyObject } from "./Common"
import { Dispatch, SetStateAction } from "react"

/**
 * Base properties for the common list component.
 */
interface BaseCommonListProps {
    title: string
    endpoint: URL
    metaDataEndpoint: URL
    refetch: boolean
    extraColumns?: ColumnDef<AnyObject>[]
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    getFetchResponse?: (response: Record<string, any>) => void
    assetDeleted?: boolean
    tableClassName?: string
    extraFilters?: object
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    dependencies?: any[]
    setIsActionsDisabled?: Dispatch<SetStateAction<boolean>>
}

/**
 * Properties when renderCustomToolbar is defined.
 */
interface WithRenderCustomToolbar extends BaseCommonListProps {
    renderCustomToolbar: () => React.ReactNode // renderCustomToolbar is required in this case
    onAddButton?: never
    addButtonTitle?: never
}

/**
 * Properties when renderCustomToolbar is not defined.
 */
interface WithoutRenderCustomToolbar extends BaseCommonListProps {
    renderCustomToolbar?: undefined // renderCustomToolbar is optional
    onAddButton: () => void | string
    addButtonTitle: string
}

/**
 * The final type for common list props based on whether renderCustomToolbar is defined.
 */
export type CommonListProps = WithRenderCustomToolbar | WithoutRenderCustomToolbar

export interface PaginationType {
    page: number
    page_size: number
    pagination_type: string
}
export interface TablePaginationPropType {
    /**
     * Function to set the pagination state.
     *
     * @param value The new pagination state.
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setPagination: (value: React.SetStateAction<PaginationType & any>) => void

    /**
     * Current pagination state.
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    pagination: PaginationType & any

    /**
     * Total number of items.
     */
    totalCount: number

    /**
     * Number of columns the pagination should span.
     */
    colSpan: number

    /**
     * Optional class name for the pagination container.
     */
    paginationContainerClass?: string
}

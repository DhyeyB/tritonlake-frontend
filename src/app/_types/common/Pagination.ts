export interface PaginationPropType {
    onChange: (e: React.MouseEvent<HTMLAnchorElement> | React.MouseEvent<HTMLLIElement>, value: number) => void
    totalCount: number
    siblingCount?: number
    page: number
    page_size: number
    onPageChange: (value: number) => void
}

export interface UsePaginationHookType {
    total: number
    page_size: number
    siblingCount: number
    page: number
}

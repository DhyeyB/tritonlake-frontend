import { ReactNode } from "react"

export interface OpportunityHeaderProps {
    title: string
    subtitle: string
    sortOptions?: { value: string; label: string }[]
    onSortChange?: (sortOption: string) => void
    onSearchChange?: (searchTerm: string) => void
    children?: ReactNode
}

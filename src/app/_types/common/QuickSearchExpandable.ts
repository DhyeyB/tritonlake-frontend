interface Tag {
    id: string
    deleted_at: string | null
    updated_at: string
    created_at: string
    name: string
    type: string
    order: number
    parent: string | null
}

interface QuickSearchDetail {
    id: string
    lp_type: Tag
    lp_location: Tag
    industries: Tag[]
    asset_classes: Tag[]
    strategies: Tag[]
    geographical_regions: Tag[]
    deleted_at: string | null
    updated_at: string
    created_at: string
    summary: string
    target_irr: number
    target_moic: number
    fund_number_min: number
    fund_number_max: number
    deal_size_min: number
    deal_size_max: number
    bite_size_min: number
    bite_size_max: number
    valid_until: string
}

export interface QuickSearchDetailProps {
    quickSearchDetail: QuickSearchDetail
}

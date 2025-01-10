type OpportunityItem = {
    label: string
    value: React.ReactNode
}

export type OpportunityDetailsCardProps = {
    title: string
    items: OpportunityItem[]
    colClassName?: string
}

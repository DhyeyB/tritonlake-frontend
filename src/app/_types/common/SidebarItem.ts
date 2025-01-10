export type SidebarItemType = {
    title: string
    key: number
    icon: string
    items: {
        title: string
        link: string
        key: number
        icon: string
    }[]
}

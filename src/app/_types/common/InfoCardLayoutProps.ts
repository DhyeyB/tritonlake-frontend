export type InfoCardLayoutProps = {
    image: string
    title: string
    subtitle: string
    description: string
    daysLeft?: string
    children?: React.ReactNode
    activeTab?: string
    sponserName?: string
    socialLinks?: {
        facebook_url?: string
        instagram_url?: string
        linkedin_url?: string
        twitter_url?: string
        website_url?: string
    }
    setActiveTab?: (tab: string) => void
}

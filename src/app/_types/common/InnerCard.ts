import { MouseEventHandler } from "react"

export interface InnerCardProps {
    heading: string
    subHeading: string
    href?: string
    bgClass?: string // Optional class for background
    headerTextClass?: string // Optional class for text color
    subHeadingTextClass?: string // Optional class for text color
    isRemovable?: boolean // Optional class for text color
    onClick?: MouseEventHandler<HTMLDivElement> // Correct type here
    setShowContainerCard?: (value: boolean) => void
}

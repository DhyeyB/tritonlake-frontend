type TargetRaiseItem = {
    label: string
    value: React.ReactNode
}

type TargetRaiseSection = {
    title: string
    items: TargetRaiseItem[]
}

export type TargetRaiseCardProps = {
    title: string
    sections: TargetRaiseSection[]
    additionalInformation: string
}

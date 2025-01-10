export interface ProfileCardProps {
    name: string
    role: string
    email: string
    phone: string
    imageUrl: string
    description: string
    link: string
    onButtonClick?: () => void // Optional, in case you want a custom action on button click
}

export interface ButtonPropType extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    loading: boolean
    title: string
    loadingText?: string
}

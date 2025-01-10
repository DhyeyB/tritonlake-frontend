import { ColorResult } from "react-color"

export interface SwatchColorPickerProps {
    color: string
    onColorChange: (color: string | ColorResult) => void
    colorBoxClassName?: string
    colorBoxStyle?: React.CSSProperties
}

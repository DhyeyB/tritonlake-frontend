import { Any } from "./Common"

export interface CustomSliderProps {
    min: number // Minimum slider value
    max: number // Maximum slider value
    defaultValue?: number | number[] // Default slider value (single or range)
    isRange?: boolean // Whether the slider is a range slider
    onChange: (value: number | number[] | Any) => void // Callback for slider value changes
}

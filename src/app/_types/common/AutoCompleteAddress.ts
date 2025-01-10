import { AnyObject } from "./Common"

export interface ComponentType {
    long_name: string
    short_name: string
    types: string[]
}

export interface AutoCompleteAddressData {
    raw: string
    line_1: string
    line_2: string
    city: string
    postal_code: string
    country_code: string
}
export interface AutoCompleteAddressPropType {
    onChange: (addressObject: AnyObject | string | null) => void
    id: string
    defaultValue?: string
    errorMessage: string
    addressValue?: AutoCompleteAddressData | null | undefined | AnyObject
}

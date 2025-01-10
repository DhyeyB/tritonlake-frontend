import { CountryData } from "react-phone-input-2"

export interface CustomPhoneInputType {
    inputClass: string
    value: string | null
    setPhoneNumberValue: (number: string) => void
    setCountryCodeValue: (countryCode: string) => void
    setCountry: (country: CountryData) => void
    clearPhoneNumberErrors: () => void
    setPhoneNumberErrors: () => void
    errorMessage: string
}

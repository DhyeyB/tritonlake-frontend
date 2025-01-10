/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react"
import { AutoCompleteAddressData, AutoCompleteAddressPropType, ComponentType } from "@/_types/common/AutoCompleteAddress"
import TextInputField from "../input/TextInput"
import CustomReactSelect from "../input/ReactSelect"
import { countryData } from "@/app/_fixtures/country-data"
import ShowFormError from "./ShowFormError"

const AutoCompleteAddress: React.FC<AutoCompleteAddressPropType> = ({ id, onChange, errorMessage, defaultValue, addressValue }) => {
    const [inputValue, setInputValue] = useState<string>(defaultValue || "")
    // State for toggling between manual and autocomplete modes
    const [isManual, setIsManual] = useState(false)
    // State for storing selected country as it is a react-select
    const [countryValue, setCountryValue] = useState<null | string | undefined>(null)
    // State for storing manual address fields
    const [manualAddress, setManualAddress] = useState<Record<string, any>>({
        raw: "",
        line_1: "",
        city: "",
        postal_code: "",
        country_code: "",
    })

    /**
     * Updates specific fields in the address object based on the component type.
     * This function is used make a address object from autocomplete object to send to backend in the format which backend expects.
     * @param addressObject - Address object to update
     * @param item - Address component with type and values
     */
    const updateAddressObject = (
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        addressObject: Record<string, any> | undefined,
        item: ComponentType,
    ) => {
        if (addressObject) {
            if (item.types.includes("locality") || item.types.includes("postal_town")) {
                addressObject["city"] = item.long_name
            }
            if (item.types.includes("country")) {
                addressObject["country_code"] = item.short_name
            }
            if (item.types.includes("postal_code")) {
                addressObject["postal_code"] = item.long_name
            }
        }
    }

    // Initialize Google Maps autocomplete
    useEffect(() => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        if (!window.google?.maps?.places) return // Ensure Google Maps API is loaded

        const hqAddressField = document.getElementById(id) as HTMLInputElement
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        const autoComplete = new google.maps.places.Autocomplete(hqAddressField, {
            types: ["geocode"],
        })

        autoComplete.addListener("place_changed", () => {
            const place = autoComplete.getPlace()
            if (place && place.address_components) {
                const addressObject: Partial<AutoCompleteAddressData> = {
                    raw: place.formatted_address || "",
                    line_1: place.formatted_address?.split(", ")[0] || "",
                }
                place.address_components.forEach((item: ComponentType) => {
                    updateAddressObject(addressObject, item)
                })
                // Update parent component with the selected address
                onChange(addressObject as AutoCompleteAddressData)
                // Update manual address state so if a user switch from automcomplete to manual mode the manual fields will be filled and the user can edit those
                setManualAddress({
                    raw: addressObject?.raw || null,
                    line_1: addressObject?.line_1 || "",
                    city: addressObject?.city || "",
                    postal_code: addressObject?.postal_code || "",
                    country_code: addressObject?.country_code || "",
                })
                setCountryValue(addressObject?.country_code)
            }
        })
    }, [id, onChange])

    /**
     * Handles input changes in the autocomplete field.
     * @param value - New input value
     */
    const handleInputChange = (value: string | null) => {
        setInputValue(value || "") // Update local state
        if (!value || value.trim() === "") {
            onChange(null) // Notify parent component
        } else {
            onChange(value)
        }
    }

    /**
     * Updates the raw address and notifies the parent component.
     * @param updatedAddress - Updated address fields
     */
    const updateRawAddress = (updatedAddress: { [key: string]: string }) => {
        const { line_1, city, postal_code, country_code } = updatedAddress

        // Create the raw address by conditionally appending each part with a comma
        let raw = ""
        if (line_1?.length > 0) raw += `${line_1}, `
        if (city?.length > 0) raw += `${city}, `
        if (postal_code?.length > 0) raw += `${postal_code}, `
        if (country_code?.length > 0) raw += `${country_code}`

        raw = raw.trim() // Trim the final result to remove any trailing commas or spaces
        const newAddress = {
            ...manualAddress,
            ...updatedAddress,
            raw, // Update the raw address when manual fields change
        }

        const transformedData = Object.fromEntries(
            Object.entries(newAddress).map(([key, value]) => [
                key,
                value === "" ? null : value, // If empty string, set to null
            ]),
        )

        setManualAddress(transformedData) // Update state with the new address
        onChange(transformedData) // Pass the updated address to the parent
    }

    /**
     * Handles changes to manual address fields.
     * @param field - Field name
     * @param value - New field value
     */
    const handleManualChange = (field: string, value: string) => {
        const updatedAddress = { [field]: value }
        updateRawAddress({ ...manualAddress, ...updatedAddress })
    }

    // Synchronize manual address state with addressValue prop. So when the user open the form is edit mode than the manual address fields will also be filled.
    useEffect(() => {
        setManualAddress({
            raw: addressValue?.raw || "",
            line_1: addressValue?.line_1 || "",
            city: addressValue?.city || "",
            postal_code: addressValue?.postal_code || "",
            country_code: addressValue?.country_code || "",
        })
        setCountryValue(addressValue?.country_code)
    }, [addressValue])

    useEffect(() => {
        setInputValue(defaultValue || "")
    }, [defaultValue])

    return (
        <>
            {!isManual ? (
                <div>
                    <TextInputField
                        type="text"
                        id={id}
                        label=""
                        className="form-control form-control-solid"
                        placeholder="Address"
                        onChange={(e) => handleInputChange(e.target.value)}
                        autoComplete="off"
                        value={inputValue} // Bind to controlled state
                        errorMsg={errorMessage}
                    />
                    <a role="button" onClick={() => setIsManual(true)} className="d-block mt-2 cursor-pointer">
                        Enter Address Manually
                    </a>
                </div>
            ) : (
                <>
                    <div className="manual-address-fields">
                        <div className="row mb-5">
                            <div className="col-md-6">
                                <input
                                    type="text"
                                    className="form-control form-control-solid"
                                    placeholder="Line 1"
                                    value={manualAddress?.line_1}
                                    autoComplete="off"
                                    onChange={(e) => handleManualChange("line_1", e.target.value)}
                                />
                            </div>
                            <div className="col-md-6">
                                <input
                                    type="text"
                                    className="form-control form-control-solid"
                                    placeholder="City"
                                    value={manualAddress?.city}
                                    autoComplete="off"
                                    onChange={(e) => handleManualChange("city", e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="row mb-5">
                            <div className="col-md-6">
                                <input
                                    type="text"
                                    className="form-control form-control-solid"
                                    placeholder="Postal Code"
                                    autoComplete="off"
                                    value={manualAddress?.postal_code}
                                    onChange={(e) => handleManualChange("postal_code", e.target.value)}
                                />
                            </div>
                            <div className="col-md-6">
                                <CustomReactSelect
                                    placeholder="Select a Country"
                                    optionsData={countryData}
                                    selectedOptionValue={countryValue}
                                    onDropdownChange={(value) => {
                                        setCountryValue(value)
                                        handleManualChange("country_code", value)
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                    <ShowFormError message={errorMessage} />
                </>
            )}
        </>
    )
}

export default AutoCompleteAddress

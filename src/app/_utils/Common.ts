/* eslint-disable @typescript-eslint/no-explicit-any */
import { Any, AnyObject, ShowSweetAlertWithRedirectArgsType } from "@/_types/common/Common"
import dayjs from "dayjs"
import phone from "phone"
import { z } from "zod"
import { Option } from "../_types/common/SelectBox"
import { CONFIG } from "./Constants"
import { formatTextToCapitalized, showSweetAlert } from "./Helpers"
import { RoleEnum } from "../_enums/RoleEnum"
import { UserTypeEnum } from "../_enums/UserTypeEnum"

export const getLocalStorageData = (variableName: string) => {
    const localStorageData = localStorage.getItem(variableName)
    if (localStorageData) {
        return JSON.parse(localStorageData)
    } else {
        return null
    }
}

export const setLocalStorageData = (variableName: string, data: object) => {
    localStorage.setItem(variableName, JSON.stringify(data))
}

export const generateRandomColors = (index?: number) => {
    if (typeof index === "undefined") {
        index = Math.floor(Math.random() * CONFIG.COLOR_ARRAY.colorArray.length)
    }
    if (index >= CONFIG.COLOR_ARRAY.colorArray.length) {
        index = index % CONFIG.COLOR_ARRAY.colorArray.length
    }
    return CONFIG.COLOR_ARRAY.colorArray[index]
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getValueOrNull(value: any) {
    if (value === null || value === undefined) {
        return null
    }

    if (typeof value === "object") {
        return value.value ? value.value : null
    }

    if (value === 0) {
        return value.toString()
    }

    return value ? value : null
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function stringToBooleanOrNull(_value: any) {
    const value = _value?.toString()
    if (value) {
        return value === "true" ? true : value === "false" ? false : null
    } else {
        return null
    }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function booleanOrNull(value: any) {
    if (value || typeof value === "boolean") {
        return value
    } else {
        return null
    }
}

export function getArrayOrNull<T>(value: T[] | null) {
    if (value === null || value === undefined) {
        return null
    }
    return value.length === 0 ? null : value
}

export function getArrayOrEmptyArray<T>(value: T[] | null) {
    if (value === null || value === undefined) {
        return []
    }
    return value.length === 0 ? [] : value
}

export function getArrayOfIdOrEmptyArray(value: Option[] | null) {
    if (value === null || value === undefined) {
        return []
    }
    return value.length === 0 ? [] : value.map((item) => item.value)
}

export function sliceWithEllipsis(name: string | undefined | null, sliceLimit: number): string {
    const slicedName = name?.slice(0, sliceLimit)
    const ellipsis = name?.length && name.length > sliceLimit ? "  ..." : ""
    return slicedName ? slicedName + ellipsis : ""
}

export const renderValue = (label: string, value?: string | number | null, showNull = false) => {
    if (showNull) {
        let slicedValue = ""
        if (value) {
            slicedValue = sliceWithEllipsis(value.toString(), CONFIG.WORD_SLICE_LIMIT)
        }
        return `${label}: ${slicedValue}`
    } else if (value) {
        const slicedValue = sliceWithEllipsis(value.toString(), CONFIG.WORD_SLICE_LIMIT)
        return `${label}: ${slicedValue}`
    }
    return ""
}

export const showSweetAlertWithRedirect = (args: ShowSweetAlertWithRedirectArgsType) => {
    showSweetAlert(args.message, args.icon)
    args.router.push(args.url)
}

export const collectAndFormatErrors = (errorDict: object) => {
    const errorDiv = document.createElement("div")
    for (const [sheet, errors] of Object.entries(errorDict)) {
        const ul = document.createElement("ul")
        const h1 = document.createElement("h1")
        h1.style.textAlign = "left"
        h1.textContent = sheet
        errors.forEach((error: { message: string }) => {
            const li = document.createElement("li")
            li.style.textAlign = "left"
            li.textContent = error.message
            ul.appendChild(li)
        })
        errorDiv.appendChild(h1)
        errorDiv.appendChild(ul)
    }
    return errorDiv
}

/**
 * Extracts values from an array of objects based on a specified field.
 * Optionally, it can extract nested field names if the `getNestedName` flag is set to true.
 *
 * @param {Array<any>} array - The array of objects from which values are to be extracted.
 * @param {string} field - The field name to extract values from each object.
 * @param {boolean} [getNestedName=false] - A flag indicating whether to extract a nested name field.
 * @returns {Array<string>} - An array of strings containing the extracted and filtered values.
 *
 * @example
 * // Example usage with nested name extraction
 * const data = [
 *   { category: { name: "Books" }, otherField: "value1" },
 *   { category: { name: "Movies" }, otherField: "value2" },
 *   { category: { name: " " }, otherField: "value3" },
 * ];
 * const result = getValueFromResponseField(data, "category", true);
 * // result => ["Books", "Movies"]
 *
 * @example
 * // Example usage without nested name extraction
 * const data = [
 *   { category: "Books", otherField: "value1" },
 *   { category: "Movies", otherField: "value2" },
 *   { category: " ", otherField: "value3" },
 * ];
 * const result = getValueFromResponseField(data, "category");
 * // result => ["Books", "Movies"]
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getValueFromResponseField = (array: any, field: string, getNestedName = false) => {
    return (
        array
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            ?.map((item: any) => {
                return getNestedName ? item[field]?.name : item[field]
            })
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            .filter((item: any) => item?.trim()?.length)
    )
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const deleteAndReindex = (obj: any, indexToDelete: number) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const newObj: Record<number, any> = {}
    let newIndex = 0
    for (const key in obj) {
        if (Number(key) !== indexToDelete) {
            newObj[newIndex] = obj[key]
            newIndex++
        }
    }
    return newObj
}

// manage selected dropdown options in case user remove a field from field array
// this is used where user can submit multiple fields to API
export const manageSelectedDropdownValues = (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    selectedDropdowns: { state: any; setState: React.Dispatch<React.SetStateAction<any>> }[],
    deletedIndex: number,
) => {
    selectedDropdowns.forEach(({ state, setState }) => {
        const newObj = deleteAndReindex(state, deletedIndex)
        setState(newObj)
    })
}

export const getDaysDifference = (startTime: string) => {
    const initialTime = dayjs(startTime)
    const daysdifference = dayjs().diff(initialTime, "days")
    return daysdifference
}

export const getTimeDuration = (startTime: string) => {
    const daysDifference = getDaysDifference(startTime)

    if (daysDifference === CONFIG.DAYS.ZERO) {
        return "today"
    }
    if (daysDifference === CONFIG.DAYS.ONE) {
        return "1 day ago"
    }
    if (daysDifference <= CONFIG.DAYS.DAYS_IN_MONTH) {
        return `${daysDifference} days ago`
    }
    if (daysDifference <= CONFIG.DAYS.DAYS_IN_YEAR) {
        const monthsDifference = Math.floor(daysDifference / CONFIG.DAYS.DAYS_IN_MONTH)
        return `${monthsDifference} month${monthsDifference > 1 ? "s" : ""} ago`
    }
    const yearsDifference = Math.floor(daysDifference / CONFIG.DAYS.DAYS_IN_YEAR)
    return `${yearsDifference} year${yearsDifference > 1 ? "s" : ""} ago`
}

export const getFileIcon = (type: string | undefined) => {
    if (type) {
        return CONFIG.FILE_ICONS[type] ?? "/assets/media/svg/files/default-file.svg"
    } else {
        return "/assets/media/svg/files/txt.svg"
    }
}

export const getAssetNameWithOrderNumber = (name: string, orderNumber?: string | null) => {
    if (orderNumber || parseInt(orderNumber as string) === 0) {
        return `${orderNumber}. ${name}`
    }
    return name
}

/**
 * Validates a phone number by combining the country code and phone number.
 *
 * @param data - An object containing the phone country code and phone number.
 * @param data.phone_country_code - The country code part of the phone number.
 * @param data.phone_number - The phone number part.
 *
 * @returns boolean - Returns true if the combined phone number is valid, otherwise false.
 */
export const isPhoneNumberValid = (data: { phone_country_code: string | null; phone_number: string | null }) => {
    if ((data.phone_country_code?.length === 0 && data.phone_number?.length === 0) || (!data.phone_country_code && !data.phone_number)) {
        return true
    } else if (data.phone_country_code && data.phone_country_code) {
        const isValid = phone(`${data.phone_country_code}${data.phone_number}`).isValid
        return isValid
    } else if (!data.phone_country_code) {
        return false
    }
    return true
}

export const calculatePercentage = (value: number, percentage: number) => {
    return value * (percentage / 100)
}

// Calculate the number of rows based on the length of the text
export const calculateRows = (text: string, minRows = 4) => {
    const lines = text.length / CONFIG.MAX_ROWS
    const linesWithBreaks = text.split("\n")?.length
    const rows = Math.max(minRows, lines, linesWithBreaks)
    if (rows <= CONFIG.MAX_ROWS) {
        return rows
    } else return CONFIG.MAX_ROWS
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const withPhoneValidation = (schema: z.ZodType<any, any, any>) => {
    return schema.refine((data) => isPhoneNumberValid(data), CONFIG.MESSAGES.INVALID_PHONE_NUMBER)
}

/**
 * Transforms a Fleet item into an object with specific properties formatted for displaying in dropdown.
 *
 * @param {Fleet} item - The Fleet item to transform.
 * @returns {Object} The transformed object with properties formatted for display.
 */
export const fleetModifiedItemsObject = (item: any) => {
    return {
        ac_type: item?.ac_type
            ? {
                  label: formatTextToCapitalized(item.ac_type),
                  value: item.ac_type,
                  data: {
                      label: formatTextToCapitalized(item.ac_type),
                      value: item.ac_type,
                  },
              }
            : null,
        wing_type: item?.wing_type
            ? {
                  label: formatTextToCapitalized(item.wing_type),
                  value: item.wing_type,
                  data: {
                      label: formatTextToCapitalized(item.wing_type),
                      value: item.wing_type,
                  },
              }
            : null,
        systems: item.systems?.map((item: any) => ({
            label: item.name,
            value: item.id,
            data: item,
        })),
    }
}

export const transformOptions = (options: string[]) => {
    return options.map((option) => ({
        label: option,
        value: option,
        data: {
            label: option,
            value: option,
        },
    }))
}

export const setFocusInput = (data: AnyObject) => {
    if (data?.id) {
        // Delay focus until the form is fully reset with default values
        setTimeout(() => {
            const input = document.getElementById("input-focus")
            if (input) {
                input.focus()
            }
        }, 200) // Slight delay to ensure form resets
    } else {
        // Focus immediately when creating a new EMR
        const input = document.getElementById("input-focus")
        if (input) {
            input.focus()
        }
    }
}

/**
 * Function to get the default redirect URL based on user role.
 * @param role - The role of the user.
 * @returns The default redirect URL.
 */
export const getDefaultRedirectUrl = (role: string): string => {
    switch (role) {
        case RoleEnum.ACCOUNTANT:
            return "/billing"
        case RoleEnum.STAFF:
            return "/pdf-ledger"
        case UserTypeEnum.SUPER_ADMIN:
            return "/dashboard"
        case UserTypeEnum.CUSTOMER_ADMIN:
            return "/pdf-ledger"
        default:
            return "/profile" // Fallback URL if role is not found
    }
}

export const validateNoSpaces = (value: string) => {
    return !/\s/.test(value) // Return true if no spaces
}

export const validateAllowedCharacters = (value: string) => {
    const allowedPattern = /^[\w{}]+$/
    return allowedPattern.test(value) // Return true if it matches the allowed characters pattern
}

export const validatePlaceholders = (value: string, prefixPlaceholders: string[]) => {
    // Find all curly braces patterns in the string
    const placeholders = value.match(/{[^}]*}/g) || [] // Match anything between curly braces

    // Validate if each placeholder is one of the allowed placeholders
    for (const placeholder of placeholders) {
        // Check if it's one of the valid placeholders
        if (!prefixPlaceholders.includes(placeholder)) {
            return false // Invalid if a wrong placeholder is found
        }
    }

    return true // Return true if all checks pass
}

export const validateCurlyBraces = (value: string) => {
    const openBraces = (value.match(/{/g) || []).length
    const closeBraces = (value.match(/}/g) || []).length
    return openBraces === closeBraces // Return true if the number of opening and closing braces are equal
}

export const validateAddressField = ({ data, ctx }: { data: Any; ctx: z.RefinementCtx }) => {
    const { line_1, raw, city, postal_code, country_code } = data

    // Validate `line_1`
    if (!line_1?.trim()) {
        ctx.addIssue({
            code: "custom",
            message: CONFIG.VALIDATION.MESSAGE.LINE_1_IS_REQUIRED,
        })
    }

    // Validate `raw`
    if (!raw?.trim()) {
        ctx.addIssue({
            code: "custom",
            message: CONFIG.VALIDATION.MESSAGE.RAW_IS_REQUIRED,
        })
    }

    // Validate `raw`
    if (!city?.trim()) {
        ctx.addIssue({
            code: "custom",
            message: CONFIG.VALIDATION.MESSAGE.CITY,
        })
    }

    // Validate `raw`
    if (!postal_code?.trim()) {
        ctx.addIssue({
            code: "custom",
            message: CONFIG.VALIDATION.MESSAGE.POSTAL_CODE_IS_REQUIRED,
        })
    }

    // validate if postal code is present that it must me less than 9 charaters
    if (postal_code?.trim() && postal_code?.trim().length > 9) {
        ctx.addIssue({
            code: "custom",
            message: CONFIG.VALIDATION.MESSAGE.POSTAL_CODE_MUST_BE_LESS_THAN_9_CHARACTER,
        })
    }

    // Validate `country_code`
    if (!country_code?.trim()) {
        ctx.addIssue({
            code: "custom",
            message: CONFIG.VALIDATION.MESSAGE.COUNTRY_CODE_IS_REQUIRED,
        })
    }
}

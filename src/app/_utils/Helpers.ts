/* eslint-disable @typescript-eslint/no-explicit-any */
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime"
import Swal, { SweetAlertIcon, SweetAlertOptions } from "sweetalert2"
import { CONFIG } from "./Constants"
import { calculatePercentage } from "./Common"
import { RoleEnum } from "@/app/_enums/RoleEnum"
import { Any } from "../_types/common/Common"
import { isValidNumber, parse } from "libphonenumber-js"
import { ShowConfirmationModalType, SuccessDialogOptions } from "../_types/common/ShowConfirmationModalType"
import dayjs from "dayjs"

export const getStoredAuthTokenExp = () => {
    if (typeof window !== "undefined") {
        return localStorage.getItem(CONFIG.AUTH_TOKEN_EXP)
    }
    return null
}

export const storeAuthTokenExp = (token: string) => {
    localStorage.setItem(CONFIG.AUTH_TOKEN_EXP, token)
}

export const removeAuthTokenExp = () => {
    localStorage.removeItem(CONFIG.AUTH_TOKEN_EXP)
    localStorage.removeItem(CONFIG.LOCAL_STORAGE_VARIABLES.ACCESS_TOKEN)
    localStorage.removeItem(CONFIG.LOCAL_STORAGE_VARIABLES.REFRESH_TOKEN)
    localStorage.removeItem(CONFIG.LOCAL_STORAGE_VARIABLES.USER_DETAILS)
    localStorage.removeItem(CONFIG.LOCAL_STORAGE_VARIABLES.USER_UUID)
    localStorage.removeItem(CONFIG.LOCAL_STORAGE_VARIABLES.ROLE)
    localStorage.removeItem(CONFIG.LOCAL_STORAGE_VARIABLES.MENU)
    localStorage.removeItem(CONFIG.LOCAL_STORAGE_VARIABLES.LOGGED_IN_CUSTOMER_OPTION)
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function iterateObject(obj: Record<string, any>): string {
    let errorMessage: string = ""
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            const value = obj[key]
            if (Array.isArray(value)) {
                value.forEach((msg) => {
                    if (typeof msg === "string") {
                        errorMessage += key[0].toUpperCase() + key.slice(1) + " " + msg + "\n"
                    } else if (Array.isArray(msg) && typeof msg[0] === "string") {
                        errorMessage += key[0].toUpperCase() + key.slice(1) + " " + msg[0] + "\n"
                    } else if (typeof msg === "object") {
                        errorMessage += iterateObject(msg)
                    }
                })
            } else if (typeof value === "object") {
                errorMessage += iterateObject(value)
            } else if (typeof value === "string") {
                errorMessage += value + "\n"
            }
        }
    }
    return errorMessage
}

/**
 *	@description shows a toast containing the error message or redirect to not-found page if API gives 404 status code
 *
 * @param {*} error
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const handleError = (errorObject: any, router?: AppRouterInstance) => {
    if (router && errorObject?.status === CONFIG.STATUS_CODES.NOT_FOUND) {
        router.push("/not-found")
    } else {
        if (typeof errorObject === "string") {
            // toast.dismiss()
            showErrorSweetAlert(errorObject, CONFIG.SWEETALERT_ERROR_OPTION.icon as SweetAlertIcon)
        } else if (typeof errorObject.error === "string") {
            // toast.dismiss()
            showErrorSweetAlert(errorObject.error, CONFIG.SWEETALERT_ERROR_OPTION.icon as SweetAlertIcon)
        } else if (typeof errorObject.error === "object" && (errorObject.error as { message: string }).message) {
            showErrorSweetAlert((errorObject.error as { message: string })?.message, CONFIG.SWEETALERT_ERROR_OPTION.icon as SweetAlertIcon)
        } else {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const _errorObject = errorObject as Record<string, any>
            const message = iterateObject(_errorObject.error)
            if (message) {
                showErrorSweetAlert(message, CONFIG.SWEETALERT_ERROR_OPTION.icon as SweetAlertIcon)
                console.error(message)
            } else {
                showErrorSweetAlert(CONFIG.MESSAGES.GENERIC_ERROR, CONFIG.SWEETALERT_ERROR_OPTION.icon as SweetAlertIcon)

                console.error("Something went wrong")
            }
        }
    }
}

export const handleSignOut = async (routerInstance: AppRouterInstance, redirectUrl = "/") => {
    try {
        // no need to call API to logout because we are not using cookies anymore
        // just clearing the access and refresh token from local storage is enough

        // const refreshToken = localStorage.getItem(CONFIG.LOCAL_STORAGE_VARIABLES.REFRESH_TOKEN)
        // const data = {
        //     refresh: refreshToken,
        // }
        // await FetchHelper.post(CONFIG.API_ENDPOINTS.LOGOUT, data)
        removeAuthTokenExp()
        // signOut({ redirect: false })
    } catch (error) {
        handleError(error)
    } finally {
        routerInstance.push(`/auth/signin?${CONFIG.PARAMS.REDIRECT_URL_PARAM}=${redirectUrl}`)
    }
}

const getSwalText = (text: string) => {
    return `<span>${text} <br><br> ${CONFIG.MESSAGES.THIS_CAN_NOT_BE_UNDONE}</span>`
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
// export const checkValidNumber = ({ country, data }: any) => {
//     let isValid = true
//     if (country && typeof data === "string" && data?.trim().length) {
//         isValid = phone(`+${data}`, {
//             country: country.countryCode,
//         }).isValid
//     }
//     return isValid
// }

export const checkValidNumber = ({ country, data }: any) => {
    let isValid = true
    if (country && typeof data === "string" && data?.trim().length) {
        const phoneNumber = data.startsWith("+") ? data : `+${data}`
        const parsedNumber = parse(phoneNumber)
        isValid = isValidNumber(parsedNumber)
    }
    return isValid
}

export const getImageUrl = (image?: any | null, size?: string) => {
    if (image && size) {
        const imageUrl = image?.resizer_url + size + image?.path
        return imageUrl
    }
    return ""
}

export const showSweetAlert = (text: string, icon: SweetAlertIcon, cancelButtonText?: string, subtitle = true, confirmButtonText?: string) => {
    return Swal.fire({
        heightAuto: false,
        html: icon === "warning" ? (subtitle ? getSwalText(text) : `<span>${text}</span>`) : null,
        iconColor: icon === "warning" && "red",
        icon, // Set icon based on type
        title: (icon === "success" || icon === "error") && text,
        showConfirmButton: icon === "warning",
        confirmButtonText: subtitle ? confirmButtonText || CONFIG.SWEETALERT_DELETE_OPTION.confirmButtonText : confirmButtonText || CONFIG.SWEETALERT_DELETE_OPTION.confirmButtonTextSecondary,
        showCancelButton: icon === "warning", // Only show cancel button for warnings
        cancelButtonText: cancelButtonText || CONFIG.SWEETALERT_DELETE_OPTION.cancelButtonText,
        timer: (icon === "success" || icon === "error") && CONFIG.SWEETALERT_SUCCESS_OPTION.timer,
        customClass: {
            actions: "d-flex flex-row-reverse",
            cancelButton: "btn custom-swal-cancel-button",
            confirmButton: "btn custom-swal-confirm-button",
        },
        // customClass: {
        //     cancelButton: "custom-swal-cancel-button",
        //     confirmButton: "custom-swal-confirm-button",
        // },
    } as SweetAlertOptions)
}

export const showErrorSweetAlert = (text: string, icon: SweetAlertIcon, subtitle = true) => {
    return Swal.fire({
        heightAuto: false,
        html: icon === "warning" ? (subtitle ? getSwalText(text) : `<span>${text}</span>`) : null,
        iconColor: icon === "warning" && "red",
        icon, // Set icon based on type
        title: (icon === "success" || icon === "error") && text,
        showConfirmButton: true,
        confirmButtonText: "OK",
        timer: (icon === "success" || icon === "error") && CONFIG.SWEETALERT_SUCCESS_OPTION.timer * 5,
        customClass: {
            actions: "d-flex flex-row-reverse",
            cancelButton: "btn custom-swal-cancel-button",
            confirmButton: "btn custom-swal-confirm-button",
        },
    } as SweetAlertOptions)
}

export const showSweetAlertFileUpload = (html: HTMLDivElement) => {
    const titleHtml = `
        <div class="d-flex justify-content-start">
            <img src="/assets/media/svg/warning-icon.svg" alt="Warning Icon" class="warning-icon" height="20px">
            <span class="title-text ms-4">Errors occurred in your uploaded data, please find the details below.</span>
        </div>
    `
    return Swal.fire({
        heightAuto: false,
        title: titleHtml,
        showConfirmButton: true,
        confirmButtonText: "Ok, Got it!",
        customClass: {
            container: "left-align-swal",
            htmlContainer: "custom-swal-height",
            title: "text-start",
        },
        html,
    } as SweetAlertOptions)
}

/**
 * Generates an array of numbers from 1 to the specified length.
 *
 * @param {number} length - The length of the array to generate.
 * @returns {number[]} An array containing numbers from 1 up to the specified length.
 *
 * @example
 * // Returns [1, 2, 3, 4, 5]
 * getArray(5);
 *
 * @example
 * // Returns [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
 * getArray(10);
 */
export const getArray = (length: number) => {
    return Array.from({ length }, (_, i) => i + 1)
}

export const getResizedImage = (imageSource: any, size: string) => {
    const originalImageNewWidth = Math.floor(calculatePercentage(imageSource.width, 40))
    const originalImageNewHeight = Math.floor(calculatePercentage(imageSource.height, 40))

    const originalImageNewRenderedSize = `${originalImageNewWidth}x${originalImageNewHeight}`

    const resizeImageWidth = Number(size.split("x")?.[0])
    const resizeImageHeight = Number(size.split("x")?.[1])

    const originalImageNewPixel = originalImageNewWidth * originalImageNewHeight
    const resizeImageNewPixel = resizeImageWidth * resizeImageHeight

    if (originalImageNewPixel > resizeImageNewPixel) {
        return getImageUrl(imageSource, originalImageNewRenderedSize)
    } else {
        return getImageUrl(imageSource, size)
    }
}

/**
 * Capitalizes the first letter of a given text and converts the rest to lowercase.
 *
 * @param {string} text - The text to be formatted.
 * @returns {string} The formatted text with the first letter capitalized.
 */
export const formatTextToCapitalized = (text: string) => {
    return text[0].toUpperCase() + text.slice(1).toLowerCase()
}

/**
 * Converts a given string with underscores to title case.
 * Example: "ADD_OPPORTUNITY" -> "Add Opportunity"
 *
 * @param {string} text - The string to be converted to title case.
 * @returns {string} - The converted string in title case.
 */
export const toTitleCase = (text: string): string => {
    return text
        .trim()
        .split("_")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(" ")
}

export const getUserDetailsFromLocalStorage = () => {
    const userDetails = localStorage.getItem(CONFIG.LOCAL_STORAGE_VARIABLES.USER_DETAILS)
    return userDetails ? JSON.parse(userDetails) : null
}

export const isPlatformAdmin = (): boolean => {
    const userDetails = getUserDetailsFromLocalStorage()
    if (userDetails) {
        const { firm: firmObject } = userDetails
        return firmObject.type == RoleEnum.PLATFORM
    }
    return false
}

export const isNetworkAdmin = (): boolean => {
    const userDetails = getUserDetailsFromLocalStorage()
    if (userDetails) {
        const { firm: firmObject } = userDetails
        return firmObject.type == RoleEnum.NETWORK
    }
    return false
}

export const isFirmAgent = (): boolean => {
    const userDetails = getUserDetailsFromLocalStorage()
    if (userDetails) {
        const { firm: firmObject } = userDetails
        return firmObject.type == RoleEnum.AGENT
    }
    return false
}

export const formatString = (input: string): string => {
    if (!input?.includes("_")) {
        // If no underscores, return the string with the first letter capitalized
        return input?.charAt(0)?.toUpperCase() + input?.slice(1)?.toLowerCase()
    }

    // If underscores are present, replace them and format as title case
    return input
        .replace(/_/g, " ") // Replace underscores with spaces
        .replace(/\b\w/g, (char) => char.toUpperCase()) // Capitalize first letter of each word
}

export const formatDigitCurrency = (value: number): string => {
    // Convert to a number if the input is a string
    const numericValue = typeof value == "string" ? parseFloat(value) : value

    return numericValue?.toLocaleString("en-US")
}

export const getStatusClassName = (status: string) => {
    switch (status) {
        case "live":
        case "distributed":
            return "badge-success"
        case "interested":
        case "expired":
        case "accepted":
            return "badge-info"
        case "draft":
            return "badge-warning"
        case "pending_distribution":
            return "badge-secondary"
        case "archived":
            return "badge-danger"
        case "fundraising":
            return "badge-primary"
        default:
            return "badge-secondary"
    }
}

export const getStatusBadgeTitle = (status: string) => {
    switch (status) {
        case "accepted":
            return "interested"
        case "pending":
            return "pending response"
        case "distributed":
            return "live"
        default:
            return status
    }
}

export function formatCurrencyWithAbbreviation(amount: number) {
    if (amount === null || amount === undefined || isNaN(amount)) return null

    const absAmount = Math.abs(amount)

    // Format number based on the scale
    const formatValue = (num: number) => {
        const decimalPart = num % 1 // Check if there’s a fractional part
        return decimalPart > 0 ? parseFloat(num.toFixed(2)) : Math.floor(num) // Keep decimals only when meaningful
    }

    let formattedAmount

    if (absAmount >= 1e9) {
        formattedAmount = `${formatValue(amount / 1e9)}B` // Billion
    } else if (absAmount >= 1e6) {
        formattedAmount = `${formatValue(amount / 1e6)}M` // Million
    } else {
        // Start abbreviation at K (thousand) even for amounts below 1,000
        formattedAmount = `${formatValue(amount / 1e3)}K` // Thousand
    }

    return `${formattedAmount}`
}

/**
 * Removes nullable or empty keys from an object or array recursively.
 * This function processes nested structures and ensures no null, undefined, or empty string values remain.
 *
 * Example:
 * Input: { name: "John", age: null, details: { address: "", phone: "12345" } }
 * Output: { name: "John", details: { phone: "12345" } }
 *
 * Input: [null, "", { key: undefined, value: "data" }]
 * Output: [{ value: "data" }]
 *
 * @template T
 * @param {T} obj - The object or array to be cleaned.
 * @returns {T} - A new object or array with nullable and empty keys removed. Returns `null` if the result is empty.
 */
export const removeEmptyKeys = <T>(obj: T): T => {
    if (Array.isArray(obj)) {
        // Recursively process each item in the array
        const filteredArray = obj.map((item) => removeEmptyKeys(item)).filter((item) => item !== null && item !== undefined && item !== "")
        return filteredArray.length > 0 ? (filteredArray as T) : (null as T)
    }
    if (typeof obj === "object" && obj !== null) {
        const cleanedObject: Record<string, Any> = {}

        Object.entries(obj).forEach(([key, value]) => {
            const cleanedValue = removeEmptyKeys(value)
            if (cleanedValue !== null && cleanedValue !== undefined && cleanedValue !== "") {
                cleanedObject[key] = cleanedValue
            }
        })
        // Return null if the object is empty after cleaning
        return Object.keys(cleanedObject).length > 0 ? (cleanedObject as T) : (null as T)
    }
    // For non-object types, remove empty strings, null, and undefined
    if (obj === null || obj === undefined || obj === "") {
        return null as T
    }
    return obj
}

/**
 * Displays a confirmation dialog using SweetAlert2 with customizable options.
 * The dialog allows users to confirm or cancel an action, with optional routing on cancellation.
 *
 * @param {Object} options - Configuration options for the confirmation dialog.
 * @param {string} [options.title="Do you want to save your progress?"] - The title of the dialog.
 * @param {string} [options.text="If you choose to discard, you will lose all values entered so far."] - The message body of the dialog.
 * @param {SweetAlertIcon} [options.icon="warning"] - The icon type for the dialog (e.g., "warning", "error", "info").
 * @param {string} [options.confirmButtonText="Save Draft"] - The text displayed on the confirm button.
 * @param {string} [options.cancelButtonText="Discard Opportunity"] - The text displayed on the cancel button.
 * @param {string} [options.confirmButtonColor="#6e7881"] - The color of the confirm button.
 * @param {string} [options.cancelButtonColor="#7066e0"] - The color of the cancel button.
 * @param {() => void} [options.onConfirm] - The callback function to execute when the confirm button is clicked.
 * @param {string} options.path - The navigation path to redirect to when the cancel button is clicked.
 * @param {Any} options.router - The router instance used for navigation.
 *
 * @returns {Promise<void>} - Resolves when the dialog interaction completes.
 */
export const showConfirmationDialog = async ({
    title = CONFIG.CONFIRMATION_DIALOG_CONSTANTS.TITLE,
    text = CONFIG.CONFIRMATION_DIALOG_CONSTANTS.TEXT,
    confirmButtonText = CONFIG.CONFIRMATION_DIALOG_CONSTANTS.CONFIRM_BUTTON_TEXT,
    cancelButtonText = CONFIG.CONFIRMATION_DIALOG_CONSTANTS.CANCEL_BUTTON_TEXT,
    icon = "warning",
    confirmButtonColor = "#6e7881 ",
    cancelButtonColor = "#7066e0",
    onConfirm,
    path,
    router,
}: ShowConfirmationModalType) => {
    const result = await Swal.fire({
        title,
        text,
        icon,
        reverseButtons: true,
        showCancelButton: true,
        confirmButtonColor,
        cancelButtonColor,
        confirmButtonText,
        cancelButtonText,
    })

    if (result.isConfirmed) {
        onConfirm && onConfirm()
    } else if (result.dismiss === Swal.DismissReason.cancel) {
        router.push(path)
    }
}

/**
 * Displays a success confirmation dialog using SweetAlert2 with customizable options.
 * The dialog allows users to acknowledge the success, with an optional cancel button.
 *
 * @param {Object} options - Configuration options for the success dialog.
 * @param {string} [options.title="Success!"] - The title of the dialog.
 * @param {string} [options.text="Your action was completed successfully."] - The message body of the dialog.
 * @param {SweetAlertIcon} [options.icon="success"] - The icon type for the dialog (e.g., "success", "info").
 * @param {string} [options.confirmButtonText="OK"] - The text displayed on the confirm button.
 * @param {string} [options.cancelButtonText="Cancel"] - The text displayed on the cancel button.
 * @param {string} [options.confirmButtonColor="#006937"] - The color of the confirm button.
 * @param {string} [options.cancelButtonColor="#6e7881"] - The color of the cancel button.
 * @param {() => void} [options.onConfirm] - The callback function to execute when the confirm button is clicked.
 * @param {Any} options.router - The router instance used for navigation if the confirm button is clicked.
 * @param {string} [options.path] - The navigation path to redirect to when the confirm button is clicked.
 *
 * @returns {Promise<void>} - Resolves when the dialog interaction completes.
 */
export const showSuccessDialog = async ({
    title = "Success!",
    text = "Your action was completed successfully.",
    icon = "success",
    confirmButtonText = "OK",
    cancelButtonText = "Cancel",
    cancelButtonColor = "#6e7881",
    confirmButtonColor = "#006937",
    onConfirm,
    router,
    path,
}: SuccessDialogOptions) => {
    const result = await Swal.fire({
        title,
        text,
        icon,
        showCancelButton: true,
        confirmButtonColor,
        cancelButtonColor,
        confirmButtonText,
        cancelButtonText,
    })

    if (result.isConfirmed) {
        // If confirm button is clicked, route the user
        if (onConfirm) {
            await onConfirm() // Execute the onConfirm callback if provided
        }
        if (path && router) {
            router.push(path) // Redirect to the provided path
        }
    } else if (result.dismiss === Swal.DismissReason.cancel) {
        // If cancel button is clicked, just close the SweetAlert without further action
        Swal.close()
    }
}

/**
 * Calculates the number of days left until the given start date, but only if the start date is in the future.
 * Returns 0 if the start date is in the past or invalid.
 *
 * @param {Any} startDate - The start date to calculate the difference from. This can be a date string or a Date object.
 *
 * @returns {number} - The number of days remaining as a positive integer, or 0 if the start date is invalid or in the past.
 *
 * @example
 * const daysLeft = calculateDaysLeft("2025-01-10");
 * console.log(daysLeft); // Output: 10 (if today's date is "2025-01-01")
 */
export const calculateDaysLeft = (startDate: Any): number => {
    const endDate = dayjs() // Get today's date using Day.js

    // Ensure startDate is a valid Day.js object or a valid date string
    const start = dayjs(startDate)

    // Check if the start date is valid and in the future
    if (!start.isValid() || start.isBefore(endDate, "day")) {
        return 0
    }

    // Calculate the difference in days between the start date and today
    const diffDays = start.diff(endDate, "day") // Returns the difference in days

    // Return only positive value or 0 if the start date is in the past
    return diffDays
}

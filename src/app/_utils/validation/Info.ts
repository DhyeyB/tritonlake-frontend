import { CONFIG } from "../Constants"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const validateDurationFieldNumericValue = (value: any) => {
    if (value && value.trim().length > 0) {
        return value?.match(/^\d+$/)
    }
    if (parseInt(value) > CONFIG.MAX_INT_LIMIT) {
        return false
    }
    return true
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const validateOrderFieldNumericValue = (value: any) => {
    if (value && value?.trim().length > 0) {
        return value?.match(/^\d+$/)
    }
    return true
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const validateOrderFieldMaxValue = (value: any) => {
    if (value && value?.trim().length > 0) {
        if (parseInt(value) > CONFIG.MAX_ORDER_LIMIT) {
            return false
        }
        return true
    }
    return true
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const validateDurationFieldValidRange = (value: any) => {
    if (value && value.trim().length > 0) {
        const numericalValue = parseInt(value)
        if (numericalValue > CONFIG.MAX_INT_LIMIT || numericalValue < 0) {
            return false
        }
    }
    return true
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const validateNumericValue = (value: any) => {
    if (value && value.trim().length > 0) {
        return value?.match(/^\d+$/)
    }
    return true
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const validateURLValue = (value: any) => {
    if (value && value.trim().length > 0) {
        return value?.match(/^(https?|ftps?):\/\/(www\.)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,3}(\/[^\s]*)?$/)
    }
    return true
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const validateURLValueWithoutProtocol = (value: any) => {
    if (value && value.trim().length > 0) {
        return value?.match(/^(www\.)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,3}(\/[^\s]*)?$/)
    }
    return true
}

/**
 * Validates whether a given value is a valid numeric value, allowing both integers and decimal numbers.
 *
 * - The function checks if the value is a non-empty string and verifies if it is a valid number using a regular expression.
 * - The regex pattern allows numbers with optional decimal points and handles leading zeros.
 *
 * @param {any} value - The value to be validated, typically a string.
 * @returns {boolean} Returns true if the value is a valid number (integer or decimal); otherwise, false.
 *
 * @example
 * validateNumericValue("123"); // true
 * validateNumericValue("123.456"); // true
 * validateNumericValue("0.456"); // true
 * validateNumericValue("-123.456"); // true
 * validateNumericValue("+123"); // true
 * validateNumericValue("123."); // false
 * validateNumericValue("abc"); // false
 * validateNumericValue(""); // false
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const validateDecimalValue = (value: any): boolean => {
    // Trim whitespace and check if the value is non-empty
    if (!value || value.trim().length === 0) {
        return false // Reject empty values
    }

    // Match numbers, allowing optional decimal points and leading/trailing zeros
    return /^[+-]?\d+(\.\d+)?$/.test(value)
}

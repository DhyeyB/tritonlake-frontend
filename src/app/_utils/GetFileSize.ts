import { FILE_SIZE_TYPE } from "./Constants"

export const fileSizeValue = (file: File) => {
    // if size is greater than 10mb
    if (file.size > 10 * FILE_SIZE_TYPE.MB) return Number((file.size / 1000).toFixed(2))
    return Number((file.size / 1024).toFixed(2))
}

export const formatFileSize = (fileSizeValueInKb: number) => {
    if (fileSizeValueInKb > 1024) {
        return `${(fileSizeValueInKb / 1000).toFixed(2)} mb`
    }
    return `${fileSizeValueInKb.toFixed(2)} kb`
}

export const convertBytesToMb = (fileSizeBytes: number) => {
    const fileSizeMb = fileSizeBytes / (1024 * 1024) // Convert bytes to MB (1024 bytes/KB * 1024 KB/MB)
    return Number(fileSizeMb.toFixed(2))
}

export const convertBytesToKB = (fileSizeBytes: number) => {
    const fileSizeMb = fileSizeBytes / 1024 // Convert bytes to MB (1024 bytes/KB * 1024 KB/MB)
    return Number(fileSizeMb.toFixed(2))
}

/**
 * Convert a value in megabytes to gigabytes.
 *
 * @param {number} megabytes - The size in megabytes (MB) to be converted.
 * @returns {number} The size in gigabytes (GB).
 */
export const convertMbToGb = (megabytes: number) => {
    // There are 1024 megabytes in a gigabyte
    const MB_TO_GB_CONVERSION_FACTOR = 1024
    // Perform the conversion by dividing the megabytes by the conversion factor
    const gigabytes = megabytes / MB_TO_GB_CONVERSION_FACTOR
    return gigabytes
}

/**
 * Converts a given file size in megabytes (MB) to bytes.
 *
 * @param {number} fileSize - The file size in megabytes to be converted.
 * @returns {number} - The equivalent file size in bytes, rounded to two decimal places.
 */
export const convertMBToBytes = (fileSize: number): number => {
    const fileSizeinBytes = fileSize * (1024 * 1024)
    return Number(fileSizeinBytes.toFixed(2))
}

/**
 * Converts a given file size in kilobytes (KB) to bytes.
 *
 * @param {number} fileSize - The file size in kilobytes to be converted.
 * @returns {number} - The equivalent file size in bytes, rounded to two decimal places.
 */
export const convertKBToBytes = (fileSize: number): number => {
    const fileSizeinBytes = fileSize * 1024
    return Number(fileSizeinBytes.toFixed(2))
}

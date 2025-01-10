import { FetchHelper } from "../_services/FetchHelper"
import { AssetImage } from "../_types/common/ImageEdit"
import { CONFIG } from "./Constants"

export const readFileAsDataURL = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => resolve(reader.result as string)
        reader.onerror = (error) => reject(error)
    })
}

export const loadImage = (src: string): Promise<HTMLImageElement> => {
    return new Promise((resolve, reject) => {
        const img = new Image()
        img.onload = () => resolve(img)
        img.onerror = (error) => reject(error)
        img.src = src
    })
}

/**
 * Uploads an image file to S3 and returns the response from the server along with the file.
 * If the file is an image, the file will be returned as an HTMLImageElement.
 * For other file types, the file will be returned as a File.
 *
 * @param {File} file - The file to be uploaded.
 * @param {number} [duration] - The duration of the video file, if applicable.
 * @returns {Promise<AssetImage | null>}
 * - A promise that resolves to an object containing the file upload response and the file,
 *   or null if an error occurs.
 */
export const uploadImage = async (file: File): Promise<AssetImage> => {
    if (!file.type.startsWith(CONFIG.FILE_TYPE_NAME.IMAGE)) throw new Error(JSON.stringify({ error: CONFIG.MESSAGES.INVALID_FILE_TYPE }))
    // if the file is image then we require height and width
    const dataURL = await readFileAsDataURL(file)
    const img = await loadImage(dataURL)
    const { width, height } = img
    const response = await FetchHelper.post(CONFIG.API_ENDPOINTS.IMAGES, {
        name: file.name,
        size: file.size,
        width,
        height,
    })
    // get the pre-signed url from response and upload image
    await FetchHelper.putFileData(response?.pre_signed_url, file, file.type)
    // verify image was uploaded successfully
    const url = new URL(`${CONFIG.API_ENDPOINTS.IMAGES}/${response?.image?.id}`)
    const imageUploadResponse = await FetchHelper.patch(url, {
        uploaded: true,
        token: response?.image?.token,
    })
    return imageUploadResponse
}

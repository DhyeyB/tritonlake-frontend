import { CONFIG, OPEN_ENDPOINTS } from "@/app/_utils/Constants"
import { removeAuthTokenExp } from "@/app/_utils/Helpers"
import axios from "axios"
import mem from "mem"
import { parseResponseError } from "./FetchHelper"

const getAccessToken = () => {
    if (typeof window !== "undefined" && localStorage) {
        const accessToken = localStorage.getItem(CONFIG.LOCAL_STORAGE_VARIABLES.ACCESS_TOKEN)
        return accessToken
    }
    return null
}
/**
 * Memoized function to refresh the access token using a refresh token stored in local storage.
 * It retrieves a new access token and refresh token from the API and updates the local storage with the new tokens.
 * If the refresh token request fails, it throws an error with the generated error message and status code.
 *
 * @function
 * @async
 *
 * @returns {Promise<Object>} The response data containing the new access and refresh tokens.
 *
 * @throws {Object} Throws an object containing an error with the generated error message and the status code.
 *
 *
 */
const refreshToken = mem(
    async () => {
        try {
            const url = CONFIG.API_ENDPOINTS.REFRESH_TOKEN
            const refreshToken = localStorage.getItem(CONFIG.LOCAL_STORAGE_VARIABLES.REFRESH_TOKEN)
            delete axios.defaults.headers.common["Authorization"]
            const response = await axios.post(
                url.toString(),
                {
                    refresh: refreshToken,
                },
                { headers: { "Content-Type": "application/json" } },
            )
            if (response.data) {
                localStorage.setItem(CONFIG.LOCAL_STORAGE_VARIABLES.ACCESS_TOKEN, response.data.access)
                localStorage.setItem(CONFIG.LOCAL_STORAGE_VARIABLES.REFRESH_TOKEN, response.data.refresh)
                return response.data
            }
            window.location.replace("/")
            return null
        } catch (_refreshError) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const refreshError = _refreshError as any
            const generatedError = new Error(parseResponseError(refreshError.response.data as Response))
            removeAuthTokenExp()
            window.location.replace("/")
            throw { error: generatedError, status: refreshError.response.status }
        }
    },
    { maxAge: CONFIG.REFRESH_TOKEN_MEMOIZED_TIME },
)

export const axiosInstance = axios.create({
    headers: {
        "Content-Type": "application/json",
    },
})

axiosInstance.interceptors.request.use((config) => {
    if (!OPEN_ENDPOINTS.includes(config.url as string)) {
        const accessToken = getAccessToken()
        config.headers["Authorization"] = `Bearer ${accessToken}`
    }
    return config
})

axiosInstance.interceptors.response.use(
    (response) => {
        if (response.status === CONFIG.STATUS_CODES.NO_CONTENT) {
            return { status_code: CONFIG.STATUS_CODES.NO_CONTENT }
        } else return response.data
    },
    async (error) => {
        if (error.response) {
            const status = error.response.status

            if (status === CONFIG.STATUS_CODES.UNAUTHORIZED && !OPEN_ENDPOINTS.includes(error.response.url)) {
                // get new access token
                const data = await refreshToken()
                axios.defaults.headers.common["Authorization"] = "Bearer " + data.access
                const originalRequest = error.config
                originalRequest.headers["Authorization"] = "Bearer " + data.access
                try {
                    return (await axios(originalRequest)).data
                } catch (e) {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    const _refreshTokenError = e as any
                    const _error = new Error(parseResponseError(_refreshTokenError.response.data))
                    throw { error: _error, status: _refreshTokenError.response.status }
                }
            } else if (status === CONFIG.STATUS_CODES.NOT_FOUND) {
                // Handle 404 error
                throw { error: CONFIG.MESSAGES.NOT_FOUND, status }
            } else if (status === CONFIG.STATUS_CODES.SERVER_ERROR) {
                // Handle server errors
                throw { error: CONFIG.MESSAGES.NOT_FOUND, status }
            } else if (error.config.url === CONFIG.API_ENDPOINTS.BULK_UPLOADS.href) {
                throw { error: error.response.data, status }
            } else {
                const _error = new Error(parseResponseError(error?.response?.data))
                if (_error) {
                    throw { error: _error, status }
                } else {
                    throw {
                        error: CONFIG.MESSAGES.GENERIC_ERROR,
                        status: CONFIG.STATUS_CODES.SERVER_ERROR,
                    }
                }
            }
        } else {
            // Handle network or other errors
            throw { error: CONFIG.MESSAGES.GENERIC_ERROR, status: CONFIG.STATUS_CODES.SERVER_ERROR }
        }
    },
)

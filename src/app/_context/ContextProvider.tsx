import React, { useEffect, useMemo, useState, ReactNode } from "react"
import { FetchHelper } from "../_services/FetchHelper"
import { CONFIG } from "../_utils/Constants"
import { handleError } from "../_utils/Helpers"
import { AnyObject } from "../_types/common/Common"
import { AppContext } from "./Context"

const ContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [userDetail, setUserDetail] = useState<AnyObject>()
    const [sidebarOpen, setSidebarOpen] = useState(true)

    // Fetch user details from the API
    const getUserDetail = async () => {
        try {
            const response = await FetchHelper.get(CONFIG.API_ENDPOINTS.USER_INFO)
            if (response.agent) {
                setUserDetail(response.agent)
                localStorage.setItem(CONFIG.LOCAL_STORAGE_VARIABLES.USER_DETAILS, JSON.stringify(response.agent))
            } else {
                throw response
            }
        } catch (error) {
            handleError(error)
        }
    }

    // Initialize user details and sync with localStorage
    useEffect(() => {
        const cachedDetails = localStorage.getItem(CONFIG.LOCAL_STORAGE_VARIABLES.USER_DETAILS)
        if (cachedDetails) {
            setUserDetail(JSON.parse(cachedDetails))
        }

        getUserDetail() // Fetch latest data from the API

        const handleStorageChange = (event: StorageEvent) => {
            if (event.key === CONFIG.LOCAL_STORAGE_VARIABLES.USER_DETAILS) {
                const newDetails = localStorage.getItem(event.key)
                if (newDetails) {
                    setUserDetail(JSON.parse(newDetails))
                }
            }
        }

        window.addEventListener("storage", handleStorageChange)
        return () => window.removeEventListener("storage", handleStorageChange)
    }, [])

    // Toggle sidebar open state
    const toggleSidebar = () => setSidebarOpen((prev) => !prev)

    // Memoize context value
    const contextValue = useMemo(
        () => ({
            userDetail,
            sidebarOpen,
            getUserDetail,
            setUserDetail,
            toggleSidebar,
        }),
        [userDetail, sidebarOpen],
    )

    return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
}

export default ContextProvider

import React, { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { DashboardSvgIcon } from "../svg/DashboardSvgIcon"
import useCustomTimeout from "@/app/_hooks/useCustomTimeout"
import { CONFIG, OPPORTUNITY } from "@/app/_utils/Constants"
import { handleError, showSuccessDialog } from "@/app/_utils/Helpers"
import { FetchHelper } from "@/app/_services/FetchHelper"
import { showSweetAlertWithRedirect } from "@/app/_utils/Common"
const OpportunityActionsDropdown = () => {
    const router = useRouter()
    const [showDropdown, setShowDropdown] = useState(false)
    const params = useParams()
    const { setCustomTimeout, removeCustomTimeout } = useCustomTimeout()

    const handleArchive = async () => {
        const PAYLOAD = {
            status: OPPORTUNITY.STATUS_ARCHIVED,
        }
        const RequestHelper = FetchHelper.patch
        const url = new URL(`${CONFIG.API_ENDPOINTS.OPPORTUNITY.LIST}/${params?.id}`)
        try {
            const response = await RequestHelper(url, PAYLOAD)
            if (response?.status) {
                showSuccessDialog({
                    path: CONFIG.REDIRECT_PATHNAME.OPPORTUNITIES,
                    router,
                    title: "Opportunity Archived",
                    text: "This Opportunity has been archived",
                    cancelButtonText: "Cancel",
                    confirmButtonText: "Go to Opportunities",
                })
            }
        } catch (error) {
            handleError(error)
        }
    }

    const handleClone = async () => {
        const RequestHelper = FetchHelper.post
        const url = new URL(`${CONFIG.API_ENDPOINTS.OPPORTUNITY.CLONE}`)
        try {
            const response = await RequestHelper(url, { opportunity: params?.id })
            if (response?.status) {
                showSuccessDialog({
                    path: CONFIG.REDIRECT_PATHNAME.OPPORTUNITIES,
                    router,
                    title: "Opportunity Cloned",
                    text: "This Opportunity is cloned. Click below to go to the Cloned Opportunity",
                    cancelButtonText: "Cancel",
                    confirmButtonText: "Go to Opportunities",
                })
            }
        } catch (error) {
            handleError(error)
        }
    }

    const handleDelete = async () => {
        showSuccessDialog({
            router,
            icon: "warning",
            title: "Are you sure?",
            text: "Do you really want to delete this opportunity?",
            cancelButtonText: "Cancel",
            confirmButtonText: "Yes, Delete Opportunity",
            onConfirm: async () => {
                const RequestHelper = FetchHelper.delete
                const url = new URL(`${CONFIG.API_ENDPOINTS.OPPORTUNITY.LIST}/${params?.id}`)
                try {
                    const response = await RequestHelper(url, {})
                    if (response?.status_code === CONFIG.STATUS_CODES.NO_CONTENT) {
                        showSweetAlertWithRedirect({
                            message: "Opportunity deleted successfully",
                            icon: "success",
                            url: CONFIG.REDIRECT_PATHNAME.OPPORTUNITIES,
                            router,
                        })
                    }
                } catch (error) {
                    handleError(error)
                }
            },
        })
    }

    return (
        <div
            className="cursor-pointer symbol symbol-30px symbol-md-40px"
            data-kt-menu-trigger="{default: 'click', lg: 'hover'}"
            data-kt-menu-attach="parent"
            data-kt-menu-placement="bottom-end"
            onMouseEnter={() => {
                setShowDropdown(true)
            }}
            onMouseLeave={() => {
                setCustomTimeout(CONFIG.USER_MENU_TIMEOUT, () => setShowDropdown(false))
            }}
        >
            <button className="btn btn-sm btn-bg-light btn-active-color-primary fs-8 p-2">
                <DashboardSvgIcon />
            </button>
            {showDropdown && (
                <div
                    className="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-800 menu-state-bg menu-state-color fw-semibold py-4 fs-6 w-200px show custom-show-opportunity-action-dropdown"
                    onMouseEnter={() => {
                        removeCustomTimeout(() => setShowDropdown(true))
                    }}
                    onMouseLeave={() => setShowDropdown(false)}
                >
                    <div className="menu-item px-3">
                        <button className="btn bg-white menu-link fs-6 px-3" onClick={handleArchive}>
                            Archive
                        </button>
                        <button className="btn bg-white menu-link fs-6 px-3" onClick={handleClone}>
                            Clone
                        </button>
                        <button className="btn bg-white menu-link fs-6 px-3 text-danger menu-link" onClick={handleDelete}>
                            Delete Opportunity
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default OpportunityActionsDropdown

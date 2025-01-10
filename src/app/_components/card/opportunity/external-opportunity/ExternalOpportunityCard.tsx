import { Any } from "@/app/_types/common/Common"
import { calculateDaysLeft, formatCurrencyWithAbbreviation, formatString, getStatusBadgeTitle, getStatusClassName, handleError, showSweetAlert } from "@/app/_utils/Helpers"
import { useRouter } from "next/navigation"
import React, { useState } from "react"
import { CenteredIcon } from "../../../svg/CenteredSvgIcon"
import DeclineOpportunityModal from "./DeclineOpportunityModal"
import { performExternalOpportunityAction } from "@/app/_utils/PerformExternalOpportunityAction"
import { SweetAlertIcon } from "sweetalert2"
import { CONFIG, EXTERNAL_OPPORTUNITY } from "@/app/_utils/Constants"
import { showSweetAlertWithRedirect } from "@/app/_utils/Common"

const ExternalOpportunityCard = ({ externalOpportunityItem, getExternalOpportunityListing }: Any) => {
    const [showDeclineModal, setShowDeclineModal] = useState<boolean>(false)
    const [rejectionReasonType, setRejectionReasonType] = useState<string>("")
    const [rejectionReason, setRejectionReason] = useState<string>("")
    const [loading, setLoading] = useState<boolean>(false)
    const { opportunity } = externalOpportunityItem
    const router = useRouter()

    // Declined opportunity action
    const handleDeclinedOpportunity = async () => {
        setLoading(true)
        const PAYLOAD = { rejection_reason_type: rejectionReasonType, rejection_reason: rejectionReason }
        try {
            const response = await performExternalOpportunityAction(externalOpportunityItem?.id, "declined", PAYLOAD)
            if (response) {
                showSweetAlertWithRedirect({
                    message: CONFIG.MESSAGES.EXTERNAL_OPPORTUNITY.DECLINED,
                    icon: CONFIG.SWEETALERT_SUCCESS_OPTION.icon as SweetAlertIcon,
                    router,
                    url: CONFIG.REDIRECT_PATHNAME.EXTERNAL_OPPORTUNITIES,
                })
                setRejectionReasonType("")
                setRejectionReason("")
                setLoading(false)
                setShowDeclineModal(false)
                getExternalOpportunityListing()
            }
        } catch (error) {
            handleError(error)
            setLoading(false)
        }
    }
    // Accept opportunity action
    const handleAcceptOpportunity = async () => {
        setLoading(true)
        try {
            const response = await performExternalOpportunityAction(externalOpportunityItem?.id, "accepted")
            if (response) {
                showSweetAlert(CONFIG.MESSAGES.EXTERNAL_OPPORTUNITY.INTEREST_REGISTERED, CONFIG.SWEETALERT_SUCCESS_OPTION.icon as SweetAlertIcon)
                setLoading(false)
                getExternalOpportunityListing()
            }
        } catch (error) {
            handleError(error)
            setLoading(false)
        }
    }

    // Pinned opportunity action
    const handlePinOpportunity = async () => {
        setLoading(true)
        try {
            const response = await performExternalOpportunityAction(externalOpportunityItem?.id, "pinned", {}, true)
            if (response) {
                showSweetAlert(CONFIG.MESSAGES.EXTERNAL_OPPORTUNITY.PINNED, CONFIG.SWEETALERT_SUCCESS_OPTION.icon as SweetAlertIcon)
                setLoading(false)
                getExternalOpportunityListing()
            }
        } catch (error) {
            handleError(error)
            setLoading(false)
        }
    }

    // Pinned opportunity action
    const handleRemovePinnnedOpportunity = async () => {
        setLoading(true)
        try {
            const response = await performExternalOpportunityAction(externalOpportunityItem?.id, "pinned", {}, false)
            if (response) {
                showSweetAlert(CONFIG.MESSAGES.EXTERNAL_OPPORTUNITY.UNPINNED, CONFIG.SWEETALERT_SUCCESS_OPTION.icon as SweetAlertIcon)
                setLoading(false)
                getExternalOpportunityListing()
            }
        } catch (error) {
            handleError(error)
            setLoading(false)
        }
    }

    return (
        <>
            <DeclineOpportunityModal
                showDeclineModal={showDeclineModal}
                setShowDeclineModal={setShowDeclineModal}
                rejectionReasonType={rejectionReasonType}
                rejectionReason={rejectionReason}
                setRejectionReasonType={setRejectionReasonType}
                setRejectionReason={setRejectionReason}
                handleSendReason={handleDeclinedOpportunity}
                isLoading={loading}
            />
            <div className="col-sm-6 col-xl-3 mb-xl-3">
                <div className="flip-card">
                    <div className={`flip-card-inner ${EXTERNAL_OPPORTUNITY.ACTIONS_ARRAY.includes(externalOpportunityItem?.status) ? "no-flip" : ""}`}>
                        <div className="flip-card-front">
                            <a onClick={() => router.push(`/opportunities/opportunity-details/${externalOpportunityItem?.id}?page=external`)} className="card h-lg-100 opportunity-card cursor-pointer">
                                <div className="card-body d-flex justify-content-between align-items-start flex-column p-5">
                                    <img src={opportunity?.cover?.original} alt="Cover Image" className="w-100 rounded" />
                                    <span className={`badge ${getStatusClassName(externalOpportunityItem?.status)} position-absolute text-uppercase opportunity-status`}>
                                        {getStatusBadgeTitle(externalOpportunityItem?.status)}
                                    </span>
                                    <span className="badge badge-dark position-absolute text-uppercase" id="days-left">
                                        {calculateDaysLeft(opportunity?.estimated_close_date) > 1
                                            ? `${calculateDaysLeft(opportunity?.estimated_close_date)} days left`
                                            : `${calculateDaysLeft(opportunity?.estimated_close_date)} day left`}
                                    </span>
                                    <div className="d-flex flex-column mt-7 mb-2">
                                        <span className="fw-bold fs-4 text-gray-800 lh-1 ff-playfair">{opportunity?.name ? opportunity?.name : "-"}</span>
                                    </div>

                                    <div>
                                        <div className="mt-5">
                                            <span className="fw-semibold fs-8">{opportunity?.short_description ?? "-"}</span> <br />
                                            <span className=" fs-8 text-gray-500">{opportunity?.sponsor_name ?? "-"}</span>
                                        </div>
                                    </div>

                                    <div className="d-flex">
                                        <span className="svg-icon svg-icon-primary svg-icon-2x">
                                            <CenteredIcon />
                                        </span>
                                        <p className="mx-3 fs-8">
                                            {" "}
                                            Target Raise / On Matrix <br />{" "}
                                            {opportunity?.fundraising?.target_raise && (
                                                <span className="fw-bold fs-8">
                                                    {`${opportunity?.currency?.symbol} `}
                                                    {opportunity?.fundraising?.target_raise ? formatCurrencyWithAbbreviation(opportunity?.fundraising?.target_raise) : "-"} /{" "}
                                                    {opportunity?.target?.amount ? formatCurrencyWithAbbreviation(opportunity?.target?.amount) : "-"}
                                                </span>
                                            )}{" "}
                                        </p>
                                    </div>
                                    <div className="d-flex mt-5 w-100">
                                        <div className="border border-gray-300 border-dashed rounded min-w-100px w-100 py-2 px-2 mb-3 me-6">
                                            <div className="fw-semibold text-gray-500 fs-8">Placement fee</div>
                                            <span className="fs-8 text-gray-700 fw-bold">{opportunity?.placement?.fee ? `${parseFloat(opportunity?.placement?.fee)}%` : "-"}</span>
                                        </div>
                                        <div className="border border-gray-300 border-dashed rounded min-w-100px w-100 py-2 px-2 mb-3">
                                            <div className="fw-semibold text-gray-500 fs-8">Originator</div>
                                            <span className="fs-8 text-gray-700 fw-bold">{opportunity?.firm?.name ?? "-"}</span>
                                        </div>
                                    </div>
                                </div>
                            </a>
                        </div>
                        <div className="flip-card-back">
                            <div className="card-body d-flex flex-column justify-content-between p-5 text-center">
                                <div>
                                    <h4 className="text-center">{opportunity?.name ?? "-"}</h4>
                                    <h6 className="text-muted text-center">{opportunity?.investment_type?.name ? formatString(opportunity?.investment_type?.name) : "-"}</h6>
                                    <p>{opportunity?.short_description ?? "-"}</p>
                                </div>
                                <div>
                                    {externalOpportunityItem && externalOpportunityItem?.pinned ? (
                                        <button className="btn btn-sm btn-info rounded-0 mt-4 w-100 pin-opp" onClick={handleRemovePinnnedOpportunity} disabled={loading}>
                                            <i className="fa-solid fa-thumbtack text-white"></i>
                                            REMOVE PIN
                                        </button>
                                    ) : (
                                        <button className="btn btn-sm btn-outline rounded-0 mt-4 w-100 pin-opp" onClick={handlePinOpportunity} disabled={loading}>
                                            <i className="fa-solid fa-thumbtack text-dark"></i>
                                            PIN OPPORTUNITY
                                        </button>
                                    )}
                                    <a
                                        onClick={() => router.push(`/opportunities/opportunity-details/${externalOpportunityItem?.id}?page=external`)}
                                        className="btn btn-sm btn-primary rounded-0 mt-4 w-100 view-opp"
                                    >
                                        View Opportunity
                                    </a>
                                </div>
                                <button className="x-button" onClick={() => setShowDeclineModal(true)}>
                                    <i className="fa-solid fa-xmark"></i>
                                </button>
                                <button className="check-button" onClick={handleAcceptOpportunity}>
                                    <i className="fa-solid fa-check"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ExternalOpportunityCard

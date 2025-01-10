"use client"
import React, { useState } from "react"
import StickyHeaderComponent from "@/app/_components/common/StickySubHeader"
import OpportunityDetails from "@/app/_components/oppportunity/opportunity-details/OpportunityDetails"
import { CONFIG, EXTERNAL_OPPORTUNITY, OPPORTUNITY } from "@/app/_utils/Constants"
import { useParams, useRouter, useSearchParams } from "next/navigation"
import { Any } from "@/app/_types/common/Common"
import DeclineOpportunityModal from "@/app/_components/card/opportunity/external-opportunity/DeclineOpportunityModal"
import { performExternalOpportunityAction } from "@/app/_utils/PerformExternalOpportunityAction"
import { handleError, showSweetAlert } from "@/app/_utils/Helpers"
import { SweetAlertIcon } from "sweetalert2"
import Button from "@/app/_components/button/Button"
import { showSweetAlertWithRedirect } from "@/app/_utils/Common"
import OpportunityActionsDropdown from "@/app/_components/oppportunity/OpportunityActionDropdown"

const Layout = () => {
    const router = useRouter()
    const params = useParams()
    const searchParams = useSearchParams()
    const page = searchParams.get(EXTERNAL_OPPORTUNITY.PAGE)
    const [opportunityStatus, setOpportunityStatus] = useState("")
    const [interestedProposals, setInterestedProposals] = useState("")

    const [externalOpportunityItem, setExternalOpportunityItem] = useState<Any>()
    const [showDeclineModal, setShowDeclineModal] = useState<boolean>(false)
    const [rejectionReasonType, setRejectionReasonType] = useState<string>("")
    const [rejectionReason, setRejectionReason] = useState<string>("")
    const [loadingDecline, setLoadingDecline] = useState<boolean>(false)
    const [loadingAccept, setLoadingAccept] = useState<boolean>(false)
    const [loadingFundraise, setLoadingFundraise] = useState<boolean>(false)
    const [triggerDetailsApiCall, setTriggerDetailsApiCall] = useState<boolean>(false)

    // External opportunity actions --->
    // Declined opportunity action
    const handleDeclinedOpportunity = async () => {
        setLoadingDecline(true) // Set loading for decline action
        const PAYLOAD = { rejection_reason_type: rejectionReasonType, rejection_reason: rejectionReason }
        try {
            const response = await performExternalOpportunityAction(externalOpportunityItem?.id, "declined", PAYLOAD)
            if (response) {
                setRejectionReasonType("")
                setRejectionReason("")
                setLoadingDecline(false)
                setShowDeclineModal(false)
                showSweetAlertWithRedirect({
                    message: CONFIG.MESSAGES.EXTERNAL_OPPORTUNITY.DECLINED,
                    icon: CONFIG.SWEETALERT_SUCCESS_OPTION.icon as SweetAlertIcon,
                    router,
                    url: CONFIG.REDIRECT_PATHNAME.EXTERNAL_OPPORTUNITIES,
                })
            }
        } catch (error) {
            handleError(error)
            setLoadingDecline(false) // Set loading to false in case of error
        }
    }

    // Accept opportunity action
    const handleAcceptOpportunity = async () => {
        setLoadingAccept(true)
        try {
            const response = await performExternalOpportunityAction(externalOpportunityItem?.id, "accepted")
            if (response) {
                showSweetAlert(CONFIG.MESSAGES.EXTERNAL_OPPORTUNITY.INTEREST_REGISTERED, CONFIG.SWEETALERT_SUCCESS_OPTION.icon as SweetAlertIcon)
                setLoadingAccept(false)
                setTriggerDetailsApiCall((prev) => !prev)
            }
        } catch (error) {
            handleError(error)
            setLoadingAccept(false)
        }
    }

    // Fundraising opportunity action
    const handleFundraiseOpportunity = async () => {
        setLoadingFundraise(true)
        try {
            const response = await performExternalOpportunityAction(externalOpportunityItem?.id, "fundraising")
            if (response) {
                showSweetAlert(CONFIG.MESSAGES.EXTERNAL_OPPORTUNITY.MARK_FUNDRAISING, CONFIG.SWEETALERT_SUCCESS_OPTION.icon as SweetAlertIcon)
                setLoadingFundraise(false)
                setTriggerDetailsApiCall((prev) => !prev)
            }
        } catch (error) {
            handleError(error)
            setLoadingFundraise(false)
        }
    }
    // <--- External opportunity actions

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
                isLoading={loadingDecline}
            />
            <StickyHeaderComponent
                title={page == EXTERNAL_OPPORTUNITY.EXTERNAL ? "External Opportunity Details" : "Opportunity Details"}
                showBackArrow={true}
                showButton={true}
                backLink={page == EXTERNAL_OPPORTUNITY.EXTERNAL ? CONFIG.REDIRECT_PATHNAME.EXTERNAL_OPPORTUNITIES : CONFIG.REDIRECT_PATHNAME.OPPORTUNITIES}
            >
                {[OPPORTUNITY.STATUS_PENDING_DISTRIBUTION, OPPORTUNITY.STATUS_DISTRIBUTED].includes(opportunityStatus) && page !== EXTERNAL_OPPORTUNITY.EXTERNAL && (
                    <button
                        className="btn btn-secondary rounded-0 w-90 my-5 mx-2 text-uppercase fs-7"
                        onClick={() => {
                            router.push(`/opportunities/distribute/${params.id}`)
                        }}
                    >
                        DISTRIBUTE
                    </button>
                )}
                {params.id !== "preview" && page !== EXTERNAL_OPPORTUNITY.EXTERNAL && (
                    <button
                        className="btn btn-secondary rounded-0 w-90 my-5 mx-2 text-uppercase fs-7"
                        onClick={() => {
                            router.push(`/opportunities/edit-opportunity/${params.id}`)
                        }}
                    >
                        EDIT
                    </button>
                )}
                {opportunityStatus == OPPORTUNITY.STATUS_DISTRIBUTED && page !== EXTERNAL_OPPORTUNITY.EXTERNAL && (
                    <button
                        className="btn btn-secondary rounded-0 w-90 my-5 mx-2 text-uppercase fs-7 d-inline-flex align-items-center gap-2"
                        onClick={() => {
                            router.push(`/opportunities/interested/${params.id}`)
                        }}
                    >
                        View Interests <span className="badge badge-primary "> {interestedProposals} </span>
                    </button>
                )}

                {page !== EXTERNAL_OPPORTUNITY.EXTERNAL && <OpportunityActionsDropdown />}

                {page == EXTERNAL_OPPORTUNITY.EXTERNAL && externalOpportunityItem?.status !== EXTERNAL_OPPORTUNITY.ACTIONS.FUNDRAISING && (
                    <>
                        {externalOpportunityItem?.status == EXTERNAL_OPPORTUNITY.ACTIONS.ACCEPTED ? (
                            <Button title="Fundraise" loading={loadingFundraise} className="btn btn-primary rounded-0 w-90 my-5 mx-2 text-uppercase fs-7" onClick={handleFundraiseOpportunity} />
                        ) : (
                            <Button title="Register Interest" loading={loadingAccept} className="btn btn-primary rounded-0 w-90 my-5 mx-2 text-uppercase fs-7" onClick={handleAcceptOpportunity} />
                        )}
                        <button className="btn btn-light-danger rounded-0 w-90 my-5 mx-2 text-uppercase fs-7" onClick={() => setShowDeclineModal(true)}>
                            Decline
                        </button>{" "}
                    </>
                )}
            </StickyHeaderComponent>
            <div id="kt_app_content_container" className="app-container container-fluid">
                <div className="row mt-100">
                    <OpportunityDetails
                        triggerDetailsApiCall={triggerDetailsApiCall}
                        setOpportunityStatus={setOpportunityStatus}
                        externalOpportunityItem={externalOpportunityItem}
                        setExternalOpportunityItem={setExternalOpportunityItem}
                        setInterestedProposals={setInterestedProposals}
                    />
                </div>
            </div>
        </>
    )
}

export default Layout

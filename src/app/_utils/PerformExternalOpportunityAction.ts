import { FetchHelper } from "../_services/FetchHelper"
import { Any } from "../_types/common/Common"
import { CONFIG, EXTERNAL_OPPORTUNITY } from "./Constants"

const buildPayload = (rejectionReasonType: string, rejectionReason: string) => {
    const PAYLOAD: Record<string, Any> = {}
    if (rejectionReasonType) {
        PAYLOAD.rejection_reason_type = rejectionReasonType
    }
    if (rejectionReason) {
        PAYLOAD.rejection_reason = rejectionReason
    }
    return { ...PAYLOAD, status: EXTERNAL_OPPORTUNITY.ACTIONS.DECLINED }
}

// utils/performOpportunityAction.ts
export const performExternalOpportunityAction = async (
    external_opportunity_id: string,
    actionType: "accepted" | "pinned" | "declined" | "fundraising",
    additionalData: Any = {},
    isPinned?: boolean | null,
) => {
    try {
        const url = new URL(`${CONFIG.API_ENDPOINTS.DISTRIBUTE.OPPORTUNITY}/${external_opportunity_id}`)

        // Construct the payload based on the action type
        let PAYLOAD: Record<string, Any> = {}

        switch (actionType) {
            case EXTERNAL_OPPORTUNITY.ACTIONS.ACCEPTED:
                PAYLOAD = { status: EXTERNAL_OPPORTUNITY.ACTIONS.ACCEPTED }
                break
            case EXTERNAL_OPPORTUNITY.ACTIONS.PINNED:
                PAYLOAD.pinned = isPinned
                break
            case EXTERNAL_OPPORTUNITY.ACTIONS.DECLINED:
                PAYLOAD = buildPayload(additionalData.rejection_reason_type, additionalData.rejection_reason)
                break
            case EXTERNAL_OPPORTUNITY.ACTIONS.FUNDRAISING:
                PAYLOAD = { status: EXTERNAL_OPPORTUNITY.ACTIONS.FUNDRAISING }
                break
            default:
                throw new Error("Unknown action type")
        }

        // Make the PATCH request with the dynamically constructed payload
        const response = await FetchHelper.patch(url, PAYLOAD)

        // Return the response for further handling in the parent
        return response
    } catch (error) {
        console.error("Error during opportunity action:", error) // Log the error for debugging
        throw error // Rethrow the error to be handled in the parent
    }
}

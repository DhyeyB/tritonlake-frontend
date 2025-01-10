import React from "react"
import { Modal } from "react-bootstrap"
import TabBody from "../../../common/TabBody"
import TextAreaField from "../../../input/TextArea"
import Button from "../../../button/Button"

// DeclineOpportunityModal Props interface
interface DeclineOpportunityModalProps {
    showDeclineModal: boolean // controls modal visibility
    setShowDeclineModal: (show: boolean) => void // function to update visibility
    rejectionReasonType: string // controlled rejection reason type from parent
    rejectionReason: string // controlled rejection reason from parent
    setRejectionReasonType: (reason: string) => void // function to update rejectionReasonType
    setRejectionReason: (reason: string) => void // function to update rejectionReason
    handleSendReason: () => void // function that handles sending the reason
    isLoading: boolean //
}

const DeclineOpportunityModal: React.FC<DeclineOpportunityModalProps> = ({
    showDeclineModal,
    setShowDeclineModal,
    rejectionReasonType,
    rejectionReason,
    setRejectionReasonType,
    setRejectionReason,
    handleSendReason,
    isLoading,
}) => {
    // Handle the rejection reason type change
    const handleRejectionReasonTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setRejectionReasonType(e.target.value)
    }

    // Handle the custom rejection reason change
    const handleRejectionReasonChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setRejectionReason(e.target.value)
    }

    return (
        <Modal show={showDeclineModal} onHide={() => setShowDeclineModal(false)} size="lg">
            <Modal.Header closeButton className="my-3">
                <Modal.Title>Decline Opportunity</Modal.Title>
            </Modal.Header>

            <TabBody stopVh rowCount={12}>
                <div className="mb-5 mt-5 px-10">
                    <label className="fs-5 fw-semibold mb-2">Pass reason</label>
                    <select className="form-select form-select-solid" value={rejectionReasonType} onChange={handleRejectionReasonTypeChange}>
                        <option value="">Select a reason</option>
                        <option value="asset_class">Asset Class</option>
                        <option value="lack_of_interest">Lack of interest</option>
                        <option value="not_planned">Not planned</option>
                    </select>
                </div>

                <div className="mb-5 mt-5 px-10">
                    <TextAreaField className="form-control form-control-solid" label="Other (Optional)" value={rejectionReason} onChange={handleRejectionReasonChange} />
                </div>
            </TabBody>

            <Modal.Footer>
                <button type="button" className="btn btn-secondary text-uppercase fs-7 rounded-0" onClick={() => setShowDeclineModal(false)}>
                    Cancel
                </button>
                <Button
                    className="btn btn-primary fs-7"
                    disabled={rejectionReasonType.length == 0 || isLoading}
                    onClick={() => {
                        if (rejectionReasonType) {
                            handleSendReason()
                        } else {
                            alert("Please select a reason.")
                        }
                    }}
                    loading={isLoading}
                    title="Send Reason"
                />
            </Modal.Footer>
        </Modal>
    )
}

export default DeclineOpportunityModal

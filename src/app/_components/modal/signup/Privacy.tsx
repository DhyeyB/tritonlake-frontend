"use client"
import { DefaultModalPropType } from "@/app/_types/components/modal/Modal"
import { Modal } from "react-bootstrap"
import PrivacyContent from "../../content/PrivacyContent"
import { useState } from "react"

const PrivacyPolicy: React.FC<DefaultModalPropType> = ({ onClose, onAdded }) => {
    const [isButtonEnabled, setIsButtonEnabled] = useState(false)
    return (
        <>
            <Modal show={true} onHide={onClose} size="xl">
                <Modal.Header closeButton className="border-0"></Modal.Header>
                <PrivacyContent setIsButtonEnabled={setIsButtonEnabled} />
                <form
                    onSubmit={(e) => {
                        e.preventDefault()
                        onAdded?.(null)
                        onClose()
                    }}
                >
                    <div className={`modal-footer justify-content-center border-0 pb-15`}>
                        <button type="button" className="btn btn-light me-3" onClick={onClose}>
                            Cancel
                        </button>
                        <button type="submit" className="btn btn-primary custom-button-height" data-bs-dismiss="modal" disabled={!isButtonEnabled}>
                            I AGREE
                        </button>
                    </div>
                </form>
            </Modal>
        </>
    )
}

export default PrivacyPolicy

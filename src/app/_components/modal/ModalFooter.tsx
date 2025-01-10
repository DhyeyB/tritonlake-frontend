import { ModalFooterPropType } from "@/_types/components/modal/ModalFooter"
import { Spinner } from "react-bootstrap"

const ModalFooter: React.FC<ModalFooterPropType> = ({ isSubmitting, onClose, disabled = false, buttonTitle = "Save", customClass }) => {
    return (
        <div className={`modal-footer justify-content-center ${customClass}`}>
            <button type="button" className="btn btn-light me-3" onClick={onClose} disabled={disabled || isSubmitting}>
                Cancel
            </button>
            <button type="submit" className="btn btn-primary custom-button-height" data-bs-dismiss="modal" disabled={disabled || isSubmitting}>
                {isSubmitting ? <Spinner /> : buttonTitle}
            </button>
        </div>
    )
}

export default ModalFooter

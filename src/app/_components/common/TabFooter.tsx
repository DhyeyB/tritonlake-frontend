import { TabHeaderType } from "@/_types/common/Common"
import Link from "next/link"
import { Spinner } from "react-bootstrap"

const TabFooter: React.FC<TabHeaderType> = ({ isDisabled, isSubmitting, isDiscard, containerClassName }) => {
    return (
        <div className={`card-footer d-flex justify-content-end py-6 px-9 ${containerClassName || ""}`}>
            {isDiscard && (
                <Link href="/users">
                    <button type="button" className="btn btn-light btn-active-light-primary me-2">
                        Discard
                    </button>
                </Link>
            )}
            <button type="submit" className="btn btn-primary button-save-changes custom-button-height" disabled={!!isDisabled || isSubmitting}>
                {isSubmitting ? <Spinner /> : "Save Changes"}
            </button>
        </div>
    )
}

export default TabFooter

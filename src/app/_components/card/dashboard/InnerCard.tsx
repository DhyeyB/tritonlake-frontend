import { InnerCardProps } from "@/app/_types/common/InnerCard"
import { useState } from "react"

export const InnerCard: React.FC<InnerCardProps> = ({
    heading,
    subHeading,
    href,
    bgClass = "bg-white-100", // Default background class
    headerTextClass = "text-white", // Default text class
    subHeadingTextClass = "text-white", // Default text class
    isRemovable = false,
    setShowContainerCard,
    onClick,
}) => {
    // State to control visibility of the card
    const [isVisible, setIsVisible] = useState(true)

    // Function to handle the removal (hiding the card)
    const handleRemove = () => {
        setIsVisible(false) // Hide the card when the cross is clicked
        setShowContainerCard && setShowContainerCard(false) // Hide the card when the cross is clicked
    }

    // If the component is not visible, return null (i.e., do not render it)
    if (!isVisible) {
        return null
    }

    return (
        <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12 position-relative">
            <a href={href} className={`card card-stretch mb-xl-8 ${bgClass}`}>
                <div className="card-body d-flex align-items-center pt-1 pb-0">
                    <div className="d-flex flex-column flex-grow-1 py-2 py-lg-8 me-2" onClick={onClick}>
                        <h2 className={`fs-2x mb-2 ${headerTextClass}`}>{heading}</h2>
                        <span className={`fs-6 ${subHeadingTextClass}`}>{subHeading}</span>
                    </div>
                </div>
            </a>
            {isRemovable && (
                <i
                    className="fa-solid fa-xmark dismiss-action fs-4 cursor-pointer"
                    id="dismiss-setup-2fa"
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    // title="Remove Action"
                    onClick={handleRemove}
                ></i>
            )}
        </div>
    )
}

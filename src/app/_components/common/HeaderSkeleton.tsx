import { HeaderSkeletonProps } from "@/app/_types/common/HeaderSkeleton"

const HeaderSkeleton: React.FC<HeaderSkeletonProps> = ({ size, style, showImagePlaceholder = true, showSkeletonDetails = true, showSkeletonInfo = true, showBackButton = true }) => {
    return (
        <div className="skeleton-container" style={style}>
            {<div className={`${showBackButton && "skeleton-back-button"} p-4 mt-4`}></div>}
            <div className="skeleton-header">
                <div className="d-flex">
                    {showImagePlaceholder && (
                        <div
                            className="skeleton-image"
                            style={{
                                width: size?.split("x")?.[0] + "px",
                                height: size?.split("x")?.[1] + "px",
                            }}
                        ></div>
                    )}
                    <div className="w-50">
                        <div className="skeleton-title"></div>
                        {showSkeletonDetails && <div className="skeleton-details mt-5"></div>}
                        {showSkeletonInfo && (
                            <div className="skeleton-info-cards mt-3">
                                <div className="skeleton-info-card"></div>
                                <div className="skeleton-info-card"></div>
                                <div className="skeleton-info-card"></div>
                                <div className="skeleton-info-card"></div>
                                <div className="skeleton-info-card"></div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HeaderSkeleton

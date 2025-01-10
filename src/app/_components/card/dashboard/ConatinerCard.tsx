"use client"
import { ContainerCardProps } from "@/app/_types/common/ContainerCard"

export const ContainerCard: React.FC<ContainerCardProps> = ({ children, heading, subHeading }) => {
    return (
        <div className="card border-transparent front-dashboard" data-bs-theme="light">
            <div className="card-body d-flex ps-xl-15">
                <div className="m-0 col-lg-12">
                    <div className="position-relative fs-2x z-index-2 fw-bold text-white mb-7">
                        <span className="me-2 fs-3x ff-playfair">{heading}</span>
                        <p className="fs-6">{subHeading}</p>
                    </div>
                    <div className="row mt-5">{children}</div>
                </div>
            </div>
        </div>
    )
}

"use client"
import React from "react"

// Define the type for props
interface AddOpportunityCardProps {
    svgIcon: React.ReactNode // SVG icon as a React component or JSX
    title: string // Card title
    subtitle: string // Card subtitle
    buttonTitle: string // Button text
    routeLink: string // Button link
}

const AddOpportunityCard: React.FC<AddOpportunityCardProps> = ({ svgIcon, title, subtitle, buttonTitle, routeLink }) => {
    return (
        <div className="card h-lg-100">
            <div className="card-body d-flex justify-content-between align-items-start flex-column p-5">
                <div className="m-0">
                    <span className="svg-icon svg-icon-primary svg-icon-5x">{svgIcon}</span>
                </div>

                <div className="d-flex flex-column my-7">
                    <span className="fw-bold fs-4 text-gray-800 lh-1 ff-playfair">{title}</span>

                    <div className="mt-5">
                        <span className="fw-semibold fs-8">{subtitle}</span>
                    </div>
                </div>
            </div>

            <a href={routeLink} className="btn bg-black rounded-0 text-white w-90 mx-5 mb-5 text-uppercase">
                <span className="fs-7">{buttonTitle}</span>
            </a>
        </div>
    )
}

export default AddOpportunityCard

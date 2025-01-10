"use client"
import { CommonCardTypes } from "@/app/_types/common/Card"
import Link from "next/link"
import React from "react"

const AgentCard: React.FC<CommonCardTypes> = ({ imgSrc, altText, name, location }) => {
    return (
        <div className="d-flex align-items-center flex-row-fluid flex-wrap">
            <div className="symbol symbol-40px me-5">
                <img alt={altText} src={imgSrc} />
            </div>
            <div className="flex-grow-1 me-2 mt-5">
                <Link href="#" className="text-gray-800 text-hover-primary fs-6 ls-m4 fw-bolder">
                    {name}
                </Link>
                <p className="fw-semibold d-block fs-7 text-muted">{location}</p>
            </div>
        </div>
    )
}

export default AgentCard

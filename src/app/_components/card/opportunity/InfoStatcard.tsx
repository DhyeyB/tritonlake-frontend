"use client"
import { InfoStatCardProps } from "@/app/_types/common/InfoStatCard"
import React from "react"

const InfoStatCard: React.FC<InfoStatCardProps> = ({ value, label, iconType, iconColor }) => {
    return (
        <div className="border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-6 mb-3">
            <div className="d-flex align-items-center">
                <i className={`ki-duotone ki-arrow-${iconType} fs-3 ${iconColor} me-2`}>
                    <span className="path1"></span>
                    <span className="path2"></span>
                </i>
                <div className="fs-2 fw-bold">{value}</div>
            </div>
            <div className="fw-semibold fs-6 text-gray-400">{label}</div>
        </div>
    )
}

export default InfoStatCard

"use client"
import { OpportunityDetailsCardProps } from "@/app/_types/common/OpportunityDetailsCard"
import React from "react"

const OpportunityDetailsCard: React.FC<OpportunityDetailsCardProps> = ({ title, items, colClassName = "col-lg-4" }) => (
    <div className="card h-100">
        <div className="card-body pb-5">
            <div className="d-flex align-items-center mb-8">
                <div className="d-flex align-items-center flex-grow-1">
                    <div className="d-flex flex-column">
                        <a className="text-gray-900 fs-4 fw-bold cursor-pointer">{title}</a>
                    </div>
                </div>
            </div>
            <div className="row align-items-center">
                {items?.map((item, index) => (
                    <div key={index} className={`align-items-center ${item.label === "Description" ? "col-12" : colClassName}  mb-10`}>
                        <div className="d-flex flex-column">
                            <a className="text-gray-900 fs-6 fw-bold cursor-pointer">{item.label}</a>
                            <div className={`${item.label == "Key Contact" ? "text-primary cursor-pointer" : "text-gray-500"} fw-bold`} dangerouslySetInnerHTML={{ __html: item.value ?? "-" }} />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </div>
)

export default OpportunityDetailsCard

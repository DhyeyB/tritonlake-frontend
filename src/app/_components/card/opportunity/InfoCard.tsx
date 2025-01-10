"use client"
import { InfoCardProps } from "@/app/_types/common/InforCard"
import React from "react"

const InfoCard: React.FC<InfoCardProps> = ({ items }) => (
    <div className="card h-100">
        <div className="card-body pb-5">
            <div className="row align-items-center">
                {items.map((item, index) => (
                    <div key={index} className="col-lg-12 mb-5">
                        <div className="d-flex flex-column">
                            <a className={`text-gray-900 fs-4 fw-bold mb-4`}>{item.title}</a>
                            <span className="text-gray-800 fw-normal" dangerouslySetInnerHTML={{ __html: item.description }} />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </div>
)

export default InfoCard

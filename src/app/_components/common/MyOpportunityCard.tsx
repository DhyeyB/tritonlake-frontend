"use client"
import { Any } from "@/app/_types/common/Common"
import { OPPORTUNITY } from "@/app/_utils/Constants"
import { calculateDaysLeft, formatCurrencyWithAbbreviation, formatString, getStatusClassName } from "@/app/_utils/Helpers"
import { useRouter } from "next/navigation"
import React from "react"

const MyOpportunityCard = ({ opportunity }: Any) => {
    const router = useRouter()
    return (
        <div className="col-sm-6 col-xl-3 mb-xl-3 cursor-pointer" onClick={() => router.push(`/opportunities/opportunity-details/${opportunity.id}`)}>
            <a className="card h-lg-100 opportunity-card">
                <div className="card-body d-flex justify-content-between align-items-start flex-column p-5">
                    <img src={opportunity?.cover?.original} alt="Cover Image" className="w-100 rounded" />
                    <span className={`badge ${getStatusClassName(opportunity?.status)} position-absolute text-uppercase opportunity-status`}>
                        {opportunity?.status === OPPORTUNITY.STATUS_DISTRIBUTED ? OPPORTUNITY.STATUS_LIVE : formatString(opportunity?.status)}
                    </span>
                    {opportunity && calculateDaysLeft(opportunity?.estimated_close_date) > 0 && (
                        <span className="badge badge-dark position-absolute text-uppercase" id="days-left">
                            {calculateDaysLeft(opportunity?.estimated_close_date) > 1
                                ? `${calculateDaysLeft(opportunity?.estimated_close_date)} days left`
                                : `${calculateDaysLeft(opportunity?.estimated_close_date)} day left`}
                        </span>
                    )}
                    {/* TODO: Add logic to show quickshare as per key value */}
                    {/* <span className="badge badge-primary p-2 mx-0 mt-3 position-absolute text-white" id="quickshare-flag">
                        <i className="text-white fa-solid fas fa-flag"></i>
                        <span className="mx-2"> Quickshared </span>
                    </span> */}
                    <div className="d-flex flex-column mt-7 mb-2">
                        <span className="fw-bold fs-4 text-gray-800 lh-1 ff-playfair">{opportunity?.name}</span>
                    </div>

                    <div>
                        <div className="mt-5">
                            <span className="fw-semibold fs-8">{opportunity?.short_description ?? "-"}</span> <br />
                            <span className=" fs-8 text-gray-500">{opportunity?.sponsor_name ?? "-"}</span>
                            {/* <span className=" fs-8 text-gray-500">{opportunity?.sponsor_name?.name ?? "-"}</span> */}
                        </div>
                    </div>
                    <div className="d-flex">
                        <span className="svg-icon svg-icon-primary svg-icon-2x">
                            <svg width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                                <defs></defs>
                                <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                    <rect x="0" y="0" width="24" height="24"></rect>
                                    <path
                                        d="M19,11 L21,11 C21.5522847,11 22,11.4477153 22,12 C22,12.5522847 21.5522847,13 21,13 L19,13 C18.4477153,13 18,12.5522847 18,12 C18,11.4477153 18.4477153,11 19,11 Z M3,11 L5,11 C5.55228475,11 6,11.4477153 6,12 C6,12.5522847 5.55228475,13 5,13 L3,13 C2.44771525,13 2,12.5522847 2,12 C2,11.4477153 2.44771525,11 3,11 Z M12,2 C12.5522847,2 13,2.44771525 13,3 L13,5 C13,5.55228475 12.5522847,6 12,6 C11.4477153,6 11,5.55228475 11,5 L11,3 C11,2.44771525 11.4477153,2 12,2 Z M12,18 C12.5522847,18 13,18.4477153 13,19 L13,21 C13,21.5522847 12.5522847,22 12,22 C11.4477153,22 11,21.5522847 11,21 L11,19 C11,18.4477153 11.4477153,18 12,18 Z"
                                        fill="#000000"
                                        fill-rule="nonzero"
                                        opacity="0.3"
                                    ></path>
                                    <circle fill="#000000" cx="12" cy="12" r="3"></circle>
                                </g>
                            </svg>
                        </span>
                        <p className="mx-3 fs-8">
                            {" "}
                            Target Raise / On Matrix <br />
                            {opportunity?.fundraising?.target_raise && (
                                <span className="fw-bold fs-8">
                                    {`${opportunity?.currency?.symbol} `}
                                    {opportunity?.fundraising?.target_raise ? formatCurrencyWithAbbreviation(opportunity?.fundraising?.target_raise) : "-"} /{" "}
                                    {opportunity?.target?.amount ? formatCurrencyWithAbbreviation(opportunity?.target?.amount) : "-"}
                                </span>
                            )}
                        </p>
                    </div>
                    <div className="d-flex mt-5 w-100">
                        <div className="border border-gray-300 border-dashed rounded min-w-100px w-100 py-2 px-2 mb-3 me-6">
                            <div className="fw-semibold text-gray-500 fs-8">Placement fee</div>
                            <span className="fs-8 text-gray-700 fw-bold">{opportunity?.placement?.fee ?? "-"}%</span>
                        </div>
                        <div className="border border-gray-300 border-dashed rounded min-w-100px w-100 py-2 px-2 mb-3">
                            <div className="fw-semibold text-gray-500 fs-8">Originator</div>
                            <span className="fs-8 text-gray-700 fw-bold">{opportunity?.firm?.name ?? "-"}</span>
                        </div>
                    </div>
                    <button
                        className="btn btn-sm btn-primary w-100"
                        onClick={() => {
                            router.push(`/opportunities/opportunity-details/${opportunity.id}`)
                        }}
                    >
                        Manage
                    </button>
                </div>
            </a>
        </div>
    )
}

export default MyOpportunityCard

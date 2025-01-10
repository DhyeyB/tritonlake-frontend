import useCustomTimeout from "@/app/_hooks/useCustomTimeout"
import { Any } from "@/app/_types/common/Common"
import { CONFIG } from "@/app/_utils/Constants"
import { formatDigitCurrency, formatString } from "@/app/_utils/Helpers"
import { useRouter } from "next/navigation"
import React, { useRef, useState } from "react"
import { DashboardSvgIcon } from "../svg/DashboardSvgIcon"
import { getDateMonthYearFormat } from "@/app/_utils/Date"

const QuickshareOpportunityCard = ({ opportunity }: Any) => {
    const router = useRouter()
    const [showQuickshareMenu, setShowQuickshareMenu] = useState(false)
    const dropdownRef = useRef<HTMLDivElement>(null)
    const { setCustomTimeout, removeCustomTimeout } = useCustomTimeout()

    return (
        <div className="col-sm-6 col-xl-3 mb-xl-10">
            <div className="card h-lg-100 opportunity-card">
                <div className="card-body d-flex justify-content-between align-items-start flex-column p-5 position-relative">
                    <div className="m-0 w-100">
                        <img src={opportunity?.cover?.original ?? "/assets/media/cover/image 8.jpg"} className="w-100 rounded" alt={"cover"} />

                        <div className="app-navbar-item quickshare-menu bg-white p-2 rounded-1 m-1" id="kt_header_user_menu_toggle" ref={dropdownRef}>
                            <div
                                className="cursor-pointer symbol symbol-30px symbol-md-40px"
                                data-kt-menu-trigger="{default: 'click', lg: 'hover'}"
                                data-kt-menu-attach="parent"
                                data-kt-menu-placement="bottom-end"
                                onMouseEnter={() => {
                                    setShowQuickshareMenu(true)
                                }}
                                onMouseLeave={() => {
                                    setCustomTimeout(CONFIG.QUICK_SHARE_MENU_TIMEOUT, () => setShowQuickshareMenu(false))
                                }}
                            >
                                <span className="svg-icon svg-icon-primary svg-icon-2x">
                                    <DashboardSvgIcon />
                                </span>
                            </div>
                            {showQuickshareMenu && (
                                <div
                                    className="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-800 menu-state-bg menu-state-color fw-semibold py-4 fs-6 w-275px show custom-show-quickshare-menu-dropdown"
                                    onMouseEnter={() => {
                                        removeCustomTimeout(() => setShowQuickshareMenu(true))
                                    }}
                                    onMouseLeave={() => setShowQuickshareMenu(false)}
                                >
                                    <div
                                        className="menu-item px-5 cursor-pointer"
                                        onClick={() => {
                                            router.push(`/quickshare/edit-quickshare/${opportunity.id}`)
                                        }}
                                    >
                                        <a className="menu-link px-5">Edit Opportunity</a>
                                    </div>
                                    <div className="menu-item px-5 cursor-pointer">
                                        <a className="menu-link px-5">View Engagement</a>
                                    </div>
                                    <div className="menu-item px-5">
                                        <a>
                                            <button className="btn bg-white menu-link px-5">Remove Quickshare</button>
                                        </a>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="d-flex flex-column my-7">
                        <div className="row">
                            <span className="fw-bold fs-3 text-gray-800 lh-1 ff-playfair">{opportunity?.name?.length ? opportunity?.name : "-"}</span>
                            <p className="mt-5">{opportunity?.short_description?.length ? opportunity?.short_description : "-"}</p>
                            <div className="row mb-2">
                                <div className="col-md-6 pe-2">
                                    <div className="border border-gray-300 border-dashed rounded w-100 py-2 px-1 h-100">
                                        <div className="fw-semibold text-gray-500 fs-8">Investment Type</div>
                                        <span className="fs-7 text-gray-700 fw-bold">{opportunity?.investment_type?.name ? formatString(opportunity?.investment_type?.name) : "-"}</span>
                                    </div>
                                </div>
                                <div className="col-md-6 pe-2 ps-0">
                                    <div className="border border-gray-300 border-dashed rounded w-100 py-2 px-1 h-100">
                                        <div className="fw-semibold text-gray-500 fs-8">Asset Class</div>
                                        <span className="fs-7 text-gray-700 fw-bold">{opportunity?.asset_class?.name ?? "-"}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="row mb-2">
                                <div className="col-md-6 pe-2">
                                    <div className="border border-gray-300 border-dashed rounded w-100 py-2 px-1 h-100">
                                        <div className="fw-semibold text-gray-500 fs-8">Strategy</div>
                                        <span className="fs-7 text-gray-700 fw-bold">{opportunity?.strategies?.map((strategy: Any) => strategy.name).join(", ") || "-"}</span>
                                    </div>
                                </div>
                                <div className="col-md-6 pe-2 ps-0">
                                    <div className="border border-gray-300 border-dashed rounded w-100 py-2 px-1 h-100">
                                        <div className="fw-semibold text-gray-500 fs-8">Fund</div>
                                        <span className="fs-7 text-gray-700 fw-bold">{opportunity?.fund_number ?? "-"}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="row mb-2">
                                <div className="col-md-6 pe-2">
                                    <div className="border border-gray-300 border-dashed rounded w-100 py-2 px-1 h-100">
                                        <div className="fw-semibold text-gray-500 fs-8">Target Raise</div>
                                        <span className="fs-7 text-gray-700 fw-bold">
                                            {opportunity?.fundraising?.target_raise ? opportunity?.currency?.symbol + " " + formatDigitCurrency(opportunity?.fundraising?.target_raise) : "-"}
                                        </span>
                                    </div>
                                </div>
                                <div className="col-md-6 pe-2 ps-0">
                                    <div className="border border-gray-300 border-dashed rounded w-100 py-2 px-1 h-100">
                                        <div className="fw-semibold text-gray-500 fs-8">Target IRR / MOIC</div>
                                        <span className="fs-7 text-gray-700 fw-bold">
                                            {" "}
                                            {opportunity?.target?.irr ? `${opportunity?.target?.irr}%` : "-"} / {opportunity?.target?.moic ? `${opportunity?.target?.moic}` : "-"}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="row mb-2">
                                <div className="col-md-6 pe-2">
                                    <div className="border border-gray-300 border-dashed rounded w-100 py-2 px-1 h-100">
                                        <div className="fw-semibold text-gray-500 fs-8">Placement fee</div>
                                        <span className="fs-7 text-gray-700 fw-bold">{opportunity?.placement?.fee ? `${parseFloat(opportunity?.placement?.fee)}%` : "-"}</span>
                                    </div>
                                </div>
                                <div className="col-md-6 pe-2 ps-0">
                                    <div className="border border-gray-300 border-dashed rounded w-100 py-2 px-1 h-100">
                                        <div className="fw-semibold text-gray-500 fs-8">Estimated Close Date</div>
                                        <span className="fs-7 text-gray-700 fw-bold">{opportunity?.estimated_close_date ? getDateMonthYearFormat(opportunity?.estimated_close_date) : "-"}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="row mb-2">
                                <div className="col-md-6 pe-2">
                                    <div className="border border-gray-300 border-dashed rounded w-100 py-2 px-1 h-100">
                                        <div className="fw-semibold text-gray-500 fs-8">Desired Market Coverage</div>
                                        <span className="fs-7 text-gray-700 fw-bold">
                                            {opportunity?.target?.market_regions?.length > 0 ? opportunity?.target?.market_regions?.map((region: Any) => region?.name).join(", ") : "-"}
                                        </span>
                                    </div>
                                </div>
                                <div className="col-md-6 pe-2 ps-0">
                                    <div className="border border-gray-300 border-dashed rounded w-100 py-2 px-1 h-100">
                                        <div className="fw-semibold text-gray-500 fs-8">Geo Focus</div>
                                        <span className="fs-7 text-gray-700 fw-bold">{opportunity?.region?.name ?? "-"}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default QuickshareOpportunityCard

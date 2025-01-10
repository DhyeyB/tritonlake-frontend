import React, { useEffect, useState } from "react"
import StickyHeaderComponent from "../common/StickySubHeader"
import { CONFIG, CREATE_OPPORTUNITY } from "@/app/_utils/Constants"
import Button from "../button/Button"
import ReactTableWithPagination from "../table/ReactTableWithPagination"
import { sliceWithEllipsis } from "@/app/_utils/Common"
import AgentCard from "../card/ColumnCard"
import { ColumnDef } from "@tanstack/react-table"
import { Any, AnyObject } from "@/app/_types/common/Common"
import Link from "next/link"
import CheckboxInput from "../input/CheckboxInput"
import OriginatorSelect from "../input/OriginatorSelect"
import CustomReactSelect from "../input/ReactSelect"
import { Filters } from "@/app/_types/common/DistributeOpportunityProps"
import { handleError, showSweetAlert } from "@/app/_utils/Helpers"
import { useParams } from "next/navigation"
import { FetchHelper } from "@/app/_services/FetchHelper"
import { SweetAlertIcon } from "sweetalert2"

const defaultFilterOptions = {
    investment_type_ids: "",
    target_fund_size: "",
    fund_number: "",
    status: "active",
    asset_class_ids: [],
    strategy_ids: [],
    industry_ids: [],
    region_ids: [],
    country_ids: [],
    network_coverage_ids: [],
}
const DistributeOpportunity = () => {
    const [fundSize, setfundSize] = useState<string>("")
    const [activeTab, setActiveTab] = useState<string>("distribute")
    const [filters, setFilters] = useState<Filters>(defaultFilterOptions)
    const [targetCriteriaFilter, setTargetCriteriaFilter] = useState<Any>(defaultFilterOptions)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [showTable, setShowTable] = useState<boolean>(false)
    const params = useParams()
    const [firmIds, setFirmIds] = useState<string[]>([])

    const columns = React.useMemo<ColumnDef<AnyObject>[]>(
        () => [
            {
                id: "checkbox",
                accessorKey: "checkbox",
                enableSorting: false,
                size: 30,
                header: ({ table }) => <CheckboxInput checked={table.getIsAllPageRowsSelected()} onChange={table.getToggleAllPageRowsSelectedHandler()} />,
                cell: ({ row }) => <CheckboxInput checked={row.getIsSelected()} onChange={row.getToggleSelectedHandler()} />,
            },
            {
                header: "SOLICITING AGENT",
                accessorKey: "avatar",
                cell: ({ row }) => (
                    <>
                        <AgentCard
                            key={row?.original?.id}
                            imgSrc={row?.original?.logo?.original}
                            altText={"logo"}
                            name={sliceWithEllipsis(row?.original?.name, CONFIG.WORD_SLICE_LIMIT)}
                            location={""}
                        />
                    </>
                ),
            },
            {
                header: "LOCATION",
                accessorKey: "address",
                cell: ({ row }) => <>{`${row?.original?.address?.city}, ${row?.original?.address?.country_code} ` || "-"}</>,
            },
            {
                header: "PRIMARY CONTACT",
                accessorKey: "primary_contact",
                cell: ({ row }) => <>{sliceWithEllipsis(row?.original?.primary_contact?.name, CONFIG.WORD_SLICE_LIMIT) || "-"}</>,
            },
            {
                header: "MARKET COVER",
                accessorKey: "network_regions",
                cell: ({ row }) => <>{sliceWithEllipsis(row?.original?.network_regions.map((item: Any) => item?.name), CONFIG.WORD_SLICE_LIMIT) || 0}</>,
            },
            {
                header: "ACTIONS",
                accessorKey: "action",
                enableSorting: false,
                cell: () => (
                    // <div className="d-flex">
                    //     <Link legacyBehavior href={`javascript:;`}>
                    //         <a className="btn btn-sm btn-secondary rounded-0 text-uppercase" style={{ cursor: "not-allowed" }}>
                    //             Message
                    //         </a>
                    //     </Link>
                    <Link legacyBehavior href={`javascript:;`}>
                        <a className="btn btn-sm btn-secondary rounded-0 text-uppercase" style={{ cursor: "not-allowed" }}>
                            view
                        </a>
                    </Link>
                    // </div>
                ),
            },
        ],
        [],
    )

    const sendOpportunity = async () => {
        setIsLoading(true)
        const PAYLOAD = {
            opportunity: params?.id,
            firm: firmIds,
        }
        const RequestHelper = FetchHelper.put
        const url = new URL(`${CONFIG.API_ENDPOINTS.DISTRIBUTE.OPPORTUNITY}`)
        try {
            const response = await RequestHelper(url, PAYLOAD)
            if (response?.proposals) {
                setIsLoading(false)
                showSweetAlert(CONFIG.MESSAGES.OPPORTUNITY_SENT_SUCCESSFULLY, CONFIG.SWEETALERT_SUCCESS_OPTION.icon as SweetAlertIcon)
            }
        } catch (error) {
            setIsLoading(false)
            handleError(error)
        }
    }

    const handleFilter = () => {
        const updatedFilter = {
            ...targetCriteriaFilter,
            investment_type_ids: filters?.investment_type_ids?.value ?? "",
            target_fund_size: filters?.target_fund_size ?? "",
            fund_number: filters?.fund_number ?? "",
            asset_class_ids: filters?.asset_class_ids?.map((item) => item?.value),
            strategy_ids: filters?.strategy_ids?.map((item) => item?.value),
            industry_ids: filters?.industry_ids?.map((item) => item?.value),
            region_ids: filters?.region_ids?.map((item) => item?.value),
            country_ids: filters?.country_ids?.map((item) => item?.value),
            network_coverage_ids: filters?.network_coverage_ids?.map((item) => item?.value),
            hide_current_agent: true,
        }
        setTargetCriteriaFilter(updatedFilter)
    }

    useEffect(() => {
        // Iterate over the keys of the object
        for (const key in targetCriteriaFilter) {
            // Skip the 'status' and `hide_current_agent` key
            if (key === "status" || key == "hide_current_agent") {
                continue
            }

            const value = targetCriteriaFilter[key]

            // Check if the value is neither an empty string nor an empty array
            if (value !== "" && !(Array.isArray(value) && value.length === 0)) {
                setShowTable(true)
                return // Exit early, since we found a condition where setShowTable is true
            }
        }

        // If all keys have empty values, set show table to false
        setShowTable(false)
    }, [targetCriteriaFilter])

    return (
        <>
            <StickyHeaderComponent title={CONFIG.MESSAGES.DISTRIBUTE.STICKY_HEADER_TITLE_DISTRIBUTE} showBackArrow={true} showButton={true} backLink={CONFIG.REDIRECT_PATHNAME.OPPORTUNITIES}>
                {/* <Button type="button" disabled loading={false} title={"Audit Log"} className="btn btn-secondary rounded-0 w-90 my-5 mx-2 fs-7 text-uppercase" onClick={() => alert("Add Audit Log")} /> */}
                <Button
                    loading={isLoading}
                    title={"Send Opportunity"}
                    disabled={firmIds?.length === 0 || isLoading}
                    className="btn bg-black rounded-0 text-white w-90 text-uppercase fs-7 mx-2"
                    onClick={() => {
                        if (params) sendOpportunity()
                    }}
                />
            </StickyHeaderComponent>
            <div id="kt_app_content_container" className="app-container container-fluid">
                <ul className="nav nav-tabs mb-5 fs-6 mt-100">
                    <li className="nav-item">
                        <a className="nav-link fw-bold active" data-bs-toggle="tab" href="#distribute-list" onClick={() => setActiveTab("distribute")}>
                            Distribute
                        </a>
                    </li>
                    {/* <li className="nav-item">
                        <a className="nav-link fw-bold" data-bs-toggle="tab" href="#reshare-list" onClick={() => setActiveTab("reshare_requests")}>
                            Reshare Requests<span className="badge badge-sm badge-danger ms-3 badge-circle">2</span>
                        </a>
                    </li> */}
                </ul>

                {activeTab == "distribute" ? (
                    <>
                        {" "}
                        <div className="card mb-5">
                            <div className="card-header border-0 pt-6">
                                <div className="card-title">
                                    <h3 className="">Target Criteria</h3>
                                </div>
                            </div>
                            <div className="card-body pt-0">
                                <form className="row">
                                    <div className="col-lg-3 col-md-6 col-sm-6 mb-10   ">
                                        <label className="form-label fs-8">Investment Type</label>
                                        <OriginatorSelect
                                            label=""
                                            onSelected={(item: Any) => {
                                                if (item?.id) {
                                                    const option = {
                                                        label: item.name,
                                                        value: item.id,
                                                        data: item,
                                                    }
                                                    setFilters((prev) => ({ ...prev, investment_type_ids: option }))
                                                } else {
                                                    setFilters((prev) => ({ ...prev, investment_type_ids: "" }))
                                                }
                                            }}
                                            params={{ type: "investment_type" }}
                                            selectedOptionValue={filters.investment_type_ids}
                                            placeholder={"Select..."}
                                        />
                                    </div>
                                    <div className="col-lg-3 col-md-6 col-sm-6 mb-10   ">
                                        <label className="form-label fs-8">Asset Class</label>
                                        <OriginatorSelect
                                            label=""
                                            onSelected={(items: Any) => {
                                                if (items?.length) {
                                                    const options = items.map((item: Any) => ({
                                                        label: item.name,
                                                        value: item.id,
                                                        data: item,
                                                    }))
                                                    setFilters((prev) => ({ ...prev, asset_class_ids: options }))
                                                } else {
                                                    setFilters((prev) => ({ ...prev, asset_class_ids: [] }))
                                                }
                                            }}
                                            params={{ type: "asset_class" }}
                                            selectedOptionValue={filters.asset_class_ids}
                                            placeholder={"Select..."}
                                            isMulti
                                        />
                                    </div>
                                    <div className="col-lg-3 col-md-6 col-sm-6 mb-10   ">
                                        <label className="form-label fs-8">Strategy</label>
                                        <OriginatorSelect
                                            label=""
                                            onSelected={(items: Any) => {
                                                if (items?.length) {
                                                    const options = items.map((item: Any) => ({
                                                        label: item.name,
                                                        value: item.id,
                                                        data: item,
                                                    }))
                                                    setFilters((prev) => ({ ...prev, strategy_ids: options }))
                                                } else {
                                                    setFilters((prev) => ({ ...prev, strategy_ids: [] }))
                                                }
                                            }}
                                            params={{ type: "strategy" }}
                                            selectedOptionValue={filters.strategy_ids}
                                            placeholder={"Select..."}
                                            isMulti
                                        />
                                    </div>
                                    <div className="col-lg-3 col-md-6 col-sm-6  mb-10   ">
                                        <label className="form-label fs-8">Target Fund Size ($)</label>
                                        <div className="d-flex align-items-center position-relative">
                                            <input
                                                type="text"
                                                data-kt-inbox-listing-filter="search"
                                                className="form-control form-control-solid rounded-0 border-0"
                                                placeholder="e.g.250,000,000"
                                                onInput={(e) => {
                                                    e.currentTarget.value = e.currentTarget.value.replace(/[^0-9]/g, "")
                                                }}
                                                value={fundSize}
                                                onChange={(e) => {
                                                    const value = e.target.value
                                                    if (value || filters?.target_fund_size) {
                                                        setfundSize(value)
                                                        setFilters((prev) => ({ ...prev, target_fund_size: value }))
                                                    }
                                                }}
                                            />
                                        </div>
                                    </div>

                                    <div className="col-lg-3 col-md-6 col-sm-6  mb-10    ">
                                        <label className="form-label fs-8">Industry Focus</label>
                                        <OriginatorSelect
                                            label=""
                                            onSelected={(items: Any) => {
                                                if (items?.length) {
                                                    const options = items.map((item: Any) => ({
                                                        label: item.name,
                                                        value: item.id,
                                                        data: item,
                                                    }))
                                                    setFilters((prev) => ({ ...prev, industry_ids: options }))
                                                } else {
                                                    setFilters((prev) => ({ ...prev, industry_ids: [] }))
                                                }
                                            }}
                                            params={{ type: "industry" }}
                                            selectedOptionValue={filters.industry_ids}
                                            placeholder={"Select..."}
                                            isMulti
                                        />
                                    </div>
                                    <div className="col-lg-3 col-md-6 col-sm-6  mb-10   ">
                                        <label className="form-label fs-8">Geographical Focus</label>
                                        <OriginatorSelect
                                            label=""
                                            onSelected={(items: Any) => {
                                                if (items?.length) {
                                                    const options = items.map((item: Any) => ({
                                                        label: item.name,
                                                        value: item.id,
                                                        data: item,
                                                    }))
                                                    setFilters((prev) => ({ ...prev, country_ids: options }))
                                                } else {
                                                    setFilters((prev) => ({ ...prev, country_ids: [] }))
                                                }
                                            }}
                                            params={{ type: "region" }}
                                            selectedOptionValue={filters.country_ids}
                                            placeholder={"Select..."}
                                            isMulti
                                        />
                                    </div>

                                    <div className="col-lg-3 col-md-6 col-sm-6  mb-10   ">
                                        <label className="form-label fs-8">Fund #</label>
                                        <CustomReactSelect
                                            optionsData={CREATE_OPPORTUNITY.FUND_NUMBER}
                                            onDropdownChange={(value) => {
                                                if (value) {
                                                    setFilters((prev) => ({ ...prev, fund_number: value }))
                                                } else {
                                                    setFilters((prev) => ({ ...prev, fund_number: "" }))
                                                }
                                            }}
                                            placeholder={"Select..."}
                                            selectedOptionValue={filters.fund_number}
                                        />
                                    </div>

                                    <div className="col-lg-3 col-md-6 col-sm-6  mb-10  ">
                                        <label className="form-label fs-8">Network Coverage</label>
                                        <OriginatorSelect
                                            label=""
                                            onSelected={(items: Any) => {
                                                if (items?.length) {
                                                    const options = items.map((item: Any) => ({
                                                        label: item.name,
                                                        value: item.id,
                                                        data: item,
                                                    }))
                                                    setFilters((prev) => ({ ...prev, network_coverage_ids: options }))
                                                } else {
                                                    setFilters((prev) => ({ ...prev, network_coverage_ids: [] }))
                                                }
                                            }}
                                            params={{ type: "region" }}
                                            selectedOptionValue={filters.network_coverage_ids}
                                            placeholder={"Select..."}
                                            isMulti
                                        />
                                    </div>
                                </form>
                                <button className="btn btn-primary rounded-0" onClick={handleFilter}>
                                    Search
                                </button>
                            </div>
                        </div>
                        <div className="card mt-0">
                            {showTable && (
                                <ReactTableWithPagination
                                    columns={columns}
                                    endpoint={CONFIG.API_ENDPOINTS.FIRM}
                                    extraFilters={targetCriteriaFilter}
                                    tableHeaderTitle="Applicable Agents"
                                    showAddButton={false}
                                    sortingId={"-created_at"}
                                    tableContainerClassName="mt-0"
                                    handleCheckBoxState={(data) => {
                                        const extractedIds = data?.rows?.map((row) => row.id)
                                        setFirmIds(extractedIds)
                                    }}
                                />
                            )}
                        </div>{" "}
                    </>
                ) : (
                    <div className="card mt-0">
                        <ReactTableWithPagination
                            columns={columns}
                            endpoint={CONFIG.API_ENDPOINTS.AGENT.LIST}
                            tableHeaderTitle="Reshare Requests"
                            showAddButton={false}
                            sortingId={"-created_at"}
                            tableContainerClassName="mt-0"
                        />
                    </div>
                )}
            </div>
        </>
    )
}

export default DistributeOpportunity

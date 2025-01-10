"use client"
import MyOpportunityCard from "@/app/_components/common/MyOpportunityCard"
import OpportunityHeader from "@/app/_components/common/OpportunityHeader"
import { FetchHelper } from "@/app/_services/FetchHelper"
import { Any, AnyObject } from "@/app/_types/common/Common"
import { CONFIG, OPPORTUNITY } from "@/app/_utils/Constants"
import { handleError } from "@/app/_utils/Helpers"
import { debounce } from "lodash"
import { useRouter } from "next/navigation"
import React, { useCallback, useEffect, useState } from "react"
import CardLoader from "@/app/_components/common/CardSkeleton"
import NoData from "@/app/_components/common/NoData"
import { defaultFilterOptions, defaultModalFilterOptions, FilterState, ModalFilterState } from "@/app/_types/common/OpportunityListModalFilter"
import CustomReactSelect from "@/app/_components/input/ReactSelect"
import QuickshareOpportunityCard from "@/app/_components/common/QuickshareOpportunityCard"
import QuickSearchTable from "@/app/_components/quicksearch/QuickSearchTable"
import FilterModal from "@/app/_components/modal/opportunity/FilterModal"

const OpportunityList = () => {
    const router = useRouter()
    const [opportunityDetails, setOpportunityDetails] = useState<AnyObject>([])
    const [loading, setIsoading] = useState<boolean>(false)
    const [filter, setFilter] = useState<FilterState>(defaultFilterOptions)
    const [showFilterModal, setShowFilterModal] = useState(false)
    const [showModalFilters, setShowModalFilters] = useState<ModalFilterState>(defaultModalFilterOptions)
    const [searchTerm, setSearchTerm] = useState<string>("")
    const [modalFilterReset, setModalFilterReset] = useState(false)
    const [isFiltersApplied, setIsFiltersApplied] = useState(true)
    const [activeTab, setActiveTab] = useState("All")

    const getOpportunityListing = async () => {
        setIsoading(true)
        try {
            const _filter: object = {
                ...filter,
                sponsor_name: showModalFilters?.sponsor_name,
                firm_ids: showModalFilters?.originators?.map((item) => item?.value),
                investment_type: showModalFilters?.investment_type?.value ?? "",
                asset_class_ids: showModalFilters?.asset_class?.map((item) => item?.value),
                strategy_ids: showModalFilters?.strategies?.map((item) => item.value),
                market_ids: showModalFilters?.markets?.map((item) => item.value),
                region_ids: showModalFilters?.countries?.map((item) => item.value),
                industry_ids: showModalFilters?.industries?.map((item) => item.value),
                total_raise_amount_min: showModalFilters?.total_raise_amount_min,
                total_raise_amount_max: showModalFilters?.total_raise_amount_max,
                target_raise_on_matrix_min: showModalFilters?.target_raise_on_matrix_min,
                target_raise_on_matrix_max: showModalFilters?.target_raise_on_matrix_max,
                days_left: showModalFilters?.days_left,
                hide_archives: filter && filter?.status == OPPORTUNITY.TYPE.ARCHIVED ? false : true,
                hide_quick_shares: filter && filter?.type == OPPORTUNITY.TYPE.QUICK_SHARE ? false : true,
                show_my_opportunities: true,
            }
            const response = await FetchHelper.get(CONFIG.API_ENDPOINTS.OPPORTUNITY.LIST, { ..._filter })
            if (response.results) {
                setIsoading(false)
                setOpportunityDetails(response.results)
            } else throw response
        } catch (error) {
            handleError(error)
            setIsoading(false)
        }
    }

    useEffect(() => {
        getOpportunityListing()
    }, [filter, modalFilterReset])

    const debouncedSearch = useCallback(
        debounce((term: string) => {
            setFilter((prev) => ({
                ...prev,
                search_term: term,
            }))
        }, CONFIG.DEBOUNCE_TIMEOUT),
        [],
    )

    return (
        <>
            <FilterModal
                showModalFilters={showModalFilters}
                setShowModalFilters={setShowModalFilters}
                showFilterModal={showFilterModal}
                setShowFilterModal={setShowFilterModal}
                getOpportunityListing={getOpportunityListing}
                filter={filter}
                setIsFiltersApplied={setIsFiltersApplied}
            />

            <div className="card bg-transparent">
                <OpportunityHeader title="My Opportunities" subtitle={"Opportunities you have added to the matrix"}>
                    <>
                        <div className="w-250px">
                            <CustomReactSelect
                                optionsData={OPPORTUNITY.SORTING_OPTIONS}
                                onDropdownChange={(_option) => {
                                    const option = _option
                                    if (option) {
                                        setFilter((prev) => ({
                                            ...prev,
                                            order_by: (option as string)?.includes("+") ? "" : (option as string),
                                        }))
                                    } else {
                                        setFilter((prev) => ({
                                            ...prev,
                                            order_by: "",
                                        }))
                                    }
                                }}
                                placeholder={"SORT BY"}
                                selectedOptionValue={filter.order_by}
                            />
                        </div>
                        <div className="d-flex align-items-center position-relative ms-2">
                            <i className="fa-solid fa-magnifying-glass fs-3 position-absolute ms-4"></i>
                            <input
                                type="text"
                                data-kt-inbox-listing-filter="search"
                                className="form-control form-control-solid mw-200 min-w-150px min-w-lg-150px min-w-xxl-150px ps-11 rounded-0 border-0"
                                placeholder="Search Opportunities"
                                value={searchTerm}
                                onChange={(e) => {
                                    const value = e.target.value
                                    if (value || filter.search_term) {
                                        setSearchTerm(value)
                                        debouncedSearch(value)
                                    }
                                }}
                            />
                        </div>
                        <div className="m-0">
                            <a
                                onClick={() => {
                                    setShowFilterModal(true)
                                }}
                                className="btn btn-secondary text-uppercase fs-7 rounded-0"
                            >
                                Filter
                            </a>
                        </div>
                        <button
                            type="button"
                            className="btn btn-secondary text-uppercase fs-7 rounded-0 w-145px"
                            onClick={() => {
                                setFilter(defaultFilterOptions)
                                setSearchTerm("")
                                setShowModalFilters(defaultModalFilterOptions)
                                setActiveTab("All")
                                if (JSON.stringify(filter) === JSON.stringify(defaultFilterOptions)) setModalFilterReset((prev) => !prev)
                            }}
                            disabled={isFiltersApplied}
                        >
                            Reset All Filters
                        </button>
                        <div className="m-0">
                            <a onClick={() => router.push("/opportunities/add-opportunity")} className="btn btn-primary text-uppercase fs-7 rounded-0 w-175px">
                                Add opportunity
                            </a>
                        </div>
                    </>
                </OpportunityHeader>
                <ul className="nav nav-tabs mb-10 fs-6 opportunity-tabs px-8 py-4 m-0 gap-1">
                    {OPPORTUNITY.TABS.map((tab, index) => (
                        <li className="nav-item" key={index}>
                            <a
                                className={`nav-link cursor-pointer ${activeTab === tab.label ? "active" : ""}`}
                                data-bs-toggle="tab"
                                onClick={() => {
                                    setActiveTab(tab.label)
                                    if (tab.value === "quick_search" && tab?.type) {
                                        return
                                    }
                                    if (tab.type) {
                                        setFilter((prev) => ({
                                            ...prev,
                                            status: "",
                                            type: tab?.type,
                                        }))
                                    } else {
                                        setFilter((prev) => ({
                                            ...prev,
                                            status: tab?.value,
                                            type: "",
                                        }))
                                    }
                                }}
                            >
                                {tab.label}
                            </a>
                        </li>
                    ))}
                </ul>

                {loading ? (
                    <div className="row px-5 m-0">
                        {Array.from({ length: 4 }).map((_, index) => (
                            <div className="col-sm-6 col-xl-3 mb-xl-3" key={index}>
                                <CardLoader style={{ width: "100%", height: "350px" }} />
                            </div>
                        ))}
                    </div>
                ) : !loading && opportunityDetails.length === 0 && activeTab !== "QuickSearches" ? (
                    <NoData />
                ) : (
                    <div className="row px-5 m-0">
                        {activeTab === "QuickSearches" ? (
                            <QuickSearchTable />
                        ) : (
                            opportunityDetails?.map((opportunity: Any, index: number) => {
                                return opportunity.type === OPPORTUNITY.TYPE.QUICK_SHARE ? (
                                    <QuickshareOpportunityCard key={index} opportunity={opportunity} />
                                ) : (
                                    <MyOpportunityCard key={index} opportunity={opportunity} />
                                )
                            })
                        )}
                    </div>
                )}
            </div>
        </>
    )
}

export default OpportunityList

"use client"
import OpportunityHeader from "@/app/_components/common/OpportunityHeader"
import { FetchHelper } from "@/app/_services/FetchHelper"
import { Any, AnyObject } from "@/app/_types/common/Common"
import { CONFIG, EXTERNAL_OPPORTUNITY, OPPORTUNITY } from "@/app/_utils/Constants"
import { handleError } from "@/app/_utils/Helpers"
import { debounce } from "lodash"
import React, { useCallback, useEffect, useState } from "react"
import CardLoader from "@/app/_components/common/CardSkeleton"
import NoData from "@/app/_components/common/NoData"
import { defaultFilterOptions, defaultModalFilterOptions, FilterState, ModalFilterState } from "@/app/_types/common/OpportunityListModalFilter"
import CustomReactSelect from "@/app/_components/input/ReactSelect"
import QuickshareOpportunityCard from "@/app/_components/common/QuickshareOpportunityCard"
import ExternalOpportunityCard from "@/app/_components/card/opportunity/external-opportunity/ExternalOpportunityCard"
import QuickSearchTable from "@/app/_components/quicksearch/QuickSearchTable"
import FilterModal from "@/app/_components/modal/opportunity/FilterModal"

const ExternalOpportunityList = () => {
    const [opportunityDetails, setOpportunityDetails] = useState<AnyObject>([])
    // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
    const [loading, setIsoading] = useState<boolean>(false)
    const [filter, setFilter] = useState<FilterState>(defaultFilterOptions)
    const [showFilterModal, setShowFilterModal] = useState(false)
    const [showModalFilters, setShowModalFilters] = useState<ModalFilterState>(defaultModalFilterOptions)
    const [searchTerm, setSearchTerm] = useState<string>("")
    const [modalFilterReset, setModalFilterReset] = useState(false)
    const [isFiltersApplied, setIsFiltersApplied] = useState(true)
    const [activeTab, setActiveTab] = useState("All")

    const getExternalOpportunityListing = async () => {
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
                hide_quick_shares: filter && filter?.type == OPPORTUNITY.TYPE.QUICK_SHARE ? false : true,
            }
            let response
            if (filter?.type === OPPORTUNITY.TYPE.QUICK_SHARE) {
                response = await FetchHelper.get(CONFIG.API_ENDPOINTS.OPPORTUNITY.LIST, { ..._filter, show_network_quickshares: true })
            } else {
                response = await FetchHelper.get(CONFIG.API_ENDPOINTS.DISTRIBUTE.OPPORTUNITY, { ..._filter })
            }
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
        getExternalOpportunityListing()
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
                getOpportunityListing={getExternalOpportunityListing}
                filter={filter}
                setIsFiltersApplied={setIsFiltersApplied}
            />

            <div className="card bg-transparent">
                <OpportunityHeader title="Browse Opportunities" subtitle={"Look through all of the opportunities on the platform"}>
                    <>
                        <div className="w-250px">
                            {activeTab === "QuickShares" ? (
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
                            ) : (
                                <CustomReactSelect
                                    optionsData={OPPORTUNITY.PROPOSALS_SORTING_OPTIONS}
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
                            )}
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
                    </>
                </OpportunityHeader>
                <ul className="nav nav-tabs mb-10 fs-6 opportunity-tabs px-8 py-4 m-0 gap-1">
                    {EXTERNAL_OPPORTUNITY.TABS.map((tab, index) => (
                        <li className="nav-item" key={index}>
                            <a
                                className={`nav-link cursor-pointer ${activeTab === tab.label ? "active" : ""}`}
                                data-bs-toggle="tab"
                                onClick={() => {
                                    // Set the active tab
                                    setActiveTab(tab.label)

                                    // If switching to "QuickShares", we don't reset order_by here
                                    if (tab.label === "QuickShares") {
                                        // Preserve the QuickShares dropdown value, we don't reset order_by here
                                        setFilter((prev) => ({
                                            ...prev,
                                            type: OPPORTUNITY.TYPE.QUICK_SHARE, // Ensure we have QuickShare type
                                        }))
                                    } else {
                                        // If switching away from QuickShares, reset order_by
                                        setFilter((prev) => ({
                                            ...prev,
                                            order_by: "", // Reset the order_by filter for non-QuickShares tabs
                                            type: "", // Clear type when switching away from QuickShares
                                        }))
                                    }

                                    if (tab.type) {
                                        setFilter((prev) => ({
                                            ...prev,
                                            status: "",
                                            order_by: tab?.label !== "QuickShares" ? prev.order_by : "", // Keep order_by only for non-QuickShares tabs
                                            type: tab?.type,
                                        }))
                                    } else {
                                        setFilter((prev) => ({
                                            ...prev,
                                            status: tab?.value,
                                            order_by: tab?.label !== "QuickShares" ? prev.order_by : "", // Keep order_by for non-QuickShares tabs
                                            pinned: tab?.value == "" && tab?.label != "All" ? true : false,
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
                            opportunityDetails?.map((opportunityItem: Any, index: number) => {
                                return opportunityItem?.type === OPPORTUNITY.TYPE.QUICK_SHARE ? (
                                    <QuickshareOpportunityCard key={index} opportunity={opportunityItem} />
                                ) : (
                                    <ExternalOpportunityCard key={index} externalOpportunityItem={opportunityItem} getExternalOpportunityListing={getExternalOpportunityListing} />
                                )
                            })
                        )}
                    </div>
                )}
            </div>
        </>
    )
}

export default ExternalOpportunityList

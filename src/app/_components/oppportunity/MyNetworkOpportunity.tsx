"use client"

import React, { useEffect, useState } from "react"
import { CONFIG, OPPORTUNITY } from "@/app/_utils/Constants"
import { sliceWithEllipsis } from "@/app/_utils/Common"
import { ColumnDef } from "@tanstack/react-table"
import { AnyObject } from "@/app/_types/common/Common"
import AgentCard from "@/app/_components/card/ColumnCard"
import StickyHeaderComponent from "@/app/_components/common/StickySubHeader"
import ReactTableWithPagination from "@/app/_components/table/ReactTableWithPagination"
import { useRouter } from "next/navigation"
import { getDateMonthYearFormat } from "@/app/_utils/Date"
import CustomReactSelect from "../input/ReactSelect"
import { defaultFilterOptions, defaultModalFilterOptions, FilterState, ModalFilterState } from "@/app/_types/common/OpportunityListModalFilter"
import FilterModal from "../modal/opportunity/FilterModal"

const MyNetworkOpportunity = () => {
    const router = useRouter()
    const [showFilterModal, setShowFilterModal] = useState(false)
    const [filter, setFilter] = useState<FilterState>(defaultFilterOptions)
    const [showModalFilters, setShowModalFilters] = useState<ModalFilterState>(defaultModalFilterOptions)
    const [isFiltersApplied, setIsFiltersApplied] = useState(true)
    const [modalFilterReset, setModalFilterReset] = useState(false)
    const [extraFilter, setExtraFilters] = useState<ModalFilterState>(defaultModalFilterOptions)

    const columns = React.useMemo<ColumnDef<AnyObject>[]>(
        () => [
            {
                header: "NAME",
                accessorKey: "original",
                size: 300,
                cell: ({ row }) => (
                    <span onClick={() => router.push(`/opportunities/opportunity-details/${row?.original?.id}`)}>
                        <AgentCard
                            key={row?.original?.id}
                            imgSrc={row?.original?.firm?.logo?.original}
                            altText={"logo"}
                            name={sliceWithEllipsis(row?.original?.firm?.name, CONFIG.WORD_SLICE_LIMIT)}
                            location={row?.original?.id}
                        />
                    </span>
                ),
            },
            {
                header: "AGENT",
                accessorKey: "name",
                size: 200,
                cell: ({ row }) => (
                    <>
                        {row?.original?.firm?.initial_network?.name || "-"}
                        <br />
                        <span className="text-muted">{row?.original?.firm?.primary_contact?.name ?? "-"}</span>
                    </>
                ),
            },
            {
                header: "DATE ADDED",
                accessorKey: "created_at",
                cell: ({ row }) => <>{getDateMonthYearFormat(row?.original?.created_at) || "-"}</>,
            },
            {
                header: "PENDING RESPONSE",
                accessorKey: "pending_distributions_no",
                cell: ({ row }) => <>{row?.original?.firm?.pending_distributions_no ?? "-"}</>,
            },
            {
                header: "INTERESTED",
                accessorKey: "interested_proposals_no",
                cell: ({ row }) => <>{row?.original?.interested_proposals_no ?? "-"}</>,
            },
            {
                header: "FUNDRAISING",
                accessorKey: "fundraising_proposals_no",
                cell: ({ row }) => <>{row?.original?.fundraising_proposals_no || "-"}</>,
            },
            {
                header: "VIEWS",
                accessorKey: "views_no",
                cell: ({ row }) => <>{row?.original?.views_no || "-"}</>,
            },
            {
                header: "ACTIONS",
                accessorKey: "action",
                enableSorting: false,
                cell: ({ row }) => (
                    <a
                        onClick={() => {
                            router.push(`/opportunities/interested/${row?.original?.id}`)
                        }}
                        className="btn btn-sm btn-secondary rounded-0 text-uppercase"
                    >
                        View
                    </a>
                ),
            },
        ],
        [],
    )

    const getTableListing = () => {
        setExtraFilters(showModalFilters)
    }

    useEffect(() => {
        getTableListing()
    }, [filter, modalFilterReset])
    return (
        <>
            <FilterModal
                showModalFilters={showModalFilters}
                setShowModalFilters={setShowModalFilters}
                showFilterModal={showFilterModal}
                setShowFilterModal={setShowFilterModal}
                getOpportunityListing={getTableListing}
                filter={filter}
                setIsFiltersApplied={setIsFiltersApplied}
            />
            <StickyHeaderComponent title={CONFIG.MESSAGES.MY_NETWORK_OPPORTUNITY} showBackArrow={false} />
            <div id="kt_app_content_container" className="app-container container-fluid">
                <ReactTableWithPagination
                    columns={columns}
                    endpoint={CONFIG.API_ENDPOINTS.OPPORTUNITY.LIST}
                    extraFilters={{ show_my_network: true, ...filter, ...extraFilter }}
                    // tableHeaderTitle={CONFIG.MESSAGES.MY_NETWORK_OPPORTUNITY}
                    tableHeaderTitle={""}
                    addButtonLabel="Add Opportunity"
                    onAddButtonClick={() => router.push("/opportunities/add-opportunity")}
                    showSearchBar
                    sortingId={"-created_at"}
                    addButtonClassName="btn btn-primary text-uppercase fs-7 rounded-0 mx-2 t-bg-primary"
                    renderExtraButton={() => (
                        <>
                            {" "}
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
                            <button
                                onClick={() => {
                                    setShowFilterModal(true)
                                }}
                                className="btn bg-secondary rounded-0 w-90  mb-5 text-uppercase fs-7"
                            >
                                Filter
                            </button>{" "}
                            <button
                                type="button"
                                className="btn bg-secondary rounded-0 w-90  mb-5 text-uppercase fs-7"
                                onClick={() => {
                                    setFilter(defaultFilterOptions)
                                    setShowModalFilters(defaultModalFilterOptions)
                                    if (JSON.stringify(filter) === JSON.stringify(defaultFilterOptions)) setModalFilterReset((prev) => !prev)
                                }}
                                disabled={isFiltersApplied}
                            >
                                Reset All Filters
                            </button>
                        </>
                    )}
                />
            </div>
        </>
    )
}

export default MyNetworkOpportunity

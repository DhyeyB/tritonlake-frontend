"use client"

import React from "react"
import StickyHeaderComponent from "../common/StickySubHeader"
import { CONFIG } from "@/app/_utils/Constants"
import ReactTableWithPagination from "../table/ReactTableWithPagination"
import { sliceWithEllipsis } from "@/app/_utils/Common"
import AgentCard from "../card/ColumnCard"
import { ColumnDef } from "@tanstack/react-table"
import { AnyObject } from "@/app/_types/common/Common"
import { useParams } from "next/navigation"
import Link from "next/link"
import { formatString, getStatusClassName } from "@/app/_utils/Helpers"

const InterestedAgentListing = () => {
    const params = useParams()
    const columns = React.useMemo<ColumnDef<AnyObject>[]>(
        () => [
            {
                header: "SOLICITING AGENT",
                accessorKey: "avatar",
                cell: ({ row }) => (
                    <>
                        <AgentCard
                            key={row?.original?.id}
                            imgSrc={row?.original?.firm?.logo?.original}
                            altText={"logo"}
                            name={sliceWithEllipsis(row?.original?.firm?.name, CONFIG.WORD_SLICE_LIMIT)}
                            location={""}
                        />
                    </>
                ),
            },
            {
                header: "NETWORK",
                accessorKey: "network",
                cell: ({ row }) => <>{row?.original?.firm?.initial_network?.name || "-"}</>,
            },
            {
                header: "LOCATION",
                accessorKey: "address",
                cell: ({ row }) => <>{`${row?.original?.firm?.address?.city}, ${row?.original?.firm?.address?.country_code} ` || "-"}</>,
            },
            {
                header: "SPA PRIMARY CONTACT",
                accessorKey: "primary_contact",
                cell: ({ row }) => <>{sliceWithEllipsis(row?.original?.firm?.primary_contact?.name, CONFIG.WORD_SLICE_LIMIT) || "-"}</>,
            },
            {
                header: "ENGAGEMENT STATUS",
                accessorKey: "primary_contact",
                cell: ({ row }) => <>{row?.original?.status ? <span className={`badge ${getStatusClassName(row?.original?.status)} mx-5 fs-7`}>{formatString(row?.original?.status)}</span> : "-"}</>,
            },
            {
                header: "PASS REASON",
                accessorKey: "network_regions",
                cell: ({ row }) => <>{row?.original?.rejection_reason || "-"}</>,
            },
            {
                header: "ACTIONS",
                accessorKey: "action",
                enableSorting: false,
                cell: () => (
                    <Link legacyBehavior href={`javascript:;`}>
                        <a className="btn btn-sm btn-secondary rounded-0 text-uppercase" style={{ cursor: "not-allowed" }}>
                            Message
                        </a>
                    </Link>
                ),
            },
        ],
        [],
    )
    return (
        <>
            <StickyHeaderComponent title={CONFIG.MESSAGES.DISTRIBUTE.STICKY_HEADER_TITLE_INTERESTED_AGENTS} showBackArrow={true} showButton={true} backLink={CONFIG.REDIRECT_PATHNAME.OPPORTUNITIES}>
                {/* <button className="btn btn-primary rounded-0 w-90 my-5 mx-2 text-uppercase fs-7">Redistribute</button> */}
            </StickyHeaderComponent>
            <div id="kt_app_content_container" className="app-container container-fluid">
                <ReactTableWithPagination
                    columns={columns}
                    endpoint={CONFIG.API_ENDPOINTS.DISTRIBUTE.OPPORTUNITY}
                    extraFilters={{ opportunity_id: params?.id }}
                    tableHeaderTitle="Interested Agents"
                    showAddButton={false}
                    sortingId={"-created_at"}
                />
            </div>
        </>
    )
}

export default InterestedAgentListing

"use client"
import AgentCard from "@/app/_components/card/ColumnCard"
import withSideBarGuard from "@/app/_components/common/SideBarGuard"
import StickyHeaderComponent from "@/app/_components/common/StickySubHeader"
import ReactTableWithPagination from "@/app/_components/table/ReactTableWithPagination"
import { AnyObject } from "@/app/_types/common/Common"
import { sliceWithEllipsis } from "@/app/_utils/Common"
import { CONFIG } from "@/app/_utils/Constants"
import { getDateMonthYearFormat } from "@/app/_utils/Date"
import { ColumnDef } from "@tanstack/react-table"
import Link from "next/link"
import { useRouter } from "next/navigation"
import React from "react"

const ManageNetworks = () => {
    const router = useRouter()
    const columns = React.useMemo<ColumnDef<AnyObject>[]>(
        () => [
            {
                header: "NAME",
                accessorKey: "name",
                cell: ({ row }) => (
                    <>
                        <AgentCard
                            key={row.original.id}
                            imgSrc={row.original?.branding?.logo?.original}
                            altText={"logo"}
                            name={sliceWithEllipsis(row.original.name, CONFIG.WORD_SLICE_LIMIT)}
                            location={""}
                        />
                    </>
                ),
            },
            {
                header: "DATE ADDED",
                accessorKey: "created_at",
                cell: ({ row }) => <>{getDateMonthYearFormat(row.original.created_at)}</>,
            },
            {
                header: "FIRMS",
                accessorKey: "firms_no",
                cell: ({ row }) => <>{row.original?.firms_no}</>,
            },
            {
                header: "USERS",
                accessorKey: "agents_no",
                cell: ({ row }) => <>{row.original?.agents_no}</>,
            },
            {
                header: "OPPORTUNITIES",
                accessorKey: "total_opportunities_no",
                cell: ({ row }) => <>{row.original?.total_opportunities_no}</>,
            },
            {
                header: "ACTIONS",
                accessorKey: "action",
                enableSorting: false,
                cell: () => (
                    <div className="d-flex justify-content-around">
                        <Link legacyBehavior href={`#`}>
                            <a className="btn btn-sm btn-secondary rounded-0 text-uppercase" style={{ cursor: "not-allowed" }}>
                                view
                            </a>
                        </Link>
                    </div>
                ),
            },
        ],
        [],
    )
    return (
        <>
            <StickyHeaderComponent title="Manage Networks" showBackArrow={false} showButton={false} />
            <div id="kt_app_content_container" className="app-container container-fluid">
                <ReactTableWithPagination
                    addButtonLabel="INVITE NETWORK"
                    columns={columns}
                    endpoint={CONFIG.API_ENDPOINTS.NETWORK.LIST}
                    onAddButtonClick={() => router.push("/manage-agents/invite-agent?key=invite-network")}
                    tableHeaderTitle="All Networks"
                    showSearchBar
                    tableClassName="first-child-fix-width"
                    sortingId={"-created_at"}
                />
            </div>
        </>
    )
}

export default withSideBarGuard(ManageNetworks)

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

const ManageAgents = () => {
    const router = useRouter()
    const columns = React.useMemo<ColumnDef<AnyObject>[]>(
        () => [
            {
                header: "NAME",
                accessorKey: "firm__name",
                cell: ({ row }) => (
                    <>
                        <AgentCard
                            key={row?.original?.id}
                            imgSrc={row?.original?.firm?.logo?.original}
                            altText={""}
                            name={row?.original?.firm?.name}
                            location={row?.original?.firm?.initial_network?.address?.city + ", " + row?.original?.firm?.initial_network?.address?.country_code}
                        />
                    </>
                ),
            },
            {
                header: "DATE ADDED",
                accessorKey: "created_at",
                cell: ({ row }) => <>{getDateMonthYearFormat(row?.original?.created_at) || "-"}</>,
            },
            {
                header: "NETWORK",
                accessorKey: "firm__initial_network__name",
                cell: ({ row }) => <>{sliceWithEllipsis(row?.original?.firm?.initial_network?.name, CONFIG.WORD_SLICE_LIMIT) || "-"}</>,
            },
            {
                header: "USERS",
                accessorKey: "user",
                cell: ({ row }) => <>{sliceWithEllipsis(row?.original?.name, CONFIG.WORD_SLICE_LIMIT) || 0}</>,
            },
            {
                header: "OPPORTUNITIES",
                accessorKey: "firm__opportunities__name",
                cell: ({ row }) => <>{sliceWithEllipsis(row?.original?.name, CONFIG.WORD_SLICE_LIMIT) || 0}</>,
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
            <StickyHeaderComponent title="Manage Agents" showBackArrow={false} showButton={false} />
            <div id="kt_app_content_container" className="app-container container-fluid">
                <ReactTableWithPagination
                    addButtonLabel="INVITE AGENT"
                    columns={columns}
                    endpoint={CONFIG.API_ENDPOINTS.AGENT.LIST}
                    onAddButtonClick={() => router.push("/manage-agents/invite-agent")}
                    tableHeaderTitle="All Agents"
                    showSearchBar
                    tableClassName="first-child-fix-width"
                    sortingId={"-created_at"}
                />
            </div>
        </>
    )
}

export default withSideBarGuard(ManageAgents)

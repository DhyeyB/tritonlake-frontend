import React, { useMemo, useState } from "react"
import ReactTableWithPagination from "../table/ReactTableWithPagination"
import { usePathname, useRouter } from "next/navigation"
import { ColumnDef } from "@tanstack/react-table"
import { Any, AnyObject } from "@/app/_types/common/Common"
import Link from "next/link"
import { CONFIG } from "@/app/_utils/Constants"
import { sliceWithEllipsis } from "@/app/_utils/Common"
import { formatString, getStatusClassName, handleError, showSuccessDialog, showSweetAlert } from "@/app/_utils/Helpers"
import { FetchHelper } from "@/app/_services/FetchHelper"
import QuickSearchExpandedRow from "./QuickSearchExpandedRow"

const QuickSearchTable = () => {
    const router = useRouter()
    const pathname = usePathname()
    const [expandedRow, setExpandedRow] = useState("-1")

    const handleExpandRow = (id: string) => {
        if (id === expandedRow) {
            setExpandedRow("-1")
        } else {
            setExpandedRow(id)
        }
    }
    const [assetDeleted, setAssetDeleted] = useState<boolean>(false)
    const columns = useMemo<ColumnDef<AnyObject>[]>(
        () => [
            {
                id: "expandedRow",
                enableSorting: false,
                size: 50,
                cell: ({ row }) => (
                    <div
                        onClick={() => {
                            handleExpandRow(row.original.id)
                        }}
                    >
                        <button type="button" className="btn btn-sm btn-icon btn-light btn-active-primary toggle h-25px w-25px">
                            {expandedRow === row.original.id ? (
                                <span className="svg-icon fs-3 m-0">
                                    <i className="fa-solid fa-minus"></i>
                                </span>
                            ) : (
                                <span className="svg-icon fs-3 m-0">
                                    <i className="fa-solid fa-plus"></i>
                                </span>
                            )}
                        </button>
                    </div>
                ),
            },
            {
                header: "LP TYPE",
                accessorKey: "lp_type",
                cell: ({ row }) => <>{row?.original?.lp_type?.name || "-"}</>,
            },
            {
                header: "LP LOCATION",
                accessorKey: "lp_location",
                cell: ({ row }) => <>{row?.original?.lp_location?.name || "-"}</>,
            },
            {
                header: "SUMMARY",
                accessorKey: "summary",
                size: 200,
                cell: ({ row }) => <>{sliceWithEllipsis(row?.original?.summary, CONFIG.WORD_SLICE_LIMIT) || "-"}</>,
            },
            {
                header: "ASSET CLASS",
                accessorKey: "asset_classes",
                size: 250,
                cell: ({ row }) => <>{row?.original?.asset_classes.length > 0 ? <>{row?.original?.asset_classes?.map((assetClass: Any) => assetClass?.name).join(", ")}</> : "-"}</>,
            },
            {
                header: "STRATEGY",
                accessorKey: "strategies",
                size: 250,
                cell: ({ row }) => <>{row?.original?.industries.length > 0 ? <>{row?.original?.industries?.map((industry: Any) => industry?.name).join(", ")}</> : "-"}</>,
            },
            {
                header: "VALID UNTIL",
                accessorKey: "valid_until",
                cell: ({ row }) => <>{row?.original?.valid_until || "-"}</>,
            },
            {
                header: "STATUS",
                accessorKey: "status",
                cell: ({ row }) => <>{row?.original?.status ? <span className={`badge ${getStatusClassName(row?.original?.status)} mx-5 fs-7`}>{formatString(row?.original?.status)}</span> : "-"}</>,
            },
            {
                header: "ACTIONS",
                accessorKey: "action",
                enableSorting: false,
                cell: ({ row }) => (
                    <div className="d-flex justify-content-around">
                        <Link legacyBehavior href={"javascript:;"}>
                            <a
                                onClick={() => {
                                    showSuccessDialog({
                                        router,
                                        icon: "warning",
                                        title: "Are you sure?",
                                        text: "Do you really want to delete this opportunity?",
                                        cancelButtonText: "Cancel",
                                        confirmButtonText: "Yes, Delete Opportunity",
                                        onConfirm: async () => {
                                            const RequestHelper = FetchHelper.delete
                                            const url = new URL(`${CONFIG.API_ENDPOINTS.OPPORTUNITY_FORM.QUICK_SEARCH}/${row?.original?.id}`)
                                            try {
                                                const response = await RequestHelper(url, {})
                                                if (response?.status_code === CONFIG.STATUS_CODES.NO_CONTENT) {
                                                    setAssetDeleted(!assetDeleted)
                                                    showSweetAlert("Opportunity deleted successfully", "success")
                                                }
                                            } catch (error) {
                                                handleError(error)
                                            }
                                        },
                                    })
                                }}
                                className="btn btn-sm btn-icon btn-light btn-active-primary h-25px w-25px delete-quicksearch"
                            >
                                <i className="fa-solid fa-trash"></i>
                            </a>
                        </Link>
                    </div>
                ),
            },
        ],
        [expandedRow],
    )
    return (
        <ReactTableWithPagination
            showAddButton={false}
            columns={columns}
            assetDeleted={assetDeleted}
            endpoint={CONFIG.API_ENDPOINTS.OPPORTUNITY_FORM.QUICK_SEARCH}
            extraFilters={{ show_external: pathname.includes("/external-opportunity") ? true : false }}
            tableHeaderTitle="QuickSearches"
            tableContainerClassName="mt-0"
            sortingId={"-created_at"}
            expandedRowId={expandedRow}
            renderExpandedRow={(id, data) => <QuickSearchExpandedRow key={id} quickSearchDetail={data} />}
        />
    )
}

export default QuickSearchTable

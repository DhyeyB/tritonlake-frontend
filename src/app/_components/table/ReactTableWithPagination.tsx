import { ReactTableWithPaginationPropType } from "@/_types/components/table/ReactTableWithPagination"
import { FetchHelper } from "@/app/_services/FetchHelper"
import { CONFIG } from "@/app/_utils/Constants"
import { handleError } from "@/app/_utils/Helpers"
import { getCoreRowModel, RowSelectionState, SortingState, useReactTable } from "@tanstack/react-table"
import { debounce } from "lodash"
import { useEffect, useMemo, useState } from "react"
import ReactTable from "./ReactTable"
import TablePagination from "./TablePagination"
import useDataDeletionEffect from "@/app/_hooks/UseDataDeletionEffect"

const ReactTableWithPagination: React.FC<ReactTableWithPaginationPropType> = (props) => {
    const {
        columns,
        endpoint,
        tableHeaderTitle,
        onAddButtonClick,
        addButtonLabel,
        addButtonClassName,
        getFetchResponse,
        showSearchBar = false,
        showAddButton = true,
        assetDeleted = false,
        dependencies = [],
        extraFilters = {},
        tableClassName,
        rowCount,
        sortingId,
        showTableHeader = true,
        stopVh = false,
        handleCheckBoxState,
        expandedRowId,
        renderExpandedRow,
        tableContainerClassName,
        renderExtraButton,
    } = props
    const [loading, setLoading] = useState(false)
    // this initial render state prevents the duplicate calling of API for the first time
    const [initialRender, setInitialRender] = useState(false)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [data, setData] = useState<any[]>([])
    const [totalCount, setTotalCount] = useState(0)
    const [sorting, setSorting] = useState<SortingState>(sortingId ? [{ id: sortingId, desc: false }] : sortingId === null ? [] : [{ id: "", desc: false }])
    const [filter, setFilter] = useState({
        search_term: "",
        page: CONFIG.PAGINATION.PAGE,
        page_size: CONFIG.PAGINATION.SIZE,
        pagination_type: CONFIG.PAGINATION.TYPE,
    })
    const [rowSelection, setRowSelection] = useState<RowSelectionState>({})

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const memoizedExtraFilters = useMemo(() => extraFilters, [JSON.stringify(extraFilters)])

    const reloadData = useDataDeletionEffect({
        data,
        filters: filter,
        initialRender,
        setFilters: setFilter,
        assetDeleted,
    })

    const getData = async () => {
        try {
            setLoading(true)
            let _filter: object = {
                ...filter,
            }
            if (sorting?.length) {
                _filter = {
                    order_by: sorting[0].desc ? "-" + sorting[0].id : sorting[0].id,
                    ...extraFilters,
                    ...filter,
                }
            }
            const response = await FetchHelper.get(endpoint, { ..._filter })

            if (response?.results) {
                setData(response.results)
                setTotalCount(response.count)
                // this method is exposed to parent component to pass response to parent
                // that will help to set total count for card component
                if (getFetchResponse) {
                    getFetchResponse(response)
                }
            }
        } catch (error) {
            handleError(error)
        } finally {
            setLoading(false)
        }
    }
    const _data = useMemo(() => data, [data])

    const { getHeaderGroups, getRowModel, getFooterGroups, getSelectedRowModel } = useReactTable({
        columns,
        data: _data,
        getRowId: (row) => row.id,
        getCoreRowModel: getCoreRowModel(),
        manualPagination: true,
        manualFiltering: true,
        onSortingChange: setSorting,
        manualSorting: true,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            rowSelection,
        },
    })

    const debouncedSearch = debounce((search_term: string) => {
        setFilter((prev) => ({
            ...prev,
            search_term,
            page: CONFIG.PAGINATION.PAGE,
        }))
    }, CONFIG.DEBOUNCE_TIMEOUT)

    useEffect(() => {
        getData()
        if (!initialRender) {
            setInitialRender(true)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filter, sorting, reloadData, memoizedExtraFilters, ...dependencies])

    useEffect(() => {
        if (handleCheckBoxState) {
            handleCheckBoxState(getSelectedRowModel(), rowSelection)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [rowSelection])

    return (
        <>
            <div className={`card mb-5 mt-100 ${tableContainerClassName}`}>
                {showTableHeader && (
                    <div className="card-header border-0 pt-6">
                        <div className="card-title">
                            <h3 className="">{tableHeaderTitle}</h3>
                        </div>
                        <div className="card-toolbar">
                            <div className="d-flex justify-content-end flex-wrap gap-2">
                                <div className="position-relative me-md-2">
                                    {showSearchBar && (
                                        <input
                                            type="text"
                                            data-kt-filter="search"
                                            className="form-control form-control-solid ps-10 w-250px"
                                            placeholder="Search"
                                            onChange={(e) => {
                                                if (e.target.value.trim() || filter.search_term) {
                                                    debouncedSearch(e.target.value.trim())
                                                }
                                            }}
                                        />
                                    )}
                                </div>
                                {renderExtraButton && renderExtraButton()}
                                <div className="my-0">
                                    {showAddButton && (
                                        <a role="button" className={`btn bg-secondary rounded-0 w-90  mb-5 text-uppercase fs-7 ${addButtonClassName}`} onClick={onAddButtonClick}>
                                            {addButtonLabel}
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                <div className="card-body pt-0">
                    <div className="table-responsive">
                        <ReactTable
                            getFooterGroups={getFooterGroups}
                            getHeaderGroups={getHeaderGroups}
                            getRowModel={getRowModel}
                            className={`episode-react-table ${tableClassName}`}
                            loading={loading}
                            rowCount={rowCount}
                            stopVh={stopVh}
                            expandedRowId={expandedRowId}
                            renderExpandedRow={renderExpandedRow}
                        />
                    </div>
                    <TablePagination pagination={filter} setPagination={setFilter} totalCount={totalCount} />
                </div>
            </div>
        </>
    )
}

export default ReactTableWithPagination

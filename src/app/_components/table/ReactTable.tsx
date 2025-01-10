import { ReactTableProps, RowId } from "@/_types/components/table/ReactTable"
import { CONFIG } from "@/app/_utils/Constants"
import { flexRender } from "@tanstack/react-table"
import CustomSkeleton from "../common/CustomSkeleton"
import NoData from "../common/NoData"

const ReactTable = <T extends RowId>({
    getFooterGroups,
    getHeaderGroups,
    getRowModel,
    className,
    expandedRowId,
    renderExpandedRow,
    loading,
    rowCount = CONFIG.DEFAULT_TABLE_SKELETON_ROW_COUNT,
    stopVh = false,
}: ReactTableProps<T>) => {
    const totalColumns = getHeaderGroups().reduce((acc, headerGroup) => acc + headerGroup.headers.length, 0)
    return (
        <table className={`table dataTable align-middle table-row-dashed fs-6 gy-5 ${className ? className : ""}`} id="games-table">
            <thead>
                {getHeaderGroups().map((headerGroup) => (
                    <tr key={headerGroup.id} className="text-start text-gray-400 fw-bold fs-7 text-uppercase gs-0">
                        {headerGroup.headers.map((header) => (
                            <>
                                <th
                                    key={header.id}
                                    className={`min-w-150px ${header.column.getCanSort() ? "cursor-pointer sorting" : ""} ${
                                        header.column.getIsSorted() ? "sorting_" + header.column.getIsSorted() : ""
                                    } `}
                                    onClick={header.column.getToggleSortingHandler()}
                                    style={{ width: `${header.getSize()}px` }}
                                >
                                    {flexRender(header.column.columnDef.header, header.getContext())}
                                </th>
                            </>
                        ))}
                    </tr>
                ))}
            </thead>
            <tbody className="fw-semibold text-gray-600">
                {loading ? (
                    <tr>
                        <td colSpan={totalColumns}>
                            <CustomSkeleton stopVh={stopVh} rowCount={rowCount} />
                        </td>
                    </tr>
                ) : getRowModel().rows.length === 0 && !loading ? (
                    <tr>
                        <td colSpan={totalColumns}>
                            <NoData />
                        </td>
                    </tr>
                ) : (
                    getRowModel().rows.map((row) => (
                        <>
                            <tr key={row.id}>
                                {row.getVisibleCells().map((cell) => (
                                    <td
                                        key={cell.id}
                                        style={{
                                            width: cell.column.getSize(),
                                        }}
                                    >
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </td>
                                ))}
                            </tr>
                            {expandedRowId === row.original.id && renderExpandedRow && renderExpandedRow(row.original.id, row.original)}
                        </>
                    ))
                )}
            </tbody>
            <tfoot>
                {getFooterGroups().map((footerGroup) => (
                    <tr key={footerGroup.id}>
                        {footerGroup.headers.map((header) => (
                            <th key={header.id}>{header.isPlaceholder ? null : flexRender(header.column.columnDef.footer, header.getContext())}</th>
                        ))}
                    </tr>
                ))}
            </tfoot>
        </table>
    )
}

export default ReactTable

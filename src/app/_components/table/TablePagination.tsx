import { TablePaginationPropType } from "@/_types/components/table/Pagination"
import { CONFIG } from "@/app/_utils/Constants"
import React from "react"
import Pagination from "../pagination"

const TablePagination: React.FC<Omit<TablePaginationPropType, "colSpan">> = (props) => {
    const { pagination, setPagination, totalCount } = props
    return (
        <div className="d-flex justify-content-between">
            <div>
                {totalCount >= CONFIG.PAGE_SIZE_OPTIONS[12] ? (
                    <div className="dataTables_length" id="movie-table_length">
                        <label>
                            <select
                                name="movie-table_length"
                                aria-controls="movie-table"
                                className="form-select form-select-sm form-select-solid"
                                onChange={(e) =>
                                    setPagination((prev: object) => ({
                                        ...prev,
                                        page_size: Number(e.target.value),
                                        page: CONFIG.PAGINATION.PAGE,
                                    }))
                                }
                            >
                                {Object.values(CONFIG.PAGE_SIZE_OPTIONS).map((item) => (
                                    <option key={item} value={item} selected={item === pagination.size}>
                                        {item}
                                    </option>
                                ))}
                            </select>
                        </label>
                    </div>
                ) : (
                    <></>
                )}
            </div>
            {!!totalCount && (
                <div>
                    <Pagination
                        onChange={(e, value) => setPagination((prev: object) => ({ ...prev, page: value }))}
                        totalCount={totalCount}
                        onPageChange={(value) => setPagination((prev: object) => ({ ...prev, page: value }))}
                        page={pagination.page}
                        page_size={pagination.page_size}
                    />
                </div>
            )}
        </div>
    )
}

export default TablePagination

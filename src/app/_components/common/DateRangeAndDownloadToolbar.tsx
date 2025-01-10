import React from "react"
import FlatPickrInput from "../input/FlatPickrInput"
import { DateRangeAndDownloadToolbarProps } from "@/app/_types/common/Common"
import { FetchHelper } from "@/app/_services/FetchHelper"
import { handleError, showSweetAlert } from "@/app/_utils/Helpers"
import dayjs from "dayjs"
import customParseFormat from "dayjs/plugin/customParseFormat"
import { SweetAlertIcon } from "sweetalert2"
import { CONFIG } from "@/app/_utils/Constants"

const DateRangeAndDownloadToolbar: React.FC<DateRangeAndDownloadToolbarProps> = ({
    isActionsDisabled,
    extraFilters,
    setExtraFilters,
    url,
    showAddButton = false,
    addButtonTitle = "",
    onAddButton,
    pdfTitle,
}) => {
    const handleDownloadButton = async () => {
        try {
            const downloadUrl = new URL(url)
            downloadUrl.searchParams.append("start_date", extraFilters.start_date)
            downloadUrl.searchParams.append("end_date", extraFilters.end_date)
            downloadUrl.searchParams.append("export", "True")
            downloadUrl.searchParams.append("page", "1")
            downloadUrl.searchParams.append("size", "-1")
            const response = await FetchHelper.getBlobResponse(downloadUrl)
            if (response) {
                const downloadUrl = window.URL.createObjectURL(response)
                const link = document.createElement("a")
                link.href = downloadUrl
                let dateRange = ""
                dayjs.extend(customParseFormat)
                if (extraFilters.start_date) {
                    dateRange += "_" + dayjs(extraFilters.start_date, "DD-MM-YYYY").format("YYYYMMDD")
                    if (extraFilters.end_date) {
                        dateRange += `-${dayjs(extraFilters.end_date, "DD-MM-YYYY").format("YYYYMMDD")}`
                    }
                }
                // Set the download attribute with a filename
                link.download = `${pdfTitle}${dateRange}.xlsx`
                document.body.appendChild(link)
                link.click()
                // Clean up
                document.body.removeChild(link)
                window.URL.revokeObjectURL(downloadUrl)
                showSweetAlert(CONFIG.MESSAGES.FILE_DOWNLOADED_SUCCESSFULLY, CONFIG.SWEETALERT_SUCCESS_OPTION.icon as SweetAlertIcon)
            }
        } catch (error) {
            handleError(error)
        }
    }

    const handleDateChange = (dates: Date[]) => {
        if (dates.length > 0) {
            const [start, end] = dates
            const formattedStart = start ? dayjs(start).format("DD-MM-YYYY") : ""
            const formattedEnd = end ? dayjs(end).format("DD-MM-YYYY") : ""

            setExtraFilters((prev) => ({
                ...prev,
                start_date: formattedStart,
                end_date: formattedEnd,
            }))
        } else {
            setExtraFilters((prev) => ({
                ...prev,
                start_date: "",
                end_date: "",
            }))
        }
    }

    return (
        <div className="card-toolbar">
            <div className="d-flex flex-stack flex-wrap gap-4">
                <FlatPickrInput
                    showCalendarIcon={true}
                    className={`filter-date-range ${isActionsDisabled ? "not-allowed" : ""}`}
                    label=""
                    placeholder="DD/MM/YY To DD/MM/YY"
                    options={{
                        dateFormat: "d M Y", // User-friendly format for display
                        mode: "range",
                        maxDate: new Date(),
                    }}
                    onChange={handleDateChange}
                    disabled={isActionsDisabled}
                />
                <button className="btn btn-primary" onClick={handleDownloadButton} disabled={isActionsDisabled}>
                    Download
                </button>
                {showAddButton && (
                    <div className="card-toolbar">
                        <div className="d-flex flex-stack flex-wrap gap-4">
                            <button className="btn btn-primary" onClick={() => onAddButton && onAddButton()}>
                                <span>+ Add {addButtonTitle}</span>
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default DateRangeAndDownloadToolbar

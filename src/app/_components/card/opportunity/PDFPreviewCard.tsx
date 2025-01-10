"use client"

import { PDFPreviewCardType } from "@/app/_types/common/PDFPreviewCard"
import { sliceWithEllipsis } from "@/app/_utils/Common"
import { CONFIG } from "@/app/_utils/Constants"

const PDFPreviewCard: React.FC<PDFPreviewCardType> = ({ showDelete, title, description, subDescription, onDelete, id, imgSource, fileUrl }) => {
    const handleDelete = (id: string | number, name: string) => {
        if (onDelete) {
            onDelete(id, name)
        }
    }
    return (
        <div className="card card-bordered h-100">
            <div className="card-body d-flex justify-content-center text-center flex-column p-8">
                <a
                    role="button"
                    className="text-gray-800 text-hover-primary d-flex flex-column"
                    onClick={() => {
                        fileUrl && window.open(fileUrl, "__blank")
                    }}
                >
                    <div className="symbol symbol-60px mb-5">
                        <img src={imgSource} className="theme-light-show" alt="" />
                    </div>

                    <div className="fs-5 fw-bold mb-2">{sliceWithEllipsis(title, CONFIG.VALIDATION.CHARACTER_LENGTH.FIFTEEN_CHARACTERS)}</div>
                </a>

                <div className="fs-7 fw-semibold text-gray-500">{description}</div>
                <div className="fs-7 fw-semibold text-gray-500">{subDescription}</div>
                {showDelete && (
                    <button type="button" className="btn btn-sm mt-5 btn-danger w-200px text-center btn-flex btn-center d-block mx-auto max-w-100 mt-auto" onClick={() => handleDelete(id, title)}>
                        <span className="indicator-label">Delete File</span>
                    </button>
                )}
            </div>
        </div>
    )
}

export default PDFPreviewCard

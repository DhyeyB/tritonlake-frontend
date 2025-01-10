import { sliceWithEllipsis } from "@/app/_utils/Common"
import { CONFIG } from "@/app/_utils/Constants"
import { convertBytesToKB, formatFileSize } from "@/app/_utils/GetFileSize"
import React from "react"
import { Spinner } from "react-bootstrap"
import Icon from "./Icon"
import { PdfFilePreviewProps } from "@/app/_types/common/PdfFilePreview"

const PdfFilePreview = ({ setFile, file, isDisabled, index, onRemove }: PdfFilePreviewProps) => {
    return (
        <>
            <div className="dz-preview dz-file-preview dz-processing dz-error dz-complete position-relative">
                <div className="dz-image">
                    <img data-dz-thumbnail alt="" />
                </div>

                <div className="dz-details">
                    <div className="dz-size">
                        {file && (
                            <span data-dz-size>
                                <strong>{formatFileSize(convertBytesToKB(file.size))}</strong>
                            </span>
                        )}
                    </div>
                    {isDisabled && <Spinner className="file-preview-spinner" />}
                    <div className="dz-filename">
                        {file && (
                            <span data-dz-name className="text-break">
                                {sliceWithEllipsis(file.name, CONFIG.USER_CARD_WORD_SLICE_LIMIT)}
                            </span>
                        )}
                    </div>
                </div>

                <div className="dz-progress">
                    <span className="dz-upload" data-dz-uploadprogress></span>
                </div>

                <div className="dz-success-mark">
                    <svg width="54px" height="54px" viewBox="0 0 54 54" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                        <title>Check</title>
                        <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                            <path
                                d="M23.5,31.8431458 L17.5852419,25.9283877 C16.0248253,24.3679711 13.4910294,24.366835 11.9289322,25.9289322 C10.3700136,27.4878508 10.3665912,30.0234455 11.9283877,31.5852419 L20.4147581,40.0716123 C20.5133999,40.1702541 20.6159315,40.2626649 20.7218615,40.3488435 C22.2835669,41.8725651 24.794234,41.8626202 26.3461564,40.3106978 L43.3106978,23.3461564 C44.8771021,21.7797521 44.8758057,19.2483887 43.3137085,17.6862915 C41.7547899,16.1273729 39.2176035,16.1255422 37.6538436,17.6893022 L23.5,31.8431458 Z M27,53 C41.3594035,53 53,41.3594035 53,27 C53,12.6405965 41.3594035,1 27,1 C12.6405965,1 1,12.6405965 1,27 C1,41.3594035 12.6405965,53 27,53 Z"
                                strokeOpacity="0.198794158"
                                stroke="#747474"
                                fillOpacity="0.816519475"
                                fill="#FFFFFF"
                            ></path>
                        </g>
                    </svg>
                </div>

                <div
                    role="button"
                    className="position-absolute file-preview-cross-btn"
                    onClick={(e) => {
                        e.stopPropagation()
                        if (index?.toString()) {
                            onRemove && onRemove(file as File)
                        } else {
                            setFile(null)
                            onRemove && onRemove(file as File)
                        }
                    }}
                >
                    <Icon iconName="cross" width={25} height={25} />
                </div>
            </div>
        </>
    )
}

export default PdfFilePreview

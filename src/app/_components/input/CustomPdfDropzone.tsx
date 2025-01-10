import React from "react"
import InputDropzone from "./InputDropzone"
import { FileError } from "react-dropzone"
import { SweetAlertIcon } from "sweetalert2"
import { CONFIG, FILE_TYPE } from "@/app/_utils/Constants"
import { showSweetAlert } from "@/app/_utils/Helpers"
import { convertMBToBytes } from "@/app/_utils/GetFileSize"
import ShowFormError from "../common/ShowFormError"
import Label from "./Label"
import { CustomPdfDropzoneProps } from "@/app/_types/common/CustomInputDropZoneTypes"

const CustomPdfDropzone: React.FC<CustomPdfDropzoneProps> = ({ label, isRequired, maxSize, errorMsg, onDrop }) => {
    return (
        <div className="col-md-12 fv-row fv-plugins-icon-container">
            <Label label={label} isRequired={isRequired} />
            <InputDropzone
                onDrop={(files: File[]) => {
                    if (onDrop) {
                        onDrop(files)
                    }
                }}
                onError={(error) => {
                    if ((error as FileError).code === CONFIG.CODE.FILE_TOO_LARGE) {
                        showSweetAlert(`You can only upload file up to 5 MB`, CONFIG.SWEETALERT_ERROR_OPTION.icon as SweetAlertIcon)
                        return
                    }
                    showSweetAlert(
                        (error as FileError).code === CONFIG.CODE.INVALID_FILE_TYPE ? CONFIG.MESSAGES.ONLY_PDF_AND_DOCX_ACCEPTED : error.message,
                        CONFIG.SWEETALERT_ERROR_OPTION.icon as SweetAlertIcon,
                    )
                }}
                type={{ ...FILE_TYPE.DOC, ...FILE_TYPE.PDF }}
                disabled={false}
                multiple={true} // Single file upload, set `multiple` to false
                dropZoneOption={{
                    maxSize: convertMBToBytes(maxSize),
                }}
            >
                <div className="dz-message needsclick">
                    <i className="ki-duotone ki-file-up fs-3x text-primary"></i>
                    <div className="ms-4">
                        <h3 className="fs-5 fw-bold text-gray-900 mb-1">Drop files here or click to upload.</h3>
                        <span className="fs-7 fw-semibold text-gray-800">Allows .pdf and .doc files</span>
                    </div>
                </div>
            </InputDropzone>
            <ShowFormError className="ms-1" message={errorMsg} />
        </div>
    )
}

export default CustomPdfDropzone

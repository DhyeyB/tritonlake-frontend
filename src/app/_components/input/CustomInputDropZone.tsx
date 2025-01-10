import React from "react"
import InputDropzone from "./InputDropzone"
import { FileError } from "react-dropzone"
import { SweetAlertIcon } from "sweetalert2"
import { CONFIG, FILE_TYPE } from "@/app/_utils/Constants"
import { showSweetAlert } from "@/app/_utils/Helpers"
import { convertMBToBytes } from "@/app/_utils/GetFileSize"
import PdfFilePreview from "../common/PdfFilePreview"
import ShowFormError from "../common/ShowFormError"
import Label from "./Label"
import { CustomInputDropzoneProps } from "@/app/_types/common/CustomInputDropZoneTypes"

const CustomInputDropzone: React.FC<CustomInputDropzoneProps> = ({ label, isRequired, maxSize, setFile, file, errorMsg, onDrop, labelClassName }) => {
    return (
        <div className="col-md-12 fv-row fv-plugins-icon-container">
            <Label label={label} isRequired={isRequired} labelClass={`fs-5 fw-semibold mb-2 ${labelClassName}`} />
            <InputDropzone
                onDrop={(files: File) => {
                    setFile(files as File)
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
                        (error as FileError).code === CONFIG.CODE.INVALID_FILE_TYPE ? CONFIG.MESSAGES.ONLY_IMAGE_ACCEPTED : error.message,
                        CONFIG.SWEETALERT_ERROR_OPTION.icon as SweetAlertIcon,
                    )
                }}
                type={{ ...FILE_TYPE.IMAGE }}
                disabled={false}
                multiple={false} // Single file upload, set `multiple` to false
                dropZoneOption={{
                    maxSize: convertMBToBytes(maxSize),
                }}
            >
                {file ? (
                    <PdfFilePreview
                        setFile={setFile}
                        file={file}
                        isDisabled={false}
                        onRemove={() => {
                            onDrop && onDrop(null)
                        }}
                    />
                ) : (
                    <div className="dz-message needsclick">
                        <i className="ki-duotone ki-file-up fs-3x text-primary"></i>
                        <div className="ms-4">
                            <h3 className="fs-5 fw-bold text-gray-900 mb-1">Add A Cover Image</h3>
                            <span className="fs-7 fw-semibold text-gray-800">Recommended size: 450 x 160px</span>
                        </div>
                    </div>
                )}
            </InputDropzone>
            <ShowFormError className="ms-1" message={errorMsg} />
        </div>
    )
}

export default CustomInputDropzone

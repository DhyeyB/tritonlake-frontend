import { InputUploadDropzone } from "@/_types/common/Dropzone"
import React from "react"
import { FileRejection, useDropzone } from "react-dropzone"

const InputDropzone: React.FC<InputUploadDropzone> = ({
    type,
    onDrop: onFileDrop,
    onError,
    children,
    disabled,
    innerDivcustomClass = "",
    multiple,
    containerCustomClass = "",
    dropZoneOption,
    ...props
}) => {
    const onDrop = (acceptedFiles: File[], rejectedFiles: FileRejection[]) => {
        if (rejectedFiles.length === 0) {
            if (multiple) {
                onFileDrop(acceptedFiles)
            } else {
                onFileDrop(acceptedFiles[0])
            }
        } else if (rejectedFiles.length) {
            onError(rejectedFiles[0]?.errors?.[0])
        }
    }
    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: type,
        onError,
        disabled,
        multiple,
        ...props,
        ...dropZoneOption,
    })

    return (
        <div className={` dropzone dz-clickable w-100 p-0 border-0 ${disabled ? "pe-none" : ""} ${containerCustomClass}`}>
            <div {...getRootProps()} className={`dropzone ${innerDivcustomClass}`}>
                <input {...getInputProps()} />
                {children}
            </div>
        </div>
    )
}

export default InputDropzone

import { ImageEditPropType } from "@/app/_types/common/ImageEdit"
import { uploadImage } from "@/app/_utils/Backend"
import { CONFIG, FILE_TYPE } from "@/app/_utils/Constants"
import { getImageUrl, getResizedImage, handleError } from "@/app/_utils/Helpers"
import { useEffect, useState } from "react"
import { Spinner } from "react-bootstrap"
import { FileRejection, useDropzone } from "react-dropzone"
import Icon from "./Icon"

/**
 *   ImageEdit component allows users to upload and edit images.
 * It supports drag-and-drop functionality and displays the uploaded image.
 */
const ImageEdit: React.FC<ImageEditPropType> = ({ image, onUploaded, dropzoneProps, imageProps, onDeleted, onUploadStarted = () => {}, size = CONFIG.IMAGE_SIZE.DEFAULT }) => {
    const [resizedImage, setResizedImage] = useState(getImageUrl(image, size))
    const [loading, setLoading] = useState(false)
    const onDrop = async (acceptedFiles: File[], rejectedFiles: FileRejection[]) => {
        if (rejectedFiles.length) {
            return handleError(rejectedFiles[0]?.errors[0]?.message)
        } else if (acceptedFiles.length === 0) {
            return
        }
        try {
            setLoading(true)
            onUploadStarted()
            const image = await uploadImage(acceptedFiles[0])
            onUploaded(image)
        } catch (error) {
            handleError(error)
        } finally {
            setLoading(false)
        }
    }
    const removeImage = () => {
        onDeleted()
    }
    const { getRootProps, getInputProps, open } = useDropzone({
        onDrop,
        disabled: loading,
        multiple: false,
        accept: { ...FILE_TYPE.IMAGE },
        ...dropzoneProps,
    })
    useEffect(() => {
        if (image) {
            const img = getResizedImage(image, size)
            setResizedImage(img)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [image])
    return (
        <div className="container dropzone-container px-0">
            <div {...getRootProps()} onClick={(e) => e.stopPropagation()}>
                <input {...getInputProps()} />
                <div className={`image-input image-input-outline image-input-empty`}>
                    <div
                        className="image-input-wrapper w-50px h-50px image-preview"
                        style={{
                            backgroundImage: image ? "none" : "url('/assets/media/svg/avatars/blank.svg')",
                        }}
                    >
                        {image && <img src={resizedImage} alt="Uploaded" className="dropzone-container-image" {...imageProps} />}
                        {loading && (
                            <div className="dropzone-container-spinner">
                                <Spinner />
                            </div>
                        )}
                        <label className="btn btn-icon btn-circle btn-color-muted btn-active-color-primary w-25px h-25px bg-body shadow dark-hover pencil-btn" onClick={() => !loading && open()}>
                            <Icon iconName="pencil" />
                        </label>
                        {image && (
                            <label
                                className={`btn btn-icon btn-circle btn-color-muted btn-active-color-primary w-25px h-25px bg-body shadow dark-hover d-flex cross-btn`}
                                onClick={() => removeImage()}
                                style={{ zIndex: 1 }}
                            >
                                <Icon iconName="cross" height={19} width={19} />
                            </label>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ImageEdit

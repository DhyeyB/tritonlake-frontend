import { DropzoneOptions } from "react-dropzone"

export interface AssetImage {
    id: string
    thumbnail: string
    banner: string
    original: string
    resizer_url: string
    path: string
    deleted_at: string | null
    updated_at: string | null
    created_at: string | null
    name: string
    width: number
    height: number
    uploaded: boolean
    extension: string
    size: string
    token: string
}

export interface ImageEditPropType {
    /**
     * Additional props for the dropzone component.
     */
    dropzoneProps?: DropzoneOptions
    /**
     * Existing image object to be displayed.
     */
    image?: AssetImage
    /**
     * Callback function to be called after the image is uploaded.
     * @param image - Object containing the uploaded image.
     */
    onUploaded: (image: AssetImage) => void
    /**
     * Callback function to be called when the image is removed.
     */
    onDeleted: () => void
    /**
     * Additional props for the image element.
     */
    imageProps?: React.HTMLAttributes<HTMLImageElement>

    /**
     * Callback function to be called when the image upload starts.
     */
    onUploadStarted?: () => void // useful when parent component disables the submit button inside form while the image is being uploading

    /**
     * width x height as size of the image to resize the image
     */
    size?: string
}

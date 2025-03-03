import { Any } from "@/app/_types/common/Common"
import React from "react"

const DocFileList = ({ docFiles, setDocFile, onRemove }: { docFiles: File[]; setDocFile: Any; onRemove: (id: string) => void }) => {
    const handleFileDelete = (fileId: string) => {
        setDocFile(docFiles.filter((file: Any) => file?.id !== fileId))
    }
    return (
        docFiles &&
        docFiles.map((fileItem: Any) => {
            return (
                <>
                    <div className="d-flex mt-5">
                        <div className="symbol symbol-40px me-5">
                            <img alt="Logo" src="/assets/media/icons/pdficon.svg" />
                        </div>
                        <a href="javascript:;" className="text-gray-800 text-hover-primary mb-1 pt-2 w-100">
                            {fileItem?.name} <br /> <span className="text-muted">PDF</span>
                        </a>

                        <button
                            id="deleteButton"
                            className="btn btn-sm btn-light-danger rounded-0"
                            type="button"
                            onClick={() => {
                                handleFileDelete(fileItem?.id)
                                onRemove(fileItem.id)
                            }}
                        >
                            <svg width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                                <defs />
                                <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                    <rect x="0" y="0" width="24" height="24" />
                                    <path
                                        d="M6,8 L18,8 L17.106535,19.6150447 C17.04642,20.3965405 16.3947578,21 15.6109533,21 L8.38904671,21 C7.60524225,21 6.95358004,20.3965405 6.89346498,19.6150447 L6,8 Z M8,10 L8.45438229,14.0894406 L15.5517885,14.0339036 L16,10 L8,10 Z"
                                        fill="#000000"
                                        fill-rule="nonzero"
                                    />
                                    <path
                                        d="M14,4.5 L14,3.5 C14,3.22385763 13.7761424,3 13.5,3 L10.5,3 C10.2238576,3 10,3.22385763 10,3.5 L10,4.5 L5.5,4.5 C5.22385763,4.5 5,4.72385763 5,5 L5,5.5 C5,5.77614237 5.22385763,6 5.5,6 L18.5,6 C18.7761424,6 19,5.77614237 19,5.5 L19,5 C19,4.72385763 18.7761424,4.5 18.5,4.5 L14,4.5 Z"
                                        fill="#000000"
                                        opacity="0.3"
                                    />
                                </g>
                            </svg>{" "}
                        </button>
                    </div>
                </>
            )
        })
    )
}

export default DocFileList

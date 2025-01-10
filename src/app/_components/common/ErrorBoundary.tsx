"use client"
import { ErrorBoundaryPropType, ErrorBoundaryStateType } from "@/_types/common/ErrorBoundary"
import { getDefaultRedirectUrl } from "@/app/_utils/Common"
import { CONFIG } from "@/app/_utils/Constants"
import React, { ErrorInfo } from "react"

class ErrorBoundary extends React.Component<ErrorBoundaryPropType, ErrorBoundaryStateType> {
    constructor(props: ErrorBoundaryPropType) {
        super(props)
        // Define a state variable to track whether is an error or not
        this.state = { hasError: false }
    }
    static getDerivedStateFromError(error: Error) {
        // Update state so the next render will show the fallback UI
        console.log(error)
        return { hasError: true }
    }
    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        // You can use your own error logging service here
        console.log({ error, errorInfo })
    }
    render() {
        // Check if the error is thrown
        if (this.state.hasError) {
            // You can render any custom fallback UI
            return (
                <div className="d-flex flex-column flex-root error-page" id="kt_app_root">
                    <div className="d-flex flex-column flex-center flex-column-fluid">
                        <div className="d-flex flex-column flex-center text-center p-10">
                            <div className="card card-flush w-lg-650px py-5">
                                <div className="card-body py-15 py-lg-20">
                                    <h1 className="fw-bolder fs-2hx text-gray-900 mb-4">System Error</h1>
                                    <div className="fw-semibold fs-6 text-gray-500 mb-7">Something went wrong! Please try again later.</div>
                                    <div className="mb-3">
                                        <img src="/assets/media/auth/500-error.png" className="mw-100 mh-300px theme-light-show" alt="" />
                                        <img src="/assets/media/auth/500-error-dark.png" className="mw-100 mh-300px theme-dark-show" alt="" />
                                    </div>
                                    <div className="mb-0">
                                        <a href={getDefaultRedirectUrl(localStorage.getItem(CONFIG.LOCAL_STORAGE_VARIABLES.ROLE) || "")} className="btn btn-sm btn-primary">
                                            Return Home
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
        // Return children components in case of no error
        return this.props.children
    }
}
export default ErrorBoundary

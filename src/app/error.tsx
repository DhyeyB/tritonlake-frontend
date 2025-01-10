"use client"
import { NextPage } from "next"
import { handleSignOut } from "./_utils/Helpers"
import { useRouter } from "next/navigation"

const NotFoundPage: NextPage = () => {
    const router = useRouter()
    return (
        <div className="d-flex flex-column flex-root error-page" id="kt_app_root">
            <div className="d-flex flex-column flex-center flex-column-fluid">
                <div className="d-flex flex-column flex-center text-center p-10">
                    <div className="card card-flush w-lg-650px py-5">
                        <div className="card-body py-15 py-lg-20">
                            <h1 className="fw-bolder fs-2hx text-gray-900 mb-4">System Error</h1>
                            <div className="fw-semibold fs-6 text-gray-500 mb-7">Something went wrong! Please try again later.</div>
                            <div className="mb-3">
                                <img src="assets/media/auth/500-error.png" className="mw-100 mh-300px theme-light-show" alt="" />
                                <img src="assets/media/auth/500-error-dark.png" className="mw-100 mh-300px theme-dark-show" alt="" />
                            </div>
                            <div className="mb-0">
                                <a className="btn btn-sm btn-primary" role="button" onClick={() => handleSignOut(router)}>
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

export default NotFoundPage

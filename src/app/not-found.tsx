"use client"
import { NextPage } from "next"
import Link from "next/link"
import { CONFIG } from "./_utils/Constants"

const NotFoundPage: NextPage = () => {
    return (
        <div className="d-flex flex-column flex-root error-page">
            <div className="d-flex flex-column flex-center flex-column-fluid">
                <div className="d-flex flex-column flex-center text-center p-10">
                    <div className="card card-flush w-lg-650px py-5">
                        <div className="card-body py-15 py-lg-20">
                            <h1 className="fw-bolder fs-2hx text-gray-900 mb-4">Oops!</h1>
                            <div className="fw-semibold fs-6 text-gray-500 mb-7">We can&apos;t find that page.</div>
                            <div className="mb-3">
                                <img src="/assets/media/auth/404-error.png" className="mw-100 mh-300px theme-light-show" alt="" />
                                <img src="/assets/media/auth/404-error-dark.png" className="mw-100 mh-300px theme-dark-show" alt="" />
                            </div>
                            <div className="mb-0">
                                <Link className="btn btn-sm btn-primary" href={CONFIG.REDIRECT_PATHNAME.PROFILE}>
                                    Return Profile
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NotFoundPage

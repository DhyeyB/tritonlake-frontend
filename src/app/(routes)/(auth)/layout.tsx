"use client"
import { SessionProvider } from "next-auth/react"
import { Toaster } from "react-hot-toast"
import ErrorBoundary from "../../_components/common/ErrorBoundary"

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <SessionProvider>
                <Toaster position="top-center" />
                <ErrorBoundary>
                    <div className="d-flex flex-column flex-root" id="kt_app_root">
                        <div className="d-flex flex-column flex-lg-row flex-column-fluid">
                            {/* Left Part: Children */}
                            <div className="d-flex flex-column flex-lg-row-fluid w-lg-50 p-10 order-2 order-lg-1 bg-white h-100">{children}</div>
                            {/* Right Part: Image */}
                            <div className="d-flex flex-lg-row-fluid w-lg-50 bgi-size-cover bgi-position-center order-1 order-lg-2" style={{ backgroundImage: "url(/assets/media/sign-in.jpg)" }}>
                                <div className="d-flex flex-column flex-center py-7 py-lg-15 px-5 px-md-15 w-100">
                                    <a href="javascript:;" className="mb-0 mb-lg-12">
                                        <img alt="Logo" src="/assets/media/logos/default-dark.png" className="h-60px h-lg-75px" />
                                    </a>
                                    {/* <h1 className="d-none d-lg-block text-white fs-2qx fw-bolder text-center mb-7">Find new investments & manage opportunities</h1> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </ErrorBoundary>
            </SessionProvider>
        </>
    )
}

export default Layout

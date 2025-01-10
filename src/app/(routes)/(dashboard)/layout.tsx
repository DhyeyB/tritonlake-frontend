"use client"
import { LayoutProps } from "@/_types/components/Layout"
import AuthGuard from "@/common/AuthGuard"
import ErrorBoundary from "@/common/ErrorBoundary"
import dynamic from "next/dynamic"
import React from "react"
import toast from "react-hot-toast"
import Aside from "../../_components/common/Aside"
import Drawers from "../../_components/common/Drawers"
import Footer from "../../_components/common/Footer"
import Header from "../../_components/common/Header"
import ScrollToTop from "../../_components/common/ScrollToTop"
import ContextProvider from "@/app/_context/ContextProvider"
import { ResendTimerProvider } from "@/app/_context/ResendTimerContext"
const Toaster = dynamic(() => import("react-hot-toast").then(({ Toaster }) => Toaster), {
    ssr: false,
})

const Layout: React.FC<LayoutProps> = ({ children }) => {
    toast.remove()
    return (
        <ErrorBoundary>
            <Toaster position="top-center" />
            <AuthGuard>
                <ContextProvider>
                    <ResendTimerProvider>
                        <div className="d-flex flex-column flex-root app-root" id="kt_app_root">
                            <div className="app-page flex-column flex-column-fluid" id="kt_app_page">
                                <Header />
                                <div className="app-wrapper flex-column flex-row-fluid" id="kt_app_wrapper">
                                    <Aside />
                                    <div className="app-main flex-column flex-row-fluid" id="kt_app_main">
                                        <div className="d-flex flex-column flex-column-fluid">
                                            <div id="kt_app_content" className="app-content flex-column-fluid pb-0">
                                                {children}
                                            </div>
                                        </div>
                                        <Footer />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <Drawers />
                        <ScrollToTop />
                    </ResendTimerProvider>
                </ContextProvider>
            </AuthGuard>
        </ErrorBoundary>
    )
}

export default Layout

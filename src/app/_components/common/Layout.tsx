import { LayoutProps } from "@/_types/components/Layout"
import React from "react"
import Aside from "./Aside"
import Drawers from "./Drawers"
import Footer from "./Footer"
import Header from "./Header"
import ScrollToTop from "./ScrollToTop"

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <>
            <div className="d-flex flex-column flex-root app-root" id="kt_app_root">
                <div className="app-page flex-column flex-column-fluid" id="kt_app_page">
                    <Header />
                    <div className="app-wrapper flex-column flex-row-fluid" id="kt_app_wrapper">
                        <Aside />
                        <div className="app-main flex-column flex-row-fluid" id="kt_app_main">
                            {children}
                            <Footer />
                        </div>
                    </div>
                </div>
            </div>

            <Drawers />
            <ScrollToTop />
        </>
    )
}

export default Layout

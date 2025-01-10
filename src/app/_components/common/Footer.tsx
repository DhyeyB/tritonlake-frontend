"use client"
import { usePathname } from "next/navigation"
import DisclaimerBox from "./DisclaimerBox"
import { useMemo } from "react"
import { CONFIG } from "@/app/_utils/Constants"

const Footer = () => {
    const pathname = usePathname()

    // Check the current route
    const shouldShowDisclaimer = useMemo(() => {
        const routesToShow = [CONFIG.REDIRECT_PATHNAME.OPPORTUNITIES, CONFIG.REDIRECT_PATHNAME.PROFILE, CONFIG.REDIRECT_PATHNAME.ADD_OPPORTUNITIES_ROUTE, CONFIG.REDIRECT_PATHNAME.BUILD_PROFILE] // Routes to include
        const routesToExclude = [CONFIG.REDIRECT_PATHNAME.PROFILE_FIRST_TIME] // Routes to exclude
        // Check if the route starts with any included route and is not explicitly excluded
        return routesToShow.some((route) => pathname?.startsWith(route)) && !routesToExclude.some((route) => pathname === route)
    }, [pathname])
    return (
        <>
            {shouldShowDisclaimer && <DisclaimerBox />}
            <div id="kt_app_footer" className="app-footer">
                <div className="app-container container-fluid d-flex flex-column flex-md-row flex-center flex-md-stack py-3">
                    <div className="text-dark">
                        <span className="text-muted fw-semibold me-1">{new Date().getFullYear()}&copy;</span>{" "}
                        <a href="#" target="_blank" className="text-gray-800 text-hover-primary">
                            Triton Lake
                        </a>
                    </div>
                    <div className="text-right">
                        <span className="powered fs-7">
                            Powered by <img alt="Logo" src="/assets/media/logos/matrix-logo-dark.svg" style={{ height: "20px" }} />{" "}
                        </span>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Footer

"use client"
import { LayoutProps } from "@/_types/components/Layout"
import React from "react"

const Template: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div className="app-main flex-column flex-row-fluid" id="kt_app_main">
            <div className="d-flex flex-column flex-column-fluid">
                <div id="kt_app_content" className="app-content flex-column-fluid pb-0">
                    {children}
                </div>
            </div>
        </div>
    )
}

export default Template

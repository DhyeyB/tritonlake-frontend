"use client"

import { ContainerCard } from "@/app/_components/card/dashboard/ConatinerCard"
import { InnerCard } from "@/app/_components/card/dashboard/InnerCard"
import React from "react"

const Page: React.FC = () => {
    return (
        <div id="kt_app_content_container" className="app-container container-fluid">
            <div className="row gx-5 gx-xl-10 mt-10">
                <div className="col-xl-12 mb-10">
                    <ContainerCard heading="Welcome Back" subHeading="Here is what you missed:">
                        <InnerCard heading="12 New Opportunities" subHeading="Total number of external opportunities in status ‘Pending Response’" />
                        <InnerCard heading="20 Inbound Activity" subHeading="Outbound opportunities that have been marked ‘interested’ or ‘fundraising’" />
                        <InnerCard heading="3 New Messages" subHeading="Total amount of unread inbound messages." />
                        <InnerCard heading="3 QuickShares" subHeading="Total number of QuickShares that have been added since last login" />
                        <InnerCard heading="40 QuickSearches" subHeading="Total number of QuickSearches that have been added since last login" />
                    </ContainerCard>
                </div>
            </div>
        </div>
    )
}

export default Page

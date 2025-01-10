"use client"
import AddOpportunityCard from "@/app/_components/card/opportunity/AddOpportunityCard"
import { Opportunity } from "@/app/_components/svg/add-opportunity/Opportunity"
import { QuickSearch } from "@/app/_components/svg/add-opportunity/QuickSearch"
import { QuickShare } from "@/app/_components/svg/add-opportunity/QuickShare"
import React from "react"

const AddOpportunityListing = () => {
    return (
        <div id="kt_app_content_container" className="app-container container-fluid">
            <div className="card bg-transparent">
                <div className="card-header border-0 pt-5 px-0">
                    <h1 className="card-title align-items-start flex-column">
                        <span className="card-label fw-bold text-dark fs-1 ff-playfair ls-m3">
                            Add Opportunity <br />
                        </span>
                    </h1>
                </div>
                <div className="card-body px-0">
                    <div className="row g-6 col-xl-12">
                        <div className="col-sm-12 col-md-6 col-xl-4 mb-xl-10">
                            <AddOpportunityCard
                                svgIcon={<Opportunity />}
                                title="Create An Opportunity"
                                subtitle="Build a new opportunity in TritonLake."
                                buttonTitle="Create An Opportunity"
                                routeLink="/opportunities/create-opportunity"
                            />
                        </div>
                        <div className="col-sm-12 col-md-6 col-xl-4 mb-xl-10">
                            <AddOpportunityCard
                                svgIcon={<QuickShare />}
                                title="Create A QuickShare"
                                subtitle="Build a quickshare opportunity in TritonLake."
                                buttonTitle="Create A QuickShare"
                                routeLink="/quickshare/create-quickshare"
                            />
                        </div>
                        <div className="col-sm-12 col-md-6 col-xl-4 mb-xl-10">
                            <AddOpportunityCard
                                svgIcon={<QuickSearch />}
                                title="Create A QuickSearch"
                                subtitle="Build a QuickSearch opportunity in TritonLake."
                                buttonTitle="Create A QuickSearch"
                                routeLink="/quicksearch/create-quicksearch"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddOpportunityListing

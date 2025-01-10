"use client"
import InfoCardLayout from "@/app/_components/card/opportunity/CardLayout"
import InfoCard from "@/app/_components/card/opportunity/InfoCard"
import InfoStatCard from "@/app/_components/card/opportunity/InfoStatcard"
import OpportunityDetailsCard from "@/app/_components/card/opportunity/OpportunityDetailsCard"
import ProfileCard from "@/app/_components/card/opportunity/ProfileCard"
import TargetRaiseCard from "@/app/_components/card/opportunity/TargetRaiseDetailsCard"
import { FetchHelper } from "@/app/_services/FetchHelper"
import { Any } from "@/app/_types/common/Common"
import { CONFIG, EXTERNAL_OPPORTUNITY } from "@/app/_utils/Constants"
import { getDateMonthYearFormat } from "@/app/_utils/Date"
import { calculateDaysLeft, formatCurrencyWithAbbreviation, formatDigitCurrency, formatString, getStatusBadgeTitle, handleError } from "@/app/_utils/Helpers"
import { useParams, useSearchParams } from "next/navigation"
import React, { useEffect, useState } from "react"
import NoData from "../../common/NoData"
import CardLoader from "../../common/CardSkeleton"
import Link from "next/link"
import Image from "next/image"
interface OpportunityStatusProps {
    setOpportunityStatus: React.Dispatch<React.SetStateAction<string>>
    setInterestedProposals: React.Dispatch<React.SetStateAction<string>>
    externalOpportunityItem: Any
    setExternalOpportunityItem: React.Dispatch<React.SetStateAction<Any>>
    triggerDetailsApiCall?: boolean
}

const OpportunityDetails: React.FC<OpportunityStatusProps> = ({ triggerDetailsApiCall, setOpportunityStatus, externalOpportunityItem, setExternalOpportunityItem, setInterestedProposals }) => {
    const [activeTab, setActiveTab] = useState<string>(CONFIG.ACTIVE_TAB.KEY_INFO)
    const params = useParams()
    const [opportunityDetails, setOpportunityDetails] = useState<Any>()
    const [loading, setIsoading] = useState<boolean>(false)
    const searchParams = useSearchParams()
    const page = searchParams.get(EXTERNAL_OPPORTUNITY.PAGE)

    // get value by id
    const getDefaultValues = async () => {
        setIsoading(true)
        try {
            const url =
                page == EXTERNAL_OPPORTUNITY.EXTERNAL
                    ? new URL(`${CONFIG.API_ENDPOINTS.DISTRIBUTE.OPPORTUNITY}/${params?.id}`)
                    : new URL(`${CONFIG.API_ENDPOINTS.OPPORTUNITY_FORM.ADD_OPPORTUNITY}/${params?.id}`)
            const response = await FetchHelper.get(url)
            if (page == EXTERNAL_OPPORTUNITY.EXTERNAL && response?.opportunity) {
                setExternalOpportunityItem(response)
                setOpportunityDetails(response?.opportunity)
            } else {
                setOpportunityDetails(response)
            }
            setIsoading(false)
        } catch (error) {
            handleError(error)
            setIsoading(false)
        }
    }

    useEffect(() => {
        if (params?.id) getDefaultValues()
    }, [triggerDetailsApiCall])

    const [targetRaiseSections, setTargetRaiseSections] = useState<Any>([])
    const [detailsItems, setDetailsItems] = useState<Any>([])
    const [highlightDetails, setHighlightDetails] = useState<Any>([])
    const [strategyItems, setStrategyItems] = useState<Any>([])
    const [performanceItems, setPerformanceItems] = useState<Any>([])
    const [fundraisingItems, setFundraisingItems] = useState<Any>([])
    const [aboutDescription, setAboutDescription] = useState<Any>([])
    const [termItems, setTermItems] = useState<Any>([])
    const [vehicleItems, setVehicleItems] = useState<Any>([])
    const [productItems, setProductItems] = useState<Any>([])

    useEffect(() => {
        if (opportunityDetails) {
            setOpportunityStatus(opportunityDetails?.status)
            setInterestedProposals(opportunityDetails?.interested_proposals_no)
            const updatedTargetRaiseSection = [
                {
                    title: "Targets",
                    items: [
                        {
                            label: "Matrix Target Raise",
                            value: opportunityDetails?.fundraising?.target_raise
                                ? opportunityDetails?.currency?.symbol + " " + formatDigitCurrency(opportunityDetails?.fundraising?.target_raise)
                                : "-",
                        },
                        {
                            label: "Desired Market Coverage",
                            value: opportunityDetails?.target?.market_regions?.length > 0 ? opportunityDetails?.target?.market_regions?.map((region: Any) => region?.name).join(", ") : "-",
                        },
                    ],
                },
                {
                    title: "Fees",
                    items: [
                        { label: "Placement Fee", value: opportunityDetails?.placement?.fee ? `${parseFloat(opportunityDetails?.placement?.fee)}%` : "-" },
                        { label: "Number of Instalments", value: opportunityDetails?.placement?.installments_no ?? "-" },
                        { label: "Payment Frequency", value: opportunityDetails?.placement?.payment_frequency ? formatString(opportunityDetails?.placement?.payment_frequency) : "-" },
                    ],
                },
            ]
            setTargetRaiseSections(updatedTargetRaiseSection)

            const updatedDetailsItems = [
                { label: "Investment Type", value: opportunityDetails?.investment_type?.name ? formatString(opportunityDetails?.investment_type?.name) : "-" },
                { label: "Term", value: opportunityDetails?.time_period && opportunityDetails?.time_period?.length > 0 ? opportunityDetails?.time_period : "-" },
                { label: "Extension", value: opportunityDetails?.extension && opportunityDetails?.extension?.length > 0 ? opportunityDetails?.extension : "-" },
                { label: "Inception Date", value: opportunityDetails?.inception_date ? getDateMonthYearFormat(opportunityDetails?.inception_date) : "-" },
                { label: "Est. Close Date", value: opportunityDetails?.estimated_close_date ? getDateMonthYearFormat(opportunityDetails?.estimated_close_date) : "-" },
                {
                    label: "Key Contact",
                    value: opportunityDetails?.contact?.name ?? "-",
                },
            ]
            setDetailsItems(updatedDetailsItems)

            const updatedHighlightDetails = [
                {
                    title: "Highlight Information",
                    description: opportunityDetails?.highlights ?? "-",
                },
            ]
            setHighlightDetails(updatedHighlightDetails)

            const updatedStrategyItems = [
                { label: "Geographical Focus", value: opportunityDetails?.region?.name ?? "-" },
                { label: "Asset Class", value: opportunityDetails?.asset_class?.name ?? "-" },
                { label: "Strategy", value: opportunityDetails?.strategies?.map((strategy: Any) => strategy.name).join(", ") || "-" },
                { label: "Industry", value: opportunityDetails?.industries?.map((industry: Any) => industry.name).join(", ") || "-" },
            ]
            setStrategyItems(updatedStrategyItems)

            const updatedPerformanceItems = [
                { label: "IRR", value: opportunityDetails?.target?.irr ? `${opportunityDetails?.target?.irr}%` : "-" },
                { label: "MOIC", value: opportunityDetails?.target?.moic ? `${opportunityDetails?.target?.moic}x+` : "-" },
                { label: "Target Return", value: opportunityDetails?.target?.return_percentage ? `${opportunityDetails?.target?.return_percentage}%` : "-" },
            ]
            setPerformanceItems(updatedPerformanceItems)

            const updatedFundraisingItems = [
                {
                    label: "Current Raise",
                    value: opportunityDetails?.fundraising?.current_raise ? opportunityDetails?.currency?.symbol + " " + formatDigitCurrency(opportunityDetails?.fundraising?.current_raise) : "-",
                },
                {
                    label: "Target Raise",
                    value: opportunityDetails?.fundraising?.target_raise ? opportunityDetails?.currency?.symbol + " " + formatDigitCurrency(opportunityDetails?.fundraising?.target_raise) : "-",
                },
                { label: "Next Closing", value: opportunityDetails?.fundraising?.next_closing ? getDateMonthYearFormat(opportunityDetails?.fundraising?.next_closing) : "-" },
            ]
            setFundraisingItems(updatedFundraisingItems)

            const updatedAboutDescription = [
                {
                    title: "About Opportunity",
                    description: opportunityDetails?.long_description ?? "-",
                },
            ]
            setAboutDescription(updatedAboutDescription)

            const updatedTermItems = [
                { label: "Hard Cap", value: opportunityDetails?.term?.hard_cap ? opportunityDetails?.currency?.symbol + " " + formatDigitCurrency(opportunityDetails?.term?.hard_cap) : "-" },
                { label: "GP Commitment (%)", value: opportunityDetails?.term?.gp_commitment_percentage ? `${opportunityDetails?.term?.gp_commitment_percentage}%` : "-" },
                {
                    label: "GP Commitment Amount",
                    value: opportunityDetails?.term?.gp_commitment_amount ? opportunityDetails?.currency?.symbol + " " + formatDigitCurrency(opportunityDetails?.term?.gp_commitment_amount) : "-",
                },
                { label: "Waterfall Type", value: opportunityDetails?.term?.waterfall_type?.name ? formatString(opportunityDetails?.term?.waterfall_type?.name) : "-" },
                {
                    label: "Minimum Investment",
                    value: opportunityDetails?.term?.minimum_investment ? opportunityDetails?.currency?.symbol + " " + formatDigitCurrency(opportunityDetails?.term?.minimum_investment) : "-",
                },
                { label: "Hurdle Rate", value: opportunityDetails?.term?.hurdle_rate ? `${opportunityDetails?.term?.hurdle_rate}%` : "-" },
                { label: "Catch-up", value: opportunityDetails?.term?.catch_up ? `${opportunityDetails?.term?.catch_up}%` : "-" },
                { label: "Carried Interest", value: opportunityDetails?.term?.carried_interest ? `${opportunityDetails?.term?.carried_interest}%` : "-" },
                { label: "Management Fee", value: opportunityDetails?.term?.management_fee_percentage ? `${opportunityDetails?.term?.management_fee_percentage}%` : "-" },
                { label: "Additional Fee", value: opportunityDetails?.term?.additional_fees ? `${opportunityDetails?.term?.additional_fees}%` : "-" },
            ]
            setTermItems(updatedTermItems)

            const updatedVehicleItems = [
                { label: "Name", value: opportunityDetails?.vehicle?.name && opportunityDetails?.vehicle?.name?.length > 0 ? opportunityDetails?.vehicle?.name : "-" },
                { label: "Jurisdiction", value: opportunityDetails?.vehicle?.jurisdiction_country?.name ?? "-" },
                { label: "Structure", value: opportunityDetails?.vehicle?.structure?.name ?? "-" },
                { label: "Tax Reporting", value: opportunityDetails?.vehicle?.tax_reportings?.map((tax: Any) => tax.name).join(", ") ?? "-" },
                { label: "Tax Eligibility", value: opportunityDetails?.vehicle?.tax_eligibility ? formatString(opportunityDetails?.vehicle?.tax_eligibility) : "-" },
                { label: "Investor Type", value: opportunityDetails?.vehicle?.investor_types?.map((investor: Any) => investor.name).join(", ") ?? "-" },
                { label: "Description", value: opportunityDetails?.vehicle?.description ?? "-" },
            ]
            setVehicleItems(updatedVehicleItems)

            const updatedProductItems = [
                {
                    title: "Product General Disclaimer",
                    description: opportunityDetails?.product_disclaimer ?? "-",
                },
                {
                    title: "Agent Disclaimer",
                    description: opportunityDetails.agent_disclaimer ?? "-",
                },
            ]
            setProductItems(updatedProductItems)
        }
    }, [opportunityDetails])

    return (
        <>
            {loading ? (
                <div className="row g-3">
                    <div className="col-12">
                        <div className="mb-3">
                            <CardLoader style={{ width: "100%" }} />
                        </div>
                    </div>
                    <div className="col-12">
                        <div className="mb-3">
                            <CardLoader style={{ width: "100%" }} />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <CardLoader style={{ width: "100%" }} />
                    </div>
                    <div className="col-md-6">
                        <CardLoader style={{ width: "100%" }} />
                    </div>
                </div>
            ) : !loading && opportunityDetails?.length === 0 ? (
                <NoData />
            ) : (
                <div className="p-5">
                    <div className="timeline-content mt-n1 mt-100">
                        <InfoCardLayout
                            activeTab={activeTab}
                            setActiveTab={setActiveTab}
                            image={opportunityDetails?.cover?.original}
                            daysLeft={calculateDaysLeft(opportunityDetails?.estimated_close_date)?.toString()}
                            title={opportunityDetails?.name}
                            description={opportunityDetails?.short_description}
                            subtitle={page == EXTERNAL_OPPORTUNITY.EXTERNAL ? getStatusBadgeTitle(externalOpportunityItem?.status) ?? "-" : getStatusBadgeTitle(opportunityDetails?.status) ?? "-"}
                            sponserName={opportunityDetails?.sponsor_name ?? "-"}
                        >
                            <div className="d-flex flex-wrap flex-stack">
                                <div className="d-flex flex-column flex-grow-1 pe-8">
                                    <div className="d-flex flex-wrap">
                                        {/* Use InfoStatCard component instances with different props */}
                                        <InfoStatCard value={opportunityDetails?.vintage_year ?? "-"} label="Vintage Year" iconType="up" iconColor="text-success" />
                                        <InfoStatCard
                                            value={
                                                opportunityDetails?.fundraising?.target_raise
                                                    ? opportunityDetails?.currency?.symbol + " " + formatCurrencyWithAbbreviation(opportunityDetails?.fundraising?.target_raise)
                                                    : "-"
                                            }
                                            label="Target Raise"
                                            iconType="down"
                                            iconColor="text-danger"
                                        />
                                        <InfoStatCard
                                            value={`${opportunityDetails?.target?.irr ? `${parseFloat(opportunityDetails?.target?.irr)}%` : "-"}`}
                                            label="Target IRR"
                                            iconType="up"
                                            iconColor="text-success"
                                        />
                                        <InfoStatCard
                                            value={`${opportunityDetails?.target?.moic ? `${opportunityDetails?.target?.moic}x` : "-"}`}
                                            label="Target MOIC / TVP"
                                            iconType="down"
                                            iconColor="text-danger"
                                        />
                                        {page == EXTERNAL_OPPORTUNITY.EXTERNAL && (
                                            <InfoStatCard
                                                value={`${opportunityDetails?.firm?.name ? `${opportunityDetails?.firm?.name}` : "-"}`}
                                                label="Originator"
                                                iconType="down"
                                                iconColor="text-danger"
                                            />
                                        )}
                                    </div>
                                </div>
                            </div>
                        </InfoCardLayout>

                        {/* Tab section */}
                        <div className="tab-content">
                            {/* {activeTab == "key_info" && ( */}
                            {activeTab == CONFIG.ACTIVE_TAB.KEY_INFO && (
                                <div className="tab-pane fade show active">
                                    <div className="row g-xxl-8 g-3">
                                        <div className="col-xl-12">
                                            <TargetRaiseCard
                                                additionalInformation={opportunityDetails?.placement?.additional_information}
                                                title="Target Raise / Placement Economics"
                                                sections={targetRaiseSections}
                                            />
                                        </div>

                                        <div className="col-xl-6">
                                            <OpportunityDetailsCard title="Details" items={detailsItems} />
                                        </div>
                                        <div className="col-xl-6">
                                            <InfoCard items={highlightDetails} />
                                        </div>

                                        <div className="col-xl-6">
                                            <OpportunityDetailsCard title="Strategy" items={strategyItems} colClassName="col-lg-6" />
                                        </div>
                                        <div className="col-xl-6">
                                            <OpportunityDetailsCard title="Target Performance" items={performanceItems} colClassName="col-lg-6" />
                                        </div>

                                        <div className="col-xl-12">
                                            <OpportunityDetailsCard title="Fundraising" items={fundraisingItems} colClassName="col-lg-3" />
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* {activeTab == "about" && ( */}
                            {activeTab == CONFIG.ACTIVE_TAB.ABOUT && (
                                <div>
                                    <InfoCard items={aboutDescription} />
                                </div>
                            )}

                            {/* {activeTab === "team" && ( */}
                            {activeTab === CONFIG.ACTIVE_TAB.TEAM && (
                                <div>
                                    <div className="row g-5 g-xxl-8">
                                        <div className="col-xl-12">
                                            <div className="card">
                                                <div className="card-body pb-5">
                                                    <div className="d-flex align-items-center mb-10">
                                                        <div className="d-flex align-items-center flex-grow-1">
                                                            <div className="d-flex flex-column">
                                                                <p className="text-gray-900   fs-4 fw-bold mt-2">Team</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        {opportunityDetails && opportunityDetails?.team_members?.length > 0 ? (
                                                            opportunityDetails?.team_members?.map((member: Any) => (
                                                                <ProfileCard
                                                                    key={member.id} // Always use a unique key when mapping
                                                                    name={member.name ?? "-"} // Use a fallback value if `name` is missing
                                                                    role={member.job_title} // Use job title for role
                                                                    email={member.email} // Use email or fallback
                                                                    phone={member.phone_number && `${member.phone_country_code} ${member.phone_number}`} // Combine country code and phone number
                                                                    imageUrl={member?.cover?.original || "/assets/media/avatars/no_profile.png"} // Replace with actual image URL if available in API
                                                                    description={member?.biography} // Use biography or fallback
                                                                    onButtonClick={() => (member.external_link ? window.open(member.external_link || "#", "_blank") : "")} // Open external link or fallback
                                                                    link={member.external_link}
                                                                />
                                                            ))
                                                        ) : (
                                                            <NoData />
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* {activeTab === "terms" && ( */}
                            {activeTab === CONFIG.ACTIVE_TAB.TERMS && (
                                <div>
                                    <div className="row g-5 g-xxl-8">
                                        <div className="col-xl-12">
                                            <OpportunityDetailsCard title="Terms" items={termItems} colClassName="col-lg-2" />
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* {activeTab === "vehicle" && ( */}
                            {activeTab === CONFIG.ACTIVE_TAB.VEHICLE && (
                                <div>
                                    <div className="row g-5 g-xxl-8">
                                        <div className="col-xl-12">
                                            <OpportunityDetailsCard title="Vehicle" items={vehicleItems} colClassName="col-lg-3" />
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* {activeTab === "key_documents" && ( */}
                            {activeTab === CONFIG.ACTIVE_TAB.KEY_DOCUMENTS && (
                                <div>
                                    <div className="row g-5 g-xxl-8">
                                        <div className="col-xl-12">
                                            <div className="card mb-10 mb-xxl-8">
                                                <div className="card-body pb-0">
                                                    <div className="d-flex align-items-center mb-10">
                                                        <div className="d-flex align-items-center flex-grow-1">
                                                            <div className="d-flex flex-column">
                                                                <p className="text-gray-900 text-hover-primary fs-4 fw-bold mt-2">Opportunity Documents</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    {opportunityDetails && opportunityDetails?.files?.length > 0 ? (
                                                        opportunityDetails?.files?.map((file: Any) => (
                                                            <div className="d-flex mt-5 mb-5" key={file.id}>
                                                                {/* Icon */}
                                                                <div className="symbol symbol-40px me-5">
                                                                    <Image
                                                                        width={30}
                                                                        height={30}
                                                                        alt="Logo"
                                                                        src="/assets/media/icons/pdficon.svg" // Change the icon dynamically based on file type if needed
                                                                    />
                                                                </div>

                                                                {/* File Details */}
                                                                <Link
                                                                    href={file.url} // Link to the file for downloading/viewing
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                    className="text-gray-800 text-hover-primary mb-1 pt-2 w-100"
                                                                >
                                                                    {file.name} <br />
                                                                    <span className="text-muted">{file.extension?.toUpperCase() || "Unknown Format"}</span>
                                                                </Link>

                                                                {/* Download Button */}
                                                                <button className="btn btn-sm btn-secondary rounded-0 text-uppercase" onClick={() => window.open(file?.url, "_blank")}>
                                                                    Download
                                                                </button>
                                                            </div>
                                                        ))
                                                    ) : (
                                                        <NoData />
                                                    )}

                                                    {/* <div className="d-flex mt-5 mb-5">
                                                    <div className="symbol symbol-40px me-5">
                                                        <img alt="Logo" src="/assets/media/icons/pdficon.svg" />
                                                    </div>
                                                    <a className="text-gray-800 text-hover-primary mb-1 pt-2 w-100">
                                                        Direct Partner Growth Fund <br /> <span className="text-muted">PDF</span>
                                                    </a>
                                                    <button className="btn btn-sm btn-secondary rounded-0 text-uppercase">Download </button>
                                                </div>

                                                <div className="d-flex mt-5 mb-10">
                                                    <div className="symbol symbol-40px me-5">
                                                        <img alt="Logo" src="/assets/media/icons/pdficon.svg" />
                                                    </div>
                                                    <a className="text-gray-800 text-hover-primary mb-1 pt-2 w-100">
                                                        Direct Partner Growth Fund <br /> <span className="text-muted">PDF</span>
                                                    </a>
                                                    <button className="btn btn-sm btn-secondary rounded-0 text-uppercase">Download </button>
                                                </div> */}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* {activeTab === "disclaimers" && ( */}
                            {activeTab === CONFIG.ACTIVE_TAB.DISCLAIMERS && (
                                <div>
                                    <InfoCard items={productItems} />
                                </div>
                            )}
                        </div>
                        {/* Tab section */}
                    </div>
                </div>
            )}
        </>
    )
}

export default OpportunityDetails

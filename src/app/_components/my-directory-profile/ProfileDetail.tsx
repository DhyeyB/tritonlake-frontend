import { FetchHelper } from "@/app/_services/FetchHelper"
import { Any } from "@/app/_types/common/Common"
import { CONFIG } from "@/app/_utils/Constants"
import { formatCurrencyWithAbbreviation, formatDigitCurrency, handleError } from "@/app/_utils/Helpers"
import React, { useEffect, useState } from "react"
import NoData from "../common/NoData"
import CardLoader from "../common/CardSkeleton"
import InfoCardLayout from "../card/opportunity/CardLayout"
import InfoStatCard from "../card/opportunity/InfoStatcard"

const ProfileDetail = () => {
    const [profileData, setProfileData] = useState<Any>()
    const [loading, setIsoading] = useState<boolean>(false)
    const userDetails = JSON.parse(localStorage.getItem(CONFIG.LOCAL_STORAGE_VARIABLES.USER_DETAILS) || "")

    const getMydirectoryProfileData = async () => {
        setIsoading(true)
        try {
            const url = new URL(`${CONFIG.API_ENDPOINTS.PROFILE_BUILDER.LIST}/${userDetails?.firm?.id}`)
            const response = await FetchHelper.get(url)
            setProfileData(response)
            setIsoading(false)
        } catch (error) {
            handleError(error)
            setIsoading(false)
        }
    }

    useEffect(() => {
        getMydirectoryProfileData()
    }, [])
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
            ) : !loading && profileData && Object.keys(profileData).length === 0 ? (
                <NoData />
            ) : (
                <div className="timeline-content mt-n1 mt-100">
                    <InfoCardLayout
                        image={profileData?.logo?.original}
                        title={profileData?.name}
                        description={profileData?.investment_preferences?.additional_context ?? "-"}
                        subtitle={""}
                        socialLinks={profileData?.socials ?? "-"}
                    >
                        <div className="d-flex flex-wrap flex-stack">
                            <div className="d-flex flex-column flex-grow-1 pe-8">
                                <div className="d-flex flex-wrap">
                                    <InfoStatCard
                                        value={`${profileData?.matrix_shares_no ? `${parseFloat(profileData?.matrix_shares_no)}` : "-"}`}
                                        label="Matrix Shares"
                                        iconType="up"
                                        iconColor="text-success"
                                    />
                                    <InfoStatCard value={`${profileData?.fundraising_no ? `${profileData?.fundraising_no}` : "-"}`} label="Fundraising" iconType="down" iconColor="text-danger" />
                                </div>
                            </div>
                        </div>
                    </InfoCardLayout>

                    <div className="row g-5 g-xxl-8">
                        <div className="col-xl-6">
                            <div className="card mb-10 mb-xxl-8">
                                <div className="card-body pb-0">
                                    <div className="d-flex align-items-center mb-10">
                                        <div className="d-flex align-items-center flex-grow-1">
                                            <div className="d-flex flex-column">
                                                <p className="text-gray-900 text-hover-primary fs-4 fw-bold m-0">Profile</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="d-flex align-items-center mb-5">
                                        <div className="d-flex align-items-center flex-grow-1">
                                            <div className="d-flex flex-column">
                                                <p className="text-gray-900 text-hover-primary fs-6 fw-bold m-0">HQ</p>

                                                <span className="text-gray-500 fw-bold">{profileData?.address ? `${profileData?.address?.city}, ${profileData?.address?.country_code}` : "-"}</span>
                                            </div>
                                        </div>
                                        <div className="d-flex align-items-center flex-grow-1">
                                            <div className="d-flex flex-column">
                                                <p className="text-gray-900 text-hover-primary fs-6 fw-bold m-0">Network Size (# LPs)</p>

                                                <span className="text-gray-500 fw-bold">{profileData?.network_size ? profileData?.network_size : "-"}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="d-flex align-items-center mb-5">
                                        <div className="d-flex align-items-center flex-grow-1">
                                            <div className="d-flex flex-column">
                                                <p className="text-gray-900 text-hover-primary fs-6 fw-bold m-0">Network LP Types</p>

                                                <div className="d-flex">
                                                    {profileData?.network_lp_types?.length > 0
                                                        ? profileData?.network_lp_types.map((lp_types: Any, index: number) => (
                                                              <span key={index} className="badge badge-secondary m-2">
                                                                  {lp_types.name}
                                                              </span>
                                                          ))
                                                        : "-"}{" "}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="d-flex align-items-center mb-10">
                                        <div className="d-flex align-items-center flex-grow-1">
                                            <div className="d-flex flex-column">
                                                <p className="text-gray-900 text-hover-primary fs-6 fw-bold m-0">Network Coverage</p>

                                                <div className="d-flex">
                                                    {profileData?.network_regions?.length > 0
                                                        ? profileData?.network_regions.map((networkCoverage: Any, index: number) => (
                                                              <span key={index} className="badge badge-secondary m-2">
                                                                  {networkCoverage.name}
                                                              </span>
                                                          ))
                                                        : "-"}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="card mb-10 mb-xxl-8">
                                <div className="card-body pb-0">
                                    <div className="d-flex align-items-center mb-10">
                                        <div className="d-flex align-items-center flex-grow-1">
                                            <div className="d-flex flex-column">
                                                <p className="text-gray-900 fs-4 fw-bold m-0">Investment Preferences</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="d-flex align-items-center mb-5">
                                        <div className="d-flex align-items-center flex-grow-1">
                                            <div className="d-flex flex-column">
                                                <p className="text-gray-900 fs-6 fw-bold m-0">Asset Class</p>
                                                {profileData?.investment_preferences?.asset_classes?.length > 0 ? (
                                                    <span className="text-gray-500 fw-bold">
                                                        {profileData?.investment_preferences?.asset_classes?.map((assetClass: Any) => assetClass?.name).join(", ")}
                                                    </span>
                                                ) : (
                                                    "-"
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="d-flex align-items-center mb-5">
                                        <div className="d-flex align-items-center flex-grow-1">
                                            <div className="d-flex flex-column">
                                                <p className="text-gray-900 fs-6 fw-bold m-0">Strategy</p>

                                                {profileData?.investment_preferences?.strategies?.length > 0 ? (
                                                    <span className="text-gray-500 fw-bold">{profileData?.investment_preferences?.strategies?.map((strategy: Any) => strategy?.name).join(", ")}</span>
                                                ) : (
                                                    "-"
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="d-flex align-items-center mb-5">
                                        <div className="d-flex align-items-center flex-grow-1">
                                            <div className="d-flex flex-column">
                                                <p className="text-gray-900 fs-6 fw-bold m-0">Geographical Interest</p>{" "}
                                                {profileData?.investment_preferences?.countries?.length > 0 ? (
                                                    <span className="text-gray-500 fw-bold">{profileData?.investment_preferences?.countries?.map((country: Any) => country?.name).join(", ")}</span>
                                                ) : (
                                                    "-"
                                                )}
                                            </div>
                                        </div>
                                        <div className="d-flex align-items-center flex-grow-1">
                                            <div className="d-flex flex-column">
                                                <p className="text-gray-900 fs-6 fw-bold m-0">Industry Interest</p>
                                                {profileData?.investment_preferences?.industries?.length > 0 ? (
                                                    <span className="text-gray-500 fw-bold">{profileData?.investment_preferences?.industries?.map((industry: Any) => industry?.name).join(", ")}</span>
                                                ) : (
                                                    "-"
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="d-flex align-items-center  mb-5">
                                        <div className="d-flex flex-column">
                                            <p className="text-gray-900 fs-6 fw-bold m-0">Fund Size Preference</p>
                                            <span className="text-gray-500 fw-bold">
                                                {profileData?.investment_preferences?.fund_size_min ? formatCurrencyWithAbbreviation(profileData?.investment_preferences?.fund_size_min) : "-"} -{" "}
                                                {profileData?.investment_preferences?.fund_size_max ? formatCurrencyWithAbbreviation(profileData?.investment_preferences?.fund_size_max) : "-"}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="d-flex align-items-center mb-5">
                                        <div className="d-flex align-items-center flex-grow-1">
                                            <div className="d-flex flex-column">
                                                <p className="text-gray-900 fs-6 fw-bold m-0">Deal Size Preference</p>{" "}
                                                <span className="text-gray-500 fw-bold">
                                                    {profileData?.investment_preferences?.deal_size_min ? formatCurrencyWithAbbreviation(profileData?.investment_preferences?.deal_size_min) : " "} -{" "}
                                                    {profileData?.investment_preferences?.deal_size_max ? formatCurrencyWithAbbreviation(profileData?.investment_preferences?.deal_size_max) : " "}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="d-flex align-items-center flex-grow-1">
                                            <div className="d-flex flex-column">
                                                <p className="text-gray-900 fs-6 fw-bold m-0">Fund # Preference</p>
                                                <span className="text-gray-500 fw-bold">
                                                    {profileData?.investment_preferences?.fund_number_min ? formatDigitCurrency(profileData?.investment_preferences?.fund_number_min) : ""} -{" "}
                                                    {profileData?.investment_preferences?.fund_number_max ? formatDigitCurrency(profileData?.investment_preferences?.fund_number_max) : ""}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="d-flex align-items-center mb-10">
                                        <div className="d-flex align-items-center flex-grow-1">
                                            <div className="d-flex flex-column">
                                                <p className="text-gray-900 fs-6 fw-bold m-0">Additional Context</p>{" "}
                                                <span className="text-gray-500 fw-bold">{profileData?.investment_preferences?.additional_context || "-"}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="card mb-10 mb-xxl-8">
                                <div className="card-body pb-0">
                                    <div className="d-flex align-items-center mb-10">
                                        <div className="d-flex align-items-center flex-grow-1">
                                            <div className="d-flex flex-column">
                                                <p className="text-gray-900 text-hover-primary fs-4 fw-bold m-0">Regulatory</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="d-flex align-items-center mb-5">
                                        <div className="d-flex align-items-center mb-5">
                                            <div className="d-flex align-items-center flex-grow-1">
                                                <div className="d-flex flex-column">
                                                    <p className="text-gray-900 text-hover-primary fs-6 fw-bold m-0">Regulated Entity</p>{" "}
                                                    <span className="text-gray-500 fw-bold">{profileData?.regulated_entity ? "True" : "False"}</span>
                                                </div>
                                            </div>
                                            <div className="d-flex align-items-center flex-grow-1 mx-10">
                                                <div className="d-flex flex-column">
                                                    <p className="text-gray-900 text-hover-primary fs-6 fw-bold m-0">Registration Numbers</p>
                                                    <span className="text-gray-500 fw-bold">{profileData?.registration_number || "-"}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="d-flex align-items-center mb-5">
                                        <div className="d-flex align-items-center flex-grow-1">
                                            <div className="d-flex flex-column">
                                                <p className="text-gray-900 text-hover-primary fs-6 fw-bold m-0">Regulatory Information</p>

                                                <span className="text-gray-500 fw-bold">{profileData?.registration_information || "-"}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-xl-6">
                            <div className="card mb-5 mb-xxl-8">
                                <div className="card-body pb-0">
                                    <div className="d-flex align-items-center mb-10">
                                        <div className="d-flex align-items-center flex-grow-1">
                                            <div className="d-flex flex-column">
                                                <p className="text-gray-900 text-hover-primary fs-4 fw-bold m-0">Overview</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mb-10">
                                        <p className="text-gray-800 fw-normal mb-5">{profileData?.overview ? profileData.overview : "-"}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="card mb-10 mb-xxl-8">
                                <div className="card-body pb-0">
                                    <div className="d-flex align-items-center mb-10">
                                        <div className="d-flex align-items-center flex-grow-1">
                                            <div className="d-flex flex-column">
                                                <p className="text-gray-900 text-hover-primary fs-4 fw-bold m-0">Key Contacts</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="d-flex align-items-center mb-5">
                                        <div className="d-flex align-items-center flex-grow-1">
                                            <div className="d-flex flex-column">
                                                <p className="text-gray-900 text-hover-primary fs-6 fw-bold m-0">Primary Contact Name</p>

                                                <span className="text-gray-500 fw-bold">{profileData?.primary_contact?.name || "-"}</span>
                                            </div>
                                        </div>
                                        <div className="d-flex align-items-center flex-grow-1">
                                            <div className="d-flex flex-column">
                                                <p className="text-gray-900 text-hover-primary fs-6 fw-bold m-0">Primary Contact Title</p>{" "}
                                                <span className="text-gray-500 fw-bold">{profileData?.primary_contact?.job_title || "-"}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="d-flex align-items-center mb-5">
                                        <div className="d-flex align-items-center flex-grow-1">
                                            <div className="d-flex flex-column">
                                                <p className="text-gray-900 text-hover-primary fs-6 fw-bold m-0">Primary Contact Email</p>{" "}
                                                <span className="text-gray-500 fw-bold">{profileData?.primary_contact?.email || "-"}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="d-flex align-items-center mb-5">
                                        <div className="d-flex align-items-center flex-grow-1">
                                            <div className="d-flex flex-column">
                                                <p className="text-gray-900 text-hover-primary fs-6 fw-bold m-0">Secondary Contact Name</p>{" "}
                                                <span className="text-gray-500 fw-bold">{profileData?.secondary_contact?.name || "-"}</span>
                                            </div>
                                        </div>

                                        <div className="d-flex align-items-center flex-grow-1">
                                            <div className="d-flex flex-column">
                                                <p className="text-gray-900 text-hover-primary fs-6 fw-bold m-0">Secondary Contact Title</p>{" "}
                                                <span className="text-gray-500 fw-bold">{profileData?.secondary_contact?.job_title || "-"}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="d-flex align-items-center mb-10">
                                        <div className="d-flex align-items-center flex-grow-1">
                                            <div className="d-flex flex-column">
                                                <p className="text-gray-900 text-hover-primary fs-6 fw-bold m-0">Secondary Contact Email</p>
                                                <span className="text-gray-500 fw-bold">{profileData?.secondary_contact?.email || "-"}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default ProfileDetail

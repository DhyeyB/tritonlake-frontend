"use client"
import { InfoCardLayoutProps } from "@/app/_types/common/InfoCardLayoutProps"
import { CONFIG } from "@/app/_utils/Constants"
import { formatString, getStatusClassName } from "@/app/_utils/Helpers"
import React from "react"
import { TimeIndicatorLabelSvg } from "../../svg/TimeIndicatorLabelSvg"
import Link from "next/link"
import { Facebook } from "../../svg/social/Facebook"
import { LinkedIn } from "../../svg/social/LinkedIn"
import { Instagram } from "../../svg/social/Instagram"
import { Twitter } from "../../svg/social/Twitter"

// Layout Component
const InfoCardLayout: React.FC<InfoCardLayoutProps> = ({ image, title, subtitle, description, children, activeTab, setActiveTab, daysLeft, sponserName, socialLinks }) => {
    return (
        <div className="card mb-5">
            <div className="card-body pt-9 pb-0">
                <div className="d-flex flex-wrap flex-sm-nowrap">
                    {/* Image Section */}
                    <div className="me-7 mb-4">
                        <div className="symbol symbol-100px symbol-lg-160px symbol-fixed position-relative">
                            <img src={image} alt={title} />
                            <div className="position-absolute translate-middle bottom-0 start-100 mb-6 bg-success rounded-circle border border-4 border-body h-20px w-20px"></div>
                        </div>
                    </div>

                    {/* Content Section */}
                    <div className="flex-grow-1">
                        {/* Title and Subtitle */}
                        <div className="d-flex justify-content-between align-items-start flex-wrap mb-2">
                            <div className="d-flex flex-column w-100">
                                <div className="d-flex align-items-center mb-2">
                                    <h2 className="text-gray-900 fs-1 fw-bold me-1">{title}</h2>
                                    <span className={`badge  ${getStatusClassName(subtitle)} mx-5 fs-7`}>{formatString(subtitle)}</span>
                                </div>
                                <div className="d-flex flex-wrap fw-semibold fs-6 mb-4 pe-2">
                                    {sponserName && (
                                        <a className="d-flex align-items-center text-gray-400   me-5 mb-2 cursor-auto">
                                            <i className="ki-duotone ki-profile-circle fs-4 me-1">
                                                <span className="path1"></span>
                                                <span className="path2"></span>
                                                <span className="path3"></span>
                                            </i>
                                            {sponserName}
                                        </a>
                                    )}
                                    {socialLinks && (
                                        <span className="text-muted fs-7">
                                            {socialLinks?.website_url ? (
                                                <>
                                                    <i className="fa-solid fa-globe"></i> {socialLinks?.website_url}
                                                </>
                                            ) : (
                                                <span className="text-gray-500 fw-bold">-</span>
                                            )}
                                        </span>
                                    )}
                                </div>
                                <div className={`d-flex position-absolute ${socialLinks ? "m-0" : "my-4"}`} id="days-left-corner" style={{ right: "1rem" }}>
                                    <a className="btn btn-sm me-2 cursor-auto" id="kt_user_follow_button">
                                        <i className="ki-duotone ki-check fs-3 d-none"></i>
                                        {daysLeft && +daysLeft > 0 && (
                                            <span className="indicator-label">
                                                {`${daysLeft} ${+daysLeft > 1 ? "days" : "day"} Left`}
                                                <TimeIndicatorLabelSvg />
                                            </span>
                                        )}
                                        <span className="indicator-progress">
                                            Please wait...
                                            <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
                                        </span>
                                    </a>
                                    {socialLinks && (
                                        <span className="indicator-label">
                                            {socialLinks?.facebook_url && (
                                                <Link className="me-2" href={socialLinks?.facebook_url || "javascript:;"} target={socialLinks?.facebook_url ? "_blank" : "_self"}>
                                                    <Facebook width="21" height="21" />
                                                </Link>
                                            )}
                                            {socialLinks?.linkedin_url && (
                                                <Link className="me-2" href={socialLinks?.linkedin_url || "javascript:;"} target={socialLinks?.linkedin_url ? "_blank" : "_self"}>
                                                    <LinkedIn width="21" height="21" />
                                                </Link>
                                            )}
                                            {socialLinks?.instagram_url && (
                                                <Link className="me-2" href={socialLinks?.instagram_url || "javascript:;"} target={socialLinks?.instagram_url ? "_blank" : "_self"}>
                                                    <Instagram width="21" height="21" />
                                                </Link>
                                            )}
                                            {socialLinks?.twitter_url && (
                                                <Link className="me-2" href={socialLinks?.twitter_url || "javascript:;"} target={socialLinks?.twitter_url ? "_blank" : "_self"}>
                                                    <Twitter width="21" height="21" />
                                                </Link>
                                            )}
                                        </span>
                                    )}
                                </div>
                                <p className="col-lg-6 col-md-8 col-sm-12">{description}</p>
                            </div>
                        </div>

                        {/* Children section */}
                        <div className="d-flex flex-column">{children}</div>
                    </div>
                </div>
                {/* Tab section */}
                {setActiveTab && (
                    <ul className="nav nav-tabs nav-line-tabs fs-6 mt-5 ">
                        <li className="nav-item">
                            <a
                                className={`nav-link fw-bold pb-5 cursor-pointer ${activeTab === CONFIG.ACTIVE_TAB.KEY_INFO ? "active" : ""}`}
                                data-bs-toggle="tab"
                                onClick={() => setActiveTab(CONFIG.ACTIVE_TAB.KEY_INFO)}
                            >
                                Key Information
                            </a>
                        </li>
                        <li className="nav-item">
                            <a
                                className={`nav-link fw-bold pb-5 cursor-pointer ${activeTab === CONFIG.ACTIVE_TAB.ABOUT ? "active" : ""}`}
                                data-bs-toggle="tab"
                                onClick={() => setActiveTab(CONFIG.ACTIVE_TAB.ABOUT)}
                            >
                                About
                            </a>
                        </li>
                        <li className="nav-item">
                            <a
                                className={`nav-link fw-bold pb-5 cursor-pointer ${activeTab === CONFIG.ACTIVE_TAB.TEAM ? "active" : ""}`}
                                data-bs-toggle="tab"
                                onClick={() => setActiveTab(CONFIG.ACTIVE_TAB.TEAM)}
                            >
                                Team
                            </a>
                        </li>
                        <li className="nav-item">
                            <a
                                className={`nav-link fw-bold pb-5 cursor-pointer ${activeTab === CONFIG.ACTIVE_TAB.TERMS ? "active" : ""}`}
                                data-bs-toggle="tab"
                                onClick={() => setActiveTab(CONFIG.ACTIVE_TAB.TERMS)}
                            >
                                Terms
                            </a>
                        </li>
                        <li className="nav-item">
                            <a
                                className={`nav-link fw-bold pb-5 cursor-pointer ${activeTab === CONFIG.ACTIVE_TAB.VEHICLE ? "active" : ""}`}
                                data-bs-toggle="tab"
                                onClick={() => setActiveTab(CONFIG.ACTIVE_TAB.VEHICLE)}
                            >
                                Vehicle
                            </a>
                        </li>
                        <li className="nav-item">
                            <a
                                className={`nav-link fw-bold pb-5 cursor-pointer ${activeTab === CONFIG.ACTIVE_TAB.KEY_DOCUMENTS ? "active" : ""}`}
                                data-bs-toggle="tab"
                                onClick={() => setActiveTab(CONFIG.ACTIVE_TAB.KEY_DOCUMENTS)}
                            >
                                Key Documents
                            </a>
                        </li>
                        <li className="nav-item">
                            <a
                                className={`nav-link fw-bold pb-5 cursor-pointer ${activeTab === CONFIG.ACTIVE_TAB.DISCLAIMERS ? "active" : ""}`}
                                data-bs-toggle="tab"
                                onClick={() => setActiveTab(CONFIG.ACTIVE_TAB.DISCLAIMERS)}
                            >
                                Disclaimers
                            </a>
                        </li>
                    </ul>
                )}
            </div>
        </div>
    )
}

export default InfoCardLayout

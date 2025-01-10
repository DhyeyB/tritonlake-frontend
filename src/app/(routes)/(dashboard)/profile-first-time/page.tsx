"use client"
import { ContainerCard } from "@/app/_components/card/dashboard/ConatinerCard"
import { InnerCard } from "@/app/_components/card/dashboard/InnerCard"
import NoData from "@/app/_components/common/NoData"
import Add2FA from "@/app/_components/modal/Add2FA"
import { useRouter } from "next/navigation"
import React, { useState } from "react"

const Page: React.FC = () => {
    const router = useRouter()
    const [showModal, setShowModal] = useState(false)
    const [showContainerCard, setShowContainerCard] = useState(true)

    return (
        <div id="kt_app_content_container" className="app-container container-fluid">
            {/* Render ContainerCard only when showContainerCard is true */}
            {showContainerCard && (
                <div className="row gx-5 gx-xl-10 mt-10">
                    <div className="col-xl-12 mb-10">
                        <ContainerCard heading="Hi There" subHeading="Here is a few things you can do to get set up:">
                            <InnerCard
                                heading="Build Your Profile"
                                subHeading="Build your profile for other Placement Agents to see"
                                onClick={() => router.push("/build-profile")}
                                bgClass="t-bg-white-opacity h-100"
                                headerTextClass="text-primary cursor-pointer"
                                subHeadingTextClass="text-muted"
                            />
                            <InnerCard
                                heading="Secure your account with 2 Factor Authentication"
                                subHeading="(optional, dismiss by clicking on the x)"
                                bgClass="t-bg-white-opacity h-100"
                                headerTextClass="text-primary cursor-pointer"
                                subHeadingTextClass="text-muted"
                                isRemovable={true}
                                setShowContainerCard={setShowContainerCard}
                                onClick={() => {
                                    setShowModal(true) // Show modal
                                }}
                            />
                        </ContainerCard>
                    </div>
                </div>
            )}

            {/* Render Add2FA modal only when showModal is true */}
            {showModal && (
                <Add2FA
                    onClose={() => {
                        setShowModal(false)
                    }}
                />
            )}

            {/* Render New Opportunities Section */}
            <div className="card bg-transparent">
                <div className="card-header border-0 pt-5 px-0">
                    <h1 className="card-title align-items-start flex-column">
                        <span className="card-label fw-bold text-dark fs-2 ls-m3">
                            New Opportunities <br />
                            <p className="fs-6 text-muted">Here are some opportunities we think you’ll like</p>
                        </span>
                    </h1>
                </div>
            </div>

            {/* Render No Records Found */}
            <NoData />
        </div>
    )
}

export default Page

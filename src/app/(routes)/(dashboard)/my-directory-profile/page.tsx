"use client"
import StickyHeaderComponent from "@/app/_components/common/StickySubHeader"
import ProfileDetail from "@/app/_components/my-directory-profile/ProfileDetail"
import { useRouter } from "next/navigation"
import React from "react"

const MyDirectoryProfile = () => {
    const router = useRouter()
    return (
        <>
            <StickyHeaderComponent title={"Your Profile"} showBackArrow={false} showButton={true}>
                <button
                    className="btn btn-primary rounded-0 w-90 my-5 mx-2 text-uppercase fs-7"
                    onClick={() => {
                        router.push(`/build-profile`)
                    }}
                >
                    EDIT Profile
                </button>
            </StickyHeaderComponent>
            <div id="kt_app_content_container" className="app-container container-fluid">
                <div className="row mt-100">
                    <ProfileDetail />
                </div>
            </div>
        </>
    )
}

export default MyDirectoryProfile

"use client"
import { generateRandomColors, sliceWithEllipsis } from "@/app/_utils/Common"
import { CONFIG } from "@/app/_utils/Constants"
import { handleSignOut, showSweetAlert } from "@/app/_utils/Helpers"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useContext, useEffect, useRef, useState } from "react"
import ShowImageOrTextWithBackground from "./ShowImageOrTextWithBackground"
import { SweetAlertIcon } from "sweetalert2"
import { AnyObject } from "@/app/_types/common/Common"
import { AppContext } from "@/app/_context/Context"
import useCustomTimeout from "@/app/_hooks/useCustomTimeout"

const Header = () => {
    const [showUserMenu, setShowUserMenu] = useState(false)
    const [, setShowNotifications] = useState(false)
    const { userDetail } = useContext<AnyObject>(AppContext)
    const dropdownRef = useRef<HTMLDivElement>(null)
    const router = useRouter()
    const [color] = useState(generateRandomColors())
    const { setCustomTimeout, removeCustomTimeout } = useCustomTimeout()

    const handleLogout = () => {
        handleSignOut(router)
    }

    // The following check is implemented to update the header profile symbol when user information are updated on the profile page.
    useEffect(() => {}, [userDetail])

    return (
        <div id="kt_app_header" className="app-header">
            <div className="app-container container-fluid d-flex align-items-stretch justify-content-between" id="kt_app_header_container">
                <div className="d-flex align-items-center d-lg-none ms-n3 me-1 me-md-2" title="Show sidebar menu">
                    <div className="btn btn-icon btn-active-color-primary w-35px h-35px" id="kt_app_sidebar_mobile_toggle">
                        <span className="svg-icon svg-icon-2 svg-icon-md-1">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M21 7H3C2.4 7 2 6.6 2 6V4C2 3.4 2.4 3 3 3H21C21.6 3 22 3.4 22 4V6C22 6.6 21.6 7 21 7Z" fill="currentColor" />
                                <path
                                    opacity="0.3"
                                    d="M21 14H3C2.4 14 2 13.6 2 13V11C2 10.4 2.4 10 3 10H21C21.6 10 22 10.4 22 11V13C22 13.6 21.6 14 21 14ZM22 20V18C22 17.4 21.6 17 21 17H3C2.4 17 2 17.4 2 18V20C2 20.6 2.4 21 3 21H21C21.6 21 22 20.6 22 20Z"
                                    fill="currentColor"
                                />
                            </svg>
                        </span>
                    </div>
                </div>

                <div className="d-flex align-items-center flex-grow-1 flex-lg-grow-0">
                    <a href="#" className="d-lg-none">
                        <img alt="Logo" src="/assets/media/logos/matrix-white.svg" className="h-30px" />
                    </a>
                </div>

                <div className="d-flex align-items-stretch justify-content-between flex-lg-grow-1" id="kt_app_header_wrapper">
                    <div
                        className="app-header-menu app-header-mobile-drawer align-items-stretch"
                        data-kt-drawer="true"
                        data-kt-drawer-name="app-header-menu"
                        data-kt-drawer-activate="{default: true, lg: false}"
                        data-kt-drawer-overlay="true"
                        data-kt-drawer-width="250px"
                        data-kt-drawer-direction="end"
                        data-kt-drawer-toggle="#kt_app_header_menu_toggle"
                        data-kt-swapper="true"
                        data-kt-swapper-mode="{default: 'append', lg: 'prepend'}"
                        data-kt-swapper-parent="{default: '#kt_app_body', lg: '#kt_app_header_wrapper'}"
                    ></div>

                    <div className="app-navbar flex-shrink-0">
                        <div className="app-navbar-item ms-1 ms-md-3" id="kt_header_user_menu_toggle" ref={dropdownRef}>
                            <div
                                className="cursor-pointer symbol symbol-30px symbol-md-40px"
                                data-kt-menu-trigger="{default: 'click', lg: 'hover'}"
                                data-kt-menu-attach="parent"
                                data-kt-menu-placement="bottom-end"
                                onMouseEnter={() => {
                                    setShowNotifications(false)
                                    setShowUserMenu(true)
                                }}
                                onMouseLeave={() => {
                                    setCustomTimeout(CONFIG.USER_MENU_TIMEOUT, () => setShowUserMenu(false))
                                }}
                            >
                                <ShowImageOrTextWithBackground
                                    color={color}
                                    text={userDetail?.user?.first_name[0]?.toUpperCase()}
                                    imageSource={userDetail?.user?.avatar}
                                    alt="user logo"
                                    customClassName="logged-in-user-header-image"
                                    size={CONFIG.IMAGE_SIZE.LOGGED_IN_USER_HEADER_IMAGE}
                                    squareImage
                                    small
                                    textClassName="logged-in-user-header-text-image"
                                />
                            </div>
                            {showUserMenu ? (
                                <div
                                    className="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-800 menu-state-bg menu-state-color fw-semibold py-4 fs-6 w-275px show custom-show-user-dropdown"
                                    onMouseEnter={() => {
                                        removeCustomTimeout(() => setShowUserMenu(true))
                                    }}
                                    onMouseLeave={() => setShowUserMenu(false)}
                                >
                                    <div className="menu-item px-3">
                                        <div className="menu-content d-flex align-items-center px-3">
                                            <ShowImageOrTextWithBackground
                                                color={color}
                                                text={userDetail?.user?.first_name[0].toUpperCase()}
                                                imageSource={userDetail?.user?.avatar}
                                                alt="user logo"
                                                customClassName="logged-in-user-header-image"
                                                size={CONFIG.IMAGE_SIZE.LOGGED_IN_USER_HEADER_IMAGE}
                                                className="symbol symbol-50px me-5"
                                                squareImage
                                                small
                                            />

                                            <div className="d-flex flex-column overflow-hidden">
                                                <div className="fw-bold d-flex align-items-center fs-5 text-break">
                                                    {sliceWithEllipsis(`${userDetail?.user?.first_name} ${userDetail?.user?.last_name}`, CONFIG.USER_CARD_WORD_SLICE_LIMIT)}
                                                </div>
                                                <span className="fw-semibold text-muted fs-7 text-break">{sliceWithEllipsis(userDetail?.user?.email, CONFIG.USER_CARD_WORD_SLICE_LIMIT)}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="separator my-2"></div>

                                    {/* <div className="menu-item px-5 my-1">
                                        <Link legacyBehavior href={`#`}>
                                            <a href={`#`} className="menu-link px-5">
                                                Account Settings
                                            </a>
                                        </Link>
                                    </div> */}
                                    <div className="menu-item px-5">
                                        <Link legacyBehavior href={CONFIG.REDIRECT_PATHNAME.PROFILE} className="menu-link px-5">
                                            <a className="menu-link px-5">My Profile</a>
                                        </Link>
                                    </div>
                                    <div className="menu-item px-5 cursor-pointer">
                                        <a
                                            onClick={async () => {
                                                const result = await showSweetAlert(
                                                    CONFIG.MESSAGES.CONFIRM_SIGNOUT,
                                                    CONFIG.SWEETALERT_LOGOUT_OPTION.icon as SweetAlertIcon,
                                                    CONFIG.SWEETALERT_LOGOUT_OPTION.cancelButtonText as SweetAlertIcon,
                                                    false,
                                                )
                                                if (result.isConfirmed) {
                                                    handleLogout()
                                                }
                                            }}
                                            className="menu-link px-5"
                                        >
                                            Sign Out
                                        </a>
                                    </div>
                                </div>
                            ) : (
                                <></>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header

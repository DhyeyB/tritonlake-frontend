"use client"
import Link from "next/link"
import { Suspense, useEffect, useState } from "react"
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar"
import { usePathname } from "next/navigation"
import { isFirmAgent, isNetworkAdmin } from "@/app/_utils/Helpers"
import { SidebarItemType } from "@/app/_types/common/SidebarItem"

const Aside = () => {
    const pathname = usePathname()
    const _sidebarItems = [
        // {
        //     title: "DASHBOARDS",
        //     key: 1,
        //     icon: "fa-solid fa-group-arrows-rotate fs-7",
        //     items: [
        //         { title: "Home", link: "/dashboard", key: 1.1, icon: "fa-solid fa-chalkboard-user" },
        //         // { title: "Inbound Engagement", link: "#", key: 1.2, icon: "fa-solid fa-group-arrows-rotate" },
        //     ],
        // },
        {
            title: "OPPORTUNITIES",
            key: 2,
            icon: "/assets/media/svg/custom/report.svg",
            items: [
                {
                    title: "Add Opportunity",
                    link: "/opportunities/add-opportunity",
                    key: 2.1,
                    icon: "fa-solid fa-square-plus",
                },
                {
                    title: "My Opportunities",
                    link: "/opportunities",
                    key: 2.2,
                    icon: "fa-solid fa-arrow-up-from-bracket",
                },
                { title: "External Opportunities", link: "/opportunities/external-opportunity", key: 2.3, icon: "fa-solid fa-arrows-down-to-line" },
            ],
        },
        // {
        //     title: "RESOURCES",
        //     key: 3,
        //     icon: "/assets/media/svg/custom/order.svg",
        //     items: [
        //         { title: "Placement Agent Directory", link: "#", key: 3.1, icon: "fa-solid fa-chart-simple" },
        //         { title: "Library", link: "/customers", key: 3.2, icon: "fa-solid fa-chart-simple" },
        //     ],
        // },
        {
            title: "NETWORK MANAGEMENT",
            key: 4,
            icon: "/assets/media/svg/custom/communication.svg",
            items: [
                // { title: "Dashboard", link: "#", key: 4.1, icon: "fa-solid fa-certificate" },
                {
                    title: "Manage Networks",
                    link: "/manage-networks",
                    key: 4.2,
                    icon: "fa-solid fa-network-wired",
                },
                {
                    title: "Manage Agents",
                    link: "/manage-agents",
                    key: 4.3,
                    icon: "fa-solid far fa-address-card",
                },
                { title: "My Network Opportunities", link: "/opportunities/my-network-opportunities", key: 4.4, icon: "fa-solid fa-network-wired" },
            ],
        },
        {
            title: "SETTINGS",
            key: 5,
            icon: "/assets/media/svg/custom/marketing.svg",
            items: [
                // { title: "Internal Users", link: "#", key: 5.1, icon: "fa-solid fas fa-user-cog" },
                // { title: "User Resources", link: "#", key: 5.2, icon: "fa-solid fas fa-book-open" },
                { title: "My Directory Profile", link: "/my-directory-profile", key: 5.3, icon: "fa-solid fas fa-user-circle" },
                // { title: "Legal links", link: "#", key: 5.4, icon: "fa-solid far fa-address-card" },
                // { title: "Network Settings", link: "#", key: 5.5, icon: "fa-solid fas fa-network-wired" },
                // { title: "Platform Settings", link: "#", key: 5.6, icon: "fa-solid fa fa-cog" },
                {
                    title: "My Profile",
                    link: "/profile",
                    key: 5.7,
                    icon: "fa-solid fas fa-user-alt",
                },
            ],
        },
    ]

    // Temporary solution for handeling sidebar
    const [sidebarItems, setSidebarItems] = useState<SidebarItemType[]>([..._sidebarItems])
    const isActive = (url: string) => {
        return pathname.includes(url) && pathname == url
    }

    useEffect(() => {
        const updatedSidebarItems = _sidebarItems
            .map((item) => {
                if (isFirmAgent() && item.key === 4) {
                    // For agents, remove the entire "Network Management" section
                    return null
                }

                if (isNetworkAdmin() && item.key === 4) {
                    // For network users, remove "Manage Agents" from "Network Management"
                    return {
                        ...item,
                        items: item.items.filter((subItem) => subItem.key !== 4.2),
                    }
                }

                // For platform or other roles, keep items as they are
                return item
            })
            .filter(Boolean) // Remove null values

        setSidebarItems(updatedSidebarItems as SidebarItemType[])
    }, [])

    return (
        <Suspense>
            <div
                style={{ backgroundColor: "#191919" }}
                id="kt_app_sidebar"
                className={`app-sidebar flex-column`}
                data-kt-drawer="true"
                data-kt-drawer-name="app-sidebar"
                data-kt-drawer-activate="{default: true, lg: false}"
                data-kt-drawer-overlay="true"
                data-kt-drawer-width="225px"
                data-kt-drawer-direction="start"
                data-kt-drawer-toggle="#kt_app_sidebar_mobile_toggle"
            >
                <div className="app-sidebar-logo px-6" style={{ backgroundColor: "#191919" }} id="kt_app_sidebar_logo">
                    <Link href="/">
                        <img alt="Logo" src="/assets/media/logos/default-dark.svg" className="h-40px app-sidebar-logo-default" />
                        <img alt="Logo" src="/assets/media/logos/matrix-white.svg" className="h-30px app-sidebar-logo-minimize" />
                    </Link>

                    <div
                        id="kt_app_sidebar_toggle"
                        className="app-sidebar-toggle btn btn-icon btn-shadow btn-sm btn-color-muted btn-active-color-primary body-bg h-30px w-30px position-absolute top-50 start-100 translate-middle rotate"
                        data-kt-toggle="true"
                        data-kt-toggle-state="active"
                        data-kt-toggle-target="body"
                        data-kt-toggle-name="app-sidebar-minimize"
                    >
                        <span className="svg-icon svg-icon-2 rotate-180">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    opacity="0.5"
                                    d="M14.2657 11.4343L18.45 7.25C18.8642 6.83579 18.8642 6.16421 18.45 5.75C18.0358 5.33579 17.3642 5.33579 16.95 5.75L11.4071 11.2929C11.0166 11.6834 11.0166 12.3166 11.4071 12.7071L16.95 18.25C17.3642 18.6642 18.0358 18.6642 18.45 18.25C18.8642 17.8358 18.8642 17.1642 18.45 16.75L14.2657 12.5657C13.9533 12.2533 13.9533 11.7467 14.2657 11.4343Z"
                                    fill="currentColor"
                                />
                                <path
                                    d="M8.2657 11.4343L12.45 7.25C12.8642 6.83579 12.8642 6.16421 12.45 5.75C12.0358 5.33579 11.3642 5.33579 10.95 5.75L5.40712 11.2929C5.01659 11.6834 5.01659 12.3166 5.40712 12.7071L10.95 18.25C11.3642 18.6642 12.0358 18.6642 12.45 18.25C12.8642 17.8358 12.8642 17.1642 12.45 16.75L8.2657 12.5657C7.95328 12.2533 7.95328 11.7467 8.2657 11.4343Z"
                                    fill="currentColor"
                                />
                            </svg>
                        </span>
                    </div>
                </div>
                <Sidebar className="app-sidebar-menu h-100 overflow-auto flex-column-fluid kt_app_sidebar_menu_wrapper" width="100%" backgroundColor="#191919">
                    <Menu menuItemStyles={{ SubMenuExpandIcon: { display: "none" } }}>
                        <div className="menu-sub-indention px-3 pt-5" style={{ marginBottom: "7rem" }} id="#kt_app_sidebar_menu" data-kt-menu="true" data-kt-menu-expand="false">
                            {sidebarItems?.map((item) => {
                                return (
                                    <SubMenu
                                        className={`menu-heading fw-bold text-uppercase fs-8 ls-1 pt-6 px-2`}
                                        label={item.title}
                                        key={item.key}
                                        style={{
                                            padding: "0rem 0.4rem",
                                            height: "40px",
                                            color: "#646477",
                                            pointerEvents: "none",
                                        }}
                                        open
                                    >
                                        {item?.items?.map((subItem) => (
                                            <MenuItem
                                                key={subItem.key}
                                                className="fs-8 ls-1 fw-4"
                                                style={{
                                                    height: "35px",
                                                    backgroundColor: "#191919",
                                                }}
                                                component={<Link href={subItem.link} className="menu-link p-0" />}
                                            >
                                                <div
                                                    className="d-flex align-items-center text-capitalize menu-content t-hover-icon"
                                                    style={{
                                                        backgroundColor: isActive(subItem.link) ? "#036838" : "transparent",
                                                        padding: "0.5rem",
                                                        borderRadius: "6px",
                                                    }}
                                                >
                                                    <span className="menu-icon fs-7">
                                                        <i
                                                            className={subItem.icon}
                                                            style={{
                                                                color: isActive(subItem.link) ? "#fff" : "#9D9DA6",
                                                            }}
                                                        ></i>
                                                    </span>
                                                    <span
                                                        className="menu-title fw-normal fs-7"
                                                        style={{
                                                            color: isActive(subItem.link) ? "#fff" : "#9D9DA6",
                                                        }}
                                                    >
                                                        {subItem.title}
                                                    </span>
                                                </div>
                                            </MenuItem>
                                        ))}
                                    </SubMenu>
                                )
                            })}
                        </div>
                    </Menu>
                </Sidebar>
            </div>
        </Suspense>
    )
}

export default Aside

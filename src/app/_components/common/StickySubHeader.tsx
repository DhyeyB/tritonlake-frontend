"use client"
import { DynamicStickyHeaderProps } from "@/app/_types/common/DynamicStickyHeader"
import { ArrowLeftIcon } from "../svg/LeftArrowIconSvg"
import Link from "next/link"
import { ReactNode } from "react"

interface StickyHeaderComponentProps extends DynamicStickyHeaderProps {
    children?: ReactNode // Optional children prop for custom button content
}

export default function StickyHeaderComponent({ title = "Invite Agent", showBackArrow = true, backLink = "", children, onButtonClick }: StickyHeaderComponentProps) {
    return (
        <>
            <div className="card m-0 d-flex flex-wrap sticky-heading">
                <div className="card-header border-0 w-100 d-flex justify-content-between align-items-center">
                    <div className="card-title align-items-start flex-column">
                        <span className="card-label fw-bold text-dark fs-1 ls-m3">
                            {showBackArrow && (
                                <Link href={backLink} onClick={onButtonClick}>
                                    <span className="svg-icon svg-icon-primary svg-icon-2x mx-1">
                                        <ArrowLeftIcon />
                                    </span>
                                </Link>
                            )}
                            {title}
                        </span>
                    </div>
                    {/* Render custom children content (buttons or other elements) */}
                    <div className="button-group position-relative">{children}</div>
                </div>
            </div>
        </>
    )
}

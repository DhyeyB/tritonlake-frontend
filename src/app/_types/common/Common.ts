/* eslint-disable @typescript-eslint/no-explicit-any */
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime"
import { SweetAlertIcon } from "sweetalert2"
import { Option } from "./SelectBox"
import { Dispatch, SetStateAction } from "react"

export interface ShowSweetAlertWithRedirectArgsType {
    message: string
    icon: SweetAlertIcon
    router: AppRouterInstance
    url: string
}

export interface TabHeaderType {
    isDisabled?: boolean
    isSubmitting: boolean
    isDiscard?: boolean
    containerClassName?: string
}

export interface ShowImageOrTextWithBackgroundPropType {
    color: string
    text: string | undefined
    imageSource: any
    alt: string
    size: string
    className?: string
    customClassName?: string
    imageClassName?: string
    squareImage?: boolean
    small?: boolean
    textClassName?: string
    iconName?: string
    iconWidth?: number
    iconHeight?: number
    iconClassName?: string
}

export interface HandleAssetDelete {
    id: string | number
    name: string
    href: string
    router: AppRouterInstance
    onSuccess?: () => void
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AnyObject = Record<string, any>

export type Searchable = {
    searchable?: boolean
    dropdown?: boolean
    date?: string
    dynamicDropdown?: URL
    dropdownValues?: Option[] | undefined
    defaultValue?: Option
    dynamicDropdownValue?: string
    searchableDropdownFilterKey?: string
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Any = any

export interface DateRangeAndDownloadToolbarProps {
    isActionsDisabled: boolean
    extraFilters: {
        start_date: string
        end_date: string
    }
    setExtraFilters: Dispatch<
        SetStateAction<{
            start_date: string
            end_date: string
        }>
    >
    url: URL
    showAddButton: boolean
    addButtonTitle?: string
    onAddButton?: () => void | string
    pdfTitle: string
}

export interface SidebarSubItem {
    title: string
    key: number
    link: string
}

export interface SidebarItem {
    title: string
    key: number
    icon: string
    link: string
    items: SidebarSubItem[]
    activeIcon: string
}

import { AssetTypes } from "@/app/_enums/AssetTypesEnum"
import type { ReactElement } from "react"
import { GroupBase, Props } from "react-select"
import type { ComponentProps, UseAsyncPaginateParams } from "react-select-async-paginate"
import type { CreatableProps } from "react-select/creatable"
import { Params } from "./FetchHelper"

export interface CustomReactSelect {
    selectedOptionValue?: string | null
    placeholder?: string
    onDropdownChange: (value: string) => void
    optionsData: { label: string; value: string }[]
    isClearable?: boolean
    isDisabled?: boolean
}

export interface CustomReactMultiSelect {
    selectedOptionValue?: string[] | null
    placeholder?: string
    onDropdownChange: (values: string[]) => void
    optionsData: { label: string; value: string }[]
    isClearable?: boolean
    styles?: boolean
}

export interface Option {
    label: string
    value: string | number | undefined
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data?: any
}

export type AsyncPaginateCreatableType = <Option, Group extends GroupBase<Option>, Additional, IsMulti extends boolean = false>(
    props: AsyncPaginateCreatableProps<Option, Group, Additional, IsMulti>,
) => ReactElement

export type AsyncPaginateCreatableProps<Option, Group extends GroupBase<Option>, Additional, IsMulti extends boolean> = CreatableProps<Option, IsMulti, Group> &
    UseAsyncPaginateParams<Option, Group, Additional> &
    ComponentProps<Option, Group, IsMulti>

export type IncomingOptionPropType = Option & { __isNew__: boolean }

export interface DistributorSelectPropType extends CreatableProps<Option, boolean, GroupBase<Option>> {
    selectedOptionValue?: Option | Option[] | null
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onSelected: (option: any) => void
    isClearable?: boolean
    isDisabled?: boolean
    assetType: AssetTypes
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    refetch?: Array<any>
    creatable?: boolean
    label: string
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    procurementCategory?: boolean
    params?: Params
}

export interface CreatableSelectPropType extends CreatableProps<Option, boolean, GroupBase<Option>> {
    onCreate: (label: string) => void
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onSelected: (option: any) => void
    selectedOptionValue?: Option | Option[] | null
    optionName: string
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    endpoint: URL
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    params?: Record<string, any>
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    getOptionLabel: (option: any) => string
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    getOptionValue: (option: any) => string
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    getOptionData?: (option: any) => any
}

export interface BaseSelectPropType extends CreatableProps<Option, boolean, GroupBase<Option>> {
    endpoint: URL
    onSelected: (option: Option | Option[] | null) => void
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    params?: Record<string, any>
    creatable?: boolean
    optionName?: string
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    getOptionLabel: (option: any) => string
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    getOptionValue: (option: any) => string
    onCreate?: (label: string) => void
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    getOptionData: (option: any) => any
}
export interface DistributorSelectType extends CreatableProps<Option, boolean, GroupBase<Option>> {
    selectedOptionValue?: Option | Option[] | null
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onSelected: (option: any) => void
    assetType: AssetTypes
    creatable?: boolean
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
}

export interface AssetDropdownPropType extends DistributorSelectType {
    label: string
}

export interface BaseStaticSelectPropType extends Props<Option> {
    onSelected: (option: Option | Option[] | null) => void
    isMulti?: boolean
    options: Option[]
    selectedOptionValue?: Option | Option[] | null
    placeholder?: string
    className?: string
}

export interface LanguageSelectPropType {
    value?: Option | Option[] | null
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onSelected: (option: any) => void
    isOptionDisabled?: (option: Option) => boolean
    isMulti?: boolean
}

export interface RegionSelectPropType extends CreatableProps<Option, boolean, GroupBase<Option>> {
    selectedOptionValue?: Option | Option[] | null
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onSelected: (option: any) => void
    isClearable?: boolean
    isDisabled?: boolean
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    refetch?: Array<any>
    label: string
}

export interface GenreMultiSelectPropType {
    assetType: AssetTypes
    selectedOptionValue: Option[] | null
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onSelected: (option: any) => void
}

export interface TagSelectPropType extends CreatableProps<Option, boolean, GroupBase<Option>> {
    selectedOptionValue: Option[] | null
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onSelected: (option: any) => void
}

export interface BaseWrapperSelectPropType extends CreatableProps<Option, boolean, GroupBase<Option>> {
    selectedOptionValue?: Option | Option[] | null
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onSelected: (option: any) => void
    isClearable?: boolean
    isDisabled?: boolean
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    refetch?: Array<any>
    creatable?: boolean
    label: string
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    procurementCategory?: boolean
    params?: Params
    isSchemaDesign?: boolean
}

export interface EmrSelectPropType extends CreatableProps<Option, boolean, GroupBase<Option>> {
    selectedOptionValue?: Option | Option[] | null
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onSelected: (option: any) => void
    isClearable?: boolean
    isDisabled?: boolean
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    refetch?: Array<any>
    creatable?: boolean
    label: string
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    params?: Params
}

import { Any } from "./Common"
import { Option } from "./SelectBox"

export interface FilterState {
    search_term: string
    order_by: string
    type: string
    status: string
}

export interface ModalFilterState {
    sponsor_name?: string // Assuming this is an array of strings
    originators: Option[] // Same assumption
    investment_type: Any // Array of string values
    asset_class: Option[] // Array of string values
    strategies: Option[] // Array of string values
    markets: Option[] // Array of string values
    countries: Option[] // Array of string values
    industries: Option[] // Array of string values
    total_raise_amount_min: number
    total_raise_amount_max: number
    target_raise_on_matrix_min: number
    target_raise_on_matrix_max: number
    days_left: number
}

export const defaultModalFilterOptions = {
    sponsor_name: "",
    originators: [],
    investment_type: "",
    asset_class: [],
    strategies: [],
    markets: [],
    countries: [],
    industries: [],
    total_raise_amount_min: 0,
    total_raise_amount_max: 0,
    target_raise_on_matrix_min: 0,
    target_raise_on_matrix_max: 0,
    days_left: 0,
}

export const defaultFilterOptions = {
    search_term: "",
    order_by: "",
    status: "",
    type: "",
}

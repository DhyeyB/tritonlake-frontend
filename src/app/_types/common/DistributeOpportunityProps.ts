import { Any } from "./Common"
import { Option } from "./SelectBox"

export interface Filters {
    investment_type_ids: Any
    asset_class_ids: Option[]
    strategy_ids: Option[]
    fund_number: string
    target_fund_size: string
    industry_ids: Option[]
    region_ids: Option[]
    country_ids: Option[]
    status: string
    network_coverage_ids: Option[]
}

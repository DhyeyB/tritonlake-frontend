import { Any } from "../_types/common/Common"

/**
 * Formats raw data into a structured format suitable for previewing detailed information.
 * This function processes the input data by restructuring and normalizing specific fields
 * (e.g., sponsor_name, asset_class, industries, etc.), ensuring consistent formatting for display.
 *
 * - Resolves nested `data` objects or `label` values for relevant fields.
 * - Maps arrays (e.g., industries, strategies) to extract their `data` objects.
 * - Converts specific fields (e.g., vintage_year) to appropriate types for better usability.
 * - Handles nested structures like `vehicle`, ensuring all nested fields are correctly formatted.
 *
 * @param {Any} rawData - The raw data object to be formatted.
 * @returns {Any} The formatted data object ready for preview display.
 */
export const formatPreviewData = (rawData: Any) => {
    const updatedData = {
        ...rawData,
        // sponsor_name: rawData?.sponsor_name?.data?.name ? { ...rawData?.sponsor_name?.data } : { name: rawData?.sponsor_name?.label },
        sponsor_name: rawData?.sponsor_name,
        asset_class: rawData?.asset_class?.data?.name ? { ...rawData?.asset_class?.data } : { name: rawData?.asset_class?.label },
        contact: rawData?.contact?.data?.name ? { ...rawData?.contact?.data } : { name: rawData?.contact?.label },
        country: rawData?.country?.data?.name ? { ...rawData?.country?.data } : { name: rawData?.country?.label },
        currency: { symbol: rawData?.currencySymbol },
        firm: rawData?.firm?.data?.name ? { ...rawData?.firm?.data } : { name: rawData?.firm?.label },
        investment_type: rawData?.investment_type?.data?.name ? { ...rawData?.investment_type?.data } : { name: rawData?.investment_type?.label },
        region: rawData?.region?.data?.name ? { ...rawData?.region?.data } : { name: rawData?.region?.label },
        term: { ...rawData?.term, waterfall_type: rawData?.term?.waterfall_type?.data?.name ? { ...rawData?.term?.waterfall_type?.data } : { name: rawData?.term?.waterfall_type?.label } },

        industries: rawData?.industries?.map((item: Any) => item.data),
        strategies: rawData?.strategies?.map((item: Any) => item.data),
        target: { ...rawData?.target, market_regions: rawData?.target?.market_regions?.map((item: Any) => item.data) },
        vintage_year: rawData?.vintage_year?.label,
        vehicle: {
            ...rawData?.vehicle,
            investor_types: rawData?.vehicle?.investor_types?.map((item: Any) => item.data),
            jurisdiction_country: rawData?.vehicle?.jurisdiction_country?.data?.name ? { ...rawData?.vehicle?.jurisdiction_country?.data } : { name: rawData?.vehicle?.jurisdiction_country?.label },
            jurisdiction_states: rawData?.vehicle?.jurisdiction_states?.map((item: Any) => item.data),
            structure: rawData?.vehicle?.structure?.data?.name ? { ...rawData?.vehicle?.structure?.data } : { name: rawData?.vehicle?.structure?.label },
            tax_reportings: rawData?.vehicle?.tax_reportings?.map((item: Any) => item.data),
        },
    }
    return updatedData
}

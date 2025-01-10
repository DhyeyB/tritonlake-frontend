import { z } from "zod"
import {
    getOptionalNameFieldSchemaWithOnlyNumbers,
    getOptionalNameFieldSchemaWithOnlyNumbersGreaterThanZero,
    getOptionalPercentageFieldSchema,
    getRequiredMultiSelectFieldSchema,
    requiredSingleDropdownSchema,
} from "@/app/_utils/validation/FieldSchema"
import { generateErrorMessage } from "@/app/_utils/validation/Common"

import { CONFIG } from "@/app/_utils/Constants"

export const QuicksearchSchema = z.object({
    summary: z
        .string({
            invalid_type_error: generateErrorMessage("Summary"),
            required_error: generateErrorMessage("Summary"),
        })
        .trim()
        .nonempty("Summary is required")
        .max(255, "Must be at most 255 characters"),
    lp_type: requiredSingleDropdownSchema("LP Type "),
    lp_location: requiredSingleDropdownSchema("LP Location"),
    asset_classes: getRequiredMultiSelectFieldSchema("Asset Class"),
    strategies: getRequiredMultiSelectFieldSchema("Strategy"),
    geographical_regions: getRequiredMultiSelectFieldSchema("Geographical Focus (Region)"),
    industries: getRequiredMultiSelectFieldSchema("Industry"),
    target_irr: getOptionalPercentageFieldSchema("Target IRR"),
    target_moic: getOptionalNameFieldSchemaWithOnlyNumbers("Target MOIC"),

    fund_number_min: getOptionalNameFieldSchemaWithOnlyNumbersGreaterThanZero("Fund Number Min"),
    fund_number_max: getOptionalNameFieldSchemaWithOnlyNumbersGreaterThanZero("Fund Number Max"),

    deal_size_min: getOptionalNameFieldSchemaWithOnlyNumbersGreaterThanZero("Deal Size Min"),
    deal_size_max: getOptionalNameFieldSchemaWithOnlyNumbersGreaterThanZero("Deal Size Max"),

    bite_size_min: getOptionalNameFieldSchemaWithOnlyNumbersGreaterThanZero("Fund Size Min"),
    bite_size_max: getOptionalNameFieldSchemaWithOnlyNumbersGreaterThanZero("Fund Size Max"),

    valid_until: z.string({ message: "Valid Until Date is required" }).nonempty("Valid Until Date is required"),
    firm: requiredSingleDropdownSchema("Originator"),
    networks: getRequiredMultiSelectFieldSchema(CONFIG.VALIDATION.FIELD_NAME.NETWORK),
})

export type QuicksearchSchemaType = z.infer<typeof QuicksearchSchema>

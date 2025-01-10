import { z } from "zod"
import {
    getNameFieldSchema,
    getNameFieldSchemaWithOnlyNumbers,
    getNameFieldSchemaWithOnlyNumbersGreaterThanZero,
    getOptionalMultiSelectFieldSchema,
    getOptionalNameFieldSchemaWithOnlyNumbers,
    getOptionalNameFieldSchemaWithOnlyNumbersGreaterThanZero,
    getOptionalPercentageFieldSchema,
    // getRequiredFloatFieldSchema,
    getRequiredMultiSelectFieldSchema,
    getRequiredPercentageFieldSchema,
    getValueorNullSchema,
    getValueorNullTransformedSchema,
    requiredSingleDropdownSchema,
} from "@/app/_utils/validation/FieldSchema"
import { generateErrorMessage } from "@/app/_utils/validation/Common"

import { CONFIG } from "@/app/_utils/Constants"
export const QuickshareSchema = z
    .object({
        // OVERVIEW
        cover: z.any().transform((value) => (value ? value.id : null)),
        firm: requiredSingleDropdownSchema("Originator"),
        short_description: z
            .string({
                invalid_type_error: generateErrorMessage("Short Description"),
                required_error: generateErrorMessage("Short Description"),
            })
            .trim() // Trim extra spaces from both ends
            .nonempty("Short Description is required")
            .max(100, "Must be at most 100 characters"),
        // reference_id: z
        //     .string({
        //         invalid_type_error: generateErrorMessage("Opportunity ID"),
        //         required_error: generateErrorMessage("Opportunity ID"),
        //     })
        //     .nonempty("Opportunity ID is required")
        //     .refine(
        //         (value) => /^[a-zA-Z0-9\s]+$/.test(value), // Allow only alphanumeric characters and spaces
        //         {
        //             message: `Opportunity ID must not contain special characters`,
        //         },
        //     ),
        reference_id: z
            .string()
            // .nullish()
            .optional() // Makes the field optional
            .refine(
                (value) => !value || /^[a-zA-Z0-9\s]+$/.test(value), // Check regex only if value exists
                {
                    message: `Opportunity ID must not contain special characters`,
                },
            )
            .nullable(),
        name: getNameFieldSchema("Opportunity Name").refine(
            (value) => /^[a-zA-Z0-9\s'-.()éÉ&]+$/.test(value), // Allow only alphanumeric characters and spaces
            {
                message: `Opportunity Name must not contain special characters`,
            },
        ),
        asset_class: requiredSingleDropdownSchema("Asset Class"),
        strategies: getRequiredMultiSelectFieldSchema("Strategy"), // dynamic multi select
        currency: requiredSingleDropdownSchema("Currency"),
        fundraising: z.object({
            target_raise: getNameFieldSchemaWithOnlyNumbersGreaterThanZero("Target raise"),
        }),
        target: z.object({
            // irr: getRequiredPercentageFieldSchema("Target IRR"),
            // moic: getRequiredFloatFieldSchema("Target MOIC").refine((value) => value && value > 0, {
            //     message: `Target MOIC must be greater than 0`, // Ensure value is greater than 0
            // }),
            irr: getOptionalPercentageFieldSchema("Target IRR"),
            moic: getOptionalNameFieldSchemaWithOnlyNumbers("Target MOIC"),

            market_regions: getRequiredMultiSelectFieldSchema("Market Region "),
        }),
        placement: z.object({
            fee: getRequiredPercentageFieldSchema("Placement Fee"),
            installments_no: getNameFieldSchemaWithOnlyNumbers("Number of Instalments").refine((value) => parseInt(value) > 0, {
                message: `Number of Instalments must be greater than 0`, // Ensure value is greater than 0
            }),
            payment_frequency: getNameFieldSchema("Payment Frequency"),
        }),
        region: requiredSingleDropdownSchema("Region"),
        country: requiredSingleDropdownSchema("Country"),
        // networks: requiredSingleDropdownSchema(CONFIG.VALIDATION.FIELD_NAME.NETWORK),
        networks: getRequiredMultiSelectFieldSchema(CONFIG.VALIDATION.FIELD_NAME.NETWORK),
        investment_type: requiredSingleDropdownSchema("Investment Type"), // Adjust enum values as per the backend
        fund_type: getValueorNullSchema(), // Adjust enum values as per the backend
        fund_number: getValueorNullSchema().transform((value) => parseInt(value)),

        investment_label: z.any(), // Adjust enum values as per the backend

        estimated_close_date: z.string({ message: "Estimated Close Date is required" }).nonempty("Estimated Close Date is required"),
        contact: requiredSingleDropdownSchema("Key Contact"),
    })
    .superRefine((fields, ctx) => {
        if (fields.investment_label !== "Direct Deal" && !fields.fund_type) {
            ctx.addIssue({
                code: "custom",
                message: "Fund Type is required",
                path: ["fund_type"], // Path points to the exact field
            })
        }
        if (fields.fund_type == "closed" && !fields.fund_number) {
            ctx.addIssue({
                code: "custom",
                message: "Fund Number is required",
                path: ["fund_number"], // Path points to the exact field
            })
        }
    })

// New Field. Values = open-ended or closed. Add to Key Details section in Opportunity form and in QuickShare form. Mandatory if Investment Type not equal to  'Direct Deal'

export type QuickshareSchemaType = z.infer<typeof QuickshareSchema>

export const DraftQuickshareSchema = z.object({
    cover: z.any().transform((value) => (value ? value.id : null)),
    firm: requiredSingleDropdownSchema("Originator"),
    investment_type: requiredSingleDropdownSchema("Investment Type"),
    currency: requiredSingleDropdownSchema("Currency"),
    name: getNameFieldSchema("Opportunity Name").refine(
        (value) => /^[a-zA-Z0-9\s]+$/.test(value), // Allow only alphanumeric characters and spaces
        {
            message: `Opportunity Name must not contain special characters`,
        },
    ),
    networks: getOptionalMultiSelectFieldSchema(CONFIG.VALIDATION.FIELD_NAME.NETWORK),
    // networks: getValueorNullTransformedSchema(),
    investment_label: z.any(),
    reference_id: z
        .string()
        // .nullish()
        .optional() // Makes the field optional
        .refine(
            (value) => !value || /^[a-zA-Z0-9\s]+$/.test(value), // Check regex only if value exists
            {
                message: `Opportunity ID must not contain special characters`,
            },
        )
        .nullable(),
    short_description: z
        .string()
        .optional() // Makes the field optional
        .transform((value) => value?.trim() || "") // Trim spaces if value exists
        .refine((value) => !value || value.length <= 100, {
            message: "Must be at most 100 characters",
        })
        .nullable(),

    fund_type: getValueorNullSchema(),
    fund_number: getValueorNullSchema(),

    estimated_close_date: z
        .string()
        .optional() // Make the field optional
        .refine((value) => !value || value.trim().length > 0, {
            message: "Estimated Close Date is required",
        })
        .nullable(),

    contact: getValueorNullTransformedSchema(),

    region: getValueorNullTransformedSchema(),
    country: getValueorNullTransformedSchema(),
    asset_class: getValueorNullTransformedSchema(),
    strategies: getOptionalMultiSelectFieldSchema("Strategy"), // dynamic multi select

    target: z.object({
        irr: getOptionalPercentageFieldSchema("Target IRR"),
        moic: getOptionalNameFieldSchemaWithOnlyNumbers("Target MOIC"),
        market_regions: getOptionalMultiSelectFieldSchema("Market Region "),
    }),

    fundraising: z.object({
        target_raise: getOptionalNameFieldSchemaWithOnlyNumbersGreaterThanZero("Target Raise"),
    }),

    placement: z.object({
        fee: getOptionalPercentageFieldSchema("Placement Fee"),
        installments_no: getOptionalNameFieldSchemaWithOnlyNumbers("Number of Instalments"),
        payment_frequency: getValueorNullTransformedSchema(),
    }),
})

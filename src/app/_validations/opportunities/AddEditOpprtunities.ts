import { z } from "zod"
import {
    getNameFieldSchema,
    getNameFieldSchemaWithMaxChar,
    getNameFieldSchemaWithOnlyNumbers,
    getNameFieldSchemaWithOnlyNumbersGreaterThanZero,
    getoptionalEmailSchema,
    getOptionalFloatFieldSchema,
    getOptionalMultiSelectFieldSchema,
    getOptionalNameFieldSchemaWithMaxChar,
    getOptionalNameFieldSchemaWithOnlyNumbers,
    getOptionalNameFieldSchemaWithOnlyNumbersGreaterThanZero,
    getOptionalPercentageFieldSchema,
    // getRequiredFloatFieldSchema,
    getRequiredMultiSelectFieldSchema,
    getRequiredPercentageFieldSchema,
    getURLSchema,
    getValueorNullSchema,
    getValueorNullTransformedSchema,
    requiredSingleDropdownSchema,
} from "@/app/_utils/validation/FieldSchema"
import { Any } from "@/app/_types/common/Common"
import { generateErrorMessage } from "@/app/_utils/validation/Common"

export const AddEditOpportunitySchema = z
    .object({
        // OVERVIEW
        cover: z.any().transform((value) => (value ? value.id : null)),
        // sponsor_name: requiredSingleDropdownSchema("Sponsor/GP Name"),
        sponsor_name: getNameFieldSchema("Sponsor/GP Name").refine(
            (value) => /^[a-zA-Z0-9\s'-.()éÉ&]+$/.test(value), // Allow only alphanumeric characters and spaces
            {
                message: `Sponsor/GP Name must not contain special characters`,
            },
        ),
        firm: requiredSingleDropdownSchema("Originator"),
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
        short_description: z
            .string({
                invalid_type_error: generateErrorMessage("Short Description"),
                required_error: generateErrorMessage("Short Description"),
            })
            .trim() // Trim extra spaces from both ends
            .nonempty("Short Description is required")
            .max(100, "Must be at most 100 characters"),

        investment_type: requiredSingleDropdownSchema("Investment Type"), // Adjust enum values as per the backend
        investment_label: z.any(), // Adjust enum values as per the backend

        fund_type: getValueorNullSchema(), // Adjust enum values as per the backend
        // time_period: getRequiredFloatFieldSchema("Term Year").refine((value) => value && value > 0 && value <= 100, {
        //     message: `Term Year must be between 0 and 100`,
        // }),
        time_period: getOptionalFloatFieldSchema("Term Year").refine(
            (value) => value === undefined || (value > 0 && value <= 100), // Validate range only if a value exists
            {
                message: `Term Year must be between 0 and 100`,
            },
        ),
        currency: requiredSingleDropdownSchema("Currency"),
        // vintage_year: requiredSingleDropdownSchema("Vintage Year"),
        vintage_year: getValueorNullTransformedSchema(),

        // fund_number: requiredSingleDropdownSchema("Fund Number").transform((value) => parseInt(value)),
        fund_number: getValueorNullSchema().transform((value) => parseInt(value)),

        // extension: z
        //     .string({
        //         invalid_type_error: generateErrorMessage("Extension"),
        //         required_error: generateErrorMessage("Extension"),
        //     })
        //     .nonempty("Extension is required") // Ensure the field is not empty
        //     .regex(/^\+(\d+\+)*\d+$/, "Extension must contain only positive values prefixed with '+' (e.g., +1, +2)"), // Validate format

        extension: z
            .string()
            .optional() // Make the field optional
            .refine(
                (value) => !value || /^\+(\d+\+)*\d+$/.test(value), // Validate only if a value is provided
                {
                    message: "Extension must contain only positive values prefixed with '+' (e.g., +1, +2)",
                },
            )
            .nullable(),

        // inception_date: z.string({ message: "Inception Date is required" }).nonempty("Inception Date is required"),
        inception_date: z
            .string()
            .optional() // Make the field optional
            .refine((value) => !value || value.trim().length > 0, {
                message: "Inception Date is required",
            })
            .nullable(),
        estimated_close_date: z.string({ message: "Estimated Close Date is required" }).nonempty("Estimated Close Date is required"),
        contact: requiredSingleDropdownSchema("Key Contact"),
        // product_disclaimer: z
        //     .string({
        //         invalid_type_error: generateErrorMessage("Product Disclaimer"),
        //         required_error: generateErrorMessage("Product Disclaimer"),
        //     })
        //     .nonempty("Product Disclaimer is required"),
        product_disclaimer: z
            .string()
            .optional() // Make the field optional
            .refine((value) => !value || value.trim().length > 0, {
                message: "Product Disclaimer is required",
            })
            .nullable(),

        long_description: getNameFieldSchemaWithMaxChar("Large Description"),
        highlights: getNameFieldSchemaWithMaxChar("Highlights"),
        // highlights: z
        //     .string()
        //     .trim() // Trim extra spaces from both ends
        //     .nonempty("Highlights is required")
        //     .max(100, "Must be at most 100 characters"),

        region: requiredSingleDropdownSchema("Region"),
        country: requiredSingleDropdownSchema("Country"),
        asset_class: requiredSingleDropdownSchema("Asset Class"),
        strategies: getRequiredMultiSelectFieldSchema("Strategy"), // dynamic multi select
        industries: getRequiredMultiSelectFieldSchema("Industry"), // dynamic multi select

        team_members: z.array(
            z.object({
                cover: z.any().transform((value) => (value ? value.id : null)),
                name: getNameFieldSchema("Name").refine((value) => /^[a-zA-Z0-9\s']*$/.test(value), {
                    message: "Only alphanumeric characters and apostrophes are allowed",
                }),
                job_title: getValueorNullSchema(),
                email: getoptionalEmailSchema(),
                // email: getUserEmailSchema(),
                // phone_country_code: z.string().nonempty("Phone Country Code is required"),
                // phone_number: z.string().nonempty("Phone Number is required"),
                phone_number: z
                    .string()
                    .trim()
                    .optional()
                    .nullable()
                    .transform((args) => {
                        if (args?.trim().length) {
                            return args?.trim()
                        } else {
                            return null
                        }
                    }),
                phone_country_code: z
                    .string()
                    .trim()
                    .optional()
                    .nullable()
                    .transform((args) => {
                        if (args?.trim().length) {
                            return args?.trim()
                        } else {
                            // eslint-disable-next-line no-self-assign
                            return null
                        }
                    }),
                // biography: z.string().nonempty("Biography is required"),
                // biography: getValueorNullSchema(),
                biography: getOptionalNameFieldSchemaWithMaxChar("Biography"),
                external_link: getURLSchema("External Link"),
                order: z.number().int().nonnegative("Order must be a non-negative integer"),
            }),
        ),

        term: z.object({
            hard_cap: getOptionalNameFieldSchemaWithOnlyNumbersGreaterThanZero("Hard Cap"),
            gp_commitment_percentage: getOptionalPercentageFieldSchema("GP Commitment"),
            gp_commitment_amount: getOptionalNameFieldSchemaWithOnlyNumbersGreaterThanZero("GP Commitment Amount"),
            waterfall_type: getValueorNullTransformedSchema(),
            minimum_investment: getOptionalNameFieldSchemaWithOnlyNumbers("Minimum Investment"),
            hurdle_rate: getOptionalPercentageFieldSchema("Hurdle Rate"),
            catch_up: getOptionalPercentageFieldSchema("Catch Up"),
            carried_interest: getOptionalPercentageFieldSchema("Carried Interest"),
            management_fee_percentage: getOptionalPercentageFieldSchema("Management Fee (%)"),
            additional_fees: getOptionalPercentageFieldSchema("Additional Fees"),

            // hard_cap: getNameFieldSchemaWithOnlyNumbersGreaterThanZero("Hard Cap"),
            // gp_commitment_percentage: getRequiredPercentageFieldSchema("GP Commitment"),
            // gp_commitment_amount: getNameFieldSchemaWithOnlyNumbersGreaterThanZero("GP Commitment Amount"),
            // waterfall_type: requiredSingleDropdownSchema("Waterfall Type"),
            // minimum_investment: getNameFieldSchemaWithOnlyNumbers("Minimum Investment").refine((value) => parseInt(value) > 0, {
            //     message: `Minimum Investment must be greater than 0`, // Ensure value is greater than 0
            // }),
            // hurdle_rate: getRequiredPercentageFieldSchema("Hurdle Rate"),
            // catch_up: getRequiredPercentageFieldSchema("Catch Up"),
            // carried_interest: getRequiredPercentageFieldSchema("Carried Interest "),
            // management_fee_percentage: getRequiredPercentageFieldSchema("Management Fee "),
            // additional_fees: getRequiredPercentageFieldSchema("Additional Fees"),
        }),

        target: z.object({
            // return_percentage: getRequiredPercentageFieldSchema("Target Return"),
            // moic: getRequiredFloatFieldSchema("Target MOIC").refine((value) => value && value > 0, {
            //     message: `Target MOIC must be greater than 0`, // Ensure value is greater than 0
            // }),
            // irr: getRequiredPercentageFieldSchema("Target IRR"),
            irr: getOptionalPercentageFieldSchema("Target IRR"),
            moic: getOptionalNameFieldSchemaWithOnlyNumbers("Target MOIC"),
            return_percentage: getOptionalPercentageFieldSchema("Target Return"),

            amount: getValueorNullSchema(),
            market_regions: getRequiredMultiSelectFieldSchema("Market Region "),
        }),

        fundraising: z.object({
            // current_raise: getNameFieldSchemaWithOnlyNumbersGreaterThanZero("Current Raise"),
            current_raise: getOptionalNameFieldSchemaWithOnlyNumbersGreaterThanZero("Current Raise"),
            target_raise: getNameFieldSchemaWithOnlyNumbersGreaterThanZero("Target raise"),
            // next_closing: z.string({ message: "Next closing date is required" }).nonempty("Next closing date is required"),
            next_closing: z
                .string()
                .optional() // Make the field optional
                .refine((value) => !value || value.trim().length > 0, {
                    message: "Next Closing Date is required",
                })
                .nullable(),
        }),

        jurisdiction_country_label: z.any(),
        vehicle: z.object({
            // name: getNameFieldSchema("Vehicle Name "),
            name: z
                .any()
                .optional()
                .refine(
                    (value) => !value || /^[a-zA-Z0-9\s]+$/.test(value), // Check only if value exists
                    {
                        message: `Vehicle Name must not contain special characters`,
                    },
                ),

            jurisdiction_country: getValueorNullTransformedSchema(),
            jurisdiction_states: getOptionalMultiSelectFieldSchema("Jurisdiction State"),
            structure: getValueorNullTransformedSchema(),
            tax_reportings: getOptionalMultiSelectFieldSchema("Tax Reporting"),
            description: getOptionalNameFieldSchemaWithMaxChar("Description "),
            tax_eligibility: getValueorNullTransformedSchema(),
            investor_types: getOptionalMultiSelectFieldSchema("Investor Type "), // dynamic multi select

            // jurisdiction_country: requiredSingleDropdownSchema("Jurisdiction Country"),

            // jurisdiction_states: getOptionalMultiSelectFieldSchema("Jurisdiction State"),
            // // jurisdiction_states: getRequiredMultiSelectFieldSchema("Jurisdiction State"),
            // structure: requiredSingleDropdownSchema("Structure"),
            // tax_reportings: getRequiredMultiSelectFieldSchema("Tax Reporting"),
            // description: getNameFieldSchemaWithMaxChar("Description "),
            // // tax_eligibility: requiredSingleDropdownSchema("Tax Eligibility "),
            // tax_eligibility: getNameFieldSchema("Tax Eligibility "),
            // investor_types: getRequiredMultiSelectFieldSchema("Investor Type "), // dynamic multi select
        }),

        // files: z.any().transform((values: Any[]) => (values?.length ? values.map((item) => item.id) : [])), // key documents
        files: z.any().transform((values: Any[]) => (values?.length ? values.map((item) => item.id) : [])),

        placement: z.object({
            fee: getRequiredPercentageFieldSchema("Placement Fee"),
            installments_no: getNameFieldSchemaWithOnlyNumbers("Number of Instalments").refine((value) => parseInt(value) > 0, {
                message: `Number of Instalments must be greater than 0`, // Ensure value is greater than 0
            }),
            // payment_frequency: requiredSingleDropdownSchema("Payment Frequency"),
            payment_frequency: getNameFieldSchema("Payment Frequency"),
            // additional_information: getNameFieldSchemaWithMaxChar("Additional Information"),
            additional_information: getOptionalNameFieldSchemaWithMaxChar("Additional Information"),
        }),

        // agent_disclaimer: getNameFieldSchema("Agent Disclaimer"),
        agent_disclaimer: getNameFieldSchemaWithMaxChar("Agent Disclaimer"),
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

        if (fields?.jurisdiction_country_label == "US" && fields?.vehicle?.jurisdiction_states?.length == 0) {
            ctx.addIssue({
                code: "custom",
                message: "Jurisdiction State is required",
                path: ["vehicle.jurisdiction_states"], // Path points to the exact field
            })
        }
    })

// New Field. Values = open-ended or closed. Add to Key Details section in Opportunity form and in QuickShare form. Mandatory if Investment Type not equal to  'Direct Deal'

export type AddEditOpportunitySchemaType = z.infer<typeof AddEditOpportunitySchema>

export const DraftOpportunitySchema = z.object({
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
    // sponsor_name: getValueorNullTransformedSchema(),
    sponsor_name: z
        .any()
        .optional()
        .refine(
            (value) => !value || /^[a-zA-Z0-9\s]+$/.test(value), // Check only if value exists
            {
                message: `Sponsor/GP Name must not contain special characters`,
            },
        ),
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
    time_period: getOptionalFloatFieldSchema("Term Year").refine(
        (value) => value === undefined || (value > 0 && value <= 100), // Validate range only if a value exists
        {
            message: `Term Year must be between 0 and 100`,
        },
    ),
    vintage_year: getValueorNullTransformedSchema(),
    fund_number: getValueorNullSchema(),
    extension: z
        .string()
        .optional() // Make the field optional
        .refine(
            (value) => !value || /^\+(\d+\+)*\d+$/.test(value), // Validate only if a value is provided
            {
                message: "Extension must contain only positive values prefixed with '+' (e.g., +1, +2)",
            },
        )
        .nullable(),

    inception_date: z
        .string()
        .optional() // Make the field optional
        .refine((value) => !value || value.trim().length > 0, {
            message: "Inception Date is required",
        })
        .nullable(),

    estimated_close_date: z
        .string()
        .optional() // Make the field optional
        .refine((value) => !value || value.trim().length > 0, {
            message: "Estimated Close Date is required",
        })
        .nullable(),

    contact: getValueorNullTransformedSchema(),

    product_disclaimer: z
        .string()
        .optional() // Make the field optional
        .refine((value) => !value || value.trim().length > 0, {
            message: "Product Disclaimer is required",
        })
        .nullable(),

    long_description: getOptionalNameFieldSchemaWithMaxChar("Large Description"),
    highlights: getOptionalNameFieldSchemaWithMaxChar("Highlights"),
    // highlights: z
    //     .string()
    //     .trim()
    //     .optional()
    //     .refine((value) => !value || value.length <= 100, {
    //         message: "Highlights must be at most 100 characters",
    //     })
    //     .refine((value) => !value || value.trim().length > 0, {
    //         message: "Highlights is required",
    //     }),

    region: getValueorNullTransformedSchema(),
    country: getValueorNullTransformedSchema(),
    asset_class: getValueorNullTransformedSchema(),
    strategies: getOptionalMultiSelectFieldSchema("Strategy"), // dynamic multi select
    industries: getOptionalMultiSelectFieldSchema("Industry"), // dynamic multi select

    team_members: z.array(
        z.object({
            cover: z.any().transform((value) => (value ? value.id : null)),

            // name: getValueorNullSchema().refine(
            //     (value) => {
            //         if (value) {
            //             return /^[a-zA-Z0-9\s']*$/.test(value)
            //         } else {
            //             return true
            //         }
            //     },
            //     {
            //         message: "Only alphanumeric characters and apostrophes are allowed",
            //     },
            // ),
            // name: getNameFieldSchema("Name").refine((value) => /^[a-zA-Z0-9\s']*$/.test(value), {
            //     message: "Only alphanumeric characters and apostrophes are allowed",
            // }),
            name: getValueorNullSchema(),
            job_title: getValueorNullSchema(),
            email: getoptionalEmailSchema(),
            // email: getUserEmailSchema(),
            // phone_country_code: z.string().nonempty("Phone Country Code is required"),
            // phone_number: z.string().nonempty("Phone Number is required"),
            phone_number: z
                .string()
                .trim()
                .optional()
                .nullable()
                .transform((args) => {
                    if (args?.trim().length) {
                        return args?.trim()
                    } else {
                        return null
                    }
                }),
            phone_country_code: z
                .string()
                .trim()
                .optional()
                .nullable()
                .transform((args) => {
                    if (args?.trim().length) {
                        return args?.trim()
                    } else {
                        // eslint-disable-next-line no-self-assign
                        return null
                    }
                }),
            // biography: z.string().nonempty("Biography is required"),
            // biography: getValueorNullSchema(),
            biography: getOptionalNameFieldSchemaWithMaxChar("Biography"),
            external_link: getURLSchema("External Link"),
            order: z.number().int().nonnegative("Order must be a non-negative integer"),
        }),
    ),

    term: z.object({
        hard_cap: getOptionalNameFieldSchemaWithOnlyNumbersGreaterThanZero("Hard Cap"),
        gp_commitment_percentage: getOptionalPercentageFieldSchema("GP Commitment"),
        gp_commitment_amount: getOptionalNameFieldSchemaWithOnlyNumbersGreaterThanZero("GP Commitment Amount"),
        waterfall_type: getValueorNullTransformedSchema(),
        minimum_investment: getOptionalNameFieldSchemaWithOnlyNumbers("Minimum Investment"),
        hurdle_rate: getOptionalPercentageFieldSchema("Hurdle Rate"),
        catch_up: getOptionalPercentageFieldSchema("Catch Up"),
        carried_interest: getOptionalPercentageFieldSchema("Carried Interest"),
        management_fee_percentage: getOptionalPercentageFieldSchema("Management Fee (%)"),
        additional_fees: getOptionalPercentageFieldSchema("Additional Fees"),
    }),

    target: z.object({
        irr: getOptionalPercentageFieldSchema("Target IRR"),
        moic: getOptionalNameFieldSchemaWithOnlyNumbers("Target MOIC"),
        return_percentage: getOptionalPercentageFieldSchema("Target Return"),
        amount: getValueorNullSchema(),
        market_regions: getOptionalMultiSelectFieldSchema("Market Region "),
    }),

    fundraising: z.object({
        current_raise: getOptionalNameFieldSchemaWithOnlyNumbersGreaterThanZero("Current Raise"),
        target_raise: getOptionalNameFieldSchemaWithOnlyNumbersGreaterThanZero("Target Raise"),
        next_closing: z
            .string()
            .optional() // Make the field optional
            .refine((value) => !value || value.trim().length > 0, {
                message: "Next Closing Date is required",
            })
            .nullable(),
    }),

    jurisdiction_country_label: z.any(),
    vehicle: z.object({
        name: z
            .any()
            .optional()
            .refine(
                (value) => !value || /^[a-zA-Z0-9\s]+$/.test(value), // Check only if value exists
                {
                    message: `Vehicle Name must not contain special characters`,
                },
            ),
        jurisdiction_country: getValueorNullTransformedSchema(),
        jurisdiction_states: getOptionalMultiSelectFieldSchema("Jurisdiction State"),
        structure: getValueorNullTransformedSchema(),
        tax_reportings: getOptionalMultiSelectFieldSchema("Tax Reporting"),
        description: getOptionalNameFieldSchemaWithMaxChar("Description "),
        // description: z
        //     .string()
        //     .trim()
        //     .optional()
        //     .refine((value) => !value || value.length <= 100, {
        //         message: "Description must be at most 100 characters",
        //     })
        //     .refine((value) => !value || value.trim().length > 0, {
        //         message: "Description is required",
        //     })
        //     .nullable(),
        tax_eligibility: getValueorNullTransformedSchema(),
        investor_types: getOptionalMultiSelectFieldSchema("Investor Type "), // dynamic multi select
    }),

    files: z.any().transform((values: Any[]) => (values?.length ? values.map((item) => item.id) : [])),

    placement: z.object({
        fee: getOptionalPercentageFieldSchema("Placement Fee"),
        installments_no: getOptionalNameFieldSchemaWithOnlyNumbers("Number of Instalments"),
        payment_frequency: getValueorNullTransformedSchema(),
        additional_information: getOptionalNameFieldSchemaWithMaxChar("Additional Information"),
    }),

    agent_disclaimer: getOptionalNameFieldSchemaWithMaxChar("Agent General Disclaimer"),
})

import { z } from "zod"
import {
    getNameFieldSchema,
    getNameFieldSchemaWithOnlyNumbersGreaterThanZero,
    getoptionalEmailSchema,
    getOptionalMultiSelectFieldSchema,
    getOptionalNameFieldSchemaWithMaxChar,
    getOptionalNameFieldSchemaWithNumbers,
    // getOptionalNameFieldSchemaWithOnlyNumbers,
    getOptionalNameFieldSchemaWithOnlyNumbersGreaterThanZero,
    getRequiredLogoSchema,
    getRequiredMultiSelectFieldSchema,
    getTrimmedNonEmptyFieldSchema,
    getURLSchema,
    getURLWithoutProtocolSchema,
    getUserEmailSchema,
    getValueorNullSchema,
    getValueorNullTransformedSchema,
    optionalAddressValidationSchema,
    requiredAddressValidationSchema,
    requiredSingleDropdownSchema,
    toggleHttps,
} from "@/app/_utils/validation/FieldSchema"
import { generateErrorMessage } from "@/app/_utils/validation/Common"

export const BuildProfileSchema = z.object({
    logo: getRequiredLogoSchema("Firm Logo"),
    name: getNameFieldSchema("Firm Name"),
    network_lead: getNameFieldSchema("Network Lead"),
    network_size: getNameFieldSchemaWithOnlyNumbersGreaterThanZero("Network Size"),
    network_lp_types: getRequiredMultiSelectFieldSchema("Network LP Type "),
    network_regions: getRequiredMultiSelectFieldSchema("Network Coverage "),
    address: requiredAddressValidationSchema(),
    overview: z
        .string({
            invalid_type_error: generateErrorMessage("Agent Overview"),
            required_error: generateErrorMessage("Agent Overview"),
        })
        .trim()
        .nonempty("Agent Overview is required"),

    // Key contacts
    primary_contact: z.object({
        name: getNameFieldSchema("Name").refine((value) => /^[a-zA-Z0-9\s']*$/.test(value), {
            message: "Only alphanumeric characters and apostrophes are allowed",
        }),
        job_title: getNameFieldSchema("Title"),
        email: getUserEmailSchema(),
    }),
    secondary_contact: z.object({
        name: getNameFieldSchema("Name").refine((value) => /^[a-zA-Z0-9\s']*$/.test(value), {
            message: "Only alphanumeric characters and apostrophes are allowed",
        }),
        email: getUserEmailSchema(),
        job_title: getNameFieldSchema("Title"),
    }),

    // Socials
    socials: z.object({
        website_url: getURLWithoutProtocolSchema("Website URL").transform((value) => toggleHttps(value)),
        facebook_url: getURLSchema("Facebook URL"),
        linkedin_url: getURLSchema("Linkedin URL"),
        twitter_url: getURLSchema("Twitter URL"),
        instagram_url: getURLSchema("Instagram URL"),
    }),

    // Preferences
    investment_preferences: z.object({
        fund_size_min: getNameFieldSchemaWithOnlyNumbersGreaterThanZero("Fund Size Min"),
        fund_size_max: getNameFieldSchemaWithOnlyNumbersGreaterThanZero("Fund Size Max"),
        fund_number_min: getNameFieldSchemaWithOnlyNumbersGreaterThanZero("Fund Number Min"),
        fund_number_max: getNameFieldSchemaWithOnlyNumbersGreaterThanZero("Fund Number Max"),
        deal_size_min: getOptionalNameFieldSchemaWithNumbers("Deal Size Min"),
        deal_size_max: getOptionalNameFieldSchemaWithNumbers("Deal Size Max"),
        // deal_size_min: getNameFieldSchemaWithOnlyNumbersGreaterThanZero("Deal Size Min"),
        // deal_size_max: getNameFieldSchemaWithOnlyNumbersGreaterThanZero("Deal Size Max"),
        additional_context: z
            .string({
                invalid_type_error: generateErrorMessage("Additional Context"),
                required_error: generateErrorMessage("Additional Context"),
            })
            .trim()
            .nonempty("Additional Context is required"),
        region: requiredSingleDropdownSchema("Region"),
        countries: getRequiredMultiSelectFieldSchema("Country "),
        industries: getRequiredMultiSelectFieldSchema("Industry"),
        asset_classes: getRequiredMultiSelectFieldSchema("Asset Class"),
        strategies: getRequiredMultiSelectFieldSchema("Strategy"),
        investment_type: requiredSingleDropdownSchema("Investment Type"),
    }),

    regulated_entity: z.any(),
    registration_number: getNameFieldSchema("Registration Number").refine((value) => /^[a-zA-Z0-9\s']*$/.test(value), {
        message: "Only alphanumeric characters are allowed",
    }),
    registration_information: getTrimmedNonEmptyFieldSchema("Registration Information"),
})

// New Field. Values = open-ended or closed. Add to Key Details section in Opportunity form and in QuickShare form. Mandatory if Investment Type not equal to  'Direct Deal'

export type BuildProfileSchemaType = z.infer<typeof BuildProfileSchema>

export const BuildDraftProfileSchema = z.object({
    logo: z.any().transform((value) => (value ? value.id : null)),
    name: getValueorNullSchema(),
    network_lead: getValueorNullSchema(),
    network_size: getOptionalNameFieldSchemaWithOnlyNumbersGreaterThanZero("Network Size"),
    network_lp_types: getOptionalMultiSelectFieldSchema("Network LP Type "),
    network_regions: getOptionalMultiSelectFieldSchema("Network Coverage "),
    address: optionalAddressValidationSchema(),
    overview: getOptionalNameFieldSchemaWithMaxChar("Agent Overview"),

    // Key contacts
    primary_contact: z.object({
        name: getValueorNullSchema(),
        job_title: getValueorNullSchema(),
        email: getoptionalEmailSchema(),
    }),
    secondary_contact: z.object({
        name: getValueorNullSchema(),
        job_title: getValueorNullSchema(),
        email: getoptionalEmailSchema(),
    }),

    // Socials
    socials: z.object({
        website_url: getURLWithoutProtocolSchema("Website URL").transform((value) => toggleHttps(value)),
        facebook_url: getURLSchema("Facebook URL"),
        linkedin_url: getURLSchema("Linkedin URL"),
        twitter_url: getURLSchema("Twitter URL"),
        instagram_url: getURLSchema("Instagram URL"),
    }),

    // Preferences
    investment_preferences: z.object({
        fund_size_min: getOptionalNameFieldSchemaWithOnlyNumbersGreaterThanZero("Fund Size Min"),
        fund_size_max: getOptionalNameFieldSchemaWithOnlyNumbersGreaterThanZero("Fund Size Max"),
        fund_number_min: getOptionalNameFieldSchemaWithOnlyNumbersGreaterThanZero("Fund Number Min"),
        fund_number_max: getOptionalNameFieldSchemaWithOnlyNumbersGreaterThanZero("Fund Number Max"),
        deal_size_min: getOptionalNameFieldSchemaWithNumbers("Deal Size Min"),
        deal_size_max: getOptionalNameFieldSchemaWithNumbers("Deal Size Max"),
        additional_context: getOptionalNameFieldSchemaWithMaxChar("Additional Context"),
        region: getValueorNullTransformedSchema(),
        countries: getOptionalMultiSelectFieldSchema("Country "),
        industries: getOptionalMultiSelectFieldSchema("Industry"),
        asset_classes: getOptionalMultiSelectFieldSchema("Asset Class"),
        strategies: getOptionalMultiSelectFieldSchema("Strategy"),
        investment_type: getValueorNullTransformedSchema(),
    }),

    regulated_entity: z.any(),
    registration_number: getValueorNullSchema(),
    registration_information: getValueorNullSchema(),
})

// New Field. Values = open-ended or closed. Add to Key Details section in Opportunity form and in QuickShare form. Mandatory if Investment Type not equal to  'Direct Deal'

export type BuildDraftProfileSchemaType = z.infer<typeof BuildDraftProfileSchema>

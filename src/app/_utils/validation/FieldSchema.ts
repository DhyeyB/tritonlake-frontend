import {
    getArrayOfIdOrEmptyArray,
    getArrayOrNull,
    getValueOrNull,
    validateAddressField,
    validateAllowedCharacters,
    validateCurlyBraces,
    validateNoSpaces,
    validatePlaceholders,
} from "@/app/_utils/Common"
import { generateErrorMessage, nameFieldFormat, passwordFieldFormat } from "@/app/_utils/validation/Common"
import { z } from "zod"
import { CONFIG } from "../Constants"
import {
    validateDecimalValue,
    validateDurationFieldNumericValue,
    validateDurationFieldValidRange,
    validateNumericValue,
    validateOrderFieldMaxValue,
    validateURLValue,
    validateURLValueWithoutProtocol,
} from "./Info"
import { Any } from "@/app/_types/common/Common"

/**
 * Creates a Zod schema that validates and transforms input data.
 *
 * The schema can handle both object and string inputs. The object schema expects
 * properties: `label`, `value`, and `data`. Both object and string inputs are transformed
 * using the `getValueOrNull` function.
 *
 * The `getValueOrNull` function performs the following transformations:
 * - If the input is `null` or `undefined`, it returns `null`.
 * - If the input is an object with a `value` property, it returns the `value` property.
 * - If the input is `0`, it returns `"0"` (as a string).
 * - Otherwise, it returns the input value if it's truthy; otherwise, it returns `null`.
 *
 * @returns {z.ZodUnion<[z.ZodEffects<z.ZodOptional<z.ZodNullable<z.ZodObject<{
 * label: z.ZodString;
 * value: z.ZodString;
 * data: z.ZodTypeAny;
 * }>>>>, z.ZodEffects<z.ZodOptional<z.ZodNullable<z.ZodString>>>>>}
 *   A Zod schema that validates and transforms input data.
 *
 * @example
 * const schema = getValueorNullTransformedSchema();
 * schema.parse({ label: "example", value: "123", data: {} }); // Returns "123"
 * schema.parse("example"); // Returns "example"
 * schema.parse(null); // Returns null
 */
export function getValueorNullTransformedSchema() {
    return z
        .object({
            label: z.string(),
            value: z.string(),
            data: z.any(),
        })
        .or(z.string().trim())
        .optional()
        .nullable()
        .transform((value) => getValueOrNull(value))
}

export function requiredSingleDropdownSchema(fieldName: string, message?: string) {
    return z
        .object(
            {
                label: z.string(),
                value: z.string(),
                data: z.any(),
            },
            {
                invalid_type_error: message ? message : generateErrorMessage(fieldName),
                required_error: message ? message : generateErrorMessage(fieldName),
            },
        )
        .required()
        .transform((value) => getValueOrNull(value))
}

export const getRequiredMultiSelectFieldSchema = (fieldName: string) => {
    return z
        .array(
            z
                .object(
                    {
                        label: z.any(),
                        value: z.any(),
                        data: z.any(),
                    },
                    {
                        invalid_type_error: `${fieldName} is required`,
                        required_error: `${fieldName} is required`,
                    },
                )
                .refine((option) => !!option?.value, { message: `${fieldName} is required` }),
            {
                invalid_type_error: `${fieldName} is required`,
                required_error: `${fieldName} is required`,
            },
        )
        .min(1, { message: `${fieldName} is required` })
        .transform((fields) => {
            if (Array.isArray(fields) && fields.length) {
                return fields.map((field) => getValueOrNull(field))
            } else {
                return []
            }
        })
}

export function getArrayorNullTransformedSchema() {
    return z
        .array(z.string())
        .optional()
        .nullable()
        .transform((arg) => (arg ? getArrayOrNull(arg) : null))
}

export function getNameFieldSchema(fieldName: string) {
    return z
        .string({
            invalid_type_error: generateErrorMessage(fieldName),
            required_error: generateErrorMessage(fieldName),
        })
        .trim()
        .min(1, { message: generateErrorMessage(fieldName) })
        .max(CONFIG.VALIDATION.CHARACTER_LENGTH.TWO_FIFTY_FIVE_CHARACTERS, {
            message: generateErrorMessage(fieldName, CONFIG.VALIDATION.CHARACTER_LENGTH.TWO_FIFTY_FIVE_CHARACTERS, true),
        })
}

export function getNameFieldSchemaWithMaxChar(fieldName: string, maxChars = 5000) {
    return z
        .string({
            invalid_type_error: generateErrorMessage(fieldName),
            required_error: generateErrorMessage(fieldName),
        })
        .trim()
        .min(1, { message: generateErrorMessage(fieldName) })
        .max(maxChars, {
            message: generateErrorMessage(fieldName, maxChars, true),
        })
}
export function getOptionalNameFieldSchemaWithMaxChar(fieldName: string, maxChars = 5000) {
    return z
        .string({
            invalid_type_error: `${fieldName} is invalid`,
            required_error: `${fieldName} is invalid`,
        })
        .trim()
        .max(maxChars, {
            message: generateErrorMessage(fieldName, maxChars, true),
        })
        .optional()
        .nullable()
        .transform((value) => (value?.length ? value : null))
}

export function getAlphaNumericFieldSchema(fieldName: string) {
    return z
        .string({
            invalid_type_error: generateErrorMessage(fieldName),
            required_error: generateErrorMessage(fieldName),
        })
        .trim()
        .min(1, { message: generateErrorMessage(fieldName) })
        .max(CONFIG.VALIDATION.CHARACTER_LENGTH.TWO_FIFTY_FIVE_CHARACTERS, {
            message: generateErrorMessage(fieldName, CONFIG.VALIDATION.CHARACTER_LENGTH.TWO_FIFTY_FIVE_CHARACTERS, true),
        })
        .refine((value) => /^[a-zA-Z0-9]+$/.test(value), {
            message: CONFIG.VALIDATION.MESSAGE.ALPHANUMERIC, // Ensures only alphanumeric characters without spaces
        })
        .refine((value) => /[a-zA-Z]/.test(value), {
            message: "Must contain at least one letter", // Ensures the string contains at least one letter
        })
}

export function getPrefixNameSchema(fieldName: string, prefixPlaceholders: string[]) {
    return z
        .string({
            invalid_type_error: generateErrorMessage(fieldName),
            required_error: generateErrorMessage(fieldName),
        })
        .trim()
        .min(1, { message: generateErrorMessage(fieldName) })
        .max(CONFIG.VALIDATION.CHARACTER_LENGTH.TWO_FIFTY_FIVE_CHARACTERS, {
            message: generateErrorMessage(fieldName, CONFIG.VALIDATION.CHARACTER_LENGTH.TWO_FIFTY_FIVE_CHARACTERS, true),
        })
        .refine(validateNoSpaces, {
            message: "Spaces are not allowed.",
        })
        .refine(validateAllowedCharacters, {
            message: "Only underscores, numbers, characters and curly braces are allowed.",
        })
        .refine(validateCurlyBraces, {
            message: "Curly braces must be properly closed.",
        })
        .refine((value) => validatePlaceholders(value, prefixPlaceholders), {
            message: "Incorrect variable name",
        })
}

export function getNameFieldSchemaWithOnlyNumbers(fieldName: string) {
    return (
        z
            .string({
                invalid_type_error: generateErrorMessage(fieldName),
                required_error: generateErrorMessage(fieldName),
            })
            .trim()
            .min(1, { message: generateErrorMessage(fieldName) })
            .max(CONFIG.VALIDATION.CHARACTER_LENGTH.TWO_FIFTY_FIVE_CHARACTERS, {
                message: generateErrorMessage(fieldName, CONFIG.VALIDATION.CHARACTER_LENGTH.TWO_FIFTY_FIVE_CHARACTERS, true),
            })
            // Add regex to validate if the input is a number
            .regex(/^\d+$/, {
                message: "Only Numbers are allowed",
            })
    )
}

export function getNameFieldSchemaWithOnlyNumbersGreaterThanZero(fieldName: string) {
    return (
        z
            .string({
                invalid_type_error: generateErrorMessage(fieldName),
                required_error: generateErrorMessage(fieldName),
            })
            .trim()
            .min(1, { message: generateErrorMessage(fieldName) })
            .max(CONFIG.VALIDATION.CHARACTER_LENGTH.TWO_FIFTY_FIVE_CHARACTERS, {
                message: generateErrorMessage(fieldName, CONFIG.VALIDATION.CHARACTER_LENGTH.TWO_FIFTY_FIVE_CHARACTERS, true),
            })
            // Add regex to validate if the input is a number but not 0
            .regex(/^[1-9]\d*$/, {
                message: "Only positive numbers (not starting with 0) are allowed",
            })
    )
}

export function getNumberFieldSchemaWithDynamicRange(fieldName: string, minValue: number, maxValue: number) {
    return (
        z
            .string({
                invalid_type_error: generateErrorMessage(fieldName),
                required_error: generateErrorMessage(fieldName),
            })
            .trim()
            .min(1, { message: generateErrorMessage(fieldName) })
            .max(CONFIG.VALIDATION.CHARACTER_LENGTH.TWO_FIFTY_FIVE_CHARACTERS, {
                message: generateErrorMessage(fieldName, CONFIG.VALIDATION.CHARACTER_LENGTH.TWO_FIFTY_FIVE_CHARACTERS, true),
            })
            // Regex to ensure it's a number
            .regex(/^\d+$/, {
                message: "Only numbers are allowed",
            })
            // Refine to check if the number is within the provided range
            .refine(
                (value) => {
                    const number = parseInt(value, 10)
                    return number >= minValue && number <= maxValue
                },
                {
                    message: `${fieldName} must be a number between ${minValue} and ${maxValue}`,
                },
            )
    )
}

export function getLogNoFieldSchema(fieldName: string) {
    return z
        .string()
        .trim()
        .max(CONFIG.VALIDATION.CHARACTER_LENGTH.TWO_FIFTY_FIVE_CHARACTERS, {
            message: generateErrorMessage(fieldName, CONFIG.VALIDATION.CHARACTER_LENGTH.TWO_FIFTY_FIVE_CHARACTERS, true),
        })
        .optional()
        .nullable()
        .refine((value) => validateNumericValue(value), {
            message: CONFIG.VALIDATION.MESSAGE.NUMERICAL_VALUES_REQUIRED,
        })
        .transform((value) => getValueOrNull(value))
}

export function getValueorNullSchemaMaxLength(fieldName: string, maxLength: number = CONFIG.VALIDATION.CHARACTER_LENGTH.TWO_FIFTY_FIVE_CHARACTERS) {
    return z
        .string()
        .trim()
        .max(maxLength, { message: generateErrorMessage(fieldName, maxLength, true) })
        .optional()
        .nullable()
        .transform((value) => getValueOrNull(value))
}

export function getValueorNullSchema() {
    return z
        .string()
        .trim()
        .optional()
        .nullable()
        .transform((value) => getValueOrNull(value))
}

export function getValueorNullSchemaWithoutSpace() {
    return z
        .string()
        .trim()
        .optional()
        .nullable()
        .transform((value) => getValueOrNull(value))
        .refine((value) => value === null || value === undefined || !/\s/.test(value), {
            message: "This field should not contain spaces",
        })
}

export function getDurationFieldSchema() {
    return z
        .any()
        .transform((value) => value && value.toString())
        .refine((value) => validateDurationFieldNumericValue(value), {
            message: CONFIG.VALIDATION.MESSAGE.NUMERICAL_VALUES_REQUIRED,
        })
        .refine((value) => validateDurationFieldValidRange(value), {
            message: CONFIG.VALIDATION.MESSAGE.NUMERICAL_VALUE_RANGE_FROM_ONE_TO_MAX_INT_LIMIT,
        })
        .transform((value) => (value ? parseInt(value) * 60 : null))
}

export function getValueorNullSchemaMinMaxLength(fieldName: string, maxLength: number) {
    return z
        .string()
        .trim()
        .min(1, { message: generateErrorMessage(fieldName) })
        .max(maxLength, { message: generateErrorMessage(fieldName, maxLength, true) })
        .optional()
        .nullable()
        .transform((value) => getValueOrNull(value))
}

export function getUserNameSchema(message: string, field_name: string) {
    return z
        .string()
        .trim()
        .min(1, { message: generateErrorMessage(field_name) })
        .max(CONFIG.VALIDATION.CHARACTER_LENGTH.TWO_FIFTY_FIVE_CHARACTERS, {
            message: generateErrorMessage(field_name, CONFIG.VALIDATION.CHARACTER_LENGTH.TWO_FIFTY_FIVE_CHARACTERS, true),
        })
        .refine((field) => nameFieldFormat(field), {
            message,
        })
}

export function getUserEmailSchema() {
    return z
        .string({
            invalid_type_error: generateErrorMessage("Email"),
            required_error: generateErrorMessage("Email"),
        })
        .trim()
        .min(1, { message: CONFIG.VALIDATION.MESSAGE.USER_EMAIL_REQUIRED })
        .max(CONFIG.VALIDATION.CHARACTER_LENGTH.TWO_FIFTY_FIVE_CHARACTERS, {
            message: generateErrorMessage(CONFIG.VALIDATION.FIELD_NAME.EMAIL, CONFIG.VALIDATION.CHARACTER_LENGTH.TWO_FIFTY_FIVE_CHARACTERS, true),
        })
        .toLowerCase()
        .email("Enter a valid email address")
        .regex(/^[^,]+@[^,]+$/, { message: "Email must not contain a comma before the @ sign" })
}

const optionalEmailSchema = z
    .string()
    .trim()
    .max(CONFIG.VALIDATION.CHARACTER_LENGTH.TWO_FIFTY_FIVE_CHARACTERS, {
        message: generateErrorMessage(CONFIG.VALIDATION.FIELD_NAME.EMAIL, CONFIG.VALIDATION.CHARACTER_LENGTH.TWO_FIFTY_FIVE_CHARACTERS, true),
    })
    .toLowerCase()
    .email("Enter a valid email address")
    .regex(/^[^,]+@[^,]+$/, { message: "Email must not contain a comma before the @ sign" })

export function getoptionalEmailSchema() {
    return z
        .string()
        .optional() // Make the email field optional
        .refine((email) => email === undefined || email.length === 0 || optionalEmailSchema.safeParse(email).success, {
            message: "Enter a valid email address.",
        })
        .nullable()
}

export function getUserPasswordSchema() {
    return z
        .string()
        .trim()
        .min(CONFIG.VALIDATION.CHARACTER_LENGTH.EIGHT_CHARACTERS, generateErrorMessage(CONFIG.VALIDATION.FIELD_NAME.PASSWORD, CONFIG.VALIDATION.CHARACTER_LENGTH.EIGHT_CHARACTERS, false))
        .max(CONFIG.VALIDATION.CHARACTER_LENGTH.TWO_FIFTY_FIVE_CHARACTERS, {
            message: generateErrorMessage(CONFIG.VALIDATION.FIELD_NAME.PASSWORD, CONFIG.VALIDATION.CHARACTER_LENGTH.TWO_FIFTY_FIVE_CHARACTERS, true),
        })
        .refine((field) => passwordFieldFormat(field), {
            message: CONFIG.VALIDATION.MESSAGE.USER_PASSWORD,
        })
}

export function getURLSchema(fieldName: string) {
    return z
        .string()
        .trim()
        .max(CONFIG.VALIDATION.CHARACTER_LENGTH.TWO_HUNDREAD_CHARACTERS, {
            message: generateErrorMessage(fieldName, CONFIG.VALIDATION.CHARACTER_LENGTH.TWO_HUNDREAD_CHARACTERS, true),
        })
        .optional()
        .nullable()
        .refine((value) => validateURLValue(value), {
            message: CONFIG.VALIDATION.MESSAGE.INVALID_URL,
        })
        .transform((value) => getValueOrNull(value))
}

export function getURLWithoutProtocolSchema(fieldName: string) {
    return z
        .string()
        .trim()
        .max(CONFIG.VALIDATION.CHARACTER_LENGTH.TWO_HUNDREAD_CHARACTERS, {
            message: generateErrorMessage(fieldName, CONFIG.VALIDATION.CHARACTER_LENGTH.TWO_HUNDREAD_CHARACTERS, true),
        })
        .optional()
        .nullable()
        .refine((value) => validateURLValueWithoutProtocol(value), {
            message: CONFIG.VALIDATION.MESSAGE.INVALID_URL,
        })
        .transform((value) => getValueOrNull(value))
}

export function getPhoneNumberSchema(minLength: number) {
    return z
        .string({
            required_error: "Phone number is required",
            invalid_type_error: "Phone number is required",
        })
        .trim()
        .min(minLength, { message: "Phone number is required" })
}

export function getLanguageArrayFieldSchema() {
    return z
        .array(
            z.object({
                label: z.string(),
                value: z.string(),
                data: z.any(),
            }),
        )
        .optional()
        .nullable()
        .transform((value) => (value ? getArrayOfIdOrEmptyArray(value) : []))
}

export function addressValidationSchema() {
    return z.any().refine(
        (data) => {
            if (typeof data === "string") {
                if (data?.trim().length === 0) {
                    return false
                } else {
                    return false
                }
            } else {
                if (typeof data === "object" && !Array.isArray(data)) {
                    return true
                }
                return false
            }
        },
        {
            message: "Address must be selected from dropdown",
        },
    )
}
export function getValueorNullTransformedFieldArraySchema() {
    return z
        .object({
            label: z.string(),
            value: z.string(),
            data: z.any(),
        })
        .optional()
        .nullable()
        .transform((value) => getValueOrNull(value))
}

export function getGracePeriodSchema(requiredMessage?: string) {
    return (
        z
            .any()
            // 1. Check if the field is required
            .refine((value) => (value ? JSON.stringify(value)?.trim().length > 0 : false), {
                message: requiredMessage ? requiredMessage : "This field is required",
            })
            // 2. Check if the value contains only numerical values
            .refine((value) => /^[0-9]+$/.test(value), {
                message: "Only numerical values are allowed and it cannot contain decimal points",
            })
            // 3. Check if the value is greater than 0 and does not start with 0
            .refine((value) => /^[1-9][0-9]*$/.test(value), {
                message: "Value must be greater than 0 and cannot start with 0",
            })
            .refine((value) => (value ? parseInt(value) <= CONFIG.MAX_ORDER_LIMIT : false), {
                message: `Value must be less than or equal to ${CONFIG.MAX_ORDER_LIMIT}`,
            })
            .transform((value) => parseInt(value, 10))
    )
}

/**
 * Returns a schema for a number field with max limit of 2147483647
 * with various transformations and validations.
 *
 * @returns {ZodSchema} - A Zod schema with transformations and validations for a number field.
 */
export function getNumberFieldSchema(fieldName: string) {
    return z
        .any()
        .transform((value) => value && value.toString())
        .refine((value) => validateDurationFieldNumericValue(value), {
            message: CONFIG.VALIDATION.MESSAGE.NUMERICAL_VALUES_REQUIRED,
        })
        .refine((value) => validateOrderFieldMaxValue(value), {
            message: `${fieldName} ${CONFIG.VALIDATION.MESSAGE.MAX_CHARACTERS}`,
        })
        .transform((value) => (value ? parseInt(value) : null))
}

/**
 * Generates a schema for a string field with minimum character length validation.
 *
 * @param {string} fieldName - The name of the field for which the schema is generated.
 * @returns {ZodSchema} A Zod schema for validating the field.
 */
export function getMinCharactersSchema(fieldName: string) {
    return z
        .string({
            invalid_type_error: generateErrorMessage(fieldName),
            required_error: generateErrorMessage(fieldName),
        })
        .trim()
        .min(1, { message: generateErrorMessage(fieldName) })
}

export const requiredSingleValueInString = (fieldName: string) => {
    return z.array(
        z.object({
            value: z
                .string({
                    invalid_type_error: generateErrorMessage(fieldName),
                    required_error: generateErrorMessage(fieldName),
                })
                .trim()
                .min(1, { message: generateErrorMessage(fieldName) })
                .max(CONFIG.VALIDATION.CHARACTER_LENGTH.TWO_FIFTY_FIVE_CHARACTERS, {
                    message: generateErrorMessage(fieldName, CONFIG.VALIDATION.CHARACTER_LENGTH.TWO_FIFTY_FIVE_CHARACTERS, true),
                })
                .refine((value) => value === null || value === undefined || !/\s/.test(value), {
                    message: "This field should not contain spaces",
                }),
            mapped_name: z
                .string({
                    invalid_type_error: generateErrorMessage(fieldName),
                    required_error: generateErrorMessage(fieldName),
                })
                .trim()
                .min(1, { message: generateErrorMessage(fieldName) })
                .max(CONFIG.VALIDATION.CHARACTER_LENGTH.TWO_FIFTY_FIVE_CHARACTERS, {
                    message: generateErrorMessage(fieldName, CONFIG.VALIDATION.CHARACTER_LENGTH.TWO_FIFTY_FIVE_CHARACTERS, true),
                }),
        }),
    )
}

export const requiredSingleValueInStringWithSQL = (fieldName: string) => {
    return z.array(
        z.object({
            field_name: z
                .string({
                    invalid_type_error: generateErrorMessage(fieldName),
                    required_error: generateErrorMessage(fieldName),
                })
                .trim()
                .min(1, { message: generateErrorMessage(fieldName) })
                .max(CONFIG.VALIDATION.CHARACTER_LENGTH.TWO_FIFTY_FIVE_CHARACTERS, {
                    message: generateErrorMessage(fieldName, CONFIG.VALIDATION.CHARACTER_LENGTH.TWO_FIFTY_FIVE_CHARACTERS, true),
                })
                .refine((value) => value === null || value === undefined || !/\s/.test(value), {
                    message: "This field should not contain spaces",
                }),
            table_name: z
                .string({
                    invalid_type_error: generateErrorMessage(fieldName),
                    required_error: generateErrorMessage(fieldName),
                })
                .trim()
                .min(1, { message: generateErrorMessage(fieldName) })
                .max(CONFIG.VALIDATION.CHARACTER_LENGTH.TWO_FIFTY_FIVE_CHARACTERS, {
                    message: generateErrorMessage(fieldName, CONFIG.VALIDATION.CHARACTER_LENGTH.TWO_FIFTY_FIVE_CHARACTERS, true),
                })
                .refine((value) => value === null || value === undefined || !/\s/.test(value), {
                    message: "This field should not contain spaces",
                }),
            column_name: z
                .string({
                    invalid_type_error: generateErrorMessage(fieldName),
                    required_error: generateErrorMessage(fieldName),
                })
                .trim()
                .min(1, { message: generateErrorMessage(fieldName) })
                .max(CONFIG.VALIDATION.CHARACTER_LENGTH.TWO_FIFTY_FIVE_CHARACTERS, {
                    message: generateErrorMessage(fieldName, CONFIG.VALIDATION.CHARACTER_LENGTH.TWO_FIFTY_FIVE_CHARACTERS, true),
                })
                .refine((value) => value === null || value === undefined || !/\s/.test(value), {
                    message: "This field should not contain spaces",
                }),
        }),
    )
}

export const requiredSingleValueInStringHumanVerification = (fieldName: string) => {
    return z.array(
        z.object({
            mapped_name: z
                .string({
                    invalid_type_error: generateErrorMessage(fieldName),
                    required_error: generateErrorMessage(fieldName),
                })
                .trim()
                .min(1, { message: generateErrorMessage(fieldName) })
                .max(CONFIG.VALIDATION.CHARACTER_LENGTH.TWO_FIFTY_FIVE_CHARACTERS, {
                    message: generateErrorMessage(fieldName, CONFIG.VALIDATION.CHARACTER_LENGTH.TWO_FIFTY_FIVE_CHARACTERS, true),
                }),
            value: z
                .string({
                    invalid_type_error: generateErrorMessage(fieldName),
                    required_error: generateErrorMessage(fieldName),
                })
                .trim()
                .min(1, { message: generateErrorMessage(fieldName) })
                .max(CONFIG.VALIDATION.CHARACTER_LENGTH.TWO_FIFTY_FIVE_CHARACTERS, {
                    message: generateErrorMessage(fieldName, CONFIG.VALIDATION.CHARACTER_LENGTH.TWO_FIFTY_FIVE_CHARACTERS, true),
                }),
            confidence: z.number({
                invalid_type_error: generateErrorMessage(fieldName),
                required_error: generateErrorMessage(fieldName),
            }),
        }),
    )
}

export function getRequiredNumberFieldSchema(fieldName: string) {
    return z
        .any()
        .transform((value) => value && value.toString())
        .refine((value) => (value?.trim()?.length ? true : false), {
            message: `${fieldName} is required`,
        })
        .refine((value) => validateDurationFieldNumericValue(value), {
            message: CONFIG.VALIDATION.MESSAGE.NUMERICAL_VALUES_REQUIRED,
        })
        .refine((value) => validateOrderFieldMaxValue(value), {
            message: `${fieldName} ${CONFIG.VALIDATION.MESSAGE.MAX_CHARACTERS}`,
        })
        .transform((value) => (value ? parseInt(value) : null))
}

export const requiredFieldValueInStringSchema = (fieldName: string) => {
    return z.array(
        z.object({
            field_name: z
                .string({
                    invalid_type_error: generateErrorMessage(fieldName),
                    required_error: generateErrorMessage(fieldName),
                })
                .trim()
                .min(1, { message: generateErrorMessage(fieldName) })
                .max(CONFIG.VALIDATION.CHARACTER_LENGTH.TWO_FIFTY_FIVE_CHARACTERS, {
                    message: generateErrorMessage(fieldName, CONFIG.VALIDATION.CHARACTER_LENGTH.TWO_FIFTY_FIVE_CHARACTERS, true),
                }),
            mapped_name: z
                .string({
                    invalid_type_error: generateErrorMessage(fieldName),
                    required_error: generateErrorMessage(fieldName),
                })
                .trim()
                .min(1, { message: generateErrorMessage(fieldName) })
                .max(CONFIG.VALIDATION.CHARACTER_LENGTH.TWO_FIFTY_FIVE_CHARACTERS, {
                    message: generateErrorMessage(fieldName, CONFIG.VALIDATION.CHARACTER_LENGTH.TWO_FIFTY_FIVE_CHARACTERS, true),
                }),
        }),
    )
}

export function getRequiredDecimalFieldSchema(fieldName: string) {
    return z
        .any()
        .transform((value) => value && value.toString())
        .refine((value) => (value?.trim()?.length ? true : false), {
            message: `${fieldName} is required`,
        })
        .refine((value) => validateDecimalValue(value), {
            message: CONFIG.VALIDATION.MESSAGE.NUMERICAL_VALUES_REQUIRED,
        })
        .transform((value) => (value ? parseInt(value) : null))
}

export function getRequiredPercentageFieldSchema(fieldName: string) {
    return z
        .string({
            invalid_type_error: generateErrorMessage(fieldName),
            required_error: generateErrorMessage(fieldName),
        }) // Start by accepting input as a string
        .transform((value) => value.trim()) // Remove extra spaces
        .refine((value) => value.length > 0, {
            message: `${fieldName} is required`,
        })
        .refine((value) => /^[0-9]+(\.[0-9]{1,2})?%?$/.test(value), {
            message: `${fieldName} must be a valid percentage with up to 2 decimal places`,
        })
        .transform((value) => {
            // Remove '%' if present and parse as a number
            const numericValue = parseFloat(value.replace("%", ""))
            return numericValue
        })
        .refine((value) => value > 0 && value <= 100, {
            message: `${fieldName} must be between 0 and 100`,
        })
}

export function getRequiredFloatFieldSchema(fieldName: string) {
    return z
        .any()
        .transform((value) => value && value.toString())
        .refine((value) => (value?.trim()?.length ? true : false), {
            message: `${fieldName} is required`,
        })
        .refine((value) => /^[0-9]+(\.[0-9]{1,2})?%?$/.test(value), {
            message: `${fieldName} must be a valid percentage with up to 2 decimal places`,
        })
        .refine((value) => validateDecimalValue(value), {
            message: CONFIG.VALIDATION.MESSAGE.NUMERICAL_VALUES_REQUIRED,
        })
        .transform((value) => (value ? parseFloat(value) : null))
}

// Optional validation schema
export function getOptionalFloatFieldSchema(fieldName: string) {
    return z
        .any()
        .optional() // Make the field optional
        .transform((value) => (value ? value.toString() : undefined)) // Convert to string if value exists
        .refine(
            (value) => !value || value.trim().length > 0, // Skip validation if the value is undefined or empty
            { message: `${fieldName} is required` },
        )
        .refine(
            (value) => !value || /^[0-9]+(\.[0-9]{1,2})?%?$/.test(value), // Validate only if a value exists
            { message: `${fieldName} must be a valid percentage with up to 2 decimal places` },
        )
        .refine(
            (value) => !value || validateDecimalValue(value), // Apply further numerical validation if a value exists
            { message: CONFIG.VALIDATION.MESSAGE.NUMERICAL_VALUES_REQUIRED },
        )
        .transform((value) => (value ? parseFloat(value) : undefined)) // Convert to a float if value exists
}

export const getOptionalMultiSelectFieldSchema = (fieldName: string) => {
    return z
        .array(
            z
                .object(
                    {
                        label: z.any(),
                        value: z.any(),
                        data: z.any(),
                    },
                    {
                        invalid_type_error: `${fieldName} must be a valid multi-select`,
                        required_error: `${fieldName} is required`,
                    },
                )
                .refine((option) => !!option?.value, { message: `${fieldName} requires valid options` }),
            {
                invalid_type_error: `${fieldName} must be a valid multi-select`,
                required_error: `${fieldName} is required`,
            },
        )
        .optional() // Make the field optional
        .transform((fields) => {
            if (Array.isArray(fields)) {
                // If fields are selected, return an array of 'value' (IDs)
                return fields.filter((field) => field?.value).map((field) => field.value)
            } else {
                // If no fields are selected, return an empty array
                return []
            }
        })
        .nullable()
}

export function getOptionalNameFieldSchemaWithOnlyNumbersGreaterThanZero(fieldName: string) {
    return z
        .string({
            invalid_type_error: generateErrorMessage(fieldName),
            required_error: generateErrorMessage(fieldName),
        })
        .trim() // Trim extra spaces from both ends
        .refine((value) => value === "" || /^[1-9]\d*$/.test(value), {
            message: "Only positive numbers (not starting with 0) are allowed",
        })
        .refine((value) => value === "" || value !== "0", {
            message: "Only positive numbers (not starting with 0) are allowed",
        })
        .optional()
        .transform((value) => (value === "" ? undefined : value))
        .nullable() // Make the field optional
}

export function getOptionalPercentageFieldSchema(fieldName: string) {
    return z
        .string() // Start by accepting input as a string
        .optional() // Make the field optional
        .transform((value) => (value || "").trim()) // Handle undefined and trim spaces
        .refine((value) => value === "" || /^[0-9]+(\.[0-9]{1,2})?%?$/.test(value), {
            message: `${fieldName} must be a valid percentage with up to 2 decimal places`,
        })
        .transform((value) => {
            if (value === "") return undefined // Keep empty strings as undefined
            const numericValue = parseFloat(value.replace("%", ""))
            return numericValue
        })
        .refine((value) => value === undefined || (value > 0 && value <= 100), {
            message: `${fieldName} must be between 0 and 100`,
        })
        .nullable()
}

export function getOptionalNameFieldSchemaWithOnlyNumbers(fieldName: string) {
    return z
        .string()
        .optional() // Allow the field to be optional
        .transform((value) => (value || "").trim()) // Trim spaces and handle undefined
        .refine(
            (value) => value === "" || /^[0-9]+(\.[0-9]{1,2})?$/.test(value), // Allow up to 2 decimal places
            {
                message: "Only numbers or floating-point values with up to 2 decimal places are allowed",
            },
        )
        .refine((value) => value === "" || value.length <= CONFIG.VALIDATION.CHARACTER_LENGTH.TWO_FIFTY_FIVE_CHARACTERS, {
            message: generateErrorMessage(fieldName, CONFIG.VALIDATION.CHARACTER_LENGTH.TWO_FIFTY_FIVE_CHARACTERS, true),
        })
        .refine(
            (value) => value === "" || parseFloat(value) > 0, // Ensure positive numbers, including floats
            {
                message: `${fieldName} must be a number greater than 0`,
            },
        )
        .transform((value) => (value === "" ? undefined : value))
        .nullable() // Convert empty strings back to undefined
}

export function getOptionalNameFieldSchemaWithNumbers(fieldName: string) {
    return z
        .string()
        .optional() // Allow the field to be optional
        .transform((value) => (value || "").trim()) // Trim spaces and handle undefined
        .refine(
            (value) => value === "" || /^[0-9]+(\.[0-9]{1,2})?$/.test(value), // Allow integers or floats with up to 2 decimal places
            {
                message: "Only numbers or floating-point values with up to 2 decimal places are allowed",
            },
        )
        .refine((value) => value === "" || value.length <= CONFIG.VALIDATION.CHARACTER_LENGTH.TWO_FIFTY_FIVE_CHARACTERS, {
            message: generateErrorMessage(fieldName, CONFIG.VALIDATION.CHARACTER_LENGTH.TWO_FIFTY_FIVE_CHARACTERS, true),
        })
        .refine(
            (value) => value === "" || parseFloat(value) >= 0, // Ensure positive numbers, including 0
            {
                message: `${fieldName} must be a number greater than or equal to 0`,
            },
        )
        .transform((value) => (value === "" ? undefined : value)) // Convert empty strings back to undefined
        .nullable() // Allow null values
}

export function requiredAddressValidationSchema() {
    return z.any().superRefine((data, ctx) => {
        // 1. Validate that the data is present
        if (!data) {
            ctx.addIssue({
                code: "custom",
                message: CONFIG.VALIDATION.MESSAGE.ADDRESS_IS_REQUIRED,
            })
            return // No need to continue validation if data is null or undefined
        }
        // 2. Validate that data is not a string and must be an object
        if (typeof data === "string") {
            ctx.addIssue({
                code: "custom",
                message: CONFIG.VALIDATION.MESSAGE.SELECT_AN_ADDRESS_FROM_DROPDOWN,
            })
            return
        }
        // 3. Validate that data is an object
        if (typeof data === "object" && !Array.isArray(data)) {
            validateAddressField({ data, ctx })
        } else {
            // If not an object, add an issue
            ctx.addIssue({
                code: "custom",
                message: CONFIG.VALIDATION.MESSAGE.SELECT_AN_ADDRESS_FROM_DROPDOWN,
            })
        }
    })
}
export function optionalAddressValidationSchema() {
    return z
        .any()
        .transform((data) => {
            if (data && typeof data === "object" && !Array.isArray(data)) {
                // Check if all the keys are null
                const allNull = Object.values(data).every((value) => value === null || value === "")
                // If all values are null or empty strings, transform the object to null
                if (allNull) {
                    return null
                }
                // Otherwise, return the object as is
                return data
            }
            return data // If it's not an object, just return the data as is
        })
        .superRefine((data, ctx) => {
            // If data is null after transformation, no validation errors
            if (data === null) {
                return
            }
            // Data should not be a string
            if (typeof data === "string") {
                ctx.addIssue({
                    code: "custom",
                    message: CONFIG.VALIDATION.MESSAGE.SELECT_AN_ADDRESS_FROM_DROPDOWN,
                })
            }
            // If data is an object, validate specific fields
            if (typeof data === "object" && !Array.isArray(data)) {
                validateAddressField({ data, ctx })
            }
        })
}

// Adjust the path based on your project structure
/**
 * Generates a Zod schema for a string field with trim and non-empty validation.
 * @param fieldName - The name of the field for error messages.
 * @returns A Zod string schema.
 */
export function getTrimmedNonEmptyFieldSchema(fieldName: string) {
    return z
        .string({
            invalid_type_error: generateErrorMessage(fieldName),
            required_error: generateErrorMessage(fieldName),
        })
        .trim()
        .nonempty(`${fieldName} is required`)
}

export function toggleHttps(link: Any) {
    if (!link?.trim()) {
        return null
    }
    if (link.startsWith("https://")) {
        return link.replace("https://", "")
    }
    return `https://${link}`
}

export function getRequiredLogoSchema(fieldName: string) {
    const errorMessage = generateErrorMessage(fieldName)

    return z
        .record(
            z.string({
                required_error: errorMessage,
                invalid_type_error: errorMessage,
                message: errorMessage,
            }),
            z.any({
                required_error: errorMessage,
                invalid_type_error: errorMessage,
                message: errorMessage,
            }),
            {
                invalid_type_error: errorMessage,
                message: errorMessage,
                required_error: errorMessage,
            },
        )
        .refine((value) => Object.keys(value).length > 0, {
            message: generateErrorMessage(fieldName),
        })
        .transform((value) => (value.id ? value.id : null))
}

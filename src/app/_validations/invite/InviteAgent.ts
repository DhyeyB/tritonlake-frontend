import { CONFIG } from "@/app/_utils/Constants"
import { generateErrorMessage } from "@/app/_utils/validation/Common"
import { getNameFieldSchema, getUserEmailSchema, requiredAddressValidationSchema, requiredSingleDropdownSchema } from "@/app/_utils/validation/FieldSchema"
import { z } from "zod"

export const InviteAgentValidationSchema = z.object({
    first_name: getNameFieldSchema(CONFIG.VALIDATION.FIELD_NAME.USER_FIRST_NAME),
    last_name: getNameFieldSchema(CONFIG.VALIDATION.FIELD_NAME.USER_LAST_NAME),
    name: getNameFieldSchema(CONFIG.VALIDATION.FIELD_NAME.USER_FIRM_NAME),
    email: getUserEmailSchema(),
    network_id: requiredSingleDropdownSchema(CONFIG.VALIDATION.FIELD_NAME.NETWORK),

    network_logo: z
        .record(
            z.string({
                required_error: generateErrorMessage(CONFIG.VALIDATION.FIELD_NAME.NETWORK_LOGO),
                invalid_type_error: generateErrorMessage(CONFIG.VALIDATION.FIELD_NAME.NETWORK_LOGO),
                message: generateErrorMessage(CONFIG.VALIDATION.FIELD_NAME.NETWORK_LOGO),
            }),
            z.any({
                required_error: generateErrorMessage(CONFIG.VALIDATION.FIELD_NAME.NETWORK_LOGO),
                invalid_type_error: generateErrorMessage(CONFIG.VALIDATION.FIELD_NAME.NETWORK_LOGO),
                message: generateErrorMessage(CONFIG.VALIDATION.FIELD_NAME.NETWORK_LOGO),
            }),
            {
                invalid_type_error: generateErrorMessage(CONFIG.VALIDATION.FIELD_NAME.NETWORK_LOGO),
                message: generateErrorMessage(CONFIG.VALIDATION.FIELD_NAME.NETWORK_LOGO),
                required_error: generateErrorMessage(CONFIG.VALIDATION.FIELD_NAME.NETWORK_LOGO),
            },
        )
        .refine(
            (value) => {
                return Object.keys(value).length > 0
            },
            {
                message: generateErrorMessage(CONFIG.VALIDATION.FIELD_NAME.LOGO),
            },
        )
        .transform((value) => {
            if (value.id) {
                return value.id
            } else {
                return null
            }
        }),
    network_name: getNameFieldSchema(CONFIG.VALIDATION.FIELD_NAME.NETWORK_NAME),
    // contact_name: getNameFieldSchema(CONFIG.VALIDATION.FIELD_NAME.CONTACT_NAME),
    // address: addressValidationSchema(),
    address: requiredAddressValidationSchema(),
    primary_brand_color: getNameFieldSchema(CONFIG.VALIDATION.FIELD_NAME.PRIMARY_BRAND_COLOR),
    secondary_brand_color: getNameFieldSchema(CONFIG.VALIDATION.FIELD_NAME.SECONDARY_BRAND_COLOR),
})

export type InviteAgentType = z.infer<typeof InviteAgentValidationSchema>

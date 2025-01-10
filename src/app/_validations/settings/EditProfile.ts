import { CONFIG } from "@/app/_utils/Constants"
import { getNameFieldSchema, getUserEmailSchema, getUserPasswordSchema } from "@/app/_utils/validation/FieldSchema"
import { z } from "zod"

export const ResetPasswordSchema = z
    .object({
        current_password: getUserPasswordSchema(),
        new_password: getUserPasswordSchema(),
        confirm_new_password: z.string().trim(),
    })
    .refine((schema) => schema.new_password === schema.confirm_new_password, {
        path: ["confirm_new_password"],
        message: CONFIG.VALIDATION.MESSAGE.PASSWORD_DO_NOT_MATCH,
    })

export type ResetPasswordValidationType = z.infer<typeof ResetPasswordSchema>

export const EditUserInfoSchema = z.object({
    avatar: z.any(),
    first_name: getNameFieldSchema(CONFIG.VALIDATION.FIELD_NAME.USER_FIRST_NAME),
    last_name: getNameFieldSchema(CONFIG.VALIDATION.FIELD_NAME.USER_LAST_NAME),
    email: getUserEmailSchema(),
})

export type EditUser = z.infer<typeof EditUserInfoSchema>

import { getUserEmailSchema, getUserPasswordSchema } from "@/app/_utils/validation/FieldSchema"
import { z } from "zod"

export const RequestResetPasswordValidationSchema = z.object({
    email: getUserEmailSchema(),
})

export type RequestResetPasswordSchema = z.infer<typeof RequestResetPasswordValidationSchema>

export const ResetPasswordValidationSchema = z
    .object({
        new_password: getUserPasswordSchema(),
        confirm_new_password: z.string().refine((value) => value !== "", {
            message: "Confirm Password is required",
        }),
        verification_code: z.string().min(6, { message: "Verification Code must be exactly 6 digits" }).max(6, { message: "Verification Code must be exactly 6 digits" }),
    })
    .refine((data) => data.new_password === data.confirm_new_password, {
        message: "Passwords don't match",
        path: ["confirm_new_password"],
    })
export type ResetPasswordSchema = z.infer<typeof ResetPasswordValidationSchema>

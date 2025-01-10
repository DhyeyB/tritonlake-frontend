import { getPhoneNumberSchema, getUserEmailSchema } from "@/app/_utils/validation/FieldSchema"
import { z } from "zod"

export const Add2faValidationSchema = z.object({
    phone: getPhoneNumberSchema(1),
    phone_country_code: getPhoneNumberSchema(2),
    email: getUserEmailSchema(),
    otp: z.string().min(6, { message: "OTP must be exactly 6 digits" }).max(6, { message: "OTP must be exactly 6 digits" }),
})

export const Add2faOtpValidationSchema = z.object({})

export type Add2faSchemaType = z.infer<typeof Add2faValidationSchema>

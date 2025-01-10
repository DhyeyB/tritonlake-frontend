import { getUserEmailSchema, getUserPasswordSchema } from "@/app/_utils/validation/FieldSchema"
import { z } from "zod"

export const SigninValidationSchema = z.object({
    email: getUserEmailSchema(),
    password: getUserPasswordSchema(),
})

export type SigninSchema = z.infer<typeof SigninValidationSchema>

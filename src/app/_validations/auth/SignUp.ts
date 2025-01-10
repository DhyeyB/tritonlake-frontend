import { getUserEmailSchema, getUserPasswordSchema } from "@/app/_utils/validation/FieldSchema"
import { z } from "zod"

export const SignupValidationSchema = z
    .object({
        email: getUserEmailSchema(),
        create_password: getUserPasswordSchema(),
        verify_password: z.string().refine((value) => value !== "", {
            message: "Please confirm your password",
        }),
    })
    .refine((data) => data.create_password === data.verify_password, {
        message: "Passwords don't match",
        path: ["verify_password"],
    })
export type SignupSchema = z.infer<typeof SignupValidationSchema>

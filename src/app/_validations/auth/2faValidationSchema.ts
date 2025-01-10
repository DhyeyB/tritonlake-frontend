import { z } from "zod"

export const Confirm2FAValidationSchema = z.object({
    code: z.string().min(6, { message: "Code must be exactly 6 digits" }).max(6, { message: "Code must be exactly 6 digits" }),
})

export type Payload2FASchemaType = z.infer<typeof Confirm2FAValidationSchema>

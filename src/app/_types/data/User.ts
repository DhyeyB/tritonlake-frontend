export interface UserType {
    created_at: Date
    created_by: Date | null
    deactivated_at: Date | null
    deleted_at: Date | null
    email: string
    first_name: string
    id: number
    last_name: string | null
    name: string
    phone: null
    role: string
    status: boolean
    updated_at: Date | null
    updated_by: null
    uuid: string
}

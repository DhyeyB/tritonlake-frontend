// Type for errors when isEmrSqlType is true (with SQL)
export type ErrorWithFields = {
    field_name?: {
        message: string
    }
    mapped_name?: {
        message: string
    }
}

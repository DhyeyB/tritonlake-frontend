// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const nameFieldFormat = (value: any) => {
    return value.match(/^[a-zA-Z' ]+$/)
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const passwordFieldFormat = (value: any) => {
    return value.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d\s]).{8,}$/)
}

export function generateErrorMessage(fieldName: string, characters?: number, maxCharsCrossed?: boolean) {
    if (characters && !maxCharsCrossed) {
        return `${fieldName} must be at least ${characters} characters long`
    } else if (maxCharsCrossed) {
        return `${fieldName} must be less than or equal to ${characters} characters`
    }
    return `${fieldName} is required`
}

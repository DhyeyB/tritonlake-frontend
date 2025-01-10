export const getOffsetDate = (offset: number) => {
    // Get the current date
    const now = new Date()

    const millisecondsInOneDay = 24 * 60 * 60 * 1000 // milliseconds in one day

    // Add offset days to the current date
    const offsetDate = new Date(now.getTime() + offset * millisecondsInOneDay)

    return offsetDate
}

export const getMonthDateFormat = (dateString?: Date | null) => {
    try {
        if (dateString) {
            const dateObj = new Date(dateString)
            const month = dateObj.toLocaleString("default", { month: "short" })
            const day = dateObj.getDate()
            return `${month} ${day}`
        } else {
            return ""
        }
    } catch (error) {
        return ""
    }
}

export const getDateMonthYearFormat = (dateString?: Date | null) => {
    try {
        if (dateString) {
            const dateObj = new Date(dateString)
            const day = dateObj.getDate()
            const month = dateObj.toLocaleString("default", { month: "short" })
            const year = dateObj.getFullYear()
            return `${day} ${month} ${year}`
        } else {
            return ""
        }
    } catch (error) {
        return ""
    }
}

export const getMonthYearFormat = (dateString?: Date | null) => {
    try {
        if (dateString) {
            const dateObj = new Date(dateString)
            const month = dateObj.toLocaleString("default", { month: "short" })
            const year = dateObj.getFullYear()
            return `${month} ${year}`
        } else {
            return ""
        }
    } catch (error) {
        return ""
    }
}

export const getDateOnly = (dateString?: Date | null) => {
    try {
        if (dateString) {
            return new Date(dateString).toLocaleDateString()
        } else {
            return ""
        }
    } catch (error) {
        return ""
    }
}

export const getYearOnly = (dateString?: Date | null) => {
    try {
        if (dateString) {
            return new Date(dateString).getFullYear()
        } else {
            return ""
        }
    } catch (error) {
        return ""
    }
}

export const getDateMonthFormat = (dateString?: Date | null) => {
    /**
     * Formats a given date string into a 'MMM-DD' format.
     * @param dateString Optional. A Date object or string representation of a date.
     * @returns A string representing the date in 'MMM-DD' format, or an empty string if input is invalid or null.
     */
    try {
        if (dateString) {
            const formattedTheatricalReleaseDate = new Date(dateString).toLocaleDateString("en-UK", {
                month: "short",
                day: "2-digit",
            })

            let month, day
            if (formattedTheatricalReleaseDate) {
                const [monthStr, dayStr] = formattedTheatricalReleaseDate.split(" ")
                month = monthStr
                day = dayStr
            }
            return `${month}-${day}`
        } else {
            return ""
        }
    } catch {
        return ""
    }
}

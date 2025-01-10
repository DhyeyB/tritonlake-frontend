export const formatCurrency = (amount?: number) => {
    try {
        if (amount) {
            return amount.toLocaleString("en-US", { currency: "en-US", style: "currency" })
        }
        return ""
    } catch (error) {
        return amount
    }
}

import React from "react"

const ValueOrHyphen: React.FC<{ value: string | null | undefined }> = ({ value }) => {
    const hasValue = typeof value === "string" && value.length > 0
    const valueClass = hasValue ? "audit-log-value" : "audit-log-value audit-log-empty"

    return <p className={valueClass}>{hasValue ? value : "-"}</p>
}

export default ValueOrHyphen

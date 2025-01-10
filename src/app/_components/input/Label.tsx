import { LabelPropsType } from "@/app/_types/common/Label"
import React from "react"

const Label: React.FC<LabelPropsType> = ({ label, labelClass = "", isRequired = false }) => {
    if (!label?.length) return null
    return (
        <label className={`form-label ${labelClass}`}>
            {label}
            {isRequired && <span className="text-danger"> *</span>}
        </label>
    )
}
export default Label

import { ButtonPropType } from "@/_types/components/button/ButtonProp"
import { CONFIG } from "@/app/_utils/Constants"
import React from "react"
import { Spinner } from "react-bootstrap"

const Button: React.FC<ButtonPropType> = ({ loading, loadingText = CONFIG.LOADING_BUTTON_TEXT, title, ...props }) => {
    return (
        <button type="submit" className="btn btn-primary custom-button-height" disabled={loading} {...props}>
            {loading ? (
                <div className="d-flex justify-content-center align-items-center gap-4">
                    <span className="indicator-label">{loadingText}</span> <Spinner />
                </div>
            ) : (
                <span className="indicator-label">{title}</span>
            )}
        </button>
    )
}

export default Button

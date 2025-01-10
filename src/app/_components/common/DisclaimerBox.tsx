import { DisclaimerBoxProps } from "@/app/_types/common/DisclaimerBox"
import { CONFIG } from "@/app/_utils/Constants"
import React from "react"

const DisclaimerBox: React.FC<DisclaimerBoxProps> = ({ title = CONFIG.DISCLAIMER.TITLE, message = CONFIG.DISCLAIMER.MESSAGE }) => {
    return (
        <div className="px-8 mt-10">
            <div className="alert alert-light col-lg-12 col-md-12 col-sm-12 text-black bg-white p-5" role="alert">
                <h3> {title} </h3>
                <p>{message}</p>
            </div>
        </div>
    )
}

export default DisclaimerBox

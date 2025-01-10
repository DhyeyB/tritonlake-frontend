import { ReactOtpInputProps } from "@/app/_validations/auth/ReactOtpInput"
import React from "react"
import OtpInput from "react-otp-input"

const ReactOtpInputComponent: React.FC<ReactOtpInputProps> = ({ otp, setOtp, numInputs = 5 }) => {
    return (
        <OtpInput
            value={otp}
            onChange={setOtp}
            numInputs={numInputs}
            renderSeparator={<span className="t-otp-separator"></span>}
            renderInput={(props) => (
                <input
                    {...props}
                    type="tel"
                    onKeyDown={(e) => {
                        if (e.key !== "Backspace" && e.key !== "Delete" && e.key !== "Tab" && e.key !== "Enter" && (e.key < "0" || e.key > "9")) {
                            e.preventDefault()
                        }
                    }}
                    className="t-otp-input"
                />
            )}
            containerStyle={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexWrap: "wrap",
            }}
        />
    )
}

export default ReactOtpInputComponent

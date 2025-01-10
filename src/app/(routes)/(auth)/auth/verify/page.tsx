"use client"
import AuthHeader from "@/app/_components/_auth/AuthHeader"
import Button from "@/app/_components/button/Button"
import ReactOtpInputComponent from "@/app/_components/otpInput"
import { FetchHelper } from "@/app/_services/FetchHelper"
import { showSweetAlertWithRedirect } from "@/app/_utils/Common"
import { CONFIG } from "@/app/_utils/Constants"
import { handleError, showSweetAlert } from "@/app/_utils/Helpers"
import { useRouter, useSearchParams } from "next/navigation"
import React, { useState } from "react"
import { SweetAlertIcon } from "sweetalert2"

const VerifyAccount = () => {
    const searchParams = useSearchParams()
    const router = useRouter()
    const email = searchParams.get("email")
    const [otp, setOtp] = useState("")
    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleOtpChange = (value: string) => {
        setOtp(value)
    }

    // Handle the email and otp entered by user form
    const submitHandler = async (event: React.FormEvent) => {
        event.preventDefault()
        try {
            setIsSubmitting(true)
            const formData = {
                email,
                otp,
            }

            const response = await FetchHelper.post(CONFIG.API_ENDPOINTS.REQUEST_RESET_PASSWORD, formData)
            if (response?.status) {
                showSweetAlertWithRedirect({
                    message: CONFIG.MESSAGES.RESET_LINK_SENT,
                    icon: CONFIG.SWEETALERT_SUCCESS_OPTION.icon as SweetAlertIcon,
                    router,
                    url: `/auth/reset-password`,
                })
            }
        } catch (error) {
            handleError(error)
        } finally {
            setIsSubmitting(false)
        }
    }

    // Handle the resend otm email notification
    const resendOtpEmailRequest = async () => {
        try {
            const response = await FetchHelper.post(CONFIG.API_ENDPOINTS.REQUEST_RESET_PASSWORD, {
                email,
            })
            if (response?.status) {
                showSweetAlert(CONFIG.MESSAGES.RESET_LINK_SENT, CONFIG.SWEETALERT_SUCCESS_OPTION.icon as SweetAlertIcon)
            }
        } catch (error) {
            handleError(error)
        }
    }

    return (
        <>
            <div className="d-flex flex-center flex-column flex-lg-row-fluid">
                <div className="w-lg-500px p-0 p-md-10">
                    <form className="form w-100" onSubmit={submitHandler}>
                        <AuthHeader title={CONFIG.VERIFY_YOUR_ACCOUNT_TITLE} />
                        <p>
                            We have sent a verification code to <strong> {email} </strong>. Please enter the code to update your password.
                        </p>

                        <div className="my-10">
                            <ReactOtpInputComponent otp={otp} setOtp={handleOtpChange} numInputs={5} />
                        </div>

                        <div className="d-flex flex-stack flex-wrap gap-3 fs-base fw-semibold mb-8">
                            <div></div>
                        </div>
                        <div className="text-gray-500 text-center fw-semibold fs-6 mb-10">
                            Didn’t receive an email?{" "}
                            <a onClick={() => resendOtpEmailRequest()} className="link-primary cursor-pointer">
                                Resend
                            </a>
                        </div>
                        <div className="d-grid mb-10">
                            <Button
                                loading={isSubmitting}
                                title="Verify Email"
                                disabled={otp.length !== CONFIG.OTP_INPUT_LENGTH} // Disable button if OTP is not valid
                            />
                        </div>
                    </form>
                </div>
            </div>
            <div className={`text-center mt-20`}>
                Powered by <img alt="Logo" src="/assets/media/logos/matrix-logo-dark.svg" style={{ height: "25px" }} />
            </div>
        </>
    )
}

export default VerifyAccount

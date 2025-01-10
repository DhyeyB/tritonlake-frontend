"use client"
import AuthHeader from "@/app/_components/_auth/AuthHeader"
import Button from "@/app/_components/button/Button"
import TextInputField from "@/app/_components/input/TextInput"
import { FetchHelper } from "@/app/_services/FetchHelper"
import { showSweetAlertWithRedirect } from "@/app/_utils/Common"
import { CONFIG } from "@/app/_utils/Constants"
import { handleError, showSweetAlert } from "@/app/_utils/Helpers"
import { ResetPasswordSchema, ResetPasswordValidationSchema } from "@/app/_validations/auth/ForgotPassword"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter, useSearchParams } from "next/navigation"
import { useForm } from "react-hook-form"
import { SweetAlertIcon } from "sweetalert2"

const ResetPassword = () => {
    const router = useRouter()
    const searchParams = useSearchParams()
    const email = searchParams.get("email")

    // Decode email to handle the plus sign correctly
    const decodedEmail = email ? decodeURIComponent(email) : ""

    const {
        register,
        formState: { errors, isSubmitting },
        handleSubmit,
    } = useForm<ResetPasswordSchema>({
        resolver: zodResolver(ResetPasswordValidationSchema),
    })

    const submitHandler = async (data: ResetPasswordSchema) => {
        try {
            const response = await FetchHelper.post(CONFIG.API_ENDPOINTS.RESET_PASSWORD, {
                password: data.new_password,
                email: decodedEmail,
                verification_code: data.verification_code,
            })
            if (!response?.status_code) {
                handleError(response)
            } else {
                showSweetAlertWithRedirect({
                    message: CONFIG.MESSAGES.PASSWORD_ADDED_SUCCESSFULLY,
                    icon: CONFIG.SWEETALERT_SUCCESS_OPTION.icon as SweetAlertIcon,
                    router,
                    url: "/auth/signin",
                })
            }
        } catch (error) {
            handleError(error)
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
                <div className="w-100 w-lg-500px p-10">
                    <form className="form w-100" onSubmit={handleSubmit(submitHandler)}>
                        <AuthHeader title={CONFIG.RESET_PASSWORD} />
                        <p>
                            We have sent a verification code to <strong> {decodedEmail} </strong>. Please enter the code to update your password.
                        </p>

                        {/* <div className="my-5">
                            <ReactOtpInputComponent otp={otp} setOtp={handleOtpChange} numInputs={5} />
                        </div> */}

                        <div className="fv-row mb-5">
                            <TextInputField
                                label=""
                                type="text"
                                placeholder="Verification Code"
                                autoComplete="verification_code"
                                className="form-control bg-transparent input-field-border"
                                errorMsg={errors?.verification_code?.message}
                                {...register("verification_code")}
                                onInput={(e) => {
                                    const value = e.currentTarget.value.replace(/[^0-9]/g, "").slice(0, 6)
                                    e.currentTarget.value = value
                                }}
                            />
                        </div>

                        <div className="separator separator-content my-10">
                            <span className=" text-gray-500 fw-semibold fs-7 col-10">Please enter your new password below</span>
                        </div>

                        <div className="fv-row mb-5">
                            <TextInputField
                                label=""
                                type="password"
                                placeholder="New Password"
                                autoComplete="new-password"
                                className="form-control bg-transparent input-field-border"
                                errorMsg={errors?.new_password?.message}
                                {...register("new_password")}
                            />
                        </div>
                        <div className="fv-row mb-5">
                            <TextInputField
                                label=""
                                type="password"
                                placeholder="Confirm New Password"
                                autoComplete="confirm-new-password"
                                className="form-control bg-transparent input-field-border"
                                errorMsg={errors?.confirm_new_password?.message}
                                {...register("confirm_new_password")}
                            />
                        </div>
                        <div className="d-flex flex-stack flex-wrap gap-3 fs-base fw-semibold mb-5">
                            <div></div>
                        </div>
                        <div className="text-gray-500 text-center fw-semibold fs-6 mb-10">
                            Didn’t receive an email?{" "}
                            <a onClick={() => resendOtpEmailRequest()} className="link-primary cursor-pointer">
                                Resend
                            </a>
                        </div>
                        <div className="d-grid mb-10">
                            <Button loading={isSubmitting} title="Update Password" />
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

export default ResetPassword

"use client"

import AuthHeader from "@/app/_components/_auth/AuthHeader"
import Button from "@/app/_components/button/Button"
import TextInputField from "@/app/_components/input/TextInput"
import { FetchHelper } from "@/app/_services/FetchHelper"
import { showSweetAlertWithRedirect } from "@/app/_utils/Common"
import { CONFIG } from "@/app/_utils/Constants"
import { handleError } from "@/app/_utils/Helpers"
import { RequestResetPasswordSchema, RequestResetPasswordValidationSchema } from "@/app/_validations/auth/ForgotPassword"
import { zodResolver } from "@hookform/resolvers/zod"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { SweetAlertIcon } from "sweetalert2"

const ForgotPassword = () => {
    const router = useRouter()
    const {
        register,
        formState: { errors, isSubmitting },
        handleSubmit,
    } = useForm<RequestResetPasswordSchema>({
        resolver: zodResolver(RequestResetPasswordValidationSchema),
    })

    const submitHandler = async (data: RequestResetPasswordSchema) => {
        try {
            const response = await FetchHelper.post(CONFIG.API_ENDPOINTS.REQUEST_RESET_PASSWORD, data)
            if (response?.status) {
                showSweetAlertWithRedirect({
                    message: CONFIG.MESSAGES.RESET_LINK_SENT,
                    icon: CONFIG.SWEETALERT_SUCCESS_OPTION.icon as SweetAlertIcon,
                    router,
                    url: `/auth/reset-password?email=${encodeURIComponent(data.email)}`,
                })
            }
        } catch (error) {
            handleError(error)
        }
    }
    return (
        <>
            <div className="d-flex flex-center flex-column flex-lg-row-fluid">
                <div className="w-100 w-lg-500px p-10">
                    <AuthHeader title={CONFIG.FORGOT_PASSWORD_TITLE} />
                    <form className="form w-100" onSubmit={handleSubmit(submitHandler)}>
                        <p> Please provide the email you signed up with and we will issue a password reset code. </p>

                        <div className="fv-row mb-8">
                            <TextInputField
                                label=""
                                type="text"
                                placeholder="Email"
                                autoComplete="false"
                                className="form-control bg-transparent input-field-border"
                                errorMsg={errors?.email?.message}
                                {...register("email")}
                            />
                        </div>

                        <div className="d-flex flex-stack flex-wrap gap-3 fs-base fw-semibold mb-8">
                            <div></div>
                        </div>

                        <div className="d-grid mb-10">
                            <Button loading={isSubmitting} title="Send Verification Code" />
                        </div>
                        <div className="text-gray-500 text-center fw-semibold fs-6">
                            <Link legacyBehavior href="/auth/signin">
                                <a className="link-primary">Back to sign in page</a>
                            </Link>
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

export default ForgotPassword

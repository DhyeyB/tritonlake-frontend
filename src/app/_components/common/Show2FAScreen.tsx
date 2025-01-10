"use client"

import AuthHeader from "@/app/_components/_auth/AuthHeader"
import Button from "@/app/_components/button/Button"
import TextInputField from "@/app/_components/input/TextInput"
import { FetchHelper } from "@/app/_services/FetchHelper"
import { showSweetAlertWithRedirect } from "@/app/_utils/Common"
import { CONFIG } from "@/app/_utils/Constants"
import { handleError, storeAuthTokenExp } from "@/app/_utils/Helpers"
import { Confirm2FAValidationSchema, Payload2FASchemaType } from "@/app/_validations/auth/2faValidationSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import { jwtDecode } from "jwt-decode"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { SweetAlertIcon } from "sweetalert2"

const Show2FAScreen = ({ ephemeral_token }: { ephemeral_token: string }) => {
    const router = useRouter()
    const {
        register,
        formState: { errors, isSubmitting },
        handleSubmit,
    } = useForm<Payload2FASchemaType>({
        resolver: zodResolver(Confirm2FAValidationSchema),
    })

    const submitHandler = async (data: Payload2FASchemaType) => {
        try {
            const response = await FetchHelper.post(CONFIG.API_ENDPOINTS.MFA_LOGIN, { ...data, ephemeral_token })
            if (response.agent && response.tokens.access) {
                localStorage.setItem(CONFIG.LOCAL_STORAGE_VARIABLES.ACCESS_TOKEN, response.tokens.access)
                localStorage.setItem(CONFIG.LOCAL_STORAGE_VARIABLES.REFRESH_TOKEN, response.tokens.refresh)
                localStorage.setItem(CONFIG.LOCAL_STORAGE_VARIABLES.USER_DETAILS, JSON.stringify(response.agent))
                const result = jwtDecode(response.tokens.access)
                if (result.exp) {
                    storeAuthTokenExp(result.exp?.toString())
                }
                showSweetAlertWithRedirect({
                    message: CONFIG.MESSAGES.YOU_HAVE_SUCCESSFULLY_LOGGED_IN,
                    icon: CONFIG.SWEETALERT_SUCCESS_OPTION.icon as SweetAlertIcon,
                    router,
                    // url: "/profile-first-time",
                    url: CONFIG.REDIRECT_PATHNAME.OPPORTUNITIES,
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
                    <AuthHeader title={CONFIG.TWO_FACTOR_AUTH_TITLE} />
                    <form className="form w-100" onSubmit={handleSubmit(submitHandler)}>
                        <div className="fv-row mb-8">
                            <label htmlFor="basic-url" className="form-label">
                                We have sent you a 6 digit verification code. Please enter it below:
                            </label>
                            <TextInputField
                                label=""
                                type="text"
                                placeholder="Verification Code"
                                autoComplete="code"
                                className="form-control bg-transparent input-field-border"
                                errorMsg={errors?.code?.message}
                                {...register("code")}
                                onInput={(e) => {
                                    const value = e.currentTarget.value.replace(/[^0-9]/g, "").slice(0, 6)
                                    e.currentTarget.value = value
                                }}
                            />
                        </div>

                        <div className="d-grid mb-10">
                            <Button loading={isSubmitting} title="Submit" />
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

export default Show2FAScreen

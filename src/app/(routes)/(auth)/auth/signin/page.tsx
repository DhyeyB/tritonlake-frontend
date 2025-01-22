"use client"

import AuthHeader from "@/app/_components/_auth/AuthHeader"
import Button from "@/app/_components/button/Button"
import Show2FAScreen from "@/app/_components/common/Show2FAScreen"
import TextInputField from "@/app/_components/input/TextInput"
import { FetchHelper } from "@/app/_services/FetchHelper"
import { showSweetAlertWithRedirect } from "@/app/_utils/Common"
import { CONFIG } from "@/app/_utils/Constants"
import { getStoredAuthTokenExp, handleError, storeAuthTokenExp } from "@/app/_utils/Helpers"
import { SigninSchema, SigninValidationSchema } from "@/app/_validations/auth/Signin"
import ShowFormError from "@/common/ShowFormError"
import { zodResolver } from "@hookform/resolvers/zod"
import { jwtDecode } from "jwt-decode"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { SweetAlertIcon } from "sweetalert2"

const Signin = () => {
    const router = useRouter()
    const exp = getStoredAuthTokenExp()
    const [show2FAScreen, setShow2FAScreen] = useState(false)
    const [ephemeralToken, setEphemeralToken] = useState<string>("")

    const {
        register,
        formState: { errors, isSubmitting },
        handleSubmit,
    } = useForm<SigninSchema>({ resolver: zodResolver(SigninValidationSchema) })
    const submitHandler = async (data: SigninSchema) => {
        try {
            const response = await FetchHelper.post(CONFIG.API_ENDPOINTS.LOGIN, data)
            // Below logic is added to show user the 2FA screen
            if (response?.ephemeral_token && response?.ephemeral_token?.length > 0) {
                setEphemeralToken(response?.ephemeral_token)
                setShow2FAScreen(true)
            } else {
                if (response.agent) {
                    if (response.tokens.access) {
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
                }
            }
        } catch (error) {
            handleError(error)
        }
    }
    useEffect(() => {
        if (!exp) return
        router.push("/dashboard")
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    console.log("test deployment for cicd pipeline 123")
    return (
        <>
            {show2FAScreen ? (
                <Show2FAScreen ephemeral_token={ephemeralToken} />
            ) : (
                <div className="d-flex flex-center flex-column flex-lg-row-fluid">
                    <div className="w-100 w-lg-500px p-10">
                        <form className="form w-100" onSubmit={handleSubmit(submitHandler)}>
                            <AuthHeader title={CONFIG.SIGN_IN_TITLE} />
                            <div className="fv-row mb-8">
                                <TextInputField
                                    label=""
                                    labelClass="font-weight-bold"
                                    type="text"
                                    placeholder="Email"
                                    autoComplete="false"
                                    className="form-control form-control-solid position-relative form-control bg-transparent input-field-border"
                                    {...register("email")}
                                    isRequired
                                />
                                <ShowFormError message={errors?.email?.message} />
                            </div>

                            <div className="fv-row mb-3">
                                <TextInputField
                                    label=""
                                    type="password"
                                    autoComplete="off"
                                    placeholder="Password"
                                    className="form-control form-control-solid position-relative form-control bg-transparent input-field-border"
                                    errorMsg={errors?.password?.message}
                                    {...register("password")}
                                    isRequired
                                />
                            </div>

                            <div className="d-flex flex-stack flex-wrap gap-3 fs-base fw-semibold mb-8">
                                <div></div>
                                <Link legacyBehavior href="/auth/forgot-password">
                                    <a className="link-primary">Forgot Password ?</a>
                                </Link>
                            </div>

                            <div className="d-grid mb-10">
                                <Button loading={isSubmitting} title="Sign In" />
                            </div>
                        </form>
                        <div className={`text-center mt-20`}>
                            Powered by <img alt="Logo" src="/assets/media/logos/matrix-logo-dark.svg" style={{ height: "25px" }} />
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default Signin

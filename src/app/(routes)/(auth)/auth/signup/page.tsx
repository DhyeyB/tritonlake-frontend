"use client"

import Button from "@/app/_components/button/Button"
import TextInputField from "@/app/_components/input/TextInput"
import PrivacyPolicy from "@/app/_components/modal/signup/Privacy"
import TermsAndCondition from "@/app/_components/modal/signup/Terms"
import { FetchHelper } from "@/app/_services/FetchHelper"
import { showSweetAlertWithRedirect } from "@/app/_utils/Common"
import { CONFIG } from "@/app/_utils/Constants"
import { handleError, storeAuthTokenExp } from "@/app/_utils/Helpers"
import { SigninSchema } from "@/app/_validations/auth/Signin"
import { SignupSchema, SignupValidationSchema } from "@/app/_validations/auth/SignUp"
import { zodResolver } from "@hookform/resolvers/zod"
import { jwtDecode } from "jwt-decode"
import { useRouter, useSearchParams } from "next/navigation"
import { Suspense, useState } from "react"
import { useForm } from "react-hook-form"
import { SweetAlertIcon } from "sweetalert2"

const SignUp = () => {
    const router = useRouter()
    const [showTermsModal, setShowTermsModal] = useState(false)
    const [showPrivacyModal, setShowPrivacyModal] = useState(false)
    const [isTermsAccepted, setIsTermsAccepted] = useState(false)
    const [isPrivacyAccepted, setIsPrivacyAccepted] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const searchParams = useSearchParams()
    const token = searchParams.get("c") as string
    const {
        register,
        formState: { errors, isSubmitting },
        handleSubmit,
    } = useForm<SignupSchema>({
        resolver: zodResolver(SignupValidationSchema),
    })

    // Logic to sign in user internally when he is on sign up screen
    const signInUser = async (data: SigninSchema) => {
        setIsLoading(true)
        try {
            const response = await FetchHelper.post(CONFIG.API_ENDPOINTS.LOGIN, data)
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
                        url: CONFIG.REDIRECT_PATHNAME.PROFILE_FIRST_TIME,
                    })
                    setIsLoading(false)
                }
            }
        } catch (error) {
            handleError(error)
            setIsLoading(false)
        }
    }

    const submitHandler = async (data: SignupSchema) => {
        const PAYLOAD = {
            email: data.email,
            password: data.create_password,
            verification_code: token,
        }
        try {
            const response = await FetchHelper.post(CONFIG.API_ENDPOINTS.RESET_PASSWORD, PAYLOAD)
            if (response?.status_code === CONFIG.STATUS_CODES.NO_CONTENT) {
                signInUser({
                    email: data.email,
                    password: data.create_password,
                })
            }
        } catch (error) {
            handleError(error)
        }
    }

    return (
        <Suspense>
            <div className="d-flex flex-center flex-column flex-lg-row-fluid">
                <div className="w-lg-500px p-10">
                    <form className="form w-100" onSubmit={handleSubmit(submitHandler)}>
                        <div className="text-center mb-11">
                            <h1 className="text-dark fw-bolder mb-3">Welcome to TritonLake</h1>
                            <p>We just need a few details to continue</p>
                        </div>
                        <div className="fv-row mb-2">
                            <TextInputField
                                label=""
                                labelClass="font-weight-bold"
                                type="text"
                                placeholder="Email"
                                autoComplete="false"
                                className="form-control form-control-solid position-relative form-control bg-transparent input-field-border"
                                {...register("email")}
                                isRequired
                                errorMsg={errors?.email?.message}
                            />
                        </div>
                        <div className="fv-row mb-2">
                            <TextInputField
                                label=""
                                type="password"
                                placeholder="Create a password"
                                autoComplete="off"
                                className="form-control bg-transparent input-field-border"
                                errorMsg={errors?.create_password?.message}
                                {...register("create_password")}
                            />
                        </div>
                        <div className="form-text">A password must include a number, an uppercase letter, a lowercase letter and a special character. Must be at least 8 characters long.</div>
                        <div className="fv-row mb-3 mt-5">
                            <TextInputField
                                label=""
                                type="password"
                                placeholder="Verify your password"
                                autoComplete="off"
                                className="form-control bg-transparent input-field-border"
                                errorMsg={errors?.verify_password?.message}
                                {...register("verify_password")}
                            />
                        </div>
                        <div className="fv-row mb-3">
                            <a id="terms-accept" className={`btn ${isTermsAccepted ? "btn-success" : "btn-light-primary"}  btn-sm w-100`} onClick={() => setShowTermsModal(true)}>
                                {isTermsAccepted && <i className="fa-solid fa-circle-check"></i>} Agree to the TritonLake Matrix Terms & Conditions
                            </a>
                            <a id="privacy-accept" className={`btn ${isPrivacyAccepted ? "btn-success" : "btn-light-primary"}  btn-sm w-100 mt-5`} onClick={() => setShowPrivacyModal(true)}>
                                {isPrivacyAccepted && <i className="fa-solid fa-circle-check"></i>} Agree to the TritonLake Matrix Privacy Policy
                            </a>

                            <div className="form-text">You must accept both Terms & Conditions and Privacy Policy.</div>
                        </div>
                        <div className="d-flex flex-stack flex-wrap gap-3 fs-base fw-semibold mb-8">
                            <div></div>
                        </div>
                        <div className="d-grid mb-10">
                            <Button loading={isSubmitting || isLoading} title="Sign Up" disabled={!isTermsAccepted || !isPrivacyAccepted || isSubmitting || isLoading} />
                        </div>
                        <div className="text-gray-500 text-center fw-semibold fs-6">
                            Already have an account?{" "}
                            <a href="/auth/signin" className="link-primary">
                                Sign In here
                            </a>
                        </div>
                    </form>
                    <div className="text-center mt-20">
                        Powered by <img alt="Logo" src="/assets/media/logos/matrix-logo-dark.svg" style={{ height: "25px" }} />
                    </div>
                </div>
            </div>
            {showTermsModal && (
                <TermsAndCondition
                    onClose={() => {
                        setShowTermsModal(false)
                    }}
                    onAdded={() => setIsTermsAccepted(true)}
                />
            )}
            {showPrivacyModal && (
                <PrivacyPolicy
                    onClose={() => {
                        setShowPrivacyModal(false)
                    }}
                    onAdded={() => setIsPrivacyAccepted(true)}
                />
            )}
        </Suspense>
    )
}

export default SignUp

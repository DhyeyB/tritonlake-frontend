import React, { useContext, useEffect, useState } from "react"
import { Button, Modal } from "react-bootstrap"
import TextInputField from "../input/TextInput"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import Label from "../input/Label"
import CustomPhoneInput from "../input/CustomPhoneInput"
import { CountryData } from "react-phone-input-2"
import ModalFooter from "./ModalFooter"
import { checkValidNumber, handleError, showSweetAlert } from "@/app/_utils/Helpers"
import { FetchHelper } from "@/app/_services/FetchHelper"
import { CONFIG } from "@/app/_utils/Constants"
import TabBody from "../common/TabBody"
import { SweetAlertIcon } from "sweetalert2"
import { DefaultModalPropType } from "@/app/_types/components/modal/Modal"
import { Add2faSchemaType, Add2faValidationSchema } from "@/app/_validations/auth/Add2faValidationSchema"
import { AppContext } from "@/app/_context/Context"
import { useResendTimer } from "@/app/_context/ResendTimerContext"

const Add2FA: React.FC<DefaultModalPropType> = ({ onClose }) => {
    const [country, setCountry] = useState<CountryData>()
    const [showField, setShowField] = useState("email")
    const [showOtpScreen, setShowOtpScreen] = useState(false)
    const [isloading, setIsloading] = useState(false)
    const { userDetail, getUserDetail } = useContext(AppContext)
    const { formattedCountdown, startCountdown, isActive } = useResendTimer()

    const {
        register,
        formState: { errors },
        clearErrors,
        setError,
        handleSubmit,
        reset,
        getValues,
        setValue,
        watch,
    } = useForm<Add2faSchemaType>({
        resolver: zodResolver(
            !showOtpScreen
                ? showField === "phone"
                    ? Add2faValidationSchema.omit({ email: true, otp: true })
                    : Add2faValidationSchema.omit({
                          phone: true,
                          phone_country_code: true,
                          otp: true,
                      })
                : Add2faValidationSchema.omit({
                      phone: true,
                      phone_country_code: true,
                      email: true,
                  }),
        ),
    })

    const contactSubmitHandler = async (data: Add2faSchemaType) => {
        try {
            setIsloading(true)
            let payload: Partial<Add2faSchemaType> = {
                ...data,
            }
            if (data?.phone) {
                const isValid = checkValidNumber({
                    country,
                    data: data.phone_country_code + data.phone,
                })
                if (isValid) {
                    clearErrors(`phone`)
                } else {
                    setError(`phone`, { message: "Invalid phone number" })
                    return
                }
                payload = {
                    ...payload,
                    phone: data?.phone_country_code + data?.phone.replace(/-/g, ""),
                }
                delete payload?.phone_country_code
            }
            delete payload?.otp // This is added as when user resends the otp we need to delete the key
            const response = await FetchHelper.post(CONFIG.API_ENDPOINTS.TWO_FACTOR.SEND_VERIFICATION, payload)
            if (response.details) {
                showSweetAlert(response.details, CONFIG.SWEETALERT_SUCCESS_OPTION.icon as SweetAlertIcon)
                setShowOtpScreen(true)
                setIsloading(false)
            }
        } catch (error) {
            handleError(error)
            setIsloading(false)
        }
    }

    const OtpSubmitHandler = async (data: Add2faSchemaType) => {
        try {
            setIsloading(true)
            const response = await FetchHelper.post(CONFIG.API_ENDPOINTS.TWO_FACTOR.VERIFY, { code: data.otp })
            if (response && response?.backup_codes) {
                showSweetAlert(CONFIG.MESSAGES.TWO_FACTOR_SUCCESSFULLY, CONFIG.SWEETALERT_SUCCESS_OPTION.icon as SweetAlertIcon)
                getUserDetail()
                setShowOtpScreen(false)
                onClose()
                setIsloading(false)
                startCountdown(0)
            }
        } catch (error) {
            handleError(error)
            setIsloading(false)
        }
    }

    useEffect(() => {
        if (userDetail?.user) {
            setValue("email", userDetail.user.email || "")
        }
    }, [userDetail, setValue])

    return (
        <Modal show={true} onHide={onClose} backdrop="static">
            <form
                className="modal-content"
                onSubmit={
                    showOtpScreen
                        ? handleSubmit((values) => {
                              OtpSubmitHandler(values)
                          })
                        : handleSubmit((values) => {
                              contactSubmitHandler(values)
                          })
                }
            >
                <Modal.Header closeButton>
                    <Modal.Title>Secure your account with 2 Factor Authentication</Modal.Title>
                </Modal.Header>

                <TabBody stopVh rowCount={7}>
                    {showOtpScreen ? (
                        <div className="modal-body">
                            <div id="verification-code">
                                <label htmlFor="basic-url" className="form-label">
                                    We have sent you a 6 digit verification code. Please enter it below:
                                </label>
                                <TextInputField
                                    type="text"
                                    className="form-control form-control-solid"
                                    label={``}
                                    errorMsg={errors?.otp?.message}
                                    {...register("otp")}
                                    isRequired
                                    onInput={(e) => {
                                        const value = e.currentTarget.value.replace(/[^0-9]/g, "").slice(0, 6)
                                        e.currentTarget.value = value
                                    }}
                                />
                                <p className="m-0 mt-5">
                                    Didn&apos;t get a code?{" "}
                                    <Button
                                        type="button"
                                        variant="link"
                                        className={`fw-bold ${isActive ? "not-allowed text-muted" : "cursor-pointer link-btn t-text-hover"}`}
                                        onClick={() => {
                                            if (!isActive) {
                                                startCountdown(180)
                                                contactSubmitHandler(getValues())
                                            }
                                        }}
                                    >
                                        {isActive ? `Resend in ${formattedCountdown}` : "Resend"}
                                    </Button>
                                </p>{" "}
                                {/* <span className="d-block">or</span>
                                <a href="javascript:;" id="changeVerificationMethod" onClick={() => setShowOtpScreen(false)}>
                                    Change Verification Method
                                </a> */}
                            </div>
                        </div>
                    ) : (
                        <div className="modal-body">
                            <label className="form-check-label fw-bold mb-3">Authentication Type</label>
                            <div className="mb-10 d-flex" id="2faMethodCheck">
                                {/* <div className="form-check form-check-custom form-check-solid me-10">
                                    <input
                                        className="form-check-input h-30px w-30px cursor-pointer"
                                        type="radio"
                                        value="phone"
                                        name="twofaType"
                                        id="phoneRadio"
                                        checked={showField === "phone"}
                                        onClick={() => {
                                            setShowField("phone")
                                            reset()
                                        }}
                                    />
                                    <label className="form-check-label" htmlFor="phoneRadio">
                                        Phone Number
                                    </label>
                                </div> */}
                                <div className="form-check form-check-custom form-check-solid me-10">
                                    <input
                                        className="form-check-input h-30px w-30px cursor-pointer"
                                        type="radio"
                                        value="email"
                                        name="twofaType"
                                        id="emailRadio"
                                        checked={showField === "email"}
                                        onClick={() => {
                                            setShowField("email")
                                            reset()
                                        }}
                                    />
                                    <label className="form-check-label" htmlFor="emailRadio">
                                        Email
                                    </label>
                                </div>
                            </div>
                            <div className="row mb-4">
                                {showField == "email" ? (
                                    <div className="col-12">
                                        <TextInputField
                                            className="form-control form-control-solid"
                                            label={`Your Email`}
                                            errorMsg={errors?.email?.message}
                                            placeholder={` name@email.com`}
                                            value={watch("email")}
                                            {...register("email")}
                                            isRequired
                                            disabled
                                        />
                                    </div>
                                ) : (
                                    <div className="col-12">
                                        <Label label="Your Phone Number" isRequired />
                                        <CustomPhoneInput
                                            inputClass="form-control form-control-lg form-control-solid 1-100 w-100 custom-phone-input custom-border"
                                            setCountry={(country) => setCountry(country)}
                                            value={""}
                                            setPhoneNumberValue={(number) => setValue(`phone`, number)}
                                            setCountryCodeValue={(countryCode) => setValue(`phone_country_code`, countryCode)}
                                            clearPhoneNumberErrors={() => {
                                                clearErrors(`phone`)
                                                clearErrors(`phone_country_code`)
                                            }}
                                            setPhoneNumberErrors={() =>
                                                setError(`phone`, {
                                                    message: "Invalid phone number",
                                                })
                                            }
                                            errorMessage={(errors?.phone?.message as string) || (errors?.phone_country_code?.message as string)}
                                        />
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </TabBody>

                <ModalFooter
                    isSubmitting={isloading}
                    onClose={() => {
                        onClose()
                        setShowOtpScreen(false)
                        startCountdown(0)
                    }}
                    disabled={isloading}
                    buttonTitle={showOtpScreen ? "Verify" : "Send Verification"}
                />
            </form>
        </Modal>
    )
}

export default Add2FA

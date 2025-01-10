"use client"

import TextInputField from "@/app/_components/input/TextInput"
import { FetchHelper } from "@/app/_services/FetchHelper"
import { ResetPasswordType } from "@/app/_types/components/settings/Profile"
import { CONFIG } from "@/app/_utils/Constants"
import { handleError, handleSignOut, showSweetAlert } from "@/app/_utils/Helpers"
import { ResetPasswordValidationType, ResetPasswordSchema } from "@/app/_validations/settings/EditProfile"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Spinner } from "react-bootstrap"
import { useForm } from "react-hook-form"
import { SweetAlertIcon } from "sweetalert2"

const ResetPassword: React.FC<ResetPasswordType> = ({ handleClose, userId }) => {
    const [loading, setLoading] = useState(false)
    const router = useRouter()
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ResetPasswordValidationType>({
        resolver: zodResolver(ResetPasswordSchema),
        defaultValues: {
            current_password: "",
            new_password: "",
            confirm_new_password: "",
        },
    })

    const submitHandler = async (data: ResetPasswordValidationType) => {
        try {
            setLoading(true)
            const url = new URL(`${CONFIG.API_ENDPOINTS.AGENT.LIST}/${userId}`)
            const PAYLOAD = {
                user: {
                    current_password: data.current_password,
                    password: data.new_password,
                },
                editor: userId,
            }
            const response = await FetchHelper.patch(url, PAYLOAD)
            if (response) {
                showSweetAlert("Password updated successfully", CONFIG.SWEETALERT_SUCCESS_OPTION.icon as SweetAlertIcon)
                // Delay the sign out by 3 seconds (3000 milliseconds)
                setTimeout(() => {
                    handleSignOut(router)
                }, 2000)
            }
        } catch (error) {
            handleError(error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div id="kt_signin_password_edit" className="flex-row-fluid">
            <form
                id="kt_signin_change_password"
                className="form fv-plugins-bootstrap5 fv-plugins-framework"
                onSubmit={(e) => {
                    e.stopPropagation()
                    handleSubmit(submitHandler)(e)
                }}
            >
                <div className="row mb-1">
                    <div className="col-lg-4">
                        <div className="fv-row mb-0">
                            <TextInputField
                                label="Current Password"
                                labelClass="form-label fs-6 fw-bold mb-3"
                                type="password"
                                className="form-control form-control-lg form-control-solid"
                                id="currentpassword"
                                errorMsg={errors?.current_password?.message}
                                {...register("current_password")}
                            />
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className="fv-row mb-0">
                            <TextInputField
                                label="New Password"
                                labelClass="form-label fs-6 fw-bold mb-3"
                                type="password"
                                className="form-control form-control-lg form-control-solid"
                                id="newpassword"
                                errorMsg={errors?.new_password?.message}
                                {...register("new_password")}
                            />
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className="fv-row mb-0">
                            <TextInputField
                                label="Confirm New Password"
                                labelClass="form-label fs-6 fw-bold mb-3"
                                type="password"
                                className="form-control form-control-lg form-control-solid"
                                id="confirmpassword"
                                errorMsg={errors?.confirm_new_password?.message}
                                {...register("confirm_new_password")}
                            />
                        </div>
                    </div>
                </div>
                {!errors?.new_password?.message && <div className="form-text mb-5">Password must be at least 8 character and contain symbols</div>}
                <div className="d-flex justify-content-end">
                    <button type="submit" className="btn btn-primary me-2 px-6 button-update-password custom-button-height">
                        {loading ? <Spinner /> : "Update Password"}
                    </button>
                    <button type="button" className="btn btn-color-gray-400 btn-active-light-primary px-6" onClick={handleClose}>
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    )
}

export default ResetPassword

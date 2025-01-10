"use client"
import TextInputField from "@/app/_components/input/TextInput"
import { zodResolver } from "@hookform/resolvers/zod"
import React, { useContext, useEffect, useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { EditUser, EditUserInfoSchema } from "@/app/_validations/settings/EditProfile"
import ResetPassword from "@/app/_components/profile/ResetPassword"
import { handleError, showSweetAlert } from "@/app/_utils/Helpers"
import { SweetAlertIcon } from "sweetalert2"
import { CONFIG } from "@/app/_utils/Constants"
import { FetchHelper } from "@/app/_services/FetchHelper"
import TabBody from "@/app/_components/common/TabBody"
import ShowFormError from "@/app/_components/common/ShowFormError"
import ImageEdit from "@/app/_components/common/ImageEdit"
import Add2FA from "@/app/_components/modal/Add2FA"
import StickyHeaderComponent from "@/app/_components/common/StickySubHeader"
import { AnyObject } from "@/app/_types/common/Common"
import Button from "@/app/_components/button/Button"
import { AppContext } from "@/app/_context/Context"

const Profile = () => {
    const [showResetPassword, setShowResetPassword] = useState(false)
    const [isDisabled, setIsDisabled] = useState(false)
    const [logoId, setLogoId] = useState<string | null>("")
    const [showModal, setShowModal] = useState(false)
    const [loading, setLoading] = useState(false)
    const { userDetail, setUserDetail } = useContext<AnyObject>(AppContext)
    const {
        register,
        handleSubmit,
        control,
        setValue,
        formState: { errors },
        reset,
    } = useForm<EditUser>({
        resolver: zodResolver(EditUserInfoSchema),
        defaultValues: {
            avatar: "",
            first_name: "",
            last_name: "",
            email: "",
        },
    })

    const submitHandler = async (data: Partial<EditUser>) => {
        setLoading(true)
        try {
            const url = new URL(`${CONFIG.API_ENDPOINTS.AGENT.LIST}/${userDetail?.user?.id}`)
            const PAYLOAD = {
                user: { first_name: data.first_name, last_name: data.last_name, avatar: logoId },
                editor: userDetail?.user?.id,
            }
            const response = await FetchHelper.patch(url, PAYLOAD)
            if (response) {
                setUserDetail(response)
                localStorage.setItem(CONFIG.LOCAL_STORAGE_VARIABLES.USER_DETAILS, JSON.stringify(response))
                showSweetAlert(CONFIG.MESSAGES.SUCCESS, CONFIG.SWEETALERT_SUCCESS_OPTION.icon as SweetAlertIcon)
            }
        } catch (error) {
            handleError(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (userDetail) {
            const { user: userData } = userDetail
            setLogoId(userData?.avatar?.id || "")
            reset({
                avatar: userData?.avatar || "",
                first_name: userData?.first_name || "",
                last_name: userData?.last_name || "",
                email: userData?.email || "",
            })
        }
    }, [userDetail, reset])

    return (
        <>
            <StickyHeaderComponent title="My Profile" showBackArrow={false} showButton={false} />
            <div id="kt_app_content_container" className="app-container container-fluid pb-0">
                <div className="row mt-100">
                    <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12">
                        <div className="card">
                            <div className="card-header border-0 pt-5">
                                <h3 className="card-title align-items-start flex-column">
                                    <span className="card-label fw-bold text-dark fs-2">Information</span>
                                </h3>
                            </div>
                            <TabBody>
                                <div className="form mb-15 fv-plugins-bootstrap5 fv-plugins-framework">
                                    <div className="card-body p-lg-10 pt-lg-4">
                                        <div className="d-flex flex-column flex-lg-row">
                                            <div className="flex-lg-row-fluid me-0 me-lg-20">
                                                <form onSubmit={handleSubmit(submitHandler)}>
                                                    <div className="row mb-7">
                                                        <div className="col-md-12 file-info-image-upload">
                                                            <Controller
                                                                control={control}
                                                                name="avatar"
                                                                render={({ field }) => (
                                                                    <ImageEdit
                                                                        onUploadStarted={() => setIsDisabled(true)}
                                                                        size={CONFIG.IMAGE_SIZE.USER_CARD}
                                                                        image={field.value}
                                                                        onUploaded={(image) => {
                                                                            setIsDisabled(false)
                                                                            setValue("avatar", image)
                                                                            setLogoId(image.id)
                                                                        }}
                                                                        onDeleted={() => {
                                                                            setIsDisabled(false)
                                                                            setValue("avatar", null)
                                                                            setLogoId("")
                                                                        }}
                                                                    />
                                                                )}
                                                            />

                                                            <ShowFormError message={errors?.avatar?.message?.toString()} />
                                                        </div>
                                                    </div>
                                                    <div className="row mb-5">
                                                        <div className="col-md-6 fv-row fv-plugins-icon-container">
                                                            <TextInputField
                                                                label="First Name"
                                                                labelClass="fs-5 fw-semibold mb-2"
                                                                type="text"
                                                                id="first_name"
                                                                errorMsg={errors?.first_name?.message}
                                                                {...register("first_name")}
                                                                isRequired
                                                            />
                                                        </div>
                                                        <div className="col-md-6 fv-row fv-plugins-icon-container">
                                                            <TextInputField
                                                                label="Last Name"
                                                                labelClass="fs-5 fw-semibold mb-2"
                                                                type="text"
                                                                id="last_name"
                                                                errorMsg={errors?.last_name?.message}
                                                                {...register("last_name")}
                                                                isRequired
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="row mb-5">
                                                        <div className="col-md-12 fv-row fv-plugins-icon-container">
                                                            <TextInputField
                                                                label="Email"
                                                                labelClass="fs-5 fw-semibold mb-2"
                                                                type="email"
                                                                id="email"
                                                                errorMsg={errors?.email?.message}
                                                                {...register("email")}
                                                                isRequired
                                                                disabled
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="card-footer d-flex justify-content-end px-0">
                                                        <Button
                                                            loading={loading}
                                                            title="Save Changes"
                                                            type="submit"
                                                            disabled={isDisabled}
                                                            id="saveChanges"
                                                            className="btn bg-black rounded-0 text-white w-90 mx-5 text-uppercase indicator-label fs-7"
                                                        >
                                                            {/* <span className="indicator-label fs-7">Save Changes</span> */}
                                                        </Button>
                                                    </div>
                                                </form>
                                                <div>
                                                    <div className="d-flex flex-wrap align-items-center mb-10">
                                                        {showResetPassword ? (
                                                            <ResetPassword handleClose={() => setShowResetPassword(false)} userId={userDetail?.user?.id} />
                                                        ) : (
                                                            <>
                                                                <div id="kt_signin_password">
                                                                    <div className="fs-6 fw-bold mb-1">Password</div>
                                                                    <div className="fw-semibold text-gray-600">************</div>
                                                                </div>
                                                                <div id="kt_signin_password_button" className="ms-auto">
                                                                    <button className="btn btn-light btn-active-primary rounded-0" onClick={() => setShowResetPassword(true)}>
                                                                        Change Password
                                                                    </button>
                                                                </div>
                                                            </>
                                                        )}
                                                    </div>
                                                    <div
                                                        className={`notice d-flex  rounded ${
                                                            userDetail?.user?.mfa_enabled ? "bg-light-success border-success" : "bg-light-danger border-danger"
                                                        }  border border-dashed p-6`}
                                                    >
                                                        {userDetail?.user?.mfa_enabled ? (
                                                            <span className="svg-icon svg-icon-2tx svg-icon-success me-4">
                                                                <svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                    <path
                                                                        opacity="0.3"
                                                                        d="M20.5543 4.37824L12.1798 2.02473C12.0626 1.99176 11.9376 1.99176 11.8203 2.02473L3.44572 4.37824C3.18118 4.45258 3 4.6807 3 4.93945V13.569C3 14.6914 3.48509 15.8404 4.4417 16.984C5.17231 17.8575 6.18314 18.7345 7.446 19.5909C9.56752 21.0295 11.6566 21.912 11.7445 21.9488C11.8258 21.9829 11.9129 22 12.0001 22C12.0872 22 12.1744 21.983 12.2557 21.9488C12.3435 21.912 14.4326 21.0295 16.5541 19.5909C17.8169 18.7345 18.8277 17.8575 19.5584 16.984C20.515 15.8404 21 14.6914 21 13.569V4.93945C21 4.6807 20.8189 4.45258 20.5543 4.37824Z"
                                                                        fill="currentColor"
                                                                    />
                                                                    <path
                                                                        d="M10.5606 11.3042L9.57283 10.3018C9.28174 10.0065 8.80522 10.0065 8.51412 10.3018C8.22897 10.5912 8.22897 11.0559 8.51412 11.3452L10.4182 13.2773C10.8099 13.6747 11.451 13.6747 11.8427 13.2773L15.4859 9.58051C15.771 9.29117 15.771 8.82648 15.4859 8.53714C15.1948 8.24176 14.7183 8.24176 14.4272 8.53714L11.7002 11.3042C11.3869 11.6221 10.874 11.6221 10.5606 11.3042Z"
                                                                        fill="currentColor"
                                                                    />
                                                                </svg>
                                                            </span>
                                                        ) : (
                                                            <span className="svg-icon svg-icon-2tx svg-icon-danger me-4">
                                                                <svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                    <path
                                                                        opacity="0.3"
                                                                        d="M20.5543 4.37824L12.1798 2.02473C12.0626 1.99176 11.9376 1.99176 11.8203 2.02473L3.44572 4.37824C3.18118 4.45258 3 4.6807 3 4.93945V13.569C3 14.6914 3.48509 15.8404 4.4417 16.984C5.17231 17.8575 6.18314 18.7345 7.446 19.5909C9.56752 21.0295 11.6566 21.912 11.7445 21.9488C11.8258 21.9829 11.9129 22 12.0001 22C12.0872 22 12.1744 21.983 12.2557 21.9488C12.3435 21.912 14.4326 21.0295 16.5541 19.5909C17.8169 18.7345 18.8277 17.8575 19.5584 16.984C20.515 15.8404 21 14.6914 21 13.569V4.93945C21 4.6807 20.8189 4.45258 20.5543 4.37824Z"
                                                                        fill="currentColor"
                                                                    ></path>
                                                                    <path
                                                                        d="M14.854 11.321C14.7568 11.2282 14.6388 11.1818 14.4998 11.1818H14.3333V10.2272C14.3333 9.61741 14.1041 9.09378 13.6458 8.65628C13.1875 8.21876 12.639 8 12 8C11.361 8 10.8124 8.21876 10.3541 8.65626C9.89574 9.09378 9.66663 9.61739 9.66663 10.2272V11.1818H9.49999C9.36115 11.1818 9.24306 11.2282 9.14583 11.321C9.0486 11.4138 9 11.5265 9 11.6591V14.5227C9 14.6553 9.04862 14.768 9.14583 14.8609C9.24306 14.9536 9.36115 15 9.49999 15H14.5C14.6389 15 14.7569 14.9536 14.8542 14.8609C14.9513 14.768 15 14.6553 15 14.5227V11.6591C15.0001 11.5265 14.9513 11.4138 14.854 11.321ZM13.3333 11.1818H10.6666V10.2272C10.6666 9.87594 10.7969 9.57597 11.0573 9.32743C11.3177 9.07886 11.6319 8.9546 12 8.9546C12.3681 8.9546 12.6823 9.07884 12.9427 9.32743C13.2031 9.57595 13.3333 9.87594 13.3333 10.2272V11.1818Z"
                                                                        fill="currentColor"
                                                                    ></path>
                                                                </svg>
                                                            </span>
                                                        )}
                                                        <div className="d-flex flex-stack flex-grow-1 flex-wrap flex-md-nowrap">
                                                            <div className="mb-3 mb-md-0 fw-semibold">
                                                                <h4 className="text-gray-900 fw-bold">2 Factor Authentication {userDetail?.user?.mfa_enabled ? "Enabled" : "Disabled"}</h4>
                                                            </div>

                                                            <a
                                                                onClick={() => setShowModal(true)}
                                                                role="button"
                                                                className={`btn ${
                                                                    userDetail?.user?.mfa_enabled ? "btn-success" : "btn-danger"
                                                                } rounded-0 px-6 align-self-center text-nowrap fs-7 text-uppercase`}
                                                            >
                                                                {userDetail?.user?.mfa_enabled ? "Update" : "Enable"}
                                                            </a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </TabBody>
                        </div>
                    </div>
                </div>
            </div>
            {showModal && (
                <Add2FA
                    onClose={() => {
                        setShowModal(false)
                    }}
                />
            )}
        </>
    )
}

export default Profile

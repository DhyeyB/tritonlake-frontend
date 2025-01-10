"use client"
import Button from "@/app/_components/button/Button"
import AutoCompleteAddress from "@/app/_components/common/AutoCompleteAddress"
import ImageEdit from "@/app/_components/common/ImageEdit"
import ShowFormError from "@/app/_components/common/ShowFormError"
import StickyHeaderComponent from "@/app/_components/common/StickySubHeader"
import SwatchColorPicker from "@/app/_components/common/SwatchColorPicker"
import Label from "@/app/_components/input/Label"
import NetworkSelect from "@/app/_components/input/NetworkSelect"
import TextInputField from "@/app/_components/input/TextInput"
import { FetchHelper } from "@/app/_services/FetchHelper"
import { AutoCompleteAddressData } from "@/app/_types/common/AutoCompleteAddress"
import { AnyObject } from "@/app/_types/common/Common"
import { showSweetAlertWithRedirect } from "@/app/_utils/Common"
import { CONFIG } from "@/app/_utils/Constants"
import { handleError, isPlatformAdmin } from "@/app/_utils/Helpers"
import { InviteAgentType, InviteAgentValidationSchema } from "@/app/_validations/invite/InviteAgent"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter, useSearchParams } from "next/navigation"
import React, { useEffect, useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { SweetAlertIcon } from "sweetalert2"

const InviteAgent = () => {
    const router = useRouter()
    const searchParams = useSearchParams()
    const toggleKey = searchParams.get("key") as string

    // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
    const [logoId, setLogoId] = useState<string | null>("")
    const [showNetworkFields, setShowNetworkFields] = useState<boolean>(toggleKey?.length > 0 ? true : false)
    const userDetails = JSON.parse(localStorage.getItem(CONFIG.LOCAL_STORAGE_VARIABLES.USER_DETAILS) || "")
    const {
        register,
        handleSubmit,
        control,
        setValue,
        formState: { errors, isSubmitting },
        watch,
        reset,
        trigger,
        getValues,
    } = useForm<InviteAgentType>({
        resolver: zodResolver(
            showNetworkFields
                ? InviteAgentValidationSchema.omit({ network_id: true })
                : InviteAgentValidationSchema.omit({
                      network_logo: true,
                      network_name: true,
                      //   contact_name: true,
                      primary_brand_color: true,
                      secondary_brand_color: true,
                      address: true,
                  }),
        ),
        defaultValues: {
            primary_brand_color: "#016937",
            secondary_brand_color: "#000000",
        },
    })

    const submitHandler = async (data: Partial<InviteAgentType>) => {
        const PAYLOAD = {
            name: data.name,
            created_by: userDetails?.user?.id,
            agents: [
                {
                    user: {
                        first_name: data.first_name,
                        last_name: data.last_name,
                        email: data.email,
                    },
                },
            ],
            // Conditionally include either `network_id` or `network` object
            ...(data.network_id
                ? { network_id: data.network_id }
                : {
                      network: {
                          name: data.network_name,
                          address: data.address,
                          //   contact_name: data.contact_name,
                          //   address: {
                          //       line_1: data.address.line_1,
                          //       raw: data.address.formatted_address,
                          //       city: data.address.city,
                          //       postal_code: data.address.postal_code,
                          //       country_code: data.address.country_code,
                          //   },
                          branding: {
                              primary_color: data.primary_brand_color,
                              secondary_color: data.secondary_brand_color,
                              logo: logoId,
                          },
                      },
                  }),
        }

        try {
            const url = new URL(`${CONFIG.API_ENDPOINTS.FIRM}`)
            const response = await FetchHelper.post(url, PAYLOAD)
            if (response?.id) {
                showSweetAlertWithRedirect({
                    message: CONFIG.MESSAGES.INVITATION_SUCCESS,
                    icon: CONFIG.SWEETALERT_SUCCESS_OPTION.icon as SweetAlertIcon,
                    router,
                    url: response.type == "network" ? CONFIG.REDIRECT_PATHNAME.MANAGE_NETWORKS : CONFIG.REDIRECT_PATHNAME.MANAGE_AGENTS,
                })
            }
        } catch (error) {
            handleError(error)
        }
    }
    useEffect(() => {
        if (userDetails && !isPlatformAdmin()) {
            const { firm: firmObject } = userDetails
            reset({
                network_id: {
                    label: firmObject?.initial_network.name,
                    value: firmObject?.initial_network.id,
                    data: {
                        label: firmObject?.initial_network.name,
                        value: firmObject?.initial_network.id,
                    },
                },
            })
        }
    }, [])

    return (
        <form onSubmit={handleSubmit(submitHandler)}>
            <StickyHeaderComponent
                title={showNetworkFields ? "Invite Network Admin" : "Invite Agent"}
                showBackArrow={true}
                showButton={true}
                backLink={showNetworkFields ? CONFIG.REDIRECT_PATHNAME.MANAGE_NETWORKS : CONFIG.REDIRECT_PATHNAME.MANAGE_AGENTS}
            >
                <Button loading={isSubmitting} title="Send Invite" type="submit" className="btn bg-black rounded-0 text-white w-90 text-uppercase fs-7" />
            </StickyHeaderComponent>
            <div id="kt_app_content_container p-0" className="app-container container-fluid">
                <div className="row mt-100">
                    <div className="col-xl-8">
                        <div className="card">
                            <div className="card-header border-0 pt-5">
                                <h3 className="card-title align-items-start flex-column">
                                    <span className="card-label fw-bold text-dark">Add the agents details here and we will send them an invite to join your Matrix.</span>
                                </h3>
                            </div>
                            <div className="form fv-plugins-bootstrap5 fv-plugins-framework">
                                <div className="card-body p-lg-10 pt-lg-4">
                                    <div className="d-flex flex-column flex-lg-row mb-17">
                                        <div className="flex-lg-row-fluid me-0 me-lg-20">
                                            <div className="row">
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
                                                <div className="col-md-6 fv-row fv-plugins-icon-container mt-5">
                                                    <TextInputField
                                                        label="Email"
                                                        labelClass="fs-5 fw-semibold mb-2"
                                                        type="email"
                                                        id="email"
                                                        errorMsg={errors?.email?.message}
                                                        {...register("email")}
                                                        isRequired
                                                    />
                                                </div>
                                                <div className="col-md-6 fv-row fv-plugins-icon-container mt-5">
                                                    <TextInputField
                                                        label="Firm Name"
                                                        labelClass="fs-5 fw-semibold mb-2"
                                                        type="text"
                                                        id="firm_name"
                                                        errorMsg={errors?.name?.message}
                                                        {...register("name")}
                                                        isRequired
                                                    />
                                                </div>
                                            </div>
                                            {isPlatformAdmin() && (
                                                <div className="form-group my-5">
                                                    <label className="form-check form-switch form-check-custom form-check-solid">
                                                        <input
                                                            className="form-check-input cursor-pointer"
                                                            checked={showNetworkFields}
                                                            type="checkbox"
                                                            id="toggleSwitch"
                                                            onClick={() => setShowNetworkFields(!showNetworkFields)}
                                                        />
                                                        <span className=" fs-5 fw-semibold mx-3">Set as new network</span>
                                                    </label>
                                                </div>
                                            )}

                                            {showNetworkFields ? (
                                                <div id="toggleContent">
                                                    <div className="row mb-5 mt-5">
                                                        <Label label={"Network Logo"} labelClass={"fs-5 fw-semibold mb-2"} isRequired={true} />
                                                        <div className="col-md-12 file-info-image-upload">
                                                            <Controller
                                                                control={control}
                                                                name="network_logo"
                                                                render={({ field }) => (
                                                                    <ImageEdit
                                                                        size={CONFIG.IMAGE_SIZE.USER_CARD}
                                                                        image={field.value}
                                                                        onUploaded={(image) => {
                                                                            setValue("network_logo", image)
                                                                            setLogoId(image.id)
                                                                        }}
                                                                        onDeleted={() => {
                                                                            setValue("network_logo", null)
                                                                            setLogoId("")
                                                                        }}
                                                                    />
                                                                )}
                                                            />

                                                            <ShowFormError message={errors?.network_logo?.message?.toString()} />
                                                        </div>
                                                    </div>

                                                    <div className="row">
                                                        <div className="col-md-12 fv-row fv-plugins-icon-container">
                                                            <TextInputField
                                                                label="Network Name"
                                                                labelClass="fs-5 fw-semibold mb-2"
                                                                type="text"
                                                                id="network_name"
                                                                errorMsg={errors?.network_name?.message}
                                                                {...register("network_name")}
                                                                isRequired
                                                            />
                                                        </div>
                                                        {/* <div className="col-md-6 fv-row fv-plugins-icon-container">
                                                            <TextInputField
                                                                label="Contact Name"
                                                                labelClass="fs-5 fw-semibold mb-2"
                                                                type="text"
                                                                id="contact_name"
                                                                errorMsg={errors?.contact_name?.message}
                                                                {...register("contact_name")}
                                                                isRequired
                                                            />
                                                        </div> */}
                                                        <div className="col-md-12 fv-row fv-plugins-icon-container mt-5">
                                                            <label className="form-label required">Address</label>
                                                            {/* <AutoCompleteAddress
                                                                id="address"
                                                                onChange={(data: AutocompleteReturnData | string) => {
                                                                    if (typeof data === "string") {
                                                                        if (data?.trim().length === 0) {
                                                                            setError("address", {
                                                                                message: "Address is required",
                                                                            })
                                                                        } else {
                                                                            setError("address", {
                                                                                message: "Address must be selected from dropdown",
                                                                            })
                                                                        }
                                                                        setValue("address", data)
                                                                    } else {
                                                                        if (data.formatted_address) {
                                                                            clearErrors("address")
                                                                            setValue("address", data)
                                                                        }
                                                                    }
                                                                }}
                                                            /> */}
                                                            <AutoCompleteAddress
                                                                id="address"
                                                                onChange={(addressObject: AutoCompleteAddressData | string | null | AnyObject) => {
                                                                    setValue("address", addressObject)
                                                                    trigger("address")
                                                                }}
                                                                errorMessage={errors?.address?.message?.toString() as string}
                                                                defaultValue={getValues("address")?.raw}
                                                                addressValue={null}
                                                            />
                                                        </div>
                                                    </div>

                                                    <div className="row mb-5 mt-5">
                                                        <div className="col-md-12 fv-row fv-plugins-icon-container">
                                                            <label className="fs-5 fw-semibold mb-2">Branding Details</label>
                                                            <br />

                                                            <label className=" fs-7 fw-semibold mb-2">Primary Brand Colour</label>
                                                            <div className="color-picker-container mb-5">
                                                                <Controller
                                                                    name="primary_brand_color"
                                                                    control={control}
                                                                    render={({ field }) => (
                                                                        <SwatchColorPicker
                                                                            color={watch("primary_brand_color")}
                                                                            onColorChange={(value) => {
                                                                                if (typeof value !== "string") {
                                                                                    field.onChange(value.hex)
                                                                                }
                                                                            }}
                                                                        />
                                                                    )}
                                                                />
                                                                <ShowFormError message={errors?.primary_brand_color?.message} />
                                                            </div>
                                                            <label className=" fs-7 fw-semibold mb-2">Secondary Brand Colour</label>

                                                            <div className="color-picker-container">
                                                                <Controller
                                                                    name="secondary_brand_color"
                                                                    control={control}
                                                                    render={({ field }) => (
                                                                        <SwatchColorPicker
                                                                            color={watch("secondary_brand_color")}
                                                                            onColorChange={(value) => {
                                                                                if (typeof value !== "string") {
                                                                                    field.onChange(value.hex)
                                                                                }
                                                                            }}
                                                                        />
                                                                    )}
                                                                />
                                                                <ShowFormError message={errors?.secondary_brand_color?.message} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="col-md-6 fv-row fv-plugins-icon-container mt-5">
                                                    <Label label="Network" isRequired />
                                                    <Controller
                                                        control={control}
                                                        name="network_id"
                                                        render={({ field }) => (
                                                            <NetworkSelect
                                                                label=""
                                                                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                                                onSelected={(networkItem: any) => {
                                                                    if (networkItem?.id) {
                                                                        field.onChange({ label: networkItem.name, value: networkItem.id, data: networkItem })
                                                                    } else {
                                                                        field.onChange(null)
                                                                    }
                                                                }}
                                                                placeholder="Select network"
                                                                selectedOptionValue={field.value}
                                                                isDisabled={!isPlatformAdmin()}
                                                            />
                                                        )}
                                                    />
                                                    <ShowFormError message={errors.network_id?.message?.toString()} />
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    )
}

export default InviteAgent

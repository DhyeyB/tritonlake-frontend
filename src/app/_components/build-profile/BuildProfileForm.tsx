"use client"
import React, { useEffect, useState } from "react"
import StickyHeaderComponent from "../common/StickySubHeader"
import Button from "../button/Button"
import { CONFIG, OPPORTUNITY } from "@/app/_utils/Constants"
import HttpInputField from "../input/HttpInputField"
import CustomInputDropzone from "../input/CustomInputDropZone"
import { uploadImage } from "@/app/_utils/Backend"
import { zodResolver } from "@hookform/resolvers/zod"
import { BuildDraftProfileSchema, BuildProfileSchema, BuildProfileSchemaType } from "@/app/_validations/build-profile/BuildProfileSchema"
import { Controller, useForm } from "react-hook-form"
import TextInputField from "../input/TextInput"
import Label from "../input/Label"
import OriginatorSelect from "../input/OriginatorSelect"
import { Any, AnyObject } from "@/app/_types/common/Common"
import ShowFormError from "../common/ShowFormError"
import AutoCompleteAddress from "../common/AutoCompleteAddress"
import { AutoCompleteAddressData } from "@/app/_types/common/AutoCompleteAddress"
import TextAreaField from "../input/TextArea"
import SocialLinkField from "../input/SocialLinkField"
import { Facebook } from "../svg/social/Facebook"
import { LinkedIn } from "../svg/social/LinkedIn"
import { Twitter } from "../svg/social/Twitter"
import { Instagram } from "../svg/social/Instagram"
import RangeInputField from "../input/RangeInputField"
import InputRadioField from "../input/Radio"
import { SweetAlertIcon } from "sweetalert2"
import { useParams, useRouter } from "next/navigation"
import { showSweetAlertWithRedirect } from "@/app/_utils/Common"
import { handleError, removeEmptyKeys, showConfirmationDialog } from "@/app/_utils/Helpers"
import { FetchHelper } from "@/app/_services/FetchHelper"

const BuildProfileForm = () => {
    const [file, setFile] = useState<File | null>(null)
    const [regulatedEntity, setRegulatedEntity] = useState<boolean>(true)

    const {
        setValue,
        register,
        formState: { errors, isSubmitting },
        control,
        getValues,
        trigger,
        watch,
        handleSubmit,
        clearErrors,
        setError,
        reset,
    } = useForm<BuildProfileSchemaType>({
        resolver: zodResolver(regulatedEntity ? BuildProfileSchema : BuildProfileSchema.omit({ registration_information: true, registration_number: true })),
        defaultValues: {
            regulated_entity: true,
        },
    })
    const router = useRouter()
    const params = useParams()
    const [loadingDraft, setLoadingDraft] = useState(false)
    const [profileData, setProfileData] = useState<Any>()
    const userDetails = JSON.parse(localStorage.getItem(CONFIG.LOCAL_STORAGE_VARIABLES.USER_DETAILS) || "")

    const submitHandler = async (data: Any) => {
        const PAYLOAD = {
            ...data,
            id: userDetails?.firm?.id, // Firm id
            status: OPPORTUNITY.STATUS_ACTIVE,
        }
        const RequestHelper = FetchHelper.patch
        const url = new URL(`${CONFIG.API_ENDPOINTS.PROFILE_BUILDER.LIST}/${userDetails?.firm?.id}`)
        try {
            const response = await RequestHelper(url, PAYLOAD)
            if (response?.status) {
                showSweetAlertWithRedirect({
                    message: CONFIG.MESSAGES.PROFILE_BUILDER.PUBLISHED,
                    icon: CONFIG.SWEETALERT_SUCCESS_OPTION.icon as SweetAlertIcon,
                    router,
                    url: CONFIG.REDIRECT_PATHNAME.OPPORTUNITIES,
                })
            }
        } catch (error) {
            handleError(error)
        }
    }

    // Save as draft handler
    const onSaveAsDraft = async () => {
        clearErrors()
        setLoadingDraft(true)
        const PAYLOAD = {
            ...getValues(),
        }
        const validatedData = await BuildDraftProfileSchema.safeParseAsync(PAYLOAD)

        if (!validatedData.success) {
            validatedData.error.issues.forEach((issue: Any) =>
                setError(issue?.path?.join("."), {
                    type: "manual",
                    message: issue.message,
                }),
            )
            setLoadingDraft(false)
            return
        }

        let cleanedPayload = removeEmptyKeys(validatedData.data)
        cleanedPayload = { ...cleanedPayload, id: params?.id } as Any
        const RequestHelper = FetchHelper.patch
        const url = new URL(`${CONFIG.API_ENDPOINTS.PROFILE_BUILDER.LIST}/${userDetails?.firm?.id}`)

        try {
            const response = await RequestHelper(url, {
                ...cleanedPayload,
                created_by: userDetails?.user?.id,
                status: OPPORTUNITY.STATUS_PENDING,
            })

            if (response?.status) {
                showSweetAlertWithRedirect({
                    message: CONFIG.MESSAGES.PROFILE_BUILDER.SAVED_AS_DRAFT_SUCCESSFULLY,
                    icon: CONFIG.SWEETALERT_SUCCESS_OPTION.icon as SweetAlertIcon,
                    router,
                    url: CONFIG.REDIRECT_PATHNAME.OPPORTUNITIES,
                })
            }
        } catch (error) {
            handleError(error)
        } finally {
            setLoadingDraft(false)
        }
    }

    const getDefaultValues = async () => {
        try {
            const url = new URL(`${CONFIG.API_ENDPOINTS.PROFILE_BUILDER.LIST}/${userDetails?.firm?.id}`)
            const response = await FetchHelper.get(url)
            setProfileData(response)
            setFile(response?.logo)
            setRegulatedEntity(response?.regulated_entity)

            const defaultValues = {
                ...response,
                network_size: response?.network_size?.toString(),
                network_lp_types:
                    response?.network_lp_types &&
                    response?.network_lp_types?.map((item: Any) => {
                        return { label: item.name, value: item.id, data: item }
                    }),
                network_regions:
                    response?.network_regions &&
                    response?.network_regions?.map((item: Any) => {
                        return { label: item.name, value: item.id, data: item }
                    }),

                investment_preferences: response?.investment_preferences && {
                    ...response?.investment_preferences,
                    region: response?.investment_preferences?.region && {
                        label: response?.investment_preferences?.region?.name,
                        value: response?.investment_preferences?.region.id,
                        data: response?.investment_preferences?.region,
                    },
                    investment_type: response?.investment_preferences?.investment_type && {
                        label: response?.investment_preferences?.investment_type?.name,
                        value: response?.investment_preferences?.investment_type.id,
                        data: response?.investment_preferences?.investment_type,
                    },
                    countries:
                        response?.investment_preferences?.countries &&
                        response?.investment_preferences?.countries.map((item: Any) => {
                            return { label: item.name, value: item.id, data: item }
                        }),
                    asset_classes:
                        response?.investment_preferences?.asset_classes &&
                        response?.investment_preferences?.asset_classes.map((item: Any) => {
                            return { label: item.name, value: item.id, data: item }
                        }),
                    industries:
                        response?.investment_preferences?.industries &&
                        response?.investment_preferences?.industries.map((item: Any) => {
                            return { label: item.name, value: item.id, data: item }
                        }),
                    strategies:
                        response?.investment_preferences?.strategies &&
                        response?.investment_preferences?.strategies.map((item: Any) => {
                            return { label: item.name, value: item.id, data: item }
                        }),

                    deal_size_max: response?.investment_preferences?.deal_size_max?.toString(),
                    deal_size_min: response?.investment_preferences?.deal_size_min?.toString(),
                    fund_number_max: response?.investment_preferences?.fund_number_max?.toString(),
                    fund_number_min: response?.investment_preferences?.fund_number_min?.toString(),
                    fund_size_max: response?.investment_preferences?.fund_size_max?.toString(),
                    fund_size_min: response?.investment_preferences?.fund_size_min?.toString(),
                },
                socials: response?.socials && {
                    ...response?.socials,
                    website_url: response?.socials?.website_url?.replace("https://", ""),
                    facebook_url: response?.socials?.facebook_url,
                    instagram_url: response?.socials?.instagram_url,
                    linkedin_url: response?.socials?.linkedin_url,
                    twitter_url: response?.socials?.twitter_url,
                },
            }

            reset({ ...defaultValues })
        } catch (error) {
            handleError(error)
        }
    }
    useEffect(() => {
        getDefaultValues()
    }, [])

    return (
        <>
            <form onSubmit={handleSubmit(submitHandler)}>
                <StickyHeaderComponent
                    title={CONFIG.BUILD_YOUR_PROFILE.TITLE}
                    showBackArrow={true}
                    showButton={true}
                    backLink={profileData?.status !== OPPORTUNITY.STATUS_PENDING ? CONFIG.REDIRECT_PATHNAME.MY_DIRECTORY_PROFILE : ""}
                    onButtonClick={() => {
                        if (profileData?.status === OPPORTUNITY.STATUS_PENDING) {
                            showConfirmationDialog({
                                onConfirm: onSaveAsDraft,
                                path: CONFIG.REDIRECT_PATHNAME.OPPORTUNITIES,
                                router,
                            })
                        }
                    }}
                >
                    {profileData?.status === OPPORTUNITY.STATUS_PENDING && (
                        <Button
                            type="button"
                            loading={loadingDraft}
                            title={CONFIG.SAVE_AS_DRAFT}
                            className="btn btn-secondary rounded-0 w-90 my-5 mx-2 fs-7 text-uppercase"
                            onClick={() => onSaveAsDraft()}
                        />
                    )}
                    <Button loading={isSubmitting} title={CONFIG.BUILD_YOUR_PROFILE.PUBLISH_PROFILE} className="btn bg-black rounded-0 text-white w-90 text-uppercase fs-7 mx-2" />
                </StickyHeaderComponent>
                <div id="kt_app_content_container" className="app-container container-fluid">
                    <form className="form mb-5" action="#" method="post">
                        <div className="row mt-100">
                            <div className="card mb-2 col-lg-8 col-md-12 col-sm-12">
                                <div className="card-header border-0">
                                    <div className="card-title m-0">
                                        <h3 className="fw-bold m-0">Agent Details</h3>
                                    </div>
                                </div>
                                <div className="card-body border-top p-9">
                                    <div className="row mb-4">
                                        <div className="col-md-12 mb-5">
                                            <div className="fv-row">
                                                <CustomInputDropzone
                                                    label={"Firm Logo"}
                                                    isRequired={false}
                                                    maxSize={5}
                                                    setFile={setFile}
                                                    file={file}
                                                    labelClassName={"required"}
                                                    errorMsg={errors.logo?.message}
                                                    onDrop={async (file: File) => {
                                                        if (file) {
                                                            const fileId = await uploadImage(file)
                                                            setValue("logo", fileId)
                                                        } else {
                                                            setValue("logo", null)
                                                        }
                                                    }}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-12">
                                            <TextInputField
                                                label="Firm Name"
                                                {...register("name")}
                                                labelClass="required fs-5 fw-semibold mb-2"
                                                type="text"
                                                placeholder=""
                                                className="form-control form-control-solidr"
                                                errorMsg={errors.name?.message}
                                            />
                                        </div>
                                    </div>
                                    <div className="row mb-4">
                                        <div className="col-md-6">
                                            <TextInputField
                                                label="Network Lead"
                                                {...register("network_lead")}
                                                labelClass="required fs-5 fw-semibold mb-2"
                                                type="text"
                                                placeholder=""
                                                className="form-control form-control-solidr"
                                                errorMsg={errors.network_lead?.message}
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <TextInputField
                                                label="Network Size (LPs)"
                                                {...register("network_size")}
                                                labelClass="required fs-5 fw-semibold mb-2"
                                                type="text"
                                                placeholder=""
                                                className="form-control form-control-solidr"
                                                errorMsg={errors.network_size?.message}
                                            />
                                        </div>
                                    </div>
                                    <div className="row mb-4">
                                        <div className="col-md-6">
                                            <Label label={"Network LP Types"} labelClass={"required fs-5 fw-semibold mb-2"} />
                                            <Controller
                                                control={control}
                                                name={"network_lp_types"}
                                                render={({ field }) => (
                                                    <OriginatorSelect
                                                        label=""
                                                        onSelected={(item: Any) => {
                                                            if (item && item.length > 0) {
                                                                const strategiesData = item.map((option: Any) => ({
                                                                    label: option.name,
                                                                    value: option.id,
                                                                    data: option,
                                                                }))
                                                                field.onChange(strategiesData)
                                                            } else {
                                                                field.onChange(null)
                                                            }
                                                        }}
                                                        params={{ type: "network_lp_type" }}
                                                        selectedOptionValue={field.value}
                                                        placeholder={"Select..."}
                                                        isMulti={true}
                                                    />
                                                )}
                                            />
                                            <ShowFormError message={errors.network_lp_types?.message} />
                                        </div>
                                        <div className="col-md-6">
                                            <Label label={"Network Coverage"} labelClass={"required fs-5 fw-semibold mb-2"} />
                                            <Controller
                                                control={control}
                                                name={"network_regions"}
                                                render={({ field }) => (
                                                    <OriginatorSelect
                                                        label=""
                                                        onSelected={(item: Any) => {
                                                            if (item && item.length > 0) {
                                                                const strategiesData = item.map((option: Any) => ({
                                                                    label: option.name,
                                                                    value: option.id,
                                                                    data: option,
                                                                }))
                                                                field.onChange(strategiesData)
                                                            } else {
                                                                field.onChange(null)
                                                            }
                                                        }}
                                                        params={{ type: "region" }}
                                                        selectedOptionValue={field.value}
                                                        placeholder={"Select..."}
                                                        isMulti={true}
                                                    />
                                                )}
                                            />
                                            <ShowFormError message={errors.network_regions?.message} />
                                        </div>
                                    </div>
                                    <div className="row mb-4">
                                        <div className="col-md-12">
                                            <Label labelClass="required fs-5 fw-semibold mb-2" label="HQ Address" />
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
                                    <div className="row mb-4">
                                        <div className="col-md-12">
                                            <TextAreaField
                                                labelClassName="required fs-5 fw-semibold mb-2"
                                                label="Agent Overview"
                                                {...register("overview")}
                                                placeholder=""
                                                className="form-control form-control-solidr"
                                                errorMsg={errors.overview?.message}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="card mb-2 col-lg-8 col-md-12 col-sm-12">
                                <div className="card-header border-0">
                                    <div className="card-title m-0">
                                        <h3 className="fw-bold m-0">Key Contacts</h3>
                                    </div>
                                </div>
                                <div className="card-body border-top p-9">
                                    <h4>Primary Contact</h4>
                                    <div className="row mb-4">
                                        <div className="col-md-6 mb-5">
                                            <TextInputField
                                                label="Name"
                                                {...register("primary_contact.name")}
                                                labelClass="required fs-5 fw-semibold mb-2"
                                                type="text"
                                                placeholder=""
                                                className="form-control form-control-solidr"
                                                errorMsg={errors.primary_contact?.name?.message}
                                            />
                                        </div>
                                        <div className="col-md-6 mb-5">
                                            <TextInputField
                                                label="Title"
                                                {...register("primary_contact.job_title")}
                                                labelClass="required fs-5 fw-semibold mb-2"
                                                type="text"
                                                placeholder=""
                                                className="form-control form-control-solidr"
                                                errorMsg={errors.primary_contact?.job_title?.message}
                                            />
                                        </div>
                                    </div>
                                    <div className="row mb-4">
                                        <div className="col-md-6 mb-5">
                                            <TextInputField
                                                label="Email"
                                                {...register("primary_contact.email")}
                                                labelClass="required fs-5 fw-semibold mb-2"
                                                type="email"
                                                placeholder=""
                                                className="form-control form-control-solidr"
                                                errorMsg={errors.primary_contact?.email?.message}
                                            />
                                        </div>
                                    </div>
                                    <h4>Secondary Contact</h4>
                                    <div className="row mb-4">
                                        <div className="col-md-6 mb-5">
                                            <TextInputField
                                                label="Name"
                                                {...register("secondary_contact.name")}
                                                labelClass="required fs-5 fw-semibold mb-2"
                                                type="text"
                                                placeholder=""
                                                className="form-control form-control-solidr"
                                                errorMsg={errors.secondary_contact?.name?.message}
                                            />
                                        </div>
                                        <div className="col-md-6 mb-5">
                                            <TextInputField
                                                label="Title"
                                                {...register("secondary_contact.job_title")}
                                                labelClass="required fs-5 fw-semibold mb-2"
                                                type="text"
                                                placeholder=""
                                                className="form-control form-control-solidr"
                                                errorMsg={errors.secondary_contact?.job_title?.message}
                                            />
                                        </div>
                                    </div>
                                    <div className="row mb-4">
                                        <div className="col-md-6 mb-5">
                                            <TextInputField
                                                label="Email"
                                                {...register("secondary_contact.email")}
                                                labelClass="required fs-5 fw-semibold mb-2"
                                                type="email"
                                                placeholder=""
                                                className="form-control form-control-solidr"
                                                errorMsg={errors.secondary_contact?.email?.message}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="card mb-2 col-lg-8 col-md-12 col-sm-12">
                                <div className="card-header border-0">
                                    <div className="card-title m-0">
                                        <h3 className="fw-bold m-0">Social Links</h3>
                                    </div>
                                </div>
                                <div className="card-body border-top p-9">
                                    <div className="row mb-4">
                                        <div className="col-md-12">
                                            <HttpInputField label="Website" {...register("socials.website_url")} labelClass="fs-5 fw-semibold mb-2" errorMsg={errors.socials?.website_url?.message} />
                                        </div>
                                        <div className="col-md-12 mb-5">
                                            <SocialLinkField
                                                label="Facebook"
                                                icon={<Facebook />}
                                                errorMsg={errors.socials?.facebook_url?.message}
                                                className="custom-class"
                                                labelClass="custom-label-class"
                                                // isRequired={true}
                                                {...register("socials.facebook_url")}
                                            />
                                        </div>
                                        <div className="col-md-12 mb-5">
                                            <SocialLinkField
                                                label="LinkedIn"
                                                icon={<LinkedIn />}
                                                errorMsg={errors.socials?.linkedin_url?.message}
                                                className="custom-class"
                                                labelClass="custom-label-class"
                                                // isRequired={true}
                                                {...register("socials.linkedin_url")}
                                            />
                                        </div>
                                        <div className="col-md-12 mb-5">
                                            <SocialLinkField
                                                label="X (Twitter)"
                                                icon={<Twitter />}
                                                errorMsg={errors.socials?.twitter_url?.message}
                                                className="custom-class"
                                                labelClass="custom-label-class"
                                                // isRequired={true}
                                                {...register("socials.twitter_url")}
                                            />
                                        </div>
                                        <div className="col-md-12 mb-5">
                                            <SocialLinkField
                                                label="Instagram"
                                                icon={<Instagram />}
                                                errorMsg={errors.socials?.instagram_url?.message}
                                                className="custom-class"
                                                labelClass="custom-label-class"
                                                // isRequired={true}
                                                {...register("socials.instagram_url")}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="card mb-2 col-lg-8 col-md-12 col-sm-12">
                                <div className="card-header border-0">
                                    <div className="card-title m-0">
                                        <h3 className="fw-bold m-0">Preferences</h3>
                                    </div>
                                </div>
                                <div className="card-body border-top p-9">
                                    <div className="row mb-4">
                                        <div className="col-md-12">
                                            <h2 className="fs-5 fw-semibold mb-2">Geographical Focus</h2>
                                            <div className="row">
                                                <div className="col-md-6 mb-5">
                                                    <Label label={"Region"} labelClass={"required fs-5 fw-semibold mb-2"} />
                                                    <Controller
                                                        control={control}
                                                        name={"investment_preferences.region"}
                                                        render={({ field }) => (
                                                            <OriginatorSelect
                                                                label=""
                                                                onSelected={(item: Any) => {
                                                                    if (item?.id) {
                                                                        const option = {
                                                                            label: item.name,
                                                                            value: item.id,
                                                                            data: {
                                                                                label: item.name,
                                                                                value: item.id,
                                                                            },
                                                                        }
                                                                        field.onChange(option)
                                                                    } else {
                                                                        field.onChange(null)
                                                                    }
                                                                }}
                                                                params={{ type: "region" }}
                                                                selectedOptionValue={field.value}
                                                                placeholder={"Select..."}
                                                            />
                                                        )}
                                                    />
                                                    <ShowFormError message={errors.investment_preferences?.region?.message} />
                                                </div>

                                                <div className="col-md-6 mb-5">
                                                    <Label label={"Country"} labelClass={"required fs-5 fw-semibold mb-2"} />
                                                    <Controller
                                                        control={control}
                                                        name={"investment_preferences.countries"}
                                                        render={({ field }) => (
                                                            <OriginatorSelect
                                                                label=""
                                                                onSelected={(item: Any) => {
                                                                    if (item && item.length > 0) {
                                                                        const countryData = item.map((option: Any) => ({
                                                                            label: option.name,
                                                                            value: option.id,
                                                                            data: option,
                                                                        }))
                                                                        field.onChange(countryData)
                                                                    } else {
                                                                        field.onChange(null)
                                                                    }
                                                                }}
                                                                params={{ parent: watch("investment_preferences.region"), type: "country" }}
                                                                selectedOptionValue={field.value}
                                                                placeholder={"Select..."}
                                                                isMulti={true}
                                                            />
                                                        )}
                                                    />
                                                    <ShowFormError message={errors.investment_preferences?.countries?.message} />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-md-6 mb-5">
                                            {" "}
                                            <Label label={"Investment Type"} labelClass={"required fs-5 fw-semibold mb-2"} />
                                            <Controller
                                                control={control}
                                                name={"investment_preferences.investment_type"}
                                                render={({ field }) => (
                                                    <OriginatorSelect
                                                        label=""
                                                        onSelected={(item: Any) => {
                                                            if (item?.id) {
                                                                const option = {
                                                                    label: item.name,
                                                                    value: item.id,
                                                                    data: {
                                                                        label: item.name,
                                                                        value: item.id,
                                                                    },
                                                                }
                                                                field.onChange(option)
                                                            } else {
                                                                field.onChange(null)
                                                            }
                                                        }}
                                                        params={{ type: "investment_type" }}
                                                        selectedOptionValue={field.value}
                                                        placeholder={"Select..."}
                                                    />
                                                )}
                                            />
                                            <ShowFormError message={errors.investment_preferences?.investment_type?.message} />
                                        </div>
                                        <div className="col-md-6 mb-5">
                                            <Label label={"Asset Class"} labelClass={"required fs-5 fw-semibold mb-2"} />
                                            <Controller
                                                control={control}
                                                name={"investment_preferences.asset_classes"}
                                                render={({ field }) => (
                                                    <OriginatorSelect
                                                        label=""
                                                        onSelected={(item: Any) => {
                                                            if (item && item.length > 0) {
                                                                const industriesData = item.map((option: Any) => ({
                                                                    label: option.name,
                                                                    value: option.id,
                                                                    data: option,
                                                                }))
                                                                field.onChange(industriesData)
                                                            } else {
                                                                field.onChange(null)
                                                            }
                                                        }}
                                                        params={{ type: "asset_class" }}
                                                        selectedOptionValue={field.value}
                                                        placeholder={"Select..."}
                                                        isMulti={true}
                                                    />
                                                )}
                                            />
                                            <ShowFormError message={errors.investment_preferences?.asset_classes?.message} />
                                        </div>

                                        <div className="col-md-6 mb-5">
                                            <Label label={"Industry Focus"} labelClass={"required fs-5 fw-semibold mb-2"} />
                                            <Controller
                                                control={control}
                                                name={"investment_preferences.industries"}
                                                render={({ field }) => (
                                                    <OriginatorSelect
                                                        label=""
                                                        onSelected={(item: Any) => {
                                                            if (item && item.length > 0) {
                                                                const industriesData = item.map((option: Any) => ({
                                                                    label: option.name,
                                                                    value: option.id,
                                                                    data: option,
                                                                }))
                                                                field.onChange(industriesData)
                                                            } else {
                                                                field.onChange(null)
                                                            }
                                                        }}
                                                        params={{ type: "industry" }}
                                                        selectedOptionValue={field.value}
                                                        placeholder={"Select..."}
                                                        isMulti={true}
                                                    />
                                                )}
                                            />
                                            <ShowFormError message={errors.investment_preferences?.industries?.message} />
                                        </div>

                                        <div className="col-md-6 mb-5">
                                            <Label label={"Strategy"} labelClass={"required fs-5 fw-semibold mb-2"} />
                                            <Controller
                                                control={control}
                                                name={"investment_preferences.strategies"}
                                                render={({ field }) => (
                                                    <OriginatorSelect
                                                        label=""
                                                        onSelected={(item: Any) => {
                                                            if (item && item.length > 0) {
                                                                const strategiesData = item.map((option: Any) => ({
                                                                    label: option.name,
                                                                    value: option.id,
                                                                    data: option,
                                                                }))
                                                                field.onChange(strategiesData)
                                                            } else {
                                                                field.onChange(null)
                                                            }
                                                        }}
                                                        params={{ type: "strategy" }}
                                                        selectedOptionValue={field.value}
                                                        placeholder={"Select..."}
                                                        isMulti={true}
                                                    />
                                                )}
                                            />
                                            <ShowFormError message={errors.investment_preferences?.strategies?.message} />
                                        </div>
                                        <div className="col-md-6 mb-5">
                                            <Label label="Fund Size ($)" labelClass={"required fs-5 fw-semibold mb-2"} />
                                            <div className="row">
                                                <div className="input-group input-group-solid mb-5 col-md-3 col-sm-3 col-lg-3">
                                                    <RangeInputField label="" {...register("investment_preferences.fund_size_min")} errorMsg={errors.investment_preferences?.fund_size_min?.message} />
                                                </div>
                                                <div className="input-group input-group-solid mb-5 col-md-3  col-sm-3 col-lg-3">
                                                    <RangeInputField
                                                        label=""
                                                        rangeLabel="High Value"
                                                        {...register("investment_preferences.fund_size_max")}
                                                        errorMsg={errors.investment_preferences?.fund_size_max?.message}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-6 mb-5">
                                            <Label label="Fund #" labelClass={"required fs-5 fw-semibold mb-2"} />
                                            <div className="row">
                                                <div className="input-group input-group-solid mb-5 col-md-3 col-sm-3 col-lg-3">
                                                    <RangeInputField
                                                        label=""
                                                        {...register("investment_preferences.fund_number_min")}
                                                        errorMsg={errors.investment_preferences?.fund_number_min?.message}
                                                    />
                                                </div>
                                                <div className="input-group input-group-solid mb-5 col-md-3  col-sm-3 col-lg-3">
                                                    <RangeInputField
                                                        label=""
                                                        rangeLabel="High Value"
                                                        {...register("investment_preferences.fund_number_max")}
                                                        errorMsg={errors.investment_preferences?.fund_number_max?.message}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-6 mb-5">
                                            {" "}
                                            <Label label="Direct Deal Size ($)" labelClass={"fs-5 fw-semibold mb-2"} />
                                            <div className="row">
                                                <div className="input-group input-group-solid mb-5 col-md-3 col-sm-3 col-lg-3">
                                                    <RangeInputField label="" {...register("investment_preferences.deal_size_min")} errorMsg={errors.investment_preferences?.deal_size_min?.message} />
                                                </div>
                                                <div className="input-group input-group-solid mb-5 col-md-3  col-sm-3 col-lg-3">
                                                    <RangeInputField
                                                        label=""
                                                        rangeLabel="High Value"
                                                        {...register("investment_preferences.deal_size_max")}
                                                        errorMsg={errors.investment_preferences?.deal_size_max?.message}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-12">
                                            <TextAreaField
                                                label="Enter Additional Context"
                                                {...register("investment_preferences.additional_context")}
                                                labelClassName="required fs-5 fw-semibold mb-2"
                                                placeholder=""
                                                className="form-control form-control-solidr"
                                                errorMsg={errors.investment_preferences?.additional_context?.message}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="card mb-2 col-lg-8 col-md-12 col-sm-12">
                                <div className="card-header border-0">
                                    <div className="card-title m-0">
                                        <h3 className="fw-bold m-0">Regulatory</h3>
                                    </div>
                                </div>
                                <div className="card-body border-top p-9">
                                    <div className="row mb-4">
                                        <div className="col-md-12 mb-5">
                                            {" "}
                                            <Label label="Regulated Entity" labelClass={"required fs-5 fw-semibold mb-2"} />
                                            <div className="mb-10 d-flex" id="2faMethodCheck">
                                                <div className="form-check form-check-custom form-check-solid me-10">
                                                    <InputRadioField
                                                        label="True"
                                                        checked={watch("regulated_entity") === true}
                                                        onChange={() => {
                                                            setValue("regulated_entity", true)
                                                            setRegulatedEntity(true)
                                                        }}
                                                        className="form-check-input h-30px w-30px me-1"
                                                    />
                                                </div>
                                                <div className="form-check form-check-custom form-check-solid me-10">
                                                    <InputRadioField
                                                        label="False"
                                                        checked={watch("regulated_entity") === false}
                                                        onChange={() => {
                                                            setValue("regulated_entity", false)
                                                            setValue("registration_number", "")
                                                            setValue("registration_information", "")
                                                            setRegulatedEntity(false)
                                                        }}
                                                        className="form-check-input h-30px w-30px me-1"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        {regulatedEntity && (
                                            <>
                                                <div className="col-md-12 mb-5">
                                                    <TextInputField
                                                        label="Registration Numbers"
                                                        {...register("registration_number")}
                                                        labelClass="required fs-5 fw-semibold mb-2"
                                                        type="text"
                                                        placeholder=""
                                                        className="form-control form-control-solidr"
                                                        errorMsg={errors.registration_number?.message}
                                                    />
                                                </div>
                                                <div className="col-md-12">
                                                    <TextAreaField
                                                        label="Regulatory Information"
                                                        {...register("registration_information")}
                                                        labelClassName="required fs-5 fw-semibold mb-2"
                                                        placeholder=""
                                                        className="form-control form-control-solidr"
                                                        errorMsg={errors.registration_information?.message}
                                                    />
                                                </div>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </form>
        </>
    )
}

export default BuildProfileForm

"use client"
import CustomAccordion from "@/app/_components/accordion/CustomAccordion"
import CustomAccordionItem from "@/app/_components/accordion/CustomAccordionItem"
import Button from "@/app/_components/button/Button"
import DocFileList from "@/app/_components/common/DocFileList"
import ImageEdit from "@/app/_components/common/ImageEdit"
import ShowFormError from "@/app/_components/common/ShowFormError"
import StickyHeaderComponent from "@/app/_components/common/StickySubHeader"
import TabBody from "@/app/_components/common/TabBody"
import BaseStaticSelect from "@/app/_components/input/BaseStaticSelect"
import CurrencyTextField from "@/app/_components/input/CurrencyInput"
import CurrencySelect from "@/app/_components/input/CurrencySelect"
import CustomInputDropzone from "@/app/_components/input/CustomInputDropZone"
import CustomPdfDropzone from "@/app/_components/input/CustomPdfDropzone"
import CustomPhoneInput from "@/app/_components/input/CustomPhoneInput"
import FirmSelect from "@/app/_components/input/FirmSelect"
import FlatPickrInput from "@/app/_components/input/FlatPickrInput"
import KeyContactSelect from "@/app/_components/input/KeyContactSelect"
import Label from "@/app/_components/input/Label"
import OriginatorSelect from "@/app/_components/input/OriginatorSelect"
import TargetCreatableSelect from "@/app/_components/input/TargetCreatableSelect"
import TextInputField from "@/app/_components/input/TextInput"
import { FetchHelper } from "@/app/_services/FetchHelper"
import { Any } from "@/app/_types/common/Common"
import { uploadImage } from "@/app/_utils/Backend"
import { showSweetAlertWithRedirect } from "@/app/_utils/Common"
import { CONFIG, CREATE_OPPORTUNITY, OPPORTUNITY } from "@/app/_utils/Constants"
import { handleError, removeEmptyKeys, showConfirmationDialog } from "@/app/_utils/Helpers"
import { AddEditOpportunitySchema, AddEditOpportunitySchemaType, DraftOpportunitySchema } from "@/app/_validations/opportunities/AddEditOpprtunities"
import { zodResolver } from "@hookform/resolvers/zod"
import dayjs from "dayjs"
import { useParams, useRouter } from "next/navigation"
import React, { useEffect, useState } from "react"
import { Controller, useFieldArray, useForm } from "react-hook-form"
import { CountryData } from "react-phone-input-2"
import { SweetAlertIcon } from "sweetalert2"
import CustomReactSelect from "../input/ReactSelect"
import Editor from "../editor/Editor"

const AddOpportunity = () => {
    const router = useRouter()
    const [file, setFile] = useState<File | null>(null)
    const [docFiles, setDocFile] = useState<File[] | null>([])
    // eslint-disable-next-line no-unused-vars
    const [isDisabled, setIsDisabled] = useState(false)
    // eslint-disable-next-line no-unused-vars
    const [country, setCountry] = useState<CountryData>()
    const userDetails = JSON.parse(localStorage.getItem(CONFIG.LOCAL_STORAGE_VARIABLES.USER_DETAILS) || "")
    const params = useParams()

    const {
        control,
        handleSubmit,
        setValue,
        register,
        formState: { errors, isSubmitting },
        clearErrors,
        getValues,
        setError,
        watch,
        reset,
    } = useForm<AddEditOpportunitySchemaType>({
        resolver: zodResolver(AddEditOpportunitySchema),
        defaultValues: {
            team_members: [
                {
                    cover: "",
                    name: "",
                    job_title: "",
                    email: "",
                    biography: "",
                    external_link: "",
                    phone_number: "",
                    phone_country_code: "",
                    order: 1,
                },
            ],
        },
    })

    const { fields, remove, append } = useFieldArray({ name: "team_members", control })
    const [loadingDraft, setLoadingDraft] = useState(false)
    const [currencySymbol, setCurrencySymbol] = useState("€")
    const [singleOpportunityData, setSingleOpportunityData] = useState<Any>()

    const handleUploadedFile = async (file: File) => {
        try {
            setIsDisabled(true)
            const fileData = {
                name: file.name,
                size: file.size,
            }
            const response = await FetchHelper.post(CONFIG.API_ENDPOINTS.FILES, fileData)

            // If a pre-signed URL is received, use it to upload the file to the server
            if (response?.pre_signed_url) {
                await FetchHelper.putFileData(response?.pre_signed_url, file, file.type)
            }

            const url = new URL(`${CONFIG.API_ENDPOINTS.FILES}/${response?.file?.id}`)
            const fileResponse = await FetchHelper.patch(url, {
                uploaded: true,
                token: response?.file?.token,
            })
            // Set the uploaded file ID to reflect the successful upload
            if (fileResponse?.id) {
                return fileResponse
            }
            setIsDisabled(false)
        } catch (error) {
            handleError(error)
        }
    }

    const submitHandler = async (data: Any) => {
        const cleanedPayload = removeEmptyKeys(data)
        let PAYLOAD = {
            ...cleanedPayload,
            created_by: userDetails?.user?.id,
            status: OPPORTUNITY.STATUS_PENDING_DISTRIBUTION,
            type: OPPORTUNITY.TYPE.PLATFORM,
            target: {
                ...cleanedPayload?.target,
                amount: cleanedPayload?.target?.amount ? cleanedPayload?.target?.amount : cleanedPayload?.fundraising?.target_raise,
            },
        }

        let RequestHelper = FetchHelper.post
        let url = new URL(CONFIG.API_ENDPOINTS.OPPORTUNITY_FORM.ADD_OPPORTUNITY)
        if (params?.id) {
            PAYLOAD = { ...PAYLOAD, id: params?.id } as Any
            RequestHelper = FetchHelper.patch
            url = new URL(`${CONFIG.API_ENDPOINTS.OPPORTUNITY_FORM.ADD_OPPORTUNITY}/${params?.id}`)
        }

        try {
            const response = await RequestHelper(url, PAYLOAD)
            if (response?.status) {
                showSweetAlertWithRedirect({
                    message: CONFIG.MESSAGES.OPPORTUNITY_ADDED_SUCCESSFULLY,
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
    const onSaveAsDraft = async (redirectToPreview?: boolean): Promise<void> => {
        redirectToPreview = redirectToPreview ?? false
        clearErrors()
        setLoadingDraft(true)
        const PAYLOAD = {
            ...getValues(),
        }
        const validatedData = await DraftOpportunitySchema.safeParseAsync(PAYLOAD)

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
        let RequestHelper = FetchHelper.post
        let url = new URL(CONFIG.API_ENDPOINTS.OPPORTUNITY_FORM.ADD_OPPORTUNITY)
        if (params?.id) {
            cleanedPayload = { ...cleanedPayload, id: params?.id } as Any
            RequestHelper = FetchHelper.patch
            url = new URL(`${CONFIG.API_ENDPOINTS.OPPORTUNITY_FORM.ADD_OPPORTUNITY}/${params?.id}`)
        }

        try {
            const response = await RequestHelper(url, {
                ...cleanedPayload,
                created_by: userDetails?.user?.id,
                status: OPPORTUNITY.STATUS_DRAFT,
                type: OPPORTUNITY.TYPE.PLATFORM,
                target: {
                    ...cleanedPayload.target,
                    amount: cleanedPayload?.target?.amount ? cleanedPayload?.target?.amount : cleanedPayload?.fundraising?.target_raise,
                },
            })

            if (response?.status) {
                if (redirectToPreview) {
                    // Redirect to Preview if flag is set
                    window.open(`/opportunities/opportunity-details/${response.id}`, "_blank")
                } else {
                    showSweetAlertWithRedirect({
                        message: CONFIG.MESSAGES.OPPORTUNITY_SAVED_AS_DRAFT_SUCCESSFULLY,
                        icon: CONFIG.SWEETALERT_SUCCESS_OPTION.icon as SweetAlertIcon,
                        router,
                        url: CONFIG.REDIRECT_PATHNAME.OPPORTUNITIES,
                    })
                }
            }
        } catch (error) {
            handleError(error)
        } finally {
            setLoadingDraft(false)
        }
    }

    // get data by id and set for edit part
    const getDefaultValues = async () => {
        try {
            const url = new URL(`${CONFIG.API_ENDPOINTS.OPPORTUNITY_FORM.ADD_OPPORTUNITY}/${params?.id}`)
            const response = await FetchHelper.get(url)
            setSingleOpportunityData(response)
            setDocFile(response?.files)
            setFile(response?.cover)
            setCurrencySymbol(response?.currency?.symbol)

            const defaultValues = {
                ...response,
                // sponsor_name: response?.sponsor_name && { label: response?.sponsor_name?.name, value: response?.sponsor_name?.id, data: response?.sponsor_name },
                sponsor_name: response?.sponsor_name,
                firm: { label: response?.firm?.name, value: response?.firm?.id, data: response?.firm },
                investment_type: { label: response?.investment_type?.name, value: response?.investment_type?.id, data: response?.investment_type },
                investment_label: response?.investment_type?.name,
                currency: { label: response?.currency?.code, value: response?.currency?.id, data: response?.currency },
                strategies:
                    response?.strategies &&
                    response?.strategies.map((item: Any) => {
                        return { label: item.name, value: item.id, data: item }
                    }),
                vintage_year: response?.vintage_year && {
                    label: response?.vintage_year?.toString(),
                    value: response?.vintage_year?.toString(),
                    data: { label: response?.vintage_year?.toString(), value: response?.vintage_year?.toString() },
                },
                fund_type: response?.fund_type,
                fund_number: response?.fund_type === "closed" ? response?.fund_number?.toString() : null,
                contact: response.contact && { label: response?.contact?.name, value: response?.contact?.id, data: response?.contact },
                region: response?.region && { label: response?.region?.name, value: response?.region.id, data: response?.region },
                country: response?.country && { label: response?.country?.name, value: response?.country?.id, data: response?.country },
                asset_class: response?.asset_class && { label: response?.asset_class?.name, value: response?.asset_class?.id, data: response?.asset_class },
                industries:
                    response?.industries &&
                    response?.industries.map((item: Any) => {
                        return { label: item.name, value: item.id, data: item }
                    }),
                term: response?.term && {
                    ...response?.term,
                    waterfall_type: response?.term?.waterfall_type && { label: response?.term?.waterfall_type?.name, value: response?.term?.waterfall_type?.id, data: response?.term?.waterfall_type },
                    gp_commitment_amount: response?.term?.gp_commitment_amount && response?.term?.gp_commitment_amount?.toString(),
                    hard_cap: response?.term?.hard_cap && response?.term?.hard_cap?.toString(),
                    minimum_investment: response?.term?.minimum_investment && response?.term?.minimum_investment?.toString(),
                },
                vehicle: response?.vehicle && {
                    ...response?.vehicle,
                    jurisdiction_country: response?.vehicle?.jurisdiction_country && {
                        label: response?.vehicle?.jurisdiction_country?.name,
                        value: response?.vehicle?.jurisdiction_country?.id,
                        data: response?.vehicle?.jurisdiction_country,
                    },
                    jurisdiction_states:
                        response?.vehicle?.jurisdiction_states.map((item: Any) => {
                            return { label: item.name, value: item.id, data: item }
                        }) ?? [],
                    tax_reportings: response?.vehicle?.tax_reportings.map((item: Any) => {
                        return { label: item.name, value: item.id, data: item }
                    }),
                    investor_types: response?.vehicle?.investor_types.map((item: Any) => {
                        return { label: item.name, value: item.id, data: item }
                    }),
                    tax_eligibility: response?.vehicle?.tax_eligibility,
                    structure: response?.vehicle?.structure && { label: response?.vehicle?.structure?.name, value: response?.vehicle?.structure?.id, data: response?.vehicle?.structure },
                },
                team_members:
                    response?.team_members &&
                    response?.team_members.map((item: Any) => {
                        return { ...item }
                    }),
                placement: response?.placement && {
                    ...response?.placement,
                    payment_frequency: response?.placement?.payment_frequency,
                    installments_no: response?.placement?.installments_no?.toString(),
                },
                target: response?.target && {
                    ...response?.target,
                    market_regions: response?.target?.market_regions.map((item: Any) => {
                        return { label: item.name, value: item.id, data: item }
                    }),
                    amount: response?.target?.amount?.toString(),
                },
                fundraising: response?.fundraising && {
                    ...response?.fundraising,
                    current_raise: response?.fundraising?.current_raise?.toString(),
                    target_raise: response?.fundraising?.target_raise?.toString(),
                },
            }

            reset({ ...defaultValues })
            if (response?.vehicle && response?.vehicle?.jurisdiction_country?.name) {
                setValue("jurisdiction_country_label", response?.vehicle?.jurisdiction_country?.name)
            }
        } catch (error) {
            handleError(error)
        }
    }
    useEffect(() => {
        if (params?.id) {
            getDefaultValues()
        }
    }, [])

    return (
        <>
            <form onSubmit={handleSubmit(submitHandler)}>
                <StickyHeaderComponent
                    title={`${params?.id ? OPPORTUNITY.EDIT : OPPORTUNITY.CREATE} An Opportunity`}
                    showBackArrow={true}
                    showButton={true}
                    backLink={params?.id ? CONFIG.REDIRECT_PATHNAME.OPPORTUNITIES : ""}
                    onButtonClick={() => {
                        if (!params?.id) {
                            showConfirmationDialog({
                                onConfirm: onSaveAsDraft,
                                path: CONFIG.REDIRECT_PATHNAME.OPPORTUNITIES,
                                router,
                            })
                        }
                    }}
                >
                    {/* Custom button setup */}
                    {singleOpportunityData?.status === OPPORTUNITY.STATUS_DRAFT && params?.id && (
                        <Button
                            type="button"
                            loading={loadingDraft}
                            title={CONFIG.SAVE_AS_DRAFT}
                            className="btn btn-secondary rounded-0 w-90 my-5 mx-2 fs-7 text-uppercase"
                            onClick={() => onSaveAsDraft()}
                        />
                    )}
                    {singleOpportunityData?.status !== OPPORTUNITY.STATUS_DRAFT && !params?.id && (
                        <Button
                            type="button"
                            loading={loadingDraft}
                            title={CONFIG.SAVE_AS_DRAFT}
                            className="btn btn-secondary rounded-0 w-90 my-5 mx-2 fs-7 text-uppercase"
                            onClick={() => onSaveAsDraft()}
                        />
                    )}
                    {singleOpportunityData?.status === OPPORTUNITY.STATUS_DRAFT && params?.id && (
                        <button id="preview" type="button" className="btn btn-secondary rounded-0 w-90 my-5 mx-2 fs-7 text-uppercase" onClick={() => onSaveAsDraft(true)} disabled={loadingDraft}>
                            Preview
                        </button>
                    )}
                    {/* <Button loading={isSubmitting} title="QuickShare" className="btn btn-secondary rounded-0 w-90 my-5 mx-2 fs-7 text-uppercase" /> */}
                    <Button
                        loading={isSubmitting}
                        title={singleOpportunityData?.status !== OPPORTUNITY.STATUS_DRAFT && params?.id ? "Save Changes" : "Publish"}
                        className="btn bg-black rounded-0 text-white w-90 text-uppercase fs-7 mx-2"
                    />
                </StickyHeaderComponent>

                <div id="kt_app_content_container" className="app-container container-fluid">
                    <div className="row mt-100">
                        <TabBody>
                            <CustomAccordion defaultActiveKey={Array.from({ length: 13 }, (_, i) => i.toString())} alwaysOpen>
                                <CustomAccordionItem title={"Overview"} eventKey={"0"} key={"0"} containerClass={`card mb-2 col-lg-8 col-md-12 col-sm-12 p-2`}>
                                    <div className="card-body border-top p-9">
                                        <div className="row mb-5 mt-5">
                                            <CustomInputDropzone
                                                label={"Cover Image"}
                                                isRequired={false}
                                                maxSize={5}
                                                setFile={setFile}
                                                file={file}
                                                // errorMsg={errors.cover?.message}
                                                onDrop={async (file: File) => {
                                                    if (file) {
                                                        const fileId = await uploadImage(file)
                                                        setValue("cover", fileId)
                                                    } else {
                                                        setValue("cover", null)
                                                    }
                                                }}
                                            />
                                        </div>

                                        <div className="row mb-5 mt-5">
                                            <div className="col-md-12 fv-row fv-plugins-icon-container">
                                                <TextInputField
                                                    label="Sponsor/GP Name"
                                                    {...register("sponsor_name")}
                                                    labelClass="required fs-5 fw-semibold mb-2"
                                                    type="text"
                                                    className="form-control form-control-solidr"
                                                    errorMsg={errors.sponsor_name?.message}
                                                />
                                            </div>

                                            {/* <div className="col-md-12 fv-row fv-plugins-icon-container">
                                                <Label label={"Sponsor/GP Name"} labelClass={"required fs-5 fw-semibold mb-2"} />
                                                <Controller
                                                    control={control}
                                                    name={"sponsor_name"}
                                                    render={({ field }) => (
                                                        <TargetCreatableSelect
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
                                                            selectedOptionValue={field.value}
                                                            params={{ type: "sponsor_name" }}
                                                            isMulti={false}
                                                        />
                                                    )}
                                                />
                                                <ShowFormError message={errors.sponsor_name?.message} />
                                            </div> */}
                                        </div>
                                        <div className="row mb-5 mt-5">
                                            <div className="col-md-12 fv-row fv-plugins-icon-container">
                                                <Label label={"Originator"} labelClass={"required fs-5 fw-semibold mb-2"} />
                                                <Controller
                                                    control={control}
                                                    name={"firm"}
                                                    render={({ field }) => (
                                                        <FirmSelect
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
                                                                setValue("contact", null)
                                                            }}
                                                            selectedOptionValue={field.value}
                                                            params={{ hide_other_agents: true }}
                                                            placeholder={"Select..."}
                                                        />
                                                    )}
                                                />
                                                <ShowFormError message={errors.firm?.message} />
                                            </div>
                                        </div>
                                        <div className="row mb-5 mt-5">
                                            <div className="col-md-12 fv-row fv-plugins-icon-container">
                                                <TextInputField
                                                    label="Opportunity ID"
                                                    {...register("reference_id")}
                                                    labelClass="fs-5 fw-semibold mb-2"
                                                    type="text"
                                                    placeholder="e.g: SHU2830"
                                                    className="form-control form-control-solidr"
                                                    errorMsg={errors.reference_id?.message}
                                                />
                                            </div>
                                        </div>
                                        <div className="row mb-5 mt-5">
                                            <div className="col-md-12 fv-row fv-plugins-icon-container">
                                                <TextInputField
                                                    label="Opportunity Name "
                                                    {...register("name")}
                                                    labelClass="required fs-5 fw-semibold mb-2"
                                                    type="text"
                                                    className="form-control form-control-solidr"
                                                    errorMsg={errors.name?.message}
                                                />
                                            </div>
                                        </div>
                                        <div className="row mb-5 mt-5">
                                            <div className="col-md-12 fv-row fv-plugins-icon-container">
                                                <TextInputField
                                                    label="Small Description (Max 100 characters) "
                                                    {...register("short_description")}
                                                    labelClass="required fs-5 fw-semibold mb-2"
                                                    type="text"
                                                    className="form-control form-control-solidr"
                                                    errorMsg={errors.short_description?.message}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </CustomAccordionItem>

                                <CustomAccordionItem title={"Key Details"} eventKey={"1"} key={"1"} containerClass={`card mb-2 col-lg-8 col-md-12 col-sm-12 p-2`}>
                                    <div className="card-body border-top p-9">
                                        <div className="row mb-5 mt-5">
                                            <div className="col-md-6 fv-row fv-plugins-icon-container">
                                                <Label label={"Investment Type"} labelClass={"required fs-5 fw-semibold mb-2"} />
                                                <Controller
                                                    control={control}
                                                    name={"investment_type"}
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
                                                                    setValue("investment_label", null)
                                                                    field.onChange(option)
                                                                    setValue("investment_label", null)
                                                                    if (option?.label === "Direct Deal") {
                                                                        setValue("fund_type", null)
                                                                        setValue("investment_label", option?.label)
                                                                        setValue("fund_number", null as Any)
                                                                    }
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
                                                <ShowFormError message={errors.investment_type?.message} />
                                            </div>
                                            <div className="col-md-6 fv-row fv-plugins-icon-container">
                                                <Label label={"Currency"} labelClass={"required fs-5 fw-semibold mb-2"} />
                                                <Controller
                                                    control={control}
                                                    name={"currency"}
                                                    render={({ field }) => (
                                                        <CurrencySelect
                                                            label=""
                                                            onSelected={(item: Any) => {
                                                                if (item?.id) {
                                                                    const option = {
                                                                        label: item.code,
                                                                        value: item.id,
                                                                        data: {
                                                                            label: item.code,
                                                                            value: item.id,
                                                                        },
                                                                    }
                                                                    setCurrencySymbol(item?.symbol)
                                                                    field.onChange(option)
                                                                } else {
                                                                    field.onChange(null)
                                                                }
                                                            }}
                                                            selectedOptionValue={field.value}
                                                            placeholder={"Select..."}
                                                        />
                                                    )}
                                                />
                                                <ShowFormError message={errors.currency?.message} />
                                            </div>
                                        </div>
                                        <div className="row mb-5 mt-5">
                                            {/* <div className="col-md-6 fv-row fv-plugins-icon-container">
                                                <TextInputField
                                                    label="Term"
                                                    {...register("time_period")}
                                                    labelClass="required fs-5 fw-semibold mb-2"
                                                    type="text"
                                                    className="form-control form-control-solidr"
                                                    errorMsg={errors.time_period?.message}
                                                />
                                            </div> */}
                                            {watch("investment_type")?.label !== "Direct Deal" && (
                                                <div className="col-md-6 fv-row fv-plugins-icon-container">
                                                    <Label
                                                        label={"Fund Type"}
                                                        labelClass={watch("investment_type")?.label !== "Direct Deal" ? "required fs-5 fw-semibold mb-2" : "fs-5 fw-semibold mb-2"}
                                                    />
                                                    <Controller
                                                        control={control}
                                                        name={"fund_type"}
                                                        render={({ field }) => (
                                                            <CustomReactSelect
                                                                key={watch("investment_type")}
                                                                optionsData={CREATE_OPPORTUNITY.FUND_TYPE}
                                                                onDropdownChange={(value) => {
                                                                    if (value) {
                                                                        field.onChange(value)
                                                                        if (value == "open-ended") {
                                                                            setValue("fund_number", null as Any)
                                                                        }
                                                                    } else {
                                                                        field.onChange(null)
                                                                    }
                                                                }}
                                                                placeholder={"Select..."}
                                                                selectedOptionValue={field.value}
                                                            />
                                                        )}
                                                    />
                                                    <ShowFormError message={errors.fund_type?.message} />
                                                </div>
                                            )}
                                            {watch("investment_type")?.label !== "Direct Deal" && watch("fund_type") == "closed" && (
                                                <div className="col-md-6 fv-row fv-plugins-icon-container">
                                                    <Label label={"Fund #"} labelClass={"required fs-5 fw-semibold mb-2"} />
                                                    <Controller
                                                        control={control}
                                                        name={"fund_number"}
                                                        render={({ field }) => (
                                                            <CustomReactSelect
                                                                optionsData={CREATE_OPPORTUNITY.FUND_NUMBER}
                                                                onDropdownChange={(value) => {
                                                                    if (value) {
                                                                        field.onChange(value)
                                                                    } else {
                                                                        field.onChange(null)
                                                                    }
                                                                }}
                                                                placeholder={"Select..."}
                                                                selectedOptionValue={field.value as unknown as string}
                                                            />
                                                        )}
                                                    />
                                                    <ShowFormError message={errors.fund_number?.message} />
                                                </div>
                                            )}
                                        </div>

                                        <div className="row mb-5 mt-5">
                                            <div className="col-md-6 fv-row fv-plugins-icon-container">
                                                <TextInputField
                                                    label="Term"
                                                    {...register("time_period")}
                                                    labelClass="fs-5 fw-semibold mb-2"
                                                    type="text"
                                                    className="form-control form-control-solidr"
                                                    errorMsg={errors.time_period?.message}
                                                />
                                            </div>
                                            <div className="col-md-6 fv-row fv-plugins-icon-container">
                                                <Label label={"Vintage Year"} labelClass={"fs-5 fw-semibold mb-2"} />
                                                <Controller
                                                    control={control}
                                                    name={"vintage_year"}
                                                    render={({ field }) => (
                                                        <BaseStaticSelect
                                                            options={CREATE_OPPORTUNITY.VINTAGE_YEAR}
                                                            onSelected={(option) => {
                                                                if (option) {
                                                                    field.onChange({ ...option, data: option })
                                                                } else {
                                                                    field.onChange(null)
                                                                }
                                                            }}
                                                            placeholder={"Select..."}
                                                            isSearchable={false}
                                                            selectedOptionValue={field.value}
                                                        />
                                                    )}
                                                />
                                                <ShowFormError message={errors.vintage_year?.message} />
                                            </div>

                                            {/* <div className="col-md-6 fv-row fv-plugins-icon-container">
                                                <Label label={"Fund #"} labelClass={"required fs-5 fw-semibold mb-2"} />
                                                <Controller
                                                    control={control}
                                                    name={"fund_number"}
                                                    render={({ field }) => (
                                                        <BaseStaticSelect
                                                            options={CREATE_OPPORTUNITY.FUND_NUMBER}
                                                            onSelected={(option) => {
                                                                if (option) {
                                                                    field.onChange({ ...option, data: option })
                                                                } else {
                                                                    field.onChange(null)
                                                                }
                                                            }}
                                                            placeholder={"Select..."}
                                                            isSearchable={false}
                                                            selectedOptionValue={field.value as unknown as Option}
                                                        />
                                                    )}
                                                />
                                                <ShowFormError message={errors.fund_number?.message} />
                                            </div> */}
                                        </div>

                                        <div className="row mb-5 mt-5">
                                            <div className="col-md-6 fv-row fv-plugins-icon-container">
                                                <TextInputField
                                                    label="Extension"
                                                    {...register("extension")}
                                                    labelClass="fs-5 fw-semibold mb-2"
                                                    type="text"
                                                    placeholder=""
                                                    className="form-control form-control-solidr"
                                                    errorMsg={errors.extension?.message}
                                                />
                                            </div>
                                            <div className="col-md-6 fv-row fv-plugins-icon-container">
                                                <Controller
                                                    name={"inception_date"}
                                                    control={control}
                                                    render={({ field: { onChange, value } }: Any) => (
                                                        <FlatPickrInput
                                                            labelClass=""
                                                            placeholder="Pick a date"
                                                            label={"Inception Date"}
                                                            errorMsg={errors.inception_date?.message}
                                                            value={value}
                                                            onChange={(date) => {
                                                                const selectedDate = date?.[0] ? date[0] : null
                                                                const formattedDate = selectedDate ? dayjs(selectedDate).format("YYYY-MM-DD") : ""
                                                                onChange(formattedDate) // Set the form value
                                                                setValue("inception_date", formattedDate) // Update form value in React Hook Form
                                                                clearErrors("inception_date") // Clear errors
                                                            }}
                                                        />
                                                    )}
                                                />
                                            </div>
                                        </div>
                                        <div className="row mb-5 mt-5">
                                            <div className="col-md-6 fv-row fv-plugins-icon-container">
                                                <Controller
                                                    name={"estimated_close_date"}
                                                    control={control}
                                                    render={({ field: { onChange, value } }) => (
                                                        <FlatPickrInput
                                                            placeholder="Pick a date"
                                                            label={"Estimated Close Date"}
                                                            errorMsg={errors.estimated_close_date?.message}
                                                            value={value}
                                                            onChange={(date) => {
                                                                const selectedDate = date?.[0] ? date[0] : null
                                                                const formattedDate = selectedDate ? dayjs(selectedDate).format("YYYY-MM-DD") : ""
                                                                onChange(formattedDate) // Set the form value
                                                                setValue("estimated_close_date", formattedDate) // Update form value in React Hook Form
                                                                clearErrors("estimated_close_date") // Clear errors
                                                            }}
                                                        />
                                                    )}
                                                />
                                            </div>
                                            <div className="col-md-6 fv-row fv-plugins-icon-container">
                                                <Label label={"Key Contact"} labelClass={"required fs-5 fw-semibold mb-2"} />
                                                <Controller
                                                    control={control}
                                                    name={"contact"}
                                                    render={({ field }) => (
                                                        <KeyContactSelect
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
                                                            params={{ firm_id: watch("firm")?.value }}
                                                            key={watch("firm")?.value}
                                                            selectedOptionValue={field.value}
                                                            placeholder={"Select..."}
                                                            isDisabled={!watch("firm")}
                                                        />
                                                    )}
                                                />
                                                <p className="m-0 text-muted">Please select Originator to view contacts. </p>
                                                <ShowFormError message={errors.contact?.message} />
                                            </div>
                                        </div>
                                        <div className="row mb-5 mt-5">
                                            <div className="col-md-12 fv-row fv-plugins-icon-container">
                                                {/* <TextInputField
                                                    label="Product General Disclaimer"
                                                    {...register("product_disclaimer")}
                                                    labelClass="required fs-5 fw-semibold mb-2"
                                                    type="text"
                                                    placeholder=""
                                                    className="form-control form-control-solidr"
                                                    errorMsg={errors.product_disclaimer?.message}
                                                /> */}
                                                <div className="form-group">
                                                    <label className="fs-5 fw-semibold mb-2" htmlFor="long_description">
                                                        Product General Disclaimer
                                                    </label>
                                                    <Controller name="product_disclaimer" control={control} render={({ field }: Any) => <Editor onBlur={field.onChange} value={field.value} />} />
                                                    {errors.product_disclaimer?.message && <p className="text-danger mt-2">{errors.product_disclaimer?.message}</p>}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </CustomAccordionItem>

                                <CustomAccordionItem title={"About"} eventKey={"2"} key={"2"} containerClass={`card mb-2 col-lg-8 col-md-12 col-sm-12 p-2`}>
                                    <div className="card-body border-top p-9">
                                        <div className="row mb-5 mt-5">
                                            <div className="col-md-12 fv-row fv-plugins-icon-container">
                                                <div className="form-group">
                                                    <label className="required fs-5 fw-semibold mb-2" htmlFor="long_description">
                                                        Large Description
                                                    </label>
                                                    <Controller name="long_description" control={control} render={({ field }) => <Editor onBlur={field.onChange} value={field.value} />} />
                                                    {errors.long_description?.message && <p className="text-danger mt-2">{errors.long_description?.message}</p>}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row mb-5 mt-5">
                                            <div className="col-md-12 fv-row fv-plugins-icon-container">
                                                <div className="form-group">
                                                    <label className="required fs-5 fw-semibold mb-2" htmlFor="highlights">
                                                        Highlights
                                                    </label>
                                                    <Controller name="highlights" control={control} render={({ field }) => <Editor onBlur={field.onChange} value={field.value} />} />
                                                    {errors.highlights?.message && <p className="text-danger mt-2">{errors.highlights?.message}</p>}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </CustomAccordionItem>

                                <CustomAccordionItem title={"Strategy"} eventKey={"3"} key={"3"} containerClass={`card mb-2 col-lg-8 col-md-12 col-sm-12 p-2`}>
                                    <div className="card-body border-top p-9">
                                        <h4>Geographical Focus</h4>
                                        <div className="row mb-5 mt-5">
                                            <div className="col-md-6 fv-row fv-plugins-icon-container">
                                                <Label label={"Region"} labelClass={"required fs-5 fw-semibold mb-2"} />
                                                <Controller
                                                    control={control}
                                                    name={"region"}
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
                                                <ShowFormError message={errors.region?.message} />
                                            </div>
                                            <div className="col-md-6 fv-row fv-plugins-icon-container">
                                                <Label label={"Country"} labelClass={"required fs-5 fw-semibold mb-2"} />
                                                <Controller
                                                    control={control}
                                                    name={"country"}
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
                                                            params={{ parent_id: watch("region"), type: "country" }}
                                                            selectedOptionValue={field.value}
                                                            placeholder={"Select..."}
                                                        />
                                                    )}
                                                />
                                                <ShowFormError message={errors.country?.message} />
                                            </div>
                                        </div>
                                        <div className="row mb-5 mt-5">
                                            <div className="col-md-6 fv-row fv-plugins-icon-container">
                                                <Label label={"Asset Class"} labelClass={"required fs-5 fw-semibold mb-2"} />
                                                <Controller
                                                    control={control}
                                                    name={"asset_class"}
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
                                                            params={{ type: "asset_class" }}
                                                            selectedOptionValue={field.value}
                                                            placeholder={"Select..."}
                                                        />
                                                    )}
                                                />
                                                <ShowFormError message={errors.asset_class?.message} />
                                            </div>
                                            <div className="col-md-6 fv-row fv-plugins-icon-container">
                                                <Label label={"Strategy"} labelClass={"required fs-5 fw-semibold mb-2"} />
                                                <Controller
                                                    control={control}
                                                    name={"strategies"}
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
                                                <ShowFormError message={errors.strategies?.message} />
                                            </div>
                                        </div>
                                        <div className="row mb-5 mt-5">
                                            <div className="col-md-6 fv-row fv-plugins-icon-container">
                                                <Label label={"Industry"} labelClass={"required fs-5 fw-semibold mb-2"} />
                                                <Controller
                                                    control={control}
                                                    name={"industries"}
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
                                                <ShowFormError message={errors.industries?.message} />
                                            </div>
                                        </div>
                                    </div>
                                </CustomAccordionItem>

                                <CustomAccordionItem title={"Team"} eventKey={"4"} key={"4"} containerClass={`card mb-2 col-lg-8 col-md-12 col-sm-12 p-2`}>
                                    <div className="card-body border-top p-9">
                                        <>
                                            {fields.map((field, _index) => (
                                                <div className="form-group row border rounded mb-5 p-5" key={_index}>
                                                    <div className="row mb-5 mt-5">
                                                        <div className="col-md-4 file-info-image-upload">
                                                            <Label label={"Add A Cover Image"} labelClass={"fs-5 fw-semibold mb-2"} />
                                                            <Controller
                                                                control={control}
                                                                name={`team_members.${_index}.cover`}
                                                                render={({ field }) => (
                                                                    <ImageEdit
                                                                        onUploadStarted={() => setIsDisabled(true)}
                                                                        size={CONFIG.IMAGE_SIZE.USER_CARD}
                                                                        image={field.value}
                                                                        onUploaded={(image) => {
                                                                            setIsDisabled(false)
                                                                            setValue(`team_members.${_index}.cover`, image)
                                                                        }}
                                                                        onDeleted={() => {
                                                                            setIsDisabled(false)
                                                                            setValue(`team_members.${_index}.cover`, "")
                                                                        }}
                                                                    />
                                                                )}
                                                            />

                                                            {errors?.team_members?.[_index]?.cover && <ShowFormError message={errors.team_members[_index].cover.message} />}
                                                        </div>
                                                        <div className="col-md-4 fv-row fv-plugins-icon-container">
                                                            <TextInputField
                                                                label="Name"
                                                                {...register(`team_members.${_index}.name`)}
                                                                labelClass="required fs-5 fw-semibold mb-2"
                                                                type="text"
                                                                className="form-control form-control-solidr"
                                                                errorMsg={errors?.team_members?.[_index]?.name?.message}
                                                            />
                                                        </div>
                                                        <div className="col-md-4 fv-row fv-plugins-icon-container">
                                                            <TextInputField
                                                                label="Role"
                                                                {...register(`team_members.${_index}.job_title`)}
                                                                labelClass="fs-5 fw-semibold mb-2"
                                                                type="text"
                                                                className="form-control form-control-solidr"
                                                                errorMsg={errors?.team_members?.[_index]?.job_title?.message}
                                                            />
                                                        </div>
                                                    </div>

                                                    <div className="row mb-5 mt-5">
                                                        <div className="col-md-6 fv-row fv-plugins-icon-container">
                                                            <TextInputField
                                                                label="Email"
                                                                {...register(`team_members.${_index}.email`)}
                                                                labelClass="fs-5 fw-semibold mb-2"
                                                                type="email"
                                                                className="form-control form-control-solidr"
                                                                errorMsg={errors?.team_members?.[_index]?.email?.message}
                                                            />
                                                        </div>

                                                        <div className="col-md-6">
                                                            <Label label="Phone" labelClass="fs-5 fw-semibold mb-2" />
                                                            <CustomPhoneInput
                                                                inputClass="form-control form-control-lg form-control-solid 1-100 w-100 custom-phone-input custom-border"
                                                                setCountry={(country) => setCountry(country)}
                                                                value={""}
                                                                setPhoneNumberValue={(number) => setValue(`team_members.${_index}.phone_number`, number)}
                                                                setCountryCodeValue={(countryCode) => setValue(`team_members.${_index}.phone_country_code`, countryCode)}
                                                                clearPhoneNumberErrors={() => {
                                                                    clearErrors(`team_members.${_index}.phone_number`)
                                                                    clearErrors(`team_members.${_index}.phone_country_code`)
                                                                }}
                                                                setPhoneNumberErrors={() =>
                                                                    setError(`team_members.${_index}.phone_number`, {
                                                                        message: "Invalid phone number",
                                                                    })
                                                                }
                                                                errorMessage={
                                                                    (errors?.team_members?.[_index]?.phone_number?.message as string) ||
                                                                    (errors?.team_members?.[_index]?.phone_country_code?.message as string)
                                                                }
                                                            />
                                                        </div>
                                                    </div>

                                                    <div className="row mb-5 mt-5">
                                                        <div className="col-md-12 fv-row fv-plugins-icon-container">
                                                            <div className="form-group">
                                                                <label className="fs-5 fw-semibold mb-2" htmlFor="biography">
                                                                    Biography
                                                                </label>
                                                                <Controller
                                                                    name={`team_members.${_index}.biography`}
                                                                    control={control}
                                                                    render={({ field }) => <Editor onBlur={field.onChange} value={field.value as string} />}
                                                                />
                                                                {errors?.team_members?.[_index]?.biography?.message && (
                                                                    <p className="text-danger mt-2">{errors?.team_members?.[_index]?.biography?.message}</p>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="row mb-5 mt-5">
                                                        <div className="col-md-12 fv-row fv-plugins-icon-container">
                                                            <TextInputField
                                                                label="External Link"
                                                                {...register(`team_members.${_index}.external_link`)}
                                                                labelClass="fs-5 fw-semibold mb-2"
                                                                type="text"
                                                                className="form-control form-control-solidr"
                                                                errorMsg={errors?.team_members?.[_index]?.external_link?.message}
                                                            />
                                                        </div>
                                                    </div>

                                                    <div className="text-end">
                                                        <button type="button" className="btn btn-sm btn-light-danger mt-3 my-md-8" onClick={() => remove(_index)}>
                                                            Delete
                                                        </button>
                                                    </div>
                                                </div>
                                            ))}
                                            <div className="form-group mt-5">
                                                <button
                                                    className="btn btn-light-primary"
                                                    type="button"
                                                    onClick={() =>
                                                        append({
                                                            cover: "",
                                                            name: "",
                                                            job_title: "",
                                                            email: "",
                                                            phone_number: "",
                                                            biography: "",
                                                            external_link: "",
                                                            phone_country_code: "",
                                                            order: fields.length + 1,
                                                        })
                                                    }
                                                >
                                                    Add
                                                </button>
                                            </div>
                                        </>
                                    </div>
                                </CustomAccordionItem>

                                <CustomAccordionItem title={"Terms"} eventKey={"5"} key={"5"} containerClass={`card mb-2 col-lg-8 col-md-12 col-sm-12 p-2`}>
                                    <div className="card-body border-top p-9">
                                        <div className="row mb-5 mt-5">
                                            <div className="col-md-6 fv-row fv-plugins-icon-container">
                                                <CurrencyTextField
                                                    label={"Hard Cap"}
                                                    {...register("term.hard_cap")}
                                                    labelClass={"fs-5 fw-semibold mb-2"}
                                                    className={"form-control form-control-solid"}
                                                    errorMsg={errors.term?.hard_cap?.message}
                                                    currencySymbol={currencySymbol}
                                                />
                                            </div>
                                            <div className="col-md-6 fv-row fv-plugins-icon-container">
                                                <TextInputField
                                                    label="GP Commitment (%)"
                                                    {...register("term.gp_commitment_percentage")}
                                                    labelClass="fs-5 fw-semibold mb-2"
                                                    type="text"
                                                    placeholder=""
                                                    className="form-control form-control-solidr"
                                                    errorMsg={errors.term?.gp_commitment_percentage?.message}
                                                />
                                            </div>
                                        </div>
                                        <div className="row mb-5 mt-5">
                                            <div className="col-md-6 fv-row fv-plugins-icon-container">
                                                <CurrencyTextField
                                                    label={"GP Commitment Amount"}
                                                    {...register("term.gp_commitment_amount")}
                                                    labelClass={"fs-5 fw-semibold mb-2"}
                                                    className={"form-control form-control-solid"}
                                                    errorMsg={errors.term?.gp_commitment_amount?.message}
                                                    currencySymbol={currencySymbol}
                                                />
                                            </div>
                                            <div className="col-md-6 fv-row fv-plugins-icon-container">
                                                <Label label={"Waterfall Type"} labelClass={"fs-5 fw-semibold mb-2"} />
                                                <Controller
                                                    control={control}
                                                    name={"term.waterfall_type"}
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
                                                            params={{ type: "waterfall_type" }}
                                                            selectedOptionValue={field.value}
                                                            placeholder={"Select..."}
                                                        />
                                                    )}
                                                />
                                                <ShowFormError message={errors.term?.waterfall_type?.message} />
                                            </div>
                                        </div>

                                        <div className="row mb-5 mt-5">
                                            <div className="col-md-6 fv-row fv-plugins-icon-container">
                                                <TextInputField
                                                    label="Minimum Investment"
                                                    {...register("term.minimum_investment")}
                                                    labelClass="fs-5 fw-semibold mb-2"
                                                    type="text"
                                                    placeholder=""
                                                    className="form-control form-control-solidr"
                                                    errorMsg={errors.term?.minimum_investment?.message}
                                                />
                                            </div>
                                            <div className="col-md-6 fv-row fv-plugins-icon-container">
                                                <TextInputField
                                                    label="Hurdle Rate (%)"
                                                    {...register("term.hurdle_rate")}
                                                    labelClass="fs-5 fw-semibold mb-2"
                                                    type="text"
                                                    placeholder=""
                                                    className="form-control form-control-solidr"
                                                    errorMsg={errors.term?.hurdle_rate?.message}
                                                />
                                            </div>
                                        </div>

                                        <div className="row mb-5 mt-5">
                                            <div className="col-md-6 fv-row fv-plugins-icon-container">
                                                <TextInputField
                                                    label="Catch-up (%)"
                                                    {...register("term.catch_up")}
                                                    labelClass="fs-5 fw-semibold mb-2"
                                                    type="text"
                                                    placeholder=""
                                                    className="form-control form-control-solidr"
                                                    errorMsg={errors.term?.catch_up?.message}
                                                />
                                            </div>
                                            <div className="col-md-6 fv-row fv-plugins-icon-container">
                                                <TextInputField
                                                    label="Carried Interest (%)"
                                                    {...register("term.carried_interest")}
                                                    labelClass="fs-5 fw-semibold mb-2"
                                                    type="text"
                                                    placeholder=""
                                                    className="form-control form-control-solidr"
                                                    errorMsg={errors.term?.carried_interest?.message}
                                                />
                                            </div>
                                        </div>
                                        <div className="row mb-5 mt-5">
                                            <div className="col-md-6 fv-row fv-plugins-icon-container">
                                                <TextInputField
                                                    label="Management Fee (%)"
                                                    {...register("term.management_fee_percentage")}
                                                    labelClass="fs-5 fw-semibold mb-2"
                                                    type="text"
                                                    placeholder=""
                                                    className="form-control form-control-solidr"
                                                    errorMsg={errors.term?.management_fee_percentage?.message}
                                                />
                                            </div>
                                            <div className="col-md-6 fv-row fv-plugins-icon-container">
                                                <TextInputField
                                                    label="Additional Fees (%)"
                                                    {...register("term.additional_fees")}
                                                    labelClass="fs-5 fw-semibold mb-2"
                                                    type="text"
                                                    placeholder=""
                                                    className="form-control form-control-solidr"
                                                    errorMsg={errors.term?.additional_fees?.message}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </CustomAccordionItem>

                                <CustomAccordionItem title={"Target Performance"} eventKey={"6"} key={"6"} containerClass={`card mb-2 col-lg-8 col-md-12 col-sm-12 p-2`}>
                                    <div className="card-body border-top p-9">
                                        <div className="row mb-5 mt-5">
                                            <div className="col-md-4 fv-row fv-plugins-icon-container">
                                                <TextInputField
                                                    label="Target IRR (%)"
                                                    {...register("target.irr")}
                                                    labelClass="fs-5 fw-semibold mb-2"
                                                    type="text"
                                                    placeholder=""
                                                    className="form-control form-control-solidr"
                                                    errorMsg={errors.target?.irr?.message}
                                                />
                                            </div>
                                            <div className="col-md-4 fv-row fv-plugins-icon-container">
                                                <TextInputField
                                                    label="Target MOIC"
                                                    {...register("target.moic")}
                                                    labelClass="fs-5 fw-semibold mb-2"
                                                    type="text"
                                                    placeholder=""
                                                    className="form-control form-control-solidr"
                                                    errorMsg={errors.target?.moic?.message}
                                                />
                                            </div>
                                            <div className="col-md-4 fv-row fv-plugins-icon-container">
                                                <TextInputField
                                                    label="Target Return (%)"
                                                    {...register("target.return_percentage")}
                                                    labelClass="fs-5 fw-semibold mb-2"
                                                    type="text"
                                                    placeholder=""
                                                    className="form-control form-control-solidr"
                                                    errorMsg={errors.target?.return_percentage?.message}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </CustomAccordionItem>

                                <CustomAccordionItem title={"Fundraising"} eventKey={"7"} key={"7"} containerClass={`card mb-2 col-lg-8 col-md-12 col-sm-12 p-2`}>
                                    <div className="card-body border-top p-9">
                                        <div className="row mb-5 mt-5">
                                            <div className="col-md-6 fv-row fv-plugins-icon-container">
                                                <CurrencyTextField
                                                    label={"Current Raise"}
                                                    {...register("fundraising.current_raise")}
                                                    labelClass={"fs-5 fw-semibold mb-2"}
                                                    className={"form-control form-control-solid"}
                                                    errorMsg={errors.fundraising?.current_raise?.message}
                                                    currencySymbol={currencySymbol}
                                                />
                                            </div>
                                            <div className="col-md-6 fv-row fv-plugins-icon-container">
                                                <CurrencyTextField
                                                    label={"Target Raise"}
                                                    {...register("fundraising.target_raise")}
                                                    labelClass={"required fs-5 fw-semibold mb-2"}
                                                    className={"form-control form-control-solid"}
                                                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                                    errorMsg={errors.fundraising?.target_raise?.message}
                                                    currencySymbol={currencySymbol}
                                                />
                                            </div>
                                        </div>
                                        <div className="row mb-5 mt-5">
                                            <div className="col-md-6 fv-row fv-plugins-icon-container">
                                                <Controller
                                                    name={"fundraising.next_closing"}
                                                    control={control}
                                                    render={({ field: { onChange, value } }: Any) => (
                                                        <FlatPickrInput
                                                            labelClass=""
                                                            placeholder="Pick a date"
                                                            label={"Next Closing"}
                                                            value={value}
                                                            errorMsg={errors.fundraising?.next_closing?.message}
                                                            onChange={(date) => {
                                                                const selectedDate = date?.[0] ? date[0] : null
                                                                const formattedDate = selectedDate ? dayjs(selectedDate).format("YYYY-MM-DD") : ""
                                                                onChange(formattedDate)
                                                                setValue("fundraising.next_closing", formattedDate)
                                                                clearErrors("fundraising.next_closing")
                                                            }}
                                                        />
                                                    )}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </CustomAccordionItem>

                                <CustomAccordionItem title={"Vehicle"} eventKey={"8"} key={"8"} containerClass={`card mb-2 col-lg-8 col-md-12 col-sm-12 p-2`}>
                                    <div className="card-body border-top p-9">
                                        <div className="row mb-5 mt-5">
                                            <div className="col-md-12 fv-row fv-plugins-icon-container">
                                                <TextInputField
                                                    label="Name"
                                                    {...register("vehicle.name")}
                                                    labelClass="fs-5 fw-semibold mb-2"
                                                    type="text"
                                                    placeholder=""
                                                    className="form-control form-control-solidr"
                                                    errorMsg={errors.vehicle?.name?.message}
                                                />
                                            </div>
                                        </div>

                                        <div className="row mb-5 mt-5">
                                            <div className="col-md-6 fv-row fv-plugins-icon-container">
                                                <Label label={"Jurisdiction Country"} labelClass={"fs-5 fw-semibold mb-2"} />
                                                <Controller
                                                    control={control}
                                                    name={"vehicle.jurisdiction_country"}
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
                                                                    setValue("jurisdiction_country_label", option?.label)

                                                                    setValue("vehicle.jurisdiction_states", [])
                                                                } else {
                                                                    field.onChange(null)
                                                                }
                                                            }}
                                                            params={{ type: "country" }}
                                                            selectedOptionValue={field.value}
                                                            placeholder={"Select..."}
                                                        />
                                                    )}
                                                />
                                                <ShowFormError message={errors.vehicle?.jurisdiction_country?.message} />
                                            </div>
                                            {watch("vehicle.jurisdiction_country")?.label === "US" && (
                                                <div className="col-md-6 fv-row fv-plugins-icon-container">
                                                    <Label label={"Jurisdiction State(s)"} labelClass={"fs-5 fw-semibold mb-2"} />
                                                    <Controller
                                                        control={control}
                                                        name={"vehicle.jurisdiction_states"}
                                                        render={({ field }) => (
                                                            <OriginatorSelect
                                                                label=""
                                                                key={watch("vehicle.jurisdiction_country")?.value}
                                                                onSelected={(item: Any) => {
                                                                    if (item && item.length > 0) {
                                                                        const jurisdictionStateData = item.map((option: Any) => ({
                                                                            label: option.name,
                                                                            value: option.id,
                                                                            data: option,
                                                                        }))
                                                                        field.onChange(jurisdictionStateData)
                                                                    } else {
                                                                        field.onChange([])
                                                                    }
                                                                }}
                                                                params={{ type: "jurisdiction_state", parent_id: watch("vehicle.jurisdiction_country")?.value }}
                                                                selectedOptionValue={field.value}
                                                                placeholder={"Select..."}
                                                                isMulti={true}
                                                            />
                                                        )}
                                                    />
                                                    <ShowFormError message={errors.vehicle?.jurisdiction_states?.message} />
                                                </div>
                                            )}
                                        </div>

                                        <div className="row mb-5 mt-5">
                                            <div className="col-md-6 fv-row fv-plugins-icon-container">
                                                <Label label={"Structure"} labelClass={"fs-5 fw-semibold mb-2"} />
                                                <Controller
                                                    control={control}
                                                    name={"vehicle.structure"}
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
                                                            params={{ type: "structure" }}
                                                            selectedOptionValue={field.value}
                                                            placeholder={"Select..."}
                                                        />
                                                    )}
                                                />
                                                <ShowFormError message={errors.vehicle?.structure?.message} />
                                            </div>
                                            <div className="col-md-6 fv-row fv-plugins-icon-container">
                                                <Label label={"Tax Reporting"} labelClass={"fs-5 fw-semibold mb-2"} />
                                                <Controller
                                                    control={control}
                                                    name={"vehicle.tax_reportings"}
                                                    render={({ field }) => (
                                                        <OriginatorSelect
                                                            label=""
                                                            onSelected={(item: Any) => {
                                                                if (item && item.length > 0) {
                                                                    const taxReportingData = item.map((option: Any) => ({
                                                                        label: option.name,
                                                                        value: option.id,
                                                                        data: option,
                                                                    }))
                                                                    field.onChange(taxReportingData)
                                                                } else {
                                                                    field.onChange(null)
                                                                }
                                                            }}
                                                            params={{ type: "tax_reporting" }}
                                                            selectedOptionValue={field.value}
                                                            placeholder={"Select..."}
                                                            isMulti={true}
                                                        />
                                                    )}
                                                />
                                                <ShowFormError message={errors.vehicle?.tax_reportings?.message} />
                                            </div>
                                        </div>

                                        <div className="row mb-5 mt-5">
                                            <div className="col-md-6 fv-row fv-plugins-icon-container">
                                                <Label label={"Investor Type"} labelClass={"fs-5 fw-semibold mb-2"} />
                                                <Controller
                                                    control={control}
                                                    name={"vehicle.investor_types"}
                                                    render={({ field }) => (
                                                        <OriginatorSelect
                                                            label=""
                                                            onSelected={(item: Any) => {
                                                                if (item && item.length > 0) {
                                                                    const investorTypeData = item.map((option: Any) => ({
                                                                        label: option.name,
                                                                        value: option.id,
                                                                        data: option,
                                                                    }))
                                                                    field.onChange(investorTypeData)
                                                                } else {
                                                                    field.onChange(null)
                                                                }
                                                            }}
                                                            params={{ type: "investor_type" }}
                                                            selectedOptionValue={field.value}
                                                            placeholder={"Select..."}
                                                            isMulti={true}
                                                        />
                                                    )}
                                                />
                                                <ShowFormError message={errors.vehicle?.investor_types?.message} />
                                            </div>
                                            <div className="col-md-6 fv-row fv-plugins-icon-container">
                                                <Label label={"Tax Eligibility"} labelClass={"fs-5 fw-semibold mb-2"} />
                                                <Controller
                                                    control={control}
                                                    name={"vehicle.tax_eligibility"}
                                                    render={({ field }) => (
                                                        <CustomReactSelect
                                                            optionsData={CREATE_OPPORTUNITY.TAX_ELIGIBILITY}
                                                            onDropdownChange={(value) => {
                                                                if (value) {
                                                                    field.onChange(value)
                                                                } else {
                                                                    field.onChange(null)
                                                                }
                                                            }}
                                                            placeholder={"Select..."}
                                                            selectedOptionValue={field.value}
                                                        />
                                                    )}
                                                />
                                                <ShowFormError message={errors.vehicle?.tax_eligibility?.message} />
                                            </div>
                                        </div>

                                        <div className="row mb-5 mt-5">
                                            <div className="col-12 fv-row fv-plugins-icon-container">
                                                <div className="form-group">
                                                    <label className="fs-5 fw-semibold mb-2" htmlFor="description">
                                                        Description
                                                    </label>
                                                    <Controller name="vehicle.description" control={control} render={({ field }: Any) => <Editor onBlur={field.onChange} value={field.value} />} />
                                                    {errors.vehicle?.description?.message && <p className="text-danger mt-2">{errors.vehicle?.description?.message}</p>}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </CustomAccordionItem>

                                <CustomAccordionItem title={"Key Documents"} eventKey={"9"} key={"9"} containerClass={`card mb-2 col-lg-8 col-md-12 col-sm-12 p-2`}>
                                    <div className="card-body border-top p-9">
                                        <CustomPdfDropzone
                                            label={"Drop files here or click to upload."}
                                            isRequired={false}
                                            maxSize={5}
                                            onDrop={async (files: File[]) => {
                                                if (docFiles?.length && Array.isArray(docFiles)) {
                                                    setDocFile((prev: Any) => [...prev, ...files])
                                                } else {
                                                    setDocFile([...files])
                                                }
                                                const ids = getValues("files")
                                                const fileId = await handleUploadedFile(files[0])
                                                if (Array.isArray(ids) && ids?.length) {
                                                    setValue("files", [...ids, fileId])
                                                } else if (fileId) {
                                                    setValue("files", [fileId])
                                                }
                                            }}
                                        />

                                        {docFiles && (
                                            <DocFileList
                                                docFiles={docFiles}
                                                setDocFile={setDocFile}
                                                onRemove={(id) => {
                                                    const files = watch("files")
                                                    const updatedFiles = files.filter((item) => item !== id)
                                                    setValue("files", updatedFiles)
                                                }}
                                            />
                                        )}
                                    </div>
                                </CustomAccordionItem>

                                <CustomAccordionItem title={"Placement Economics"} eventKey={"10"} key={"10"} containerClass={`card mb-2 col-lg-8 col-md-12 col-sm-12 p-2`}>
                                    <div className="card-body border-top p-9">
                                        <div className="row mb-5 mt-5">
                                            <div className="col-md-4 fv-row fv-plugins-icon-container">
                                                <TextInputField
                                                    label="Placement Fee (%)"
                                                    {...register("placement.fee")}
                                                    labelClass="required fs-5 fw-semibold mb-2"
                                                    type="text"
                                                    placeholder=""
                                                    className="form-control form-control-solidr"
                                                    errorMsg={errors.placement?.fee?.message}
                                                />
                                            </div>
                                            <div className="col-md-4 fv-row fv-plugins-icon-container">
                                                <TextInputField
                                                    label="Number of Instalments"
                                                    {...register("placement.installments_no")}
                                                    labelClass="required fs-5 fw-semibold mb-2"
                                                    type="text"
                                                    placeholder=""
                                                    className="form-control form-control-solidr"
                                                    errorMsg={errors.placement?.installments_no?.message}
                                                />
                                            </div>
                                            <div className="col-md-4 fv-row fv-plugins-icon-container">
                                                <Label label={"Payment Frequency"} labelClass={"required fs-5 fw-semibold mb-2"} />
                                                <Controller
                                                    control={control}
                                                    name={"placement.payment_frequency"}
                                                    render={({ field }) => (
                                                        <CustomReactSelect
                                                            optionsData={CREATE_OPPORTUNITY.PAYMENT_FREQUENCY}
                                                            onDropdownChange={(value) => {
                                                                if (value) {
                                                                    field.onChange(value)
                                                                } else {
                                                                    field.onChange(null)
                                                                }
                                                            }}
                                                            placeholder={"Select..."}
                                                            selectedOptionValue={field.value}
                                                        />
                                                    )}
                                                />
                                                <ShowFormError message={errors.placement?.payment_frequency?.message} />
                                            </div>
                                        </div>

                                        <div className="row mb-5 mt-5">
                                            <div className="col-md-12 fv-row fv-plugins-icon-container">
                                                <div className="form-group">
                                                    <label className="fs-5 fw-semibold mb-2" htmlFor="additional_information">
                                                        Additional Information
                                                    </label>
                                                    <Controller
                                                        name="placement.additional_information"
                                                        control={control}
                                                        render={({ field }: Any) => <Editor onBlur={field.onChange} value={field.value} />}
                                                    />
                                                    {errors.placement?.additional_information?.message && <p className="text-danger mt-2">{errors.placement?.additional_information?.message}</p>}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </CustomAccordionItem>

                                <CustomAccordionItem title={"Target Raise On Matrix"} eventKey={"11"} key={"11"} containerClass={`card mb-2 col-lg-8 col-md-12 col-sm-12 p-2`}>
                                    <div className="card-body border-top p-9">
                                        <div className="row mb-5 mt-5">
                                            <div className="col-md-12 fv-row fv-plugins-icon-container">
                                                <CurrencyTextField
                                                    label={"Target Amount"}
                                                    {...register("target.amount")}
                                                    labelClass={"fs-5 fw-semibold mb-2"}
                                                    className={"form-control form-control-solid"}
                                                    errorMsg={errors.target?.amount?.message}
                                                    currencySymbol={currencySymbol}
                                                />
                                            </div>
                                        </div>
                                        <div className="row mb-5 mt-5">
                                            <div className="col-md-12 fv-row fv-plugins-icon-container">
                                                <Label label={"Desired Market Coverage"} labelClass={"required fs-5 fw-semibold mb-2"} />
                                                <Controller
                                                    control={control}
                                                    name={"target.market_regions"}
                                                    render={({ field }) => (
                                                        <TargetCreatableSelect
                                                            onSelected={(options: Any) => {
                                                                if (options) {
                                                                    const _options = options?.map((item: Any) => ({ label: item.name, value: item.id, data: item }))
                                                                    field.onChange(_options)
                                                                } else {
                                                                    field.onChange(null)
                                                                }
                                                            }}
                                                            selectedOptionValue={field.value}
                                                            params={{ type: "region" }}
                                                            isMulti={true}
                                                        />
                                                    )}
                                                />
                                                <ShowFormError message={errors.target?.market_regions?.message} />
                                            </div>
                                        </div>
                                    </div>
                                </CustomAccordionItem>

                                <CustomAccordionItem title={"Agent Disclaimer"} eventKey={"12"} key={"12"} containerClass={`card mb-2 col-lg-8 col-md-12 col-sm-12 p-2`}>
                                    <div className="card-body border-top p-9">
                                        <div className="row mb-5 mt-5">
                                            <div className="col-md-12 fv-row fv-plugins-icon-container">
                                                <div className="form-group">
                                                    <label className="required fs-5 fw-semibold mb-2" htmlFor="agent_disclaimer">
                                                        Agent Disclaimer
                                                    </label>
                                                    <Controller name="agent_disclaimer" control={control} render={({ field }) => <Editor onBlur={field.onChange} value={field.value} />} />
                                                    {errors.agent_disclaimer?.message && <p className="text-danger mt-2">{errors.agent_disclaimer?.message}</p>}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </CustomAccordionItem>
                            </CustomAccordion>
                        </TabBody>
                    </div>
                </div>
            </form>
        </>
    )
}

export default AddOpportunity

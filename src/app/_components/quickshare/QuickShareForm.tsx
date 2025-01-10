import React, { useEffect, useState } from "react"
import StickyHeaderComponent from "../common/StickySubHeader"
import Button from "../button/Button"
import { useParams, useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { CONFIG, CREATE_OPPORTUNITY, OPPORTUNITY } from "@/app/_utils/Constants"
import { DraftQuickshareSchema, QuickshareSchema, QuickshareSchemaType } from "@/app/_validations/quickshare/AddEditQuickshare"
import CustomInputDropzone from "../input/CustomInputDropZone"
import { uploadImage } from "@/app/_utils/Backend"
import TextInputField from "../input/TextInput"
import Label from "../input/Label"
import OriginatorSelect from "../input/OriginatorSelect"
import { Any } from "@/app/_types/common/Common"
import ShowFormError from "../common/ShowFormError"
import CurrencySelect from "../input/CurrencySelect"
import CurrencyTextField from "../input/CurrencyInput"
import CustomReactSelect from "../input/ReactSelect"
import FlatPickrInput from "../input/FlatPickrInput"
import dayjs from "dayjs"
import TargetCreatableSelect from "../input/TargetCreatableSelect"
import NetworkSelect from "../input/NetworkSelect"
import { formatDigitCurrency, handleError, removeEmptyKeys, showConfirmationDialog } from "@/app/_utils/Helpers"
import { FetchHelper } from "@/app/_services/FetchHelper"
import { SweetAlertIcon } from "sweetalert2"
import { showSweetAlertWithRedirect } from "@/app/_utils/Common"
import FirmSelect from "../input/FirmSelect"
import KeyContactSelect from "../input/KeyContactSelect"
import DisclaimerBox from "../common/DisclaimerBox"

const QuickShareForm = () => {
    const params = useParams()
    const router = useRouter()
    const [file, setFile] = useState<File | null>(null)
    const [loadingDraft, setLoadingDraft] = useState(false)
    const [currencySymbol, setCurrencySymbol] = useState("€")
    const [singleOpportunityData, setSingleOpportunityData] = useState<Any>()
    const userDetails = JSON.parse(localStorage.getItem(CONFIG.LOCAL_STORAGE_VARIABLES.USER_DETAILS) || "")

    const {
        handleSubmit,
        formState: { isSubmitting, errors },
        setValue,
        register,
        control,
        clearErrors,
        getValues,
        setError,
        watch,
        reset,
    } = useForm<QuickshareSchemaType>({
        resolver: zodResolver(QuickshareSchema),
    })

    const submitHandler = async (data: Any) => {
        let PAYLOAD = { ...data, created_by: userDetails?.user?.id, status: OPPORTUNITY.STATUS_PENDING_DISTRIBUTION, type: OPPORTUNITY.TYPE.QUICK_SHARE }
        try {
            let RequestHelper = FetchHelper.post
            let url = new URL(CONFIG.API_ENDPOINTS.OPPORTUNITY_FORM.ADD_OPPORTUNITY)
            if (params?.id) {
                PAYLOAD = { ...PAYLOAD, id: params?.id } as Any
                RequestHelper = FetchHelper.patch
                url = new URL(`${CONFIG.API_ENDPOINTS.OPPORTUNITY_FORM.ADD_OPPORTUNITY}/${params?.id}`)
            }
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

    const onSaveAsDraft = async () => {
        clearErrors()
        setLoadingDraft(true)
        const PAYLOAD = {
            ...getValues(),
        }
        const validatedData = await DraftQuickshareSchema.safeParseAsync(PAYLOAD)

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
                type: OPPORTUNITY.TYPE.QUICK_SHARE,
            })

            if (response?.status) {
                showSweetAlertWithRedirect({
                    message: CONFIG.MESSAGES.OPPORTUNITY_SAVED_AS_DRAFT_SUCCESSFULLY,
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

    // get data by id and set for edit part
    const getDefaultValues = async () => {
        try {
            const url = new URL(`${CONFIG.API_ENDPOINTS.OPPORTUNITY_FORM.ADD_OPPORTUNITY}/${params?.id}`)
            const response = await FetchHelper.get(url)
            setSingleOpportunityData(response)
            setFile(response?.cover)
            setCurrencySymbol(response?.currency?.symbol)

            const defaultValues = {
                cover: response?.cover,
                name: response?.name,
                firm: { label: response?.firm?.name, value: response?.firm?.id, data: response?.firm },
                investment_type: { label: response?.investment_type?.name, value: response?.investment_type?.id, data: response?.investment_type },
                investment_label: response?.investment_type?.name,
                placement: response?.placement && {
                    ...response?.placement,
                    payment_frequency: response?.placement?.payment_frequency,
                    installments_no: response?.placement?.installments_no?.toString(),
                },
                fund_type: response?.fund_type,
                fund_number: response?.fund_type === "closed" ? response?.fund_number?.toString() : null,
                reference_id: response?.reference_id,
                short_description: response?.short_description,
                region: response?.region && { label: response?.region?.name, value: response?.region.id, data: response?.region },
                networks:
                    response?.networks &&
                    response?.networks.map((item: Any) => {
                        return { label: item.name, value: item.id, data: item }
                    }),
                strategies:
                    response?.strategies &&
                    response?.strategies.map((item: Any) => {
                        return { label: item.name, value: item.id, data: item }
                    }),
                target: response?.target && {
                    ...response?.target,
                    market_regions: response?.target?.market_regions.map((item: Any) => {
                        return { label: item.name, value: item.id, data: item }
                    }),
                    amount: response?.target?.amount?.toString(),
                },
                fundraising: response?.fundraising && {
                    target_raise: response?.fundraising?.target_raise?.toString(),
                },
                estimated_close_date: response?.estimated_close_date,
                currency: { label: response?.currency?.code, value: response?.currency?.id, data: response?.currency },
                contact: response.contact && { label: response?.contact?.name, value: response?.contact?.id, data: response?.contact },
                country: response?.country && { label: response?.country?.name, value: response?.country?.id, data: response?.country },
                asset_class: response?.asset_class && { label: response?.asset_class?.name, value: response?.asset_class?.id, data: response?.asset_class },
            }

            reset({ ...defaultValues })
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
                    title={`${params?.id ? OPPORTUNITY.EDIT : OPPORTUNITY.CREATE} A Quickshare Opportunity`}
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
                        <Button type="button" loading={loadingDraft} title={CONFIG.SAVE_AS_DRAFT} className="btn btn-secondary rounded-0 w-90 my-5 mx-2 fs-7 text-uppercase" onClick={onSaveAsDraft} />
                    )}
                    {singleOpportunityData?.status !== OPPORTUNITY.STATUS_DRAFT && !params?.id && (
                        <Button type="button" loading={loadingDraft} title={CONFIG.SAVE_AS_DRAFT} className="btn btn-secondary rounded-0 w-90 my-5 mx-2 fs-7 text-uppercase" onClick={onSaveAsDraft} />
                    )}
                    <Button
                        loading={isSubmitting}
                        title={singleOpportunityData?.status !== OPPORTUNITY.STATUS_DRAFT && params?.id ? "Save Changes" : "Publish Opportunity"}
                        className="btn bg-black rounded-0 text-white w-90 text-uppercase fs-7 mx-2"
                    />
                </StickyHeaderComponent>
                <div id="kt_app_content_container" className="app-container container-fluid">
                    <div className="row mt-100">
                        <div className="card mb-2 col-lg-7 col-md-12 col-sm-12">
                            <div className="card-header border-0 cursor-pointer" role="button" data-bs-toggle="collapse" aria-expanded="false">
                                <div className="card-title m-0">
                                    <h3 className="fw-bold m-0">Quickshare Details</h3>
                                </div>
                            </div>
                            <div id="02">
                                <div className="card-body border-top p-9">
                                    <div className="fv-row mb-5">
                                        <CustomInputDropzone
                                            label={"Cover Image"}
                                            isRequired={false}
                                            maxSize={5}
                                            setFile={setFile}
                                            file={file}
                                            labelClassName={"required"}
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
                                    <div className="row">
                                        <div className="col-md-12 col-sm-12 fv-row fv-plugins-icon-container mt-5">
                                            <TextInputField
                                                label="Small Description (Max 100 characters) "
                                                {...register("short_description")}
                                                labelClass="required fs-5 fw-semibold mb-2"
                                                type="text"
                                                className="form-control form-control-solidr"
                                                errorMsg={errors.short_description?.message}
                                            />
                                        </div>

                                        <div className="col-md-6 fv-row fv-plugins-icon-container mt-5">
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

                                        <div className="col-md-6 col-sm-6 fv-row fv-plugins-icon-container mt-5">
                                            <TextInputField
                                                label="Opportunity Name "
                                                {...register("name")}
                                                labelClass="required fs-5 fw-semibold mb-2"
                                                type="text"
                                                className="form-control form-control-solidr"
                                                errorMsg={errors.name?.message}
                                            />
                                        </div>

                                        <div className="col-md-6 fv-row fv-plugins-icon-container mt-5">
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
                                                        }}
                                                        selectedOptionValue={field.value}
                                                        params={{ status: "active", hide_other_agents: true }}
                                                        placeholder={"Select..."}
                                                    />
                                                )}
                                            />
                                            <ShowFormError message={errors.firm?.message} />
                                        </div>
                                        <div className="col-md-6 fv-row fv-plugins-icon-container mt-5">
                                            {watch("firm") && (
                                                <>
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
                                                                params={{ firm_id: watch("firm") ? watch("firm").value : "" }}
                                                                key={watch("firm")?.value}
                                                                selectedOptionValue={field.value}
                                                                placeholder={"Select..."}
                                                            />
                                                        )}
                                                    />
                                                    <ShowFormError message={errors.contact?.message} />
                                                </>
                                            )}
                                        </div>

                                        <div className="col-md-6 fv-row fv-plugins-icon-container mt-5">
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

                                        <div className="col-md-6 fv-row fv-plugins-icon-container mt-5">
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

                                        {watch("investment_type")?.label !== "Direct Deal" && (
                                            <div className="col-md-6 fv-row fv-plugins-icon-container mt-5">
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
                                            <div className="col-md-6 fv-row fv-plugins-icon-container mt-5">
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

                                        <div className="col-md-6 fv-row fv-plugins-icon-container mt-5">
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
                                        <div className="col-md-6 col-sm-6 fv-row fv-plugins-icon-container mt-5">
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

                                        <div>
                                            <h3 className="fw-bold mt-5">Geographical Focus</h3>
                                            <div className="row">
                                                <div className="col-md-6 col-sm-6 fv-row fv-plugins-icon-container mt-2">
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
                                                <div className="col-md-6 col-sm-6 fv-row fv-plugins-icon-container mt-2">
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
                                        </div>

                                        <div className="col-md-6 fv-row fv-plugins-icon-container mt-5">
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

                                        <div className="col-md-6 fv-row fv-plugins-icon-container mt-5">
                                            <CurrencyTextField
                                                label={"Target Raise"}
                                                {...register("fundraising.target_raise")}
                                                labelClass={"required fs-5 fw-semibold mb-2"}
                                                className={"form-control form-control-solid"}
                                                errorMsg={errors.fundraising?.target_raise?.message}
                                                currencySymbol={currencySymbol}
                                            />
                                        </div>

                                        <div className="col-md-6 col-sm-6 fv-row fv-plugins-icon-container mt-5">
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

                                        <div className="col-md-6 col-sm-6 fv-row fv-plugins-icon-container mt-5">
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

                                        <div className="col-md-6 col-sm-6 fv-row fv-plugins-icon-container mt-5">
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

                                        <div className="col-md-6 col-sm-6 fv-row fv-plugins-icon-container mt-5">
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

                                        <div className="col-md-6 col-sm-6 fv-row fv-plugins-icon-container mt-5">
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
                                        <div className="col-md-6 col-sm-6 fv-row fv-plugins-icon-container mt-5">
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

                                        <div className="col-md-6 fv-row fv-plugins-icon-container mt-5">
                                            <Label label="Network" isRequired />
                                            <Controller
                                                control={control}
                                                name="networks"
                                                render={({ field }) => (
                                                    <NetworkSelect
                                                        label=""
                                                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                                        onSelected={(options: Any) => {
                                                            if (options) {
                                                                const _options = options?.map((item: Any) => ({ label: item.name, value: item.id, data: item }))
                                                                field.onChange(_options)
                                                            } else {
                                                                field.onChange(null)
                                                            }
                                                        }}
                                                        placeholder="Select network"
                                                        selectedOptionValue={field.value}
                                                        // isDisabled={!isPlatformAdmin()}
                                                        isMulti
                                                    />
                                                )}
                                            />
                                            <ShowFormError message={errors.networks?.message?.toString()} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="card mb-2 col-lg-5 col-md-12 col-sm-12">
                            <div className="card-header border-0 cursor-pointer" role="button" data-bs-toggle="collapse" aria-expanded="false">
                                <div className="card-title m-0">
                                    <h3 className="fw-bold m-0">Quickshare Preview</h3>
                                </div>
                            </div>
                            <div id="02">
                                <div className="card-body border-top p-9">
                                    <div className="row">
                                        <p> This is a preview of how your Quickshare opportunity will appear to Agents </p>
                                    </div>

                                    <div className="col-sm-12 col-xl-12 mb-xl-1 rounded-1" style={{ border: "1px solid #e3e3e3" }}>
                                        <div className="card h-lg-100">
                                            <div className="card-body d-flex justify-content-between align-items-start flex-column p-5">
                                                <div className="m-0 w-100">
                                                    <img src={watch("cover")?.original ?? "/assets/media/cover/cover.jpg"} className="w-100 rounded" />
                                                </div>

                                                <div className="d-flex flex-column my-7">
                                                    <div id="displaySection" className="display-section row">
                                                        <span className="fw-bold fs-3 text-gray-800 lh-1 ff-playfair">{watch("firm") ? watch("firm").label : "-"}</span>
                                                        <p className="mt-5">{watch("short_description") ? watch("short_description") : "-"}</p>
                                                        <div className="d-flex mt-5 w-100 col-12 ">
                                                            <div className="border border-gray-300 border-dashed rounded  w-100   py-2 px-2 mb-3 me-6">
                                                                <div className="fw-semibold text-gray-500 fs-7">Investment Type</div>
                                                                <span className="fs-7 text-gray-700 fw-bold">
                                                                    {watch("investment_type") && watch("investment_type").label ? watch("investment_type").label : "-"}{" "}
                                                                </span>
                                                            </div>
                                                            <div className="border border-gray-300 border-dashed rounded w-100 py-2 px-2 mb-3 me-6">
                                                                <div className="fw-semibold text-gray-500 fs-7">Asset Class</div>
                                                                <span className="fs-7 text-gray-700 fw-bold">
                                                                    {watch("asset_class") && watch("asset_class").label ? watch("asset_class").label : "-"}
                                                                </span>
                                                            </div>
                                                        </div>
                                                        <div className="d-flex mt-5 w-100 col-12">
                                                            <div className="border border-gray-300 border-dashed rounded   w-100   py-2 px-2 mb-3 me-6">
                                                                <div className="fw-semibold text-gray-500 fs-7">Strategy</div>
                                                                <span className="fs-7 text-gray-700 fw-bold">
                                                                    {" "}
                                                                    {watch("strategies") && watch("strategies").length
                                                                        ? watch("strategies")
                                                                              ?.map((item) => item.label)
                                                                              .join(", ")
                                                                        : "-"}
                                                                </span>
                                                            </div>
                                                            <div className="border border-gray-300 border-dashed rounded   w-100 py-2 px-2 mb-3 me-6">
                                                                <div className="fw-semibold text-gray-500 fs-7">Fund #</div>
                                                                <span className="fs-7 text-gray-700 fw-bold">{watch("fund_number") ? watch("fund_number") : "-"}</span>
                                                            </div>
                                                        </div>

                                                        <div className="d-flex mt-5 w-100 col-12">
                                                            <div className="border border-gray-300 border-dashed rounded   w-100  py-2 px-2 mb-3 me-6">
                                                                <div className="fw-semibold text-gray-500 fs-7">Target Raise</div>
                                                                <span className="fs-7 text-gray-700 fw-bold">
                                                                    {watch("fundraising.target_raise") ? formatDigitCurrency(+watch("fundraising.target_raise")) : "-"}
                                                                </span>
                                                            </div>

                                                            <div className="border border-gray-300 border-dashed rounded    w-100  py-2 px-2 mb-3 me-6">
                                                                <div className="fw-semibold text-gray-500 fs-7">Target IRR / MOIC</div>
                                                                <span className="fs-7 text-gray-700 fw-bold">
                                                                    {watch("target.moic") || watch("target.irr") ? `${watch("target.irr")} / ${watch("target.moic")}` : "-"}
                                                                </span>
                                                            </div>
                                                        </div>

                                                        <div className="d-flex mt-5 w-100 col-12 ">
                                                            <div className="border border-gray-300 border-dashed rounded   w-100  py-2 px-2 mb-3 me-6">
                                                                <div className="fw-semibold text-gray-500 fs-7">Placement Fee</div>
                                                                <span className="fs-7 text-gray-700 fw-bold">{watch("placement.fee") ? watch("placement.fee") : "-"}</span>
                                                            </div>

                                                            <div className="border border-gray-300 border-dashed rounded   w-100  py-2 px-2 mb-3 me-6">
                                                                <div className="fw-semibold text-gray-500 fs-7">Estimated Close Date</div>
                                                                <span className="fs-7 text-gray-700 fw-bold">{watch("estimated_close_date") ? watch("estimated_close_date") : "-"}</span>
                                                            </div>
                                                        </div>

                                                        <div className="d-flex mt-5 w-100 col-12 ">
                                                            <div className="border border-gray-300 border-dashed rounded  w-100   py-2 px-2 mb-3 me-6">
                                                                <div className="fw-semibold text-gray-500 fs-7">Desired Market Coverage</div>
                                                                <span className="fs-7 text-gray-700 fw-bold">
                                                                    {watch("target.market_regions") && watch("target.market_regions").length
                                                                        ? watch("target.market_regions")
                                                                              ?.map((item) => item.label)
                                                                              .join(", ")
                                                                        : "-"}
                                                                </span>
                                                            </div>
                                                            <div className="border border-gray-300 border-dashed rounded w-100 py-2 px-2 mb-3 me-6">
                                                                <div className="fw-semibold text-gray-500 fs-7">Geographical Focus</div>
                                                                <span className="fs-7 text-gray-700 fw-bold">{watch("region") && watch("region").label ? watch("region").label : "-"}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
            <DisclaimerBox />
        </>
    )
}

export default QuickShareForm

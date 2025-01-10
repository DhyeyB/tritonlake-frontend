import React from "react"
import StickyHeaderComponent from "../common/StickySubHeader"
import Button from "../button/Button"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { CONFIG, OPPORTUNITY } from "@/app/_utils/Constants"
import TextInputField from "../input/TextInput"
import Label from "../input/Label"
import OriginatorSelect from "../input/OriginatorSelect"
import { Any } from "@/app/_types/common/Common"
import ShowFormError from "../common/ShowFormError"
import FlatPickrInput from "../input/FlatPickrInput"
import dayjs from "dayjs"
import NetworkSelect from "../input/NetworkSelect"
import { handleError } from "@/app/_utils/Helpers"
import { FetchHelper } from "@/app/_services/FetchHelper"
import { SweetAlertIcon } from "sweetalert2"
import { showSweetAlertWithRedirect } from "@/app/_utils/Common"
import DisclaimerBox from "../common/DisclaimerBox"
import TextAreaField from "../input/TextArea"
import RangeInputField from "../input/RangeInputField"
import { QuicksearchSchema, QuicksearchSchemaType } from "@/app/_validations/quicksearch/QuicksearchSchema"
import FirmSelect from "../input/FirmSelect"

const QuickSearchForm = () => {
    const router = useRouter()
    const userDetails = JSON.parse(localStorage.getItem(CONFIG.LOCAL_STORAGE_VARIABLES.USER_DETAILS) || "")

    const {
        handleSubmit,
        formState: { isSubmitting, errors },
        setValue,
        register,
        control,
        clearErrors,
    } = useForm<QuicksearchSchemaType>({
        resolver: zodResolver(QuicksearchSchema),
    })

    const submitHandler = async (data: Any) => {
        const PAYLOAD = { ...data, created_by: userDetails?.user?.id, type: OPPORTUNITY.TYPE.QUICK_SEARCH, status: OPPORTUNITY.STATUS_LIVE }
        try {
            const RequestHelper = FetchHelper.post
            const url = new URL(CONFIG.API_ENDPOINTS.OPPORTUNITY_FORM.QUICK_SEARCH)
            const response = await RequestHelper(url, PAYLOAD)
            if (response && response?.id) {
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

    return (
        <>
            <form onSubmit={handleSubmit(submitHandler)}>
                <StickyHeaderComponent title={`${OPPORTUNITY.CREATE} A Quicksearch`} showBackArrow={true} showButton={true} backLink={CONFIG.REDIRECT_PATHNAME.OPPORTUNITIES}>
                    <Button loading={isSubmitting} title={"Publish Opportunity"} className="btn bg-black rounded-0 text-white w-90 text-uppercase fs-7 mx-2" />
                </StickyHeaderComponent>
                <div id="kt_app_content_container" className="app-container container-fluid">
                    <div className="row mt-100">
                        <div className="card mb-2 col-lg-7 col-md-12 col-sm-12">
                            <div className="card-header border-0 cursor-pointer" role="button" data-bs-toggle="collapse" aria-expanded="false">
                                <div className="card-title m-0">
                                    <h3 className="fw-bold m-0">Quicksearch Details</h3>
                                </div>
                            </div>
                            <div id="02">
                                <div className="card-body border-top p-9">
                                    <div className="row">
                                        <div className="col-md-12 mb-5">
                                            <TextAreaField
                                                label="Summary"
                                                {...register("summary")}
                                                labelClassName="required fs-5 fw-semibold mb-2"
                                                placeholder=""
                                                className="form-control form-control-solidr"
                                                errorMsg={errors.summary?.message}
                                            />
                                        </div>
                                        <div className="col-md-6 mb-5">
                                            <Label label={"LP Type"} labelClass={"required fs-5 fw-semibold mb-2"} />
                                            <Controller
                                                control={control}
                                                name={"lp_type"}
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
                                                        params={{ type: "network_lp_type" }}
                                                        selectedOptionValue={field.value}
                                                        placeholder={"Select..."}
                                                    />
                                                )}
                                            />
                                            <ShowFormError message={errors.lp_type?.message} />
                                        </div>

                                        <div className="col-md-6 mb-5">
                                            <Label label={"LP Location"} labelClass={"required fs-5 fw-semibold mb-2"} />
                                            <Controller
                                                control={control}
                                                name={"lp_location"}
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
                                                        params={{ type: "country" }}
                                                        selectedOptionValue={field.value}
                                                        placeholder={"Select..."}
                                                    />
                                                )}
                                            />
                                            <ShowFormError message={errors.lp_location?.message} />
                                        </div>

                                        <div className="col-md-6 mb-5">
                                            <Label label={"Asset Class"} labelClass={"required fs-5 fw-semibold mb-2"} />
                                            <Controller
                                                control={control}
                                                name={"asset_classes"}
                                                render={({ field }) => (
                                                    <OriginatorSelect
                                                        label=""
                                                        onSelected={(item: Any) => {
                                                            if (item && item.length > 0) {
                                                                const assetData = item.map((option: Any) => ({
                                                                    label: option.name,
                                                                    value: option.id,
                                                                    data: option,
                                                                }))
                                                                field.onChange(assetData)
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
                                            <ShowFormError message={errors.asset_classes?.message} />
                                        </div>

                                        <div className="col-md-6 mb-5">
                                            <Label label={"Strategy"} labelClass={"required fs-5 fw-semibold mb-2"} />
                                            <Controller
                                                control={control}
                                                name={"strategies"}
                                                render={({ field }) => (
                                                    <OriginatorSelect
                                                        label=""
                                                        onSelected={(item: Any) => {
                                                            if (item && item.length > 0) {
                                                                const strategyData = item.map((option: Any) => ({
                                                                    label: option.name,
                                                                    value: option.id,
                                                                    data: option,
                                                                }))
                                                                field.onChange(strategyData)
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

                                        <div className="col-md-6 mb-5">
                                            <Label label={"Geographical Focus (Region)"} labelClass={"required fs-5 fw-semibold mb-2"} />
                                            <Controller
                                                control={control}
                                                name={"geographical_regions"}
                                                render={({ field }) => (
                                                    <OriginatorSelect
                                                        label=""
                                                        onSelected={(item: Any) => {
                                                            if (item && item.length > 0) {
                                                                const regionsData = item.map((option: Any) => ({
                                                                    label: option.name,
                                                                    value: option.id,
                                                                    data: option,
                                                                }))
                                                                field.onChange(regionsData)
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
                                            <ShowFormError message={errors.geographical_regions?.message} />
                                        </div>

                                        <div className="col-md-6 mb-5">
                                            <Label label={"Industry"} labelClass={"required fs-5 fw-semibold mb-2"} />
                                            <Controller
                                                control={control}
                                                name={"industries"}
                                                render={({ field }) => (
                                                    <OriginatorSelect
                                                        label=""
                                                        onSelected={(item: Any) => {
                                                            if (item && item.length > 0) {
                                                                const industryData = item.map((option: Any) => ({
                                                                    label: option.name,
                                                                    value: option.id,
                                                                    data: option,
                                                                }))
                                                                field.onChange(industryData)
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

                                        <div className="col-md-6 mb-5">
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

                                        <div className="col-md-6 mb-5">
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

                                        <div className="col-md-6 mb-5">
                                            <Controller
                                                name={"valid_until"}
                                                control={control}
                                                render={({ field: { onChange, value } }) => (
                                                    <FlatPickrInput
                                                        placeholder="Pick a date"
                                                        label={"Search Valid Until"}
                                                        labelClass="required"
                                                        errorMsg={errors.valid_until?.message}
                                                        value={value}
                                                        onChange={(date) => {
                                                            const selectedDate = date?.[0] ? date[0] : null
                                                            const formattedDate = selectedDate ? dayjs(selectedDate).format("YYYY-MM-DD") : ""
                                                            onChange(formattedDate) // Set the form value
                                                            setValue("valid_until", formattedDate) // Update form value in React Hook Form
                                                            clearErrors("valid_until") // Clear errors
                                                        }}
                                                    />
                                                )}
                                            />
                                        </div>

                                        <div className="col-md-6 col-sm-6 fv-row fv-plugins-icon-container mb-5">
                                            <TextInputField
                                                label="Target IRR (%)"
                                                {...register("target_irr")}
                                                labelClass="fs-5 fw-semibold mb-2"
                                                type="text"
                                                placeholder=""
                                                className="form-control form-control-solidr"
                                                errorMsg={errors.target_irr?.message}
                                            />
                                        </div>
                                        <div className="col-md-6 col-sm-6 fv-row fv-plugins-icon-container mb-5">
                                            <TextInputField
                                                label="Target MOIC"
                                                {...register("target_moic")}
                                                labelClass="fs-5 fw-semibold mb-2"
                                                type="text"
                                                placeholder=""
                                                className="form-control form-control-solidr"
                                                errorMsg={errors.target_moic?.message}
                                            />
                                        </div>
                                        <div className="col-md-6 mb-5">
                                            {" "}
                                            <Label label="Fund #" labelClass={"fs-5 fw-semibold mb-2"} />
                                            <div className="row">
                                                <div className="input-group input-group-solid mb-5 col-md-3 col-sm-3 col-lg-3">
                                                    <RangeInputField label="" {...register("fund_number_min")} errorMsg={errors.fund_number_min?.message} />
                                                </div>
                                                <div className="input-group input-group-solid mb-5 col-md-3  col-sm-3 col-lg-3">
                                                    <RangeInputField label="" rangeLabel="High Value" {...register("fund_number_max")} errorMsg={errors.fund_number_max?.message} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-6 mb-5">
                                            {" "}
                                            <Label label="Target Fund/Deal Size ($)" labelClass={"fs-5 fw-semibold mb-2"} />
                                            <div className="row">
                                                <div className="input-group input-group-solid mb-5 col-md-3 col-sm-3 col-lg-3">
                                                    <RangeInputField label="" {...register("deal_size_min")} errorMsg={errors.deal_size_min?.message} />
                                                </div>
                                                <div className="input-group input-group-solid mb-5 col-md-3  col-sm-3 col-lg-3">
                                                    <RangeInputField label="" rangeLabel="High Value" {...register("deal_size_max")} errorMsg={errors.deal_size_max?.message} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-6 mb-5">
                                            {" "}
                                            <Label label="Bite Size ($)" labelClass={"fs-5 fw-semibold mb-2"} />
                                            <div className="row">
                                                <div className="input-group input-group-solid mb-5 col-md-3 col-sm-3 col-lg-3">
                                                    <RangeInputField label="" {...register("bite_size_min")} errorMsg={errors.bite_size_min?.message} />
                                                </div>
                                                <div className="input-group input-group-solid mb-5 col-md-3  col-sm-3 col-lg-3">
                                                    <RangeInputField label="" rangeLabel="High Value" {...register("bite_size_max")} errorMsg={errors.bite_size_max?.message} />
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

export default QuickSearchForm

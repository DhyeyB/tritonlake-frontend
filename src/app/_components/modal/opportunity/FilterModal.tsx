import React, { useEffect } from "react"
import { Modal } from "react-bootstrap"
import OriginatorSelect from "@/app/_components/input/OriginatorSelect"
import FirmSelect from "@/app/_components/input/FirmSelect"
import CustomSlider from "@/app/_components/common/CustomSlider"
import { defaultFilterOptions, defaultModalFilterOptions, FilterState, ModalFilterState } from "@/app/_types/common/OpportunityListModalFilter"
import { Any } from "@/app/_types/common/Common"
import TabBody from "../../common/TabBody"

interface FilterModalProps {
    showModalFilters: ModalFilterState
    filter: FilterState
    setShowModalFilters: React.Dispatch<React.SetStateAction<ModalFilterState>>
    showFilterModal: boolean
    setShowFilterModal: React.Dispatch<React.SetStateAction<boolean>>
    setIsFiltersApplied: React.Dispatch<React.SetStateAction<boolean>>
    getOpportunityListing?: () => void
}

const FilterModal: React.FC<FilterModalProps> = ({ showModalFilters, setShowModalFilters, showFilterModal, setShowFilterModal, getOpportunityListing, filter, setIsFiltersApplied }) => {
    // Utility function to check if filters differ from default values
    const hasFiltersApplied = () => {
        const isDefaultModalFilters = JSON.stringify(showModalFilters) === JSON.stringify(defaultModalFilterOptions)
        const isDefaultFilters = JSON.stringify(filter) === JSON.stringify(defaultFilterOptions)
        return !(isDefaultModalFilters && isDefaultFilters)
    }

    // Update button state whenever filters change
    useEffect(() => {
        setIsFiltersApplied(!hasFiltersApplied())
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filter, showModalFilters])
    return (
        <Modal show={showFilterModal} onHide={() => setShowFilterModal(false)} size="xl">
            <Modal.Header closeButton className="my-3">
                <Modal.Title> Filter Opportunity</Modal.Title>
            </Modal.Header>

            <TabBody stopVh rowCount={12}>
                <div className="row p-10">
                    {/* Sponsor/GP name, Originator Name, Opportunity Type */}
                    <div className="col-lg-4 col-md-12 col-sm-12 mb-10">
                        <h4>Sponsor/GP name</h4>
                        <div className="d-flex align-items-center position-relative">
                            <input
                                type="text"
                                data-kt-inbox-listing-filter="search"
                                className="form-control form-control-solid rounded-0 border-0"
                                placeholder="Search Opportunities"
                                value={showModalFilters.sponsor_name}
                                onChange={(e) => {
                                    setShowModalFilters((prev) => ({ ...prev, sponsor_name: e.target.value }))
                                }}
                            />
                        </div>
                    </div>

                    <div className="col-lg-4 col-md-12 col-sm-12 mb-10">
                        <h4>Originator Name</h4>
                        <FirmSelect
                            label=""
                            onSelected={(items: Any) => {
                                if (items?.length) {
                                    const options = items.map((item: Any) => ({
                                        label: item.name,
                                        value: item.id,
                                        data: item,
                                    }))
                                    setShowModalFilters((prev) => ({ ...prev, originators: options }))
                                } else {
                                    setShowModalFilters((prev) => ({ ...prev, originators: [] }))
                                }
                            }}
                            selectedOptionValue={showModalFilters.originators}
                            params={{ type: "region" }}
                            placeholder={"Select..."}
                            isMulti
                        />
                    </div>

                    <div className="col-lg-4 col-md-12 col-sm-12 mb-10">
                        <h4>Investment Type</h4>
                        <OriginatorSelect
                            label=""
                            onSelected={(item: Any) => {
                                if (item?.id) {
                                    const option = {
                                        label: item.name,
                                        value: item.id,
                                        data: item,
                                    }
                                    setShowModalFilters((prev) => ({ ...prev, investment_type: option }))
                                } else {
                                    setShowModalFilters((prev) => ({ ...prev, investment_type: "" }))
                                }
                            }}
                            params={{ type: "investment_type" }}
                            selectedOptionValue={showModalFilters.investment_type}
                            placeholder={"Select..."}
                        />
                    </div>

                    <div className="col-lg-4 col-md-12 col-sm-12 mb-10">
                        <h4>Asset Classes</h4>
                        <OriginatorSelect
                            label=""
                            onSelected={(items: Any) => {
                                if (items?.length) {
                                    const options = items.map((item: Any) => ({
                                        label: item.name,
                                        value: item.id,
                                        data: item,
                                    }))
                                    setShowModalFilters((prev) => ({ ...prev, asset_class: options }))
                                } else {
                                    setShowModalFilters((prev) => ({ ...prev, asset_class: [] }))
                                }
                            }}
                            params={{ type: "asset_class" }}
                            selectedOptionValue={showModalFilters.asset_class}
                            placeholder={"Select..."}
                            isMulti
                        />
                    </div>

                    <div className="col-lg-4 col-md-12 col-sm-12 mb-10">
                        <h4>Strategy</h4>
                        <OriginatorSelect
                            label=""
                            onSelected={(items: Any) => {
                                if (items?.length) {
                                    const options = items.map((item: Any) => ({
                                        label: item.name,
                                        value: item.id,
                                        data: item,
                                    }))
                                    setShowModalFilters((prev) => ({ ...prev, strategies: options }))
                                } else {
                                    setShowModalFilters((prev) => ({ ...prev, strategies: [] }))
                                }
                            }}
                            params={{ type: "strategy" }}
                            selectedOptionValue={showModalFilters.strategies}
                            placeholder={"Select..."}
                            isMulti
                        />
                    </div>

                    {/* Market for Distribution, Geographical focus, Industry, Days left */}
                    <div className="col-lg-4 col-md-12 col-sm-12 mb-10">
                        <h4>Market for Distribution</h4>
                        <OriginatorSelect
                            label=""
                            onSelected={(items: Any) => {
                                if (items?.length) {
                                    const options = items.map((item: Any) => ({
                                        label: item.name,
                                        value: item.id,
                                        data: item,
                                    }))
                                    setShowModalFilters((prev) => ({ ...prev, markets: options }))
                                } else {
                                    setShowModalFilters((prev) => ({ ...prev, markets: [] }))
                                }
                            }}
                            params={{ type: "region" }}
                            selectedOptionValue={showModalFilters.markets}
                            placeholder={"Select..."}
                            isMulti
                        />
                    </div>

                    <div className="col-lg-4 col-md-12 col-sm-12 mb-10">
                        <h4>Geographical focus</h4>
                        <OriginatorSelect
                            label=""
                            onSelected={(items: Any) => {
                                if (items?.length) {
                                    const options = items.map((item: Any) => ({
                                        label: item.name,
                                        value: item.id,
                                        data: item,
                                    }))
                                    setShowModalFilters((prev) => ({ ...prev, countries: options }))
                                } else {
                                    setShowModalFilters((prev) => ({ ...prev, countries: [] }))
                                }
                            }}
                            params={{ type: "region" }}
                            selectedOptionValue={showModalFilters.countries}
                            placeholder={"Select..."}
                            isMulti
                        />
                    </div>

                    <div className="col-lg-4 col-md-12 col-sm-12 mb-10">
                        <h4>Industry</h4>
                        <OriginatorSelect
                            label=""
                            onSelected={(items: Any) => {
                                if (items?.length) {
                                    const options = items.map((item: Any) => ({
                                        label: item.name,
                                        value: item.id,
                                        data: item,
                                    }))
                                    setShowModalFilters((prev) => ({ ...prev, industries: options }))
                                } else {
                                    setShowModalFilters((prev) => ({ ...prev, industries: [] }))
                                }
                            }}
                            params={{ type: "industry" }}
                            selectedOptionValue={showModalFilters.industries}
                            placeholder={"Select..."}
                            isMulti
                        />
                    </div>

                    {/* Total Raise Amount, Target Raise on Matrix Amount, Asset Classes, Strategy */}
                    <div className="col-lg-4 col-md-12 col-sm-12 mb-10">
                        <h4>Total Raise Amount</h4>
                        <div className="mb-0">
                            <div id="kt_slider_soft_limits">
                                <CustomSlider
                                    min={10000}
                                    max={1000000}
                                    defaultValue={[
                                        showModalFilters.total_raise_amount_min > 0 ? showModalFilters.total_raise_amount_min : 10000,
                                        showModalFilters.total_raise_amount_max > 0 ? showModalFilters.total_raise_amount_max : 150000,
                                    ]}
                                    isRange
                                    onChange={(value) => setShowModalFilters((prev) => ({ ...prev, total_raise_amount_min: value[0], total_raise_amount_max: value[1] }))}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-4 col-md-12 col-sm-12 mb-10">
                        <h4>Target Raise on Matrix Amount</h4>
                        <div className="mb-0">
                            <div id="kt_slider_soft_limits">
                                <CustomSlider
                                    min={10000}
                                    max={1000000}
                                    defaultValue={[
                                        showModalFilters.target_raise_on_matrix_min > 0 ? showModalFilters.target_raise_on_matrix_min : 10000,
                                        showModalFilters.target_raise_on_matrix_max > 0 ? showModalFilters.target_raise_on_matrix_max : 150000,
                                    ]}
                                    isRange
                                    onChange={(value) => setShowModalFilters((prev) => ({ ...prev, target_raise_on_matrix_min: value[0], target_raise_on_matrix_max: value[1] }))}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-4 col-md-12 col-sm-12 mb-10">
                        <h4>Days left</h4>
                        <div className="mb-0">
                            <div id="kt_slider_soft_limits">
                                <CustomSlider min={0} max={100} defaultValue={showModalFilters.days_left} onChange={(value) => setShowModalFilters((prev) => ({ ...prev, days_left: value }))} />
                            </div>
                        </div>
                    </div>
                </div>
            </TabBody>

            <Modal.Footer>
                <div className={`justify-content-end`}>
                    <button type="button" className="btn btn-light me-3" onClick={() => setShowFilterModal(false)}>
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="btn btn-primary custom-button-height"
                        onClick={() => {
                            setShowFilterModal(false)
                            if (getOpportunityListing) {
                                getOpportunityListing()
                            }
                        }}
                    >
                        Save Changes
                    </button>
                </div>
            </Modal.Footer>
        </Modal>
    )
}

export default FilterModal

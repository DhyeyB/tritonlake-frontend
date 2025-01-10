import { Any } from "@/app/_types/common/Common"
import { QuickSearchDetailProps } from "@/app/_types/common/QuickSearchExpandable"
import { formatDigitCurrency } from "@/app/_utils/Helpers"
import React from "react"

const QuickSearchExpandedRow: React.FC<QuickSearchDetailProps> = ({ quickSearchDetail }) => {
    return (
        <tr className="border-bottom-0">
            <td className="bg-secondary p-10 rounded rounded-end-0 rounded-start-0" colSpan={7}>
                <div className="row text-start">
                    <div className="col-lg-2 col-md-2 col-sm-6">
                        <div className="mb-10">
                            <label className="form-label">Fund # (Low)</label>
                            <p>{quickSearchDetail?.fund_number_min ? formatDigitCurrency(quickSearchDetail?.fund_number_min) : "-"}</p>
                        </div>
                    </div>
                    <div className="col-lg-2 col-md-2 col-sm-6">
                        <div className="mb-10 text-wrap">
                            <label className="form-label">Geography</label>
                            <br />
                            {quickSearchDetail && quickSearchDetail?.geographical_regions?.length > 0
                                ? quickSearchDetail?.geographical_regions?.map((item: Any) => (
                                      <span key={item.id} className="badge badge-rounded badge-white text-dark me-2">
                                          {item.name}
                                      </span>
                                  ))
                                : "-"}
                        </div>
                    </div>
                    <div className="col-lg-2 col-md-2 col-sm-6">
                        <div className="mb-10">
                            <label className="form-label">Target Fund Size (Low)</label>
                            <p>{quickSearchDetail?.deal_size_min ? formatDigitCurrency(quickSearchDetail?.deal_size_min) : "-"}</p>
                        </div>
                    </div>
                    <div className="col-lg-2 col-md-2 col-sm-6">
                        <div className="mb-10">
                            <label className="form-label">Bite Size (Low)</label>
                            <p>{quickSearchDetail?.bite_size_min ? formatDigitCurrency(quickSearchDetail?.bite_size_min) : "-"}</p>
                        </div>
                    </div>
                    <div className="col-lg-2 col-md-2 col-sm-6">
                        <div className="mb-10">
                            <label className="form-label">Target IRR / MOIC</label>
                            <p>
                                {quickSearchDetail?.target_irr ? `${quickSearchDetail?.target_irr}%` : "-"} / {quickSearchDetail?.target_moic ? `${quickSearchDetail?.target_moic}` : "-"}
                            </p>
                        </div>
                    </div>
                </div>
                <div className="row text-start">
                    <div className="col-lg-2 col-md-2 col-sm-6">
                        <div className="mb-10">
                            <label className="form-label">Fund # (High)</label>
                            <p>{quickSearchDetail?.fund_number_max ? formatDigitCurrency(quickSearchDetail?.fund_number_max) : "-"}</p>
                        </div>
                    </div>
                    <div className="col-lg-2 col-md-2 col-sm-6">
                        <div className="mb-10 text-wrap">
                            <label className="form-label">Industry</label>
                            {quickSearchDetail?.industries.length > 0 ? <p>{quickSearchDetail?.industries?.map((industry: Any) => industry?.name).join(", ")}</p> : "-"}
                        </div>
                    </div>
                    <div className="col-lg-2 col-md-2 col-sm-6">
                        <div className="mb-10">
                            <label className="form-label">Target Fund Size (High)</label>
                            <p>{quickSearchDetail?.deal_size_max ? formatDigitCurrency(quickSearchDetail?.deal_size_max) : "-"}</p>
                        </div>
                    </div>
                    <div className="col-lg-2 col-md-2 col-sm-6">
                        <div className="mb-10">
                            <label className="form-label">Bite Size (High)</label>
                            <p>{quickSearchDetail?.bite_size_max ? formatDigitCurrency(quickSearchDetail?.bite_size_max) : "-"}</p>
                        </div>
                    </div>
                </div>
            </td>
        </tr>
    )
}

export default QuickSearchExpandedRow

"use client"
import { OpportunityHeaderProps } from "@/app/_types/common/OpportunityHeader"

const OpportunityHeader: React.FC<OpportunityHeaderProps> = ({ title, subtitle, children }) => {
    return (
        <div className="card-header border-0 pt-5 px-8">
            {/* Title and Subtitle */}
            <h1 className="card-title align-items-start flex-column">
                <span className="card-label fw-bold text-dark fs-2 ls-m3">
                    {title}
                    <br />
                    <p className="fs-6 text-muted">{subtitle}</p>
                </span>
            </h1>

            <div className="card-toolbar">
                <div className="d-flex align-items-center gap-2 gap-lg-3 flex-wrap">{children}</div>
            </div>
        </div>
    )
}

export default OpportunityHeader

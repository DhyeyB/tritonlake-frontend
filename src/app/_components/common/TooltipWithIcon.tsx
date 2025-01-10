import React from "react"
import Icon from "./Icon"
import CustomTooltip from "./CustomTooltip"
import { TooltipWithIconPropType } from "@/app/_types/common/TooltipWithIcon"

const TooltipWithIcon: React.FC<TooltipWithIconPropType> = ({ toolTipMessage, tooltipId, icon = "info", width = 16, height = 16 }) => {
    return (
        <>
            <span className="ms-2" data-bs-toggle="tooltip" data-tooltip-id={tooltipId} data-tooltip-content={toolTipMessage}>
                <Icon iconName={icon} width={width} height={height} />
            </span>
            <CustomTooltip id={tooltipId} className="shadow-sm border-1 rounded text-capitalize" />
        </>
    )
}

export default TooltipWithIcon

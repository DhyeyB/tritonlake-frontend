import React, { HTMLAttributes } from "react"
import { Tooltip, TooltipRefProps } from "react-tooltip"

/**
 * CustomTooltip component.
 *
 * This component renders a custom tooltip with specified styles and properties.
 *
 * @param {Partial<TooltipRefProps> & HTMLAttributes<HTMLDivElement> & { id: string }} props - The properties for the CustomTooltip component.
 * @returns {JSX.Element} The rendered CustomTooltip component.
 */
const CustomTooltip: React.FC<Partial<TooltipRefProps> & HTMLAttributes<HTMLDivElement> & { id: string }> = (props) => {
    return <Tooltip style={{ zIndex: 9999, color: "white", background: "black", maxWidth: "400px" }} className=" bg-dark text-white shadow-lg p-3 mb-5 bg-body rounded" {...props} id={props.id} />
}

export default CustomTooltip

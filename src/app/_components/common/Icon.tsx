import { type Icon } from "@/_types/common/Icon"
import React from "react"

const Icon: React.FC<Icon> = ({ iconName, width = 13, height = 13, className = "" }) => {
    return <img className={className} src={`/assets/media/icons/custom/${iconName}.svg`} width={width} height={height} alt={iconName} />
}

export default Icon

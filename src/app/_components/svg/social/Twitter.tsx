import { IconProps } from "@/app/_types/common/SocialIconProp"
import { DefaultIconDimensions } from "@/app/_utils/Constants"

export const Twitter: React.FC<IconProps> = ({ width = DefaultIconDimensions.width, height = DefaultIconDimensions.height }) => (
    <svg width={width} height={height} viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clip-path="url(#clip0_536_4066)">
            <mask id="mask0_536_4066" maskUnits="userSpaceOnUse" x="0" y="0" width="14" height="14">
                <path d="M0 0H14V14H0V0Z" fill="white" />
            </mask>
            <g mask="url(#mask0_536_4066)">
                <path
                    d="M11.025 0.65625H13.172L8.482 6.03025L14 13.3442H9.68L6.294 8.90925L2.424 13.3442H0.275L5.291 7.59425L0 0.65725H4.43L7.486 4.71025L11.025 0.65625ZM10.27 12.0562H11.46L3.78 1.87725H2.504L10.27 12.0562Z"
                    fill="black"
                />
            </g>
        </g>
        <defs>
            <clipPath id="clip0_536_4066">
                <rect width="14" height="14" fill="white" />
            </clipPath>
        </defs>
    </svg>
)

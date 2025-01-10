import { IconProps } from "@/app/_types/common/SocialIconProp"
import { DefaultIconDimensions } from "@/app/_utils/Constants"

export const Facebook: React.FC<IconProps> = ({ width = DefaultIconDimensions.width, height = DefaultIconDimensions.height }) => (
    <svg width={width} height={height} viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M14 7C14 3.13403 10.866 0 7 0C3.13403 0 0 3.13403 0 7C0 10.4939 2.55981 13.3899 5.90625 13.915V9.02344H4.12891V7H5.90625V5.45781C5.90625 3.70344 6.95133 2.73437 8.55028 2.73437C9.31613 2.73437 10.1172 2.87109 10.1172 2.87109V4.59375H9.23453C8.36495 4.59375 8.09375 5.13335 8.09375 5.68695V7H10.0352L9.7248 9.02344H8.09375V13.915C11.4402 13.3899 14 10.4939 14 7Z"
            fill="#1877F2"
        />
    </svg>
)

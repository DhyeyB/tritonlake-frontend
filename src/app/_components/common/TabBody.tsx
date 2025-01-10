import { TabBodyPropType } from "@/_types/common/TabBody"
import { CONFIG } from "@/app/_utils/Constants"
import { getArray } from "@/app/_utils/Helpers"
import React from "react"
import CardLoader from "./CardSkeleton"
import CustomSkeleton from "./CustomSkeleton"

const TabBody: React.FC<TabBodyPropType> = ({ children, loading, loaderType, rowCount = CONFIG.DEFAULT_TABLE_SKELETON_ROW_COUNT, columnCount = 1, ...props }) => {
    const getLoader = () => {
        switch (loaderType) {
            case CONFIG.LOADER_TYPES.CARD_SKELETON:
                return (
                    <div className="d-flex gap-5 flex-wrap">
                        {getArray(columnCount).map((item) => (
                            <div
                                style={{
                                    flexBasis: `${(rowCount / columnCount) * CONFIG.CARD_SKELETON_BASIS}%`,
                                }}
                                key={item}
                            >
                                <CardLoader key={item} style={{ width: "100%" }} />
                            </div>
                        ))}
                    </div>
                )

            case CONFIG.LOADER_TYPES.TABLE_SKELETON:
                return <CustomSkeleton rowCount={rowCount} {...props} />
            default:
                return <CustomSkeleton rowCount={rowCount} {...props} />
        }
    }
    return <>{loading ? <div className="card my-5 mb-xl-10 p-8">{getLoader()}</div> : children}</>
}

export default TabBody

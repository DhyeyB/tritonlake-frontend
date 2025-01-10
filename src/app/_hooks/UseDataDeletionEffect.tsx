import { useEffect, useState } from "react"
import { UseDataDeletionEffectPropsType } from "../_types/common/Hooks"

const useDataDeletionEffect: React.FC<UseDataDeletionEffectPropsType> = (props) => {
    const { data, filters, setFilters, initialRender, assetDeleted } = props
    const [reloadData, setReloadData] = useState(false)

    useEffect(() => {
        if (data?.length <= 1 && filters.page > 1) {
            // Update the page filter if there's only one item left and it's not the first page
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            setFilters((prev: any) => ({ ...prev, page: prev.page - 1 }))
        } else if (initialRender) {
            // Reload data on initial render
            setReloadData((prev) => !prev)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [assetDeleted])

    return reloadData
}

export default useDataDeletionEffect

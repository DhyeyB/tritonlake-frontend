/* eslint-disable @typescript-eslint/no-explicit-any */

export interface UseDataDeletionEffectPropsType {
    data: any[]
    filters: Record<string, any>
    setFilters: React.Dispatch<React.SetStateAction<any>>
    initialRender: boolean
    assetDeleted?: boolean
}

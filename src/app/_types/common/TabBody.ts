import { CustomSkeletonType } from "./CustomSkeleton"

export interface TabBodyPropType extends CustomSkeletonType {
    children: React.ReactNode

    /**
     * Use to show loader skeleton
     * @type {boolean}
     * @memberof TabBodyPropType
     */
    loading?: boolean

    /**
     * Use to show which type of loader will be shown
     * @type {string}
     * @example "table-skeleton"
     * @memberof TabBodyPropType
     */
    loaderType?: string

    /**
     * Number of rows to display inside loader skeleton
     *
     * This is used in case of table-skeleton
     * @type {number}
     * @memberof TabBodyPropType
     */
    rowCount?: number

    /**
     * Number of cards to display inside card loader skeleton
     *
     * This is used in case of card-skeleton
     * @type {number}
     * @memberof TabBodyPropType
     */
    columnCount?: number
    stopVh?: boolean
}

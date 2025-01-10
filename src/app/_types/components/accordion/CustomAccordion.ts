import { JSXElementConstructor, ReactElement, ReactNode } from "react"
import { AccordionCollapseProps, AccordionProps } from "react-bootstrap"
import { CustomSkeletonType } from "../../common/CustomSkeleton"

/**
 * Properties for a custom Accordion component.
 *
 * @typedef {Object} CustomAccordionPropType
 * @property {ReactNode} children - The content to render inside the Accordion.
 * @property {string} [defaultActiveKey] - The key of the Accordion item to be initially open.
 * @property {boolean} [loading] - Loading to show loading skeleton.
 * @property {CustomSkeletonType} [loadingSkeletonProps] - Loading Skeleton props to configure loader.
 * @property {boolean} [showNoRecordsFound] - Show No records found in case of no data.
 * @extends AccordionProps
 */
export interface CustomAccordionPropType extends AccordionProps {
    children: ReactNode
    defaultActiveKey?: string[]
    loading?: boolean
    loadingSkeletonProps?: CustomSkeletonType
    /**
     *
     * Show No records found in case of no data.
     * @type {boolean}
     * @memberof CustomAccordionPropType
     * @default false
     */
    showNoRecordsFound?: boolean
}

/**
 * Properties for a custom Accordion item component.
 *
 * @typedef {Object} CustomAccordionItemPropType
 * @property {ReactElement<unknown, string | JSXElementConstructor<unknown>> & ReactNode} children - The content to render inside the Accordion item.
 * @property {string} title - The title of the Accordion item.
 * @property {string} eventKey - The unique key for identifying the Accordion item.
 * @property {Partial<AccordionCollapseProps>} [accordionBodyProps] - Additional props for the Accordion body.
 * @property {string} [containerClass] - Additional CSS class for the Accordion item container.
 * @extends AccordionProps
 */
export interface CustomAccordionItemPropType extends AccordionProps {
    children: ReactElement<unknown, string | JSXElementConstructor<unknown>> & ReactNode
    title: string
    subtitle?: string
    eventKey: string
    accordionBodyProps?: Partial<AccordionCollapseProps>
    containerClass?: string
    onCollapse?: () => void
}

/**
 * Properties for a custom Accordion item component.
 *
 * @typedef {Object} SidebarAccordionItemPropType
 * @property {ReactElement<unknown, string | JSXElementConstructor<unknown>> & ReactNode} children - The content to render inside the Accordion item.
 * @property {string} icon - The icon of the Accordion item.
 * @extends CustomAccordionItemPropType
 */
export interface SidebarAccordionItemPropType extends CustomAccordionItemPropType {
    icon: string
}

import { SidebarAccordionItemPropType } from "@/app/_types/components/accordion/CustomAccordion"
import Image from "next/image"
import { useContext } from "react"
import { AccordionContext, useAccordionButton } from "react-bootstrap"
import Accordion from "react-bootstrap/Accordion"

const SidebarAccordionItem: React.FC<SidebarAccordionItemPropType> = (props) => {
    const { children, title, eventKey, accordionBodyProps, subtitle, icon, containerClass = "accordion-item border-0 menu-link" } = props
    const { activeEventKey } = useContext(AccordionContext)
    const decoratedOnClick = useAccordionButton(eventKey)
    return (
        <div className={containerClass}>
            <span className="accordion-header">
                <button className={`accordion-button border-transparent fs-6 fw-semibold bg-white ${activeEventKey === eventKey ? "" : "collapsed"}`} type="button" onClick={decoratedOnClick}>
                    <span className="menu-icon me-2">
                        <Image src={icon} width={15} height={15} alt="" />
                    </span>
                    <span className="menu-title">{title}</span>
                    {subtitle && <span className="text-info ms-5">{subtitle}</span>}
                </button>
            </span>
            <Accordion.Collapse eventKey={eventKey} {...accordionBodyProps}>
                {children}
            </Accordion.Collapse>
        </div>
    )
}

export default SidebarAccordionItem

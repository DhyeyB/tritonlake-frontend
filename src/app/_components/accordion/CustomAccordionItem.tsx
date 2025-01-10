import { CustomAccordionItemPropType } from "@/app/_types/components/accordion/CustomAccordion"
import { useContext } from "react"
import { AccordionContext, useAccordionButton } from "react-bootstrap"
import Accordion from "react-bootstrap/Accordion"

const CustomAccordionItem: React.FC<CustomAccordionItemPropType> = (props) => {
    const { children, title, eventKey, accordionBodyProps, containerClass = "accordion-item" } = props
    const { activeEventKey } = useContext(AccordionContext)
    const decoratedOnClick = useAccordionButton(eventKey)
    return (
        <div className={containerClass}>
            <h3 className="accordion-header">
                <button className={`accordion-button fs-4 fw-semibold cursor-pointer ${activeEventKey?.includes(eventKey) ? "" : "collapsed"}`} type="button" onClick={decoratedOnClick}>
                    {title}
                </button>
            </h3>
            <Accordion.Collapse eventKey={eventKey} {...accordionBodyProps}>
                {children}
            </Accordion.Collapse>
        </div>
    )
}

export default CustomAccordionItem

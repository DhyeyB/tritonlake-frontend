import { CustomAccordionPropType } from "@/app/_types/components/accordion/CustomAccordion"
import Accordion from "react-bootstrap/Accordion"
import CustomSkeleton from "../common/CustomSkeleton"
import NoData from "../common/NoData"

const CustomAccordion: React.FC<CustomAccordionPropType> = ({ children, defaultActiveKey, loading, loadingSkeletonProps, showNoRecordsFound, ...props }) => {
    return (
        <Accordion defaultActiveKey={defaultActiveKey} {...props}>
            {loading ? <CustomSkeleton rowCount={4} {...loadingSkeletonProps} /> : showNoRecordsFound ? <NoData /> : children}
        </Accordion>
    )
}

export default CustomAccordion

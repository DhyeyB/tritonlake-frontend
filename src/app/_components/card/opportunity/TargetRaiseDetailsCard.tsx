"use client"
import React, { useState } from "react"
import { Modal } from "react-bootstrap"
import TabBody from "../../common/TabBody"
import { TargetRaiseCardProps } from "@/app/_types/common/TargetRaiseCard"

const TargetRaiseCard: React.FC<TargetRaiseCardProps> = ({ title, sections, additionalInformation }) => {
    const [showAdditionalInfo, setShowAdditionalInfo] = useState(false)

    return (
        <>
            <Modal show={showAdditionalInfo} onHide={() => setShowAdditionalInfo(false)} size="lg">
                <Modal.Header className="my-3">
                    {" "}
                    <Modal.Title>Additional Information</Modal.Title>
                </Modal.Header>

                <TabBody stopVh rowCount={7}>
                    <div className="modal-body">
                        <div className="row mb-4 px-4" dangerouslySetInnerHTML={{ __html: additionalInformation ?? "-" }} />
                    </div>
                </TabBody>

                <Modal.Footer>
                    <div className={`justify-content-end`}>
                        <button type="button" className="btn btn-secondary fs-7 text-uppercase rounded-0 me-3" onClick={() => setShowAdditionalInfo(false)}>
                            Close
                        </button>
                    </div>
                </Modal.Footer>
            </Modal>
            <div className="card h-100">
                <div className="card-body pb-5">
                    <div className="d-flex align-items-center mb-8">
                        <div className="d-flex align-items-center flex-grow-1">
                            <div className="d-flex flex-column">
                                <p className="text-gray-900 fs-4 fw-bold mt-2">{title}</p>
                            </div>
                        </div>
                        <div className="d-flex align-items-center mb-5" onClick={() => setShowAdditionalInfo(true)}>
                            <a className="text-primary fw-bold cursor-pointer">Additional Information</a>
                        </div>
                    </div>
                    {/* Single Row for All Sections */}
                    <div className="row">
                        {sections.map((section, index) => (
                            <div key={index} className={`col-lg-${section.title === "Targets" ? "5" : "7"}`}>
                                <h4 className="text-muted fs-5 mb-5">{section.title}</h4>
                                <div className="row align-items-center">
                                    {section.items.map((item, idx) => (
                                        <div key={idx} className={`d-flex align-items-center col-lg-${section.title === "Targets" ? "5" : "4"} mb-3`}>
                                            <div className="d-flex flex-column">
                                                <a className="text-gray-900 fs-6 fw-bold">{item.label}</a>
                                                <span className="text-gray-500 fw-bold">{item.value}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default TargetRaiseCard

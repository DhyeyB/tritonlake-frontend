import { CustomToastPropTypes } from "@/_types/common/Toast"
import React from "react"
import { Toast } from "react-bootstrap"

const CustomToast: React.FC<CustomToastPropTypes> = ({ show, onClose, header, body, delay = 3000 }) => {
    return (
        <Toast
            show={show}
            onClose={onClose}
            className="p-3"
            style={{
                position: "fixed",
                top: 0,
                right: 0,
                zIndex: 101,
            }}
            delay={delay}
            autohide
        >
            <Toast.Header>
                <strong className="me-auto">{header}</strong>
            </Toast.Header>
            <Toast.Body>
                <strong className="me-auto">{body}</strong>
            </Toast.Body>
        </Toast>
    )
}

export default CustomToast

import React from "react"

const TabSection: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <div className="show active" id="file-info" role="tabpanel">
            <div className="card mb-5 mb-xl-10">{children}</div>
        </div>
    )
}

export default TabSection

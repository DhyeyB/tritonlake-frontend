import React from "react"

const AuthHeader: React.FC<{ title: string; children?: React.ReactNode }> = ({ title, children }) => {
    return (
        <div className="text-center mb-11">
            {/* <a href="#" className="text-center mb-10 mb-lg-12">
                <img alt="Logo" src="/assets/media/logos/logo.svg" className="h-60px h-lg-75px" />
            </a> */}

            <h1 className={`text-dark fw-bolder ${children ? "" : "mb-3"} mt-5`}>{title}</h1>
            {children}
        </div>
    )
}

export default AuthHeader

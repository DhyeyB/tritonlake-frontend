"use client"
import { ProfileCardProps } from "@/app/_types/common/ProfileCard"
import React from "react"

const ProfileCard: React.FC<ProfileCardProps> = ({ name, role, email, phone, imageUrl, description, onButtonClick, link }) => {
    return (
        <div className="col-md-6 col-sm-12">
            <div className="card">
                <div className="card-body d-flex flex-center flex-column py-9 px-5">
                    <div className="symbol symbol-65px symbol-circle mb-5 position-relative">
                        <img src={imageUrl} alt={`${name}'s avatar`} />
                        <div className="bg-success position-absolute rounded-circle translate-middle start-100 top-100 border border-4 border-body h-15px w-15px ms-n3 mt-n3"></div>
                    </div>
                    <a className="fs-4 text-gray-800 text-hover-primary fw-bold mb-0">{name}</a>
                    {role && <div className="fw-semibold text-gray-400 mb-6">Role: {role}</div>}
                    <div className="d-flex flex-center flex-wrap mb-5">
                        {email && (
                            <div className="border border-dashed rounded min-w-90px py-3 px-4 mx-2 mb-3">
                                <div className="fs-6 fw-bold text-gray-700">{email}</div>
                                <div className="fw-semibold text-gray-400">Email</div>
                            </div>
                        )}
                        {phone && (
                            <div className="border border-dashed rounded min-w-90px py-3 px-4 mx-2 mb-3">
                                <div className="fs-6 fw-bold text-gray-700">{phone}</div>
                                <div className="fw-semibold text-gray-400">Phone</div>
                            </div>
                        )}
                    </div>
                    {description && <div className="text-center" dangerouslySetInnerHTML={{ __html: description }} />}
                    {link && link.length > 0 && (
                        <button className="btn btn-sm btn-light-primary btn-flex btn-center text-uppercase mt-10" onClick={onButtonClick}>
                            Go to Website
                        </button>
                    )}
                </div>
            </div>
        </div>
    )
}

export default ProfileCard

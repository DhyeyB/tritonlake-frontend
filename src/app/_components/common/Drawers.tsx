const Drawers: React.FC = () => {
    return (
        <>
            <div
                id="kt_activities"
                className="bg-body"
                data-kt-drawer="true"
                data-kt-drawer-name="activities"
                data-kt-drawer-activate="true"
                data-kt-drawer-overlay="true"
                data-kt-drawer-width="{default:'300px', 'lg': '900px'}"
                data-kt-drawer-direction="end"
                data-kt-drawer-toggle="#kt_activities_toggle"
                data-kt-drawer-close="#kt_activities_close"
            >
                <div className="card shadow-none border-0 rounded-0">
                    <div className="card-header" id="kt_activities_header">
                        <h3 className="card-title fw-bold text-dark">Activity Logs</h3>
                        <div className="card-toolbar">
                            <button type="button" className="btn btn-sm btn-icon btn-active-light-primary me-n5" id="kt_activities_close">
                                <span className="svg-icon svg-icon-1">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <rect opacity="0.5" x="6" y="17.3137" width="16" height="2" rx="1" transform="rotate(-45 6 17.3137)" fill="currentColor" />
                                        <rect x="7.41422" y="6" width="16" height="2" rx="1" transform="rotate(45 7.41422 6)" fill="currentColor" />
                                    </svg>
                                </span>
                            </button>
                        </div>
                    </div>

                    <div className="card-body position-relative" id="kt_activities_body">
                        <div
                            id="kt_activities_scroll"
                            className="position-relative scroll-y me-n5 pe-5"
                            data-kt-scroll="true"
                            data-kt-scroll-height="auto"
                            data-kt-scroll-wrappers="#kt_activities_body"
                            data-kt-scroll-dependencies="#kt_activities_header, #kt_activities_footer"
                            data-kt-scroll-offset="5px"
                        >
                            <div className="timeline">
                                <div className="timeline-item">
                                    <div className="timeline-line w-40px"></div>

                                    <div className="timeline-icon symbol symbol-circle symbol-40px me-4">
                                        <div className="symbol-label bg-light">
                                            <span className="svg-icon svg-icon-2 svg-icon-gray-500">
                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path
                                                        opacity="0.3"
                                                        d="M2 4V16C2 16.6 2.4 17 3 17H13L16.6 20.6C17.1 21.1 18 20.8 18 20V17H21C21.6 17 22 16.6 22 16V4C22 3.4 21.6 3 21 3H3C2.4 3 2 3.4 2 4Z"
                                                        fill="currentColor"
                                                    />
                                                    <path
                                                        d="M18 9H6C5.4 9 5 8.6 5 8C5 7.4 5.4 7 6 7H18C18.6 7 19 7.4 19 8C19 8.6 18.6 9 18 9ZM16 12C16 11.4 15.6 11 15 11H6C5.4 11 5 11.4 5 12C5 12.6 5.4 13 6 13H15C15.6 13 16 12.6 16 12Z"
                                                        fill="currentColor"
                                                    />
                                                </svg>
                                            </span>
                                        </div>
                                    </div>

                                    <div className="timeline-content mb-10 mt-n1">
                                        <div className="pe-3 mb-5">
                                            <div className="fs-5 fw-semibold mb-2">There are 2 new tasks for you in “AirPlus Mobile App” project:</div>

                                            <div className="d-flex align-items-center mt-1 fs-6">
                                                <div className="text-muted me-2 fs-7">Added at 4:23 PM by</div>

                                                <div className="symbol symbol-circle symbol-25px" data-bs-toggle="tooltip" data-bs-boundary="window" data-bs-placement="top" title="Nina Nilson">
                                                    <img src="assets/media/avatars/300-14.jpg" alt="img" />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="overflow-auto pb-5">
                                            <div className="d-flex align-items-center border border-dashed border-gray-300 rounded min-w-750px px-7 py-3 mb-5">
                                                <a href="../../demo1/dist/apps/projects/project.html" className="fs-5 text-dark text-hover-primary fw-semibold w-375px min-w-200px">
                                                    Meeting with customer
                                                </a>

                                                <div className="min-w-175px pe-2">
                                                    <span className="badge badge-light text-muted">Application Design</span>
                                                </div>

                                                <div className="symbol-group symbol-hover flex-nowrap flex-grow-1 min-w-100px pe-2">
                                                    <div className="symbol symbol-circle symbol-25px">
                                                        <img src="assets/media/avatars/300-2.jpg" alt="img" />
                                                    </div>

                                                    <div className="symbol symbol-circle symbol-25px">
                                                        <img src="assets/media/avatars/300-14.jpg" alt="img" />
                                                    </div>

                                                    <div className="symbol symbol-circle symbol-25px">
                                                        <div className="symbol-label fs-8 fw-semibold bg-primary text-inverse-primary">A</div>
                                                    </div>
                                                </div>

                                                <div className="min-w-125px pe-2">
                                                    <span className="badge badge-light-primary">In Progress</span>
                                                </div>

                                                <a href="../../demo1/dist/apps/projects/project.html" className="btn btn-sm btn-light btn-active-light-primary">
                                                    View
                                                </a>
                                            </div>

                                            <div className="d-flex align-items-center border border-dashed border-gray-300 rounded min-w-750px px-7 py-3 mb-0">
                                                <a href="../../demo1/dist/apps/projects/project.html" className="fs-5 text-dark text-hover-primary fw-semibold w-375px min-w-200px">
                                                    Project Delivery Preparation
                                                </a>

                                                <div className="min-w-175px">
                                                    <span className="badge badge-light text-muted">CRM System Development</span>
                                                </div>

                                                <div className="symbol-group symbol-hover flex-nowrap flex-grow-1 min-w-100px">
                                                    <div className="symbol symbol-circle symbol-25px">
                                                        <img src="assets/media/avatars/300-20.jpg" alt="img" />
                                                    </div>

                                                    <div className="symbol symbol-circle symbol-25px">
                                                        <div className="symbol-label fs-8 fw-semibold bg-success text-inverse-primary">B</div>
                                                    </div>
                                                </div>

                                                <div className="min-w-125px">
                                                    <span className="badge badge-light-success">Completed</span>
                                                </div>

                                                <a href="../../demo1/dist/apps/projects/project.html" className="btn btn-sm btn-light btn-active-light-primary">
                                                    View
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="timeline-item">
                                    <div className="timeline-line w-40px"></div>

                                    <div className="timeline-icon symbol symbol-circle symbol-40px">
                                        <div className="symbol-label bg-light">
                                            <span className="svg-icon svg-icon-2 svg-icon-gray-500">
                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path
                                                        opacity="0.3"
                                                        d="M5.78001 21.115L3.28001 21.949C3.10897 22.0059 2.92548 22.0141 2.75004 21.9727C2.57461 21.9312 2.41416 21.8418 2.28669 21.7144C2.15923 21.5869 2.06975 21.4264 2.0283 21.251C1.98685 21.0755 1.99507 20.892 2.05201 20.7209L2.886 18.2209L7.22801 13.879L10.128 16.774L5.78001 21.115Z"
                                                        fill="currentColor"
                                                    />
                                                    <path
                                                        d="M21.7 8.08899L15.911 2.30005C15.8161 2.2049 15.7033 2.12939 15.5792 2.07788C15.455 2.02637 15.3219 1.99988 15.1875 1.99988C15.0531 1.99988 14.92 2.02637 14.7958 2.07788C14.6717 2.12939 14.5589 2.2049 14.464 2.30005L13.74 3.02295C13.548 3.21498 13.4402 3.4754 13.4402 3.74695C13.4402 4.01849 13.548 4.27892 13.74 4.47095L14.464 5.19397L11.303 8.35498C10.1615 7.80702 8.87825 7.62639 7.62985 7.83789C6.38145 8.04939 5.2293 8.64265 4.332 9.53601C4.14026 9.72817 4.03256 9.98855 4.03256 10.26C4.03256 10.5315 4.14026 10.7918 4.332 10.984L13.016 19.667C13.208 19.859 13.4684 19.9668 13.74 19.9668C14.0115 19.9668 14.272 19.859 14.464 19.667C15.3575 18.77 15.9509 17.618 16.1624 16.3698C16.374 15.1215 16.1932 13.8383 15.645 12.697L18.806 9.53601L19.529 10.26C19.721 10.452 19.9814 10.5598 20.253 10.5598C20.5245 10.5598 20.785 10.452 20.977 10.26L21.7 9.53601C21.7952 9.44108 21.8706 9.32825 21.9221 9.2041C21.9737 9.07995 22.0002 8.94691 22.0002 8.8125C22.0002 8.67809 21.9737 8.54505 21.9221 8.4209C21.8706 8.29675 21.7952 8.18392 21.7 8.08899Z"
                                                        fill="currentColor"
                                                    />
                                                </svg>
                                            </span>
                                        </div>
                                    </div>

                                    <div className="timeline-content mb-10 mt-n2">
                                        <div className="overflow-auto pe-3">
                                            <div className="fs-5 fw-semibold mb-2">Invitation for crafting engaging designs that speak human workshop</div>

                                            <div className="d-flex align-items-center mt-1 fs-6">
                                                <div className="text-muted me-2 fs-7">Sent at 4:23 PM by</div>

                                                <div className="symbol symbol-circle symbol-25px" data-bs-toggle="tooltip" data-bs-boundary="window" data-bs-placement="top" title="Alan Nilson">
                                                    <img src="assets/media/avatars/300-1.jpg" alt="img" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="timeline-item">
                                    <div className="timeline-line w-40px"></div>

                                    <div className="timeline-icon symbol symbol-circle symbol-40px">
                                        <div className="symbol-label bg-light">
                                            <span className="svg-icon svg-icon-2 svg-icon-gray-500">
                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path
                                                        d="M11.2166 8.50002L10.5166 7.80007C10.1166 7.40007 10.1166 6.80005 10.5166 6.40005L13.4166 3.50002C15.5166 1.40002 18.9166 1.50005 20.8166 3.90005C22.5166 5.90005 22.2166 8.90007 20.3166 10.8001L17.5166 13.6C17.1166 14 16.5166 14 16.1166 13.6L15.4166 12.9C15.0166 12.5 15.0166 11.9 15.4166 11.5L18.3166 8.6C19.2166 7.7 19.1166 6.30002 18.0166 5.50002C17.2166 4.90002 16.0166 5.10007 15.3166 5.80007L12.4166 8.69997C12.2166 8.89997 11.6166 8.90002 11.2166 8.50002ZM11.2166 15.6L8.51659 18.3001C7.81659 19.0001 6.71658 19.2 5.81658 18.6C4.81658 17.9 4.71659 16.4 5.51659 15.5L8.31658 12.7C8.71658 12.3 8.71658 11.7001 8.31658 11.3001L7.6166 10.6C7.2166 10.2 6.6166 10.2 6.2166 10.6L3.6166 13.2C1.7166 15.1 1.4166 18.1 3.1166 20.1C5.0166 22.4 8.51659 22.5 10.5166 20.5L13.3166 17.7C13.7166 17.3 13.7166 16.7001 13.3166 16.3001L12.6166 15.6C12.3166 15.2 11.6166 15.2 11.2166 15.6Z"
                                                        fill="currentColor"
                                                    />
                                                    <path
                                                        opacity="0.3"
                                                        d="M5.0166 9L2.81659 8.40002C2.31659 8.30002 2.0166 7.79995 2.1166 7.19995L2.31659 5.90002C2.41659 5.20002 3.21659 4.89995 3.81659 5.19995L6.0166 6.40002C6.4166 6.60002 6.6166 7.09998 6.5166 7.59998L6.31659 8.30005C6.11659 8.80005 5.5166 9.1 5.0166 9ZM8.41659 5.69995H8.6166C9.1166 5.69995 9.5166 5.30005 9.5166 4.80005L9.6166 3.09998C9.6166 2.49998 9.2166 2 8.5166 2H7.81659C7.21659 2 6.71659 2.59995 6.91659 3.19995L7.31659 4.90002C7.41659 5.40002 7.91659 5.69995 8.41659 5.69995ZM14.6166 18.2L15.1166 21.3C15.2166 21.8 15.7166 22.2 16.2166 22L17.6166 21.6C18.1166 21.4 18.4166 20.8 18.1166 20.3L16.7166 17.5C16.5166 17.1 16.1166 16.9 15.7166 17L15.2166 17.1C14.8166 17.3 14.5166 17.7 14.6166 18.2ZM18.4166 16.3L19.8166 17.2C20.2166 17.5 20.8166 17.3 21.0166 16.8L21.3166 15.9C21.5166 15.4 21.1166 14.8 20.5166 14.8H18.8166C18.0166 14.8 17.7166 15.9 18.4166 16.3Z"
                                                        fill="currentColor"
                                                    />
                                                </svg>
                                            </span>
                                        </div>
                                    </div>

                                    <div className="timeline-content mb-10 mt-n1">
                                        <div className="mb-5 pe-3">
                                            <a href="#" className="fs-5 fw-semibold text-gray-800 text-hover-primary mb-2">
                                                3 New Incoming Project Files:
                                            </a>

                                            <div className="d-flex align-items-center mt-1 fs-6">
                                                <div className="text-muted me-2 fs-7">Sent at 10:30 PM by</div>

                                                <div className="symbol symbol-circle symbol-25px" data-bs-toggle="tooltip" data-bs-boundary="window" data-bs-placement="top" title="Jan Hummer">
                                                    <img src="assets/media/avatars/300-23.jpg" alt="img" />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="overflow-auto pb-5">
                                            <div className="d-flex align-items-center border border-dashed border-gray-300 rounded min-w-700px p-5">
                                                <div className="d-flex flex-aligns-center pe-10 pe-lg-20">
                                                    <img alt="" className="w-30px me-3" src="assets/media/svg/files/pdf.svg" />

                                                    <div className="ms-1 fw-semibold">
                                                        <a href="../../demo1/dist/apps/projects/project.html" className="fs-6 text-hover-primary fw-bold">
                                                            Finance KPI App Guidelines
                                                        </a>

                                                        <div className="text-gray-400">1.9mb</div>
                                                    </div>
                                                </div>

                                                <div className="d-flex flex-aligns-center pe-10 pe-lg-20">
                                                    <img alt="../../demo1/dist/apps/projects/project.html" className="w-30px me-3" src="assets/media/svg/files/doc.svg" />

                                                    <div className="ms-1 fw-semibold">
                                                        <a href="#" className="fs-6 text-hover-primary fw-bold">
                                                            Client UAT Testing Results
                                                        </a>

                                                        <div className="text-gray-400">18kb</div>
                                                    </div>
                                                </div>

                                                <div className="d-flex flex-aligns-center">
                                                    <img alt="../../demo1/dist/apps/projects/project.html" className="w-30px me-3" src="assets/media/svg/files/css.svg" />

                                                    <div className="ms-1 fw-semibold">
                                                        <a href="#" className="fs-6 text-hover-primary fw-bold">
                                                            Finance Reports
                                                        </a>

                                                        <div className="text-gray-400">20mb</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="timeline-item">
                                    <div className="timeline-line w-40px"></div>

                                    <div className="timeline-icon symbol symbol-circle symbol-40px">
                                        <div className="symbol-label bg-light">
                                            <span className="svg-icon svg-icon-2 svg-icon-gray-500">
                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path
                                                        opacity="0.3"
                                                        d="M21.25 18.525L13.05 21.825C12.35 22.125 11.65 22.125 10.95 21.825L2.75 18.525C1.75 18.125 1.75 16.725 2.75 16.325L4.04999 15.825L10.25 18.325C10.85 18.525 11.45 18.625 12.05 18.625C12.65 18.625 13.25 18.525 13.85 18.325L20.05 15.825L21.35 16.325C22.35 16.725 22.35 18.125 21.25 18.525ZM13.05 16.425L21.25 13.125C22.25 12.725 22.25 11.325 21.25 10.925L13.05 7.62502C12.35 7.32502 11.65 7.32502 10.95 7.62502L2.75 10.925C1.75 11.325 1.75 12.725 2.75 13.125L10.95 16.425C11.65 16.725 12.45 16.725 13.05 16.425Z"
                                                        fill="currentColor"
                                                    />
                                                    <path
                                                        d="M11.05 11.025L2.84998 7.725C1.84998 7.325 1.84998 5.925 2.84998 5.525L11.05 2.225C11.75 1.925 12.45 1.925 13.15 2.225L21.35 5.525C22.35 5.925 22.35 7.325 21.35 7.725L13.05 11.025C12.45 11.325 11.65 11.325 11.05 11.025Z"
                                                        fill="currentColor"
                                                    />
                                                </svg>
                                            </span>
                                        </div>
                                    </div>

                                    <div className="timeline-content mb-10 mt-n1">
                                        <div className="pe-3 mb-5">
                                            <div className="fs-5 fw-semibold mb-2">
                                                Task
                                                <a href="#" className="text-primary fw-bold me-1">
                                                    #45890
                                                </a>
                                                merged with
                                                <a href="#" className="text-primary fw-bold me-1">
                                                    #45890
                                                </a>
                                                in “Ads Pro Admin Dashboard project:
                                            </div>

                                            <div className="d-flex align-items-center mt-1 fs-6">
                                                <div className="text-muted me-2 fs-7">Initiated at 4:23 PM by</div>

                                                <div className="symbol symbol-circle symbol-25px" data-bs-toggle="tooltip" data-bs-boundary="window" data-bs-placement="top" title="Nina Nilson">
                                                    <img src="assets/media/avatars/300-14.jpg" alt="img" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="timeline-item">
                                    <div className="timeline-line w-40px"></div>

                                    <div className="timeline-icon symbol symbol-circle symbol-40px">
                                        <div className="symbol-label bg-light">
                                            <span className="svg-icon svg-icon-2 svg-icon-gray-500">
                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path
                                                        opacity="0.3"
                                                        d="M21.4 8.35303L19.241 10.511L13.485 4.755L15.643 2.59595C16.0248 2.21423 16.5426 1.99988 17.0825 1.99988C17.6224 1.99988 18.1402 2.21423 18.522 2.59595L21.4 5.474C21.7817 5.85581 21.9962 6.37355 21.9962 6.91345C21.9962 7.45335 21.7817 7.97122 21.4 8.35303ZM3.68699 21.932L9.88699 19.865L4.13099 14.109L2.06399 20.309C1.98815 20.5354 1.97703 20.7787 2.03189 21.0111C2.08674 21.2436 2.2054 21.4561 2.37449 21.6248C2.54359 21.7934 2.75641 21.9115 2.989 21.9658C3.22158 22.0201 3.4647 22.0084 3.69099 21.932H3.68699Z"
                                                        fill="currentColor"
                                                    />
                                                    <path
                                                        d="M5.574 21.3L3.692 21.928C3.46591 22.0032 3.22334 22.0141 2.99144 21.9594C2.75954 21.9046 2.54744 21.7864 2.3789 21.6179C2.21036 21.4495 2.09202 21.2375 2.03711 21.0056C1.9822 20.7737 1.99289 20.5312 2.06799 20.3051L2.696 18.422L5.574 21.3ZM4.13499 14.105L9.891 19.861L19.245 10.507L13.489 4.75098L4.13499 14.105Z"
                                                        fill="currentColor"
                                                    />
                                                </svg>
                                            </span>
                                        </div>
                                    </div>

                                    <div className="timeline-content mb-10 mt-n1">
                                        <div className="pe-3 mb-5">
                                            <div className="fs-5 fw-semibold mb-2">3 new application design concepts added:</div>

                                            <div className="d-flex align-items-center mt-1 fs-6">
                                                <div className="text-muted me-2 fs-7">Created at 4:23 PM by</div>

                                                <div className="symbol symbol-circle symbol-25px" data-bs-toggle="tooltip" data-bs-boundary="window" data-bs-placement="top" title="Marcus Dotson">
                                                    <img src="assets/media/avatars/300-2.jpg" alt="img" />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="overflow-auto pb-5">
                                            <div className="d-flex align-items-center border border-dashed border-gray-300 rounded min-w-700px p-7">
                                                <div className="overlay me-10">
                                                    <div className="overlay-wrapper">
                                                        <img alt="img" className="rounded w-150px" src="assets/media/stock/600x400/img-29.jpg" />
                                                    </div>

                                                    <div className="overlay-layer bg-dark bg-opacity-10 rounded">
                                                        <a href="#" className="btn btn-sm btn-primary btn-shadow">
                                                            Explore
                                                        </a>
                                                    </div>
                                                </div>

                                                <div className="overlay me-10">
                                                    <div className="overlay-wrapper">
                                                        <img alt="img" className="rounded w-150px" src="assets/media/stock/600x400/img-31.jpg" />
                                                    </div>

                                                    <div className="overlay-layer bg-dark bg-opacity-10 rounded">
                                                        <a href="#" className="btn btn-sm btn-primary btn-shadow">
                                                            Explore
                                                        </a>
                                                    </div>
                                                </div>

                                                <div className="overlay">
                                                    <div className="overlay-wrapper">
                                                        <img alt="img" className="rounded w-150px" src="assets/media/stock/600x400/img-40.jpg" />
                                                    </div>

                                                    <div className="overlay-layer bg-dark bg-opacity-10 rounded">
                                                        <a href="#" className="btn btn-sm btn-primary btn-shadow">
                                                            Explore
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="timeline-item">
                                    <div className="timeline-line w-40px"></div>

                                    <div className="timeline-icon symbol symbol-circle symbol-40px">
                                        <div className="symbol-label bg-light">
                                            <span className="svg-icon svg-icon-2 svg-icon-gray-500">
                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path
                                                        d="M6 8.725C6 8.125 6.4 7.725 7 7.725H14L18 11.725V12.925L22 9.725L12.6 2.225C12.2 1.925 11.7 1.925 11.4 2.225L2 9.725L6 12.925V8.725Z"
                                                        fill="currentColor"
                                                    />
                                                    <path
                                                        opacity="0.3"
                                                        d="M22 9.72498V20.725C22 21.325 21.6 21.725 21 21.725H3C2.4 21.725 2 21.325 2 20.725V9.72498L11.4 17.225C11.8 17.525 12.3 17.525 12.6 17.225L22 9.72498ZM15 11.725H18L14 7.72498V10.725C14 11.325 14.4 11.725 15 11.725Z"
                                                        fill="currentColor"
                                                    />
                                                </svg>
                                            </span>
                                        </div>
                                    </div>

                                    <div className="timeline-content mb-10 mt-n1">
                                        <div className="pe-3 mb-5">
                                            <div className="fs-5 fw-semibold mb-2">
                                                New case
                                                <a href="#" className="text-primary fw-bold me-1">
                                                    #67890
                                                </a>
                                                is assigned to you in Multi-platform Database Design project
                                            </div>

                                            <div className="overflow-auto pb-5">
                                                <div className="d-flex align-items-center mt-1 fs-6">
                                                    <div className="text-muted me-2 fs-7">Added at 4:23 PM by</div>

                                                    <a href="#" className="text-primary fw-bold me-1">
                                                        Alice Tan
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="timeline-item">
                                    <div className="timeline-line w-40px"></div>

                                    <div className="timeline-icon symbol symbol-circle symbol-40px">
                                        <div className="symbol-label bg-light">
                                            <span className="svg-icon svg-icon-2 svg-icon-gray-500">
                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path
                                                        opacity="0.3"
                                                        d="M21.4 8.35303L19.241 10.511L13.485 4.755L15.643 2.59595C16.0248 2.21423 16.5426 1.99988 17.0825 1.99988C17.6224 1.99988 18.1402 2.21423 18.522 2.59595L21.4 5.474C21.7817 5.85581 21.9962 6.37355 21.9962 6.91345C21.9962 7.45335 21.7817 7.97122 21.4 8.35303ZM3.68699 21.932L9.88699 19.865L4.13099 14.109L2.06399 20.309C1.98815 20.5354 1.97703 20.7787 2.03189 21.0111C2.08674 21.2436 2.2054 21.4561 2.37449 21.6248C2.54359 21.7934 2.75641 21.9115 2.989 21.9658C3.22158 22.0201 3.4647 22.0084 3.69099 21.932H3.68699Z"
                                                        fill="currentColor"
                                                    />
                                                    <path
                                                        d="M5.574 21.3L3.692 21.928C3.46591 22.0032 3.22334 22.0141 2.99144 21.9594C2.75954 21.9046 2.54744 21.7864 2.3789 21.6179C2.21036 21.4495 2.09202 21.2375 2.03711 21.0056C1.9822 20.7737 1.99289 20.5312 2.06799 20.3051L2.696 18.422L5.574 21.3ZM4.13499 14.105L9.891 19.861L19.245 10.507L13.489 4.75098L4.13499 14.105Z"
                                                        fill="currentColor"
                                                    />
                                                </svg>
                                            </span>
                                        </div>
                                    </div>

                                    <div className="timeline-content mb-10 mt-n1">
                                        <div className="pe-3 mb-5">
                                            <div className="fs-5 fw-semibold mb-2">You have received a new order:</div>

                                            <div className="d-flex align-items-center mt-1 fs-6">
                                                <div className="text-muted me-2 fs-7">Placed at 5:05 AM by</div>

                                                <div className="symbol symbol-circle symbol-25px" data-bs-toggle="tooltip" data-bs-boundary="window" data-bs-placement="top" title="Robert Rich">
                                                    <img src="assets/media/avatars/300-4.jpg" alt="img" />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="overflow-auto pb-5">
                                            <div className="notice d-flex bg-light-primary rounded border-primary border border-dashed min-w-lg-600px flex-shrink-0 p-6">
                                                <span className="svg-icon svg-icon-2tx svg-icon-primary me-4">
                                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path
                                                            opacity="0.3"
                                                            d="M19.0687 17.9688H11.0687C10.4687 17.9688 10.0687 18.3687 10.0687 18.9688V19.9688C10.0687 20.5687 10.4687 20.9688 11.0687 20.9688H19.0687C19.6687 20.9688 20.0687 20.5687 20.0687 19.9688V18.9688C20.0687 18.3687 19.6687 17.9688 19.0687 17.9688Z"
                                                            fill="currentColor"
                                                        />
                                                        <path
                                                            d="M4.06875 17.9688C3.86875 17.9688 3.66874 17.8688 3.46874 17.7688C2.96874 17.4688 2.86875 16.8688 3.16875 16.3688L6.76874 10.9688L3.16875 5.56876C2.86875 5.06876 2.96874 4.46873 3.46874 4.16873C3.96874 3.86873 4.56875 3.96878 4.86875 4.46878L8.86875 10.4688C9.06875 10.7688 9.06875 11.2688 8.86875 11.5688L4.86875 17.5688C4.66875 17.7688 4.36875 17.9688 4.06875 17.9688Z"
                                                            fill="currentColor"
                                                        />
                                                    </svg>
                                                </span>

                                                <div className="d-flex flex-stack flex-grow-1 flex-wrap flex-md-nowrap">
                                                    <div className="mb-3 mb-md-0 fw-semibold">
                                                        <h4 className="text-gray-900 fw-bold">Database Backup Process Completed!</h4>
                                                        <div className="fs-6 text-gray-700 pe-7">Login into Admin Dashboard to make sure the data integrity is OK</div>
                                                    </div>

                                                    <a href="#" className="btn btn-primary px-6 align-self-center text-nowrap">
                                                        Proceed
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="timeline-item">
                                    <div className="timeline-line w-40px"></div>

                                    <div className="timeline-icon symbol symbol-circle symbol-40px">
                                        <div className="symbol-label bg-light">
                                            <span className="svg-icon svg-icon-2 svg-icon-gray-500">
                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M21 10H13V11C13 11.6 12.6 12 12 12C11.4 12 11 11.6 11 11V10H3C2.4 10 2 10.4 2 11V13H22V11C22 10.4 21.6 10 21 10Z" fill="currentColor" />
                                                    <path opacity="0.3" d="M12 12C11.4 12 11 11.6 11 11V3C11 2.4 11.4 2 12 2C12.6 2 13 2.4 13 3V11C13 11.6 12.6 12 12 12Z" fill="currentColor" />
                                                    <path
                                                        opacity="0.3"
                                                        d="M18.1 21H5.9C5.4 21 4.9 20.6 4.8 20.1L3 13H21L19.2 20.1C19.1 20.6 18.6 21 18.1 21ZM13 18V15C13 14.4 12.6 14 12 14C11.4 14 11 14.4 11 15V18C11 18.6 11.4 19 12 19C12.6 19 13 18.6 13 18ZM17 18V15C17 14.4 16.6 14 16 14C15.4 14 15 14.4 15 15V18C15 18.6 15.4 19 16 19C16.6 19 17 18.6 17 18ZM9 18V15C9 14.4 8.6 14 8 14C7.4 14 7 14.4 7 15V18C7 18.6 7.4 19 8 19C8.6 19 9 18.6 9 18Z"
                                                        fill="currentColor"
                                                    />
                                                </svg>
                                            </span>
                                        </div>
                                    </div>

                                    <div className="timeline-content mt-n1">
                                        <div className="pe-3 mb-5">
                                            <div className="fs-5 fw-semibold mb-2">
                                                New order
                                                <a href="#" className="text-primary fw-bold me-1">
                                                    #67890
                                                </a>
                                                is placed for Workshow Planning & Budget Estimation
                                            </div>

                                            <div className="d-flex align-items-center mt-1 fs-6">
                                                <div className="text-muted me-2 fs-7">Placed at 4:23 PM by</div>

                                                <a href="#" className="text-primary fw-bold me-1">
                                                    Jimmy Bold
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="card-footer py-5 text-center" id="kt_activities_footer">
                        <a href="../../demo1/dist/pages/user-profile/activity.html" className="btn btn-bg-body text-primary">
                            View All Activities
                            <span className="svg-icon svg-icon-3 svg-icon-primary">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <rect opacity="0.5" x="18" y="13" width="13" height="2" rx="1" transform="rotate(-180 18 13)" fill="currentColor" />
                                    <path
                                        d="M15.4343 12.5657L11.25 16.75C10.8358 17.1642 10.8358 17.8358 11.25 18.25C11.6642 18.6642 12.3358 18.6642 12.75 18.25L18.2929 12.7071C18.6834 12.3166 18.6834 11.6834 18.2929 11.2929L12.75 5.75C12.3358 5.33579 11.6642 5.33579 11.25 5.75C10.8358 6.16421 10.8358 6.83579 11.25 7.25L15.4343 11.4343C15.7467 11.7467 15.7467 12.2533 15.4343 12.5657Z"
                                        fill="currentColor"
                                    />
                                </svg>
                            </span>
                        </a>
                    </div>
                </div>
            </div>

            <div
                id="kt_drawer_chat"
                className="bg-body"
                data-kt-drawer="true"
                data-kt-drawer-name="chat"
                data-kt-drawer-activate="true"
                data-kt-drawer-overlay="true"
                data-kt-drawer-width="{default:'300px', 'md': '500px'}"
                data-kt-drawer-direction="end"
                data-kt-drawer-toggle="#kt_drawer_chat_toggle"
                data-kt-drawer-close="#kt_drawer_chat_close"
            >
                <div className="card w-100 rounded-0 border-0" id="kt_drawer_chat_messenger">
                    <div className="card-header pe-5" id="kt_drawer_chat_messenger_header">
                        <div className="card-title">
                            <div className="d-flex justify-content-center flex-column me-3">
                                <a href="#" className="fs-4 fw-bold text-gray-900 text-hover-primary me-1 mb-2 lh-1">
                                    Brian Cox
                                </a>

                                <div className="mb-0 lh-1">
                                    <span className="badge badge-success badge-circle w-10px h-10px me-1"></span>
                                    <span className="fs-7 fw-semibold text-muted">Active</span>
                                </div>
                            </div>
                        </div>

                        <div className="card-toolbar">
                            <div className="me-2">
                                <button className="btn btn-sm btn-icon btn-active-light-primary" data-kt-menu-trigger="click" data-kt-menu-placement="bottom-end">
                                    <i className="bi bi-three-dots fs-3"></i>
                                </button>

                                <div className="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-800 menu-state-bg-light-primary fw-semibold w-200px py-3" data-kt-menu="true">
                                    <div className="menu-item px-3">
                                        <div className="menu-content text-muted pb-2 px-3 fs-7 text-uppercase">Contacts</div>
                                    </div>

                                    <div className="menu-item px-3">
                                        <a href="#" className="menu-link px-3" data-bs-toggle="modal" data-bs-target="#kt_modal_users_search">
                                            Add Contact
                                        </a>
                                    </div>

                                    <div className="menu-item px-3">
                                        <a href="#" className="menu-link flex-stack px-3" data-bs-toggle="modal" data-bs-target="#kt_modal_invite_friends">
                                            Invite Contacts
                                            <i className="fas fa-exclamation-circle ms-2 fs-7" data-bs-toggle="tooltip" title="Specify a contact email to send an invitation"></i>
                                        </a>
                                    </div>

                                    <div className="menu-item px-3" data-kt-menu-trigger="hover" data-kt-menu-placement="right-start">
                                        <a href="#" className="menu-link px-3">
                                            <span className="menu-title">Groups</span>
                                            <span className="menu-arrow"></span>
                                        </a>

                                        <div className="menu-sub menu-sub-dropdown w-175px py-4">
                                            <div className="menu-item px-3">
                                                <a href="#" className="menu-link px-3" data-bs-toggle="tooltip" title="Coming soon">
                                                    Create Group
                                                </a>
                                            </div>

                                            <div className="menu-item px-3">
                                                <a href="#" className="menu-link px-3" data-bs-toggle="tooltip" title="Coming soon">
                                                    Invite Members
                                                </a>
                                            </div>

                                            <div className="menu-item px-3">
                                                <a href="#" className="menu-link px-3" data-bs-toggle="tooltip" title="Coming soon">
                                                    Settings
                                                </a>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="menu-item px-3 my-1">
                                        <a href="#" className="menu-link px-3" data-bs-toggle="tooltip" title="Coming soon">
                                            Settings
                                        </a>
                                    </div>
                                </div>
                            </div>

                            <div className="btn btn-sm btn-icon btn-active-light-primary" id="kt_drawer_chat_close">
                                <span className="svg-icon svg-icon-2">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <rect opacity="0.5" x="6" y="17.3137" width="16" height="2" rx="1" transform="rotate(-45 6 17.3137)" fill="currentColor" />
                                        <rect x="7.41422" y="6" width="16" height="2" rx="1" transform="rotate(45 7.41422 6)" fill="currentColor" />
                                    </svg>
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="card-body" id="kt_drawer_chat_messenger_body">
                        <div
                            className="scroll-y me-n5 pe-5"
                            data-kt-element="messages"
                            data-kt-scroll="true"
                            data-kt-scroll-activate="true"
                            data-kt-scroll-height="auto"
                            data-kt-scroll-dependencies="#kt_drawer_chat_messenger_header, #kt_drawer_chat_messenger_footer"
                            data-kt-scroll-wrappers="#kt_drawer_chat_messenger_body"
                            data-kt-scroll-offset="0px"
                        >
                            <div className="d-flex justify-content-start mb-10">
                                <div className="d-flex flex-column align-items-start">
                                    <div className="d-flex align-items-center mb-2">
                                        <div className="symbol symbol-35px symbol-circle">
                                            <img alt="Pic" src="assets/media/avatars/300-25.jpg" />
                                        </div>

                                        <div className="ms-3">
                                            <a href="#" className="fs-5 fw-bold text-gray-900 text-hover-primary me-1">
                                                Brian Cox
                                            </a>
                                            <span className="text-muted fs-7 mb-1">2 mins</span>
                                        </div>
                                    </div>

                                    <div className="p-5 rounded bg-light-info text-dark fw-semibold mw-lg-400px text-start" data-kt-element="message-text">
                                        How likely are you to recommend our company to your friends and family ?
                                    </div>
                                </div>
                            </div>

                            <div className="d-flex justify-content-end mb-10">
                                <div className="d-flex flex-column align-items-end">
                                    <div className="d-flex align-items-center mb-2">
                                        <div className="me-3">
                                            <span className="text-muted fs-7 mb-1">5 mins</span>
                                            <a href="#" className="fs-5 fw-bold text-gray-900 text-hover-primary ms-1">
                                                You
                                            </a>
                                        </div>

                                        <div className="symbol symbol-35px symbol-circle">
                                            <img alt="Pic" src="assets/media/avatars/300-1.jpg" />
                                        </div>
                                    </div>

                                    <div className="p-5 rounded bg-light-primary text-dark fw-semibold mw-lg-400px text-end" data-kt-element="message-text">
                                        Hey there, we’re just writing to let you know that you’ve been subscribed to a repository on GitHub.
                                    </div>
                                </div>
                            </div>

                            <div className="d-flex justify-content-start mb-10">
                                <div className="d-flex flex-column align-items-start">
                                    <div className="d-flex align-items-center mb-2">
                                        <div className="symbol symbol-35px symbol-circle">
                                            <img alt="Pic" src="assets/media/avatars/300-25.jpg" />
                                        </div>

                                        <div className="ms-3">
                                            <a href="#" className="fs-5 fw-bold text-gray-900 text-hover-primary me-1">
                                                Brian Cox
                                            </a>
                                            <span className="text-muted fs-7 mb-1">1 Hour</span>
                                        </div>
                                    </div>

                                    <div className="p-5 rounded bg-light-info text-dark fw-semibold mw-lg-400px text-start" data-kt-element="message-text">
                                        Ok, Understood!
                                    </div>
                                </div>
                            </div>

                            <div className="d-flex justify-content-end mb-10">
                                <div className="d-flex flex-column align-items-end">
                                    <div className="d-flex align-items-center mb-2">
                                        <div className="me-3">
                                            <span className="text-muted fs-7 mb-1">2 Hours</span>
                                            <a href="#" className="fs-5 fw-bold text-gray-900 text-hover-primary ms-1">
                                                You
                                            </a>
                                        </div>

                                        <div className="symbol symbol-35px symbol-circle">
                                            <img alt="Pic" src="assets/media/avatars/300-1.jpg" />
                                        </div>
                                    </div>

                                    <div className="p-5 rounded bg-light-primary text-dark fw-semibold mw-lg-400px text-end" data-kt-element="message-text">
                                        You’ll receive notifications for all issues, pull requests!
                                    </div>
                                </div>
                            </div>

                            <div className="d-flex justify-content-start mb-10">
                                <div className="d-flex flex-column align-items-start">
                                    <div className="d-flex align-items-center mb-2">
                                        <div className="symbol symbol-35px symbol-circle">
                                            <img alt="Pic" src="assets/media/avatars/300-25.jpg" />
                                        </div>

                                        <div className="ms-3">
                                            <a href="#" className="fs-5 fw-bold text-gray-900 text-hover-primary me-1">
                                                Brian Cox
                                            </a>
                                            <span className="text-muted fs-7 mb-1">3 Hours</span>
                                        </div>
                                    </div>

                                    <div className="p-5 rounded bg-light-info text-dark fw-semibold mw-lg-400px text-start" data-kt-element="message-text">
                                        You can unwatch this repository immediately by clicking here:
                                        <a href="https://keenthemes.com">Keenthemes.com</a>
                                    </div>
                                </div>
                            </div>

                            <div className="d-flex justify-content-end mb-10">
                                <div className="d-flex flex-column align-items-end">
                                    <div className="d-flex align-items-center mb-2">
                                        <div className="me-3">
                                            <span className="text-muted fs-7 mb-1">4 Hours</span>
                                            <a href="#" className="fs-5 fw-bold text-gray-900 text-hover-primary ms-1">
                                                You
                                            </a>
                                        </div>

                                        <div className="symbol symbol-35px symbol-circle">
                                            <img alt="Pic" src="assets/media/avatars/300-1.jpg" />
                                        </div>
                                    </div>

                                    <div className="p-5 rounded bg-light-primary text-dark fw-semibold mw-lg-400px text-end" data-kt-element="message-text">
                                        Most purchased Business courses during this sale!
                                    </div>
                                </div>
                            </div>

                            <div className="d-flex justify-content-start mb-10">
                                <div className="d-flex flex-column align-items-start">
                                    <div className="d-flex align-items-center mb-2">
                                        <div className="symbol symbol-35px symbol-circle">
                                            <img alt="Pic" src="assets/media/avatars/300-25.jpg" />
                                        </div>

                                        <div className="ms-3">
                                            <a href="#" className="fs-5 fw-bold text-gray-900 text-hover-primary me-1">
                                                Brian Cox
                                            </a>
                                            <span className="text-muted fs-7 mb-1">5 Hours</span>
                                        </div>
                                    </div>

                                    <div className="p-5 rounded bg-light-info text-dark fw-semibold mw-lg-400px text-start" data-kt-element="message-text">
                                        Company BBQ to celebrate the last quater achievements and goals. Food and drinks provided
                                    </div>
                                </div>
                            </div>

                            <div className="d-flex justify-content-end mb-10 d-none" data-kt-element="template-out">
                                <div className="d-flex flex-column align-items-end">
                                    <div className="d-flex align-items-center mb-2">
                                        <div className="me-3">
                                            <span className="text-muted fs-7 mb-1">Just now</span>
                                            <a href="#" className="fs-5 fw-bold text-gray-900 text-hover-primary ms-1">
                                                You
                                            </a>
                                        </div>

                                        <div className="symbol symbol-35px symbol-circle">
                                            <img alt="Pic" src="assets/media/avatars/300-1.jpg" />
                                        </div>
                                    </div>

                                    <div className="p-5 rounded bg-light-primary text-dark fw-semibold mw-lg-400px text-end" data-kt-element="message-text"></div>
                                </div>
                            </div>

                            <div className="d-flex justify-content-start mb-10 d-none" data-kt-element="template-in">
                                <div className="d-flex flex-column align-items-start">
                                    <div className="d-flex align-items-center mb-2">
                                        <div className="symbol symbol-35px symbol-circle">
                                            <img alt="Pic" src="assets/media/avatars/300-25.jpg" />
                                        </div>

                                        <div className="ms-3">
                                            <a href="#" className="fs-5 fw-bold text-gray-900 text-hover-primary me-1">
                                                Brian Cox
                                            </a>
                                            <span className="text-muted fs-7 mb-1">Just now</span>
                                        </div>
                                    </div>

                                    <div className="p-5 rounded bg-light-info text-dark fw-semibold mw-lg-400px text-start" data-kt-element="message-text">
                                        Right before vacation season we have the next Big Deal for you.
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="card-footer pt-4" id="kt_drawer_chat_messenger_footer">
                        <textarea className="form-control form-control-flush mb-3" rows={1} data-kt-element="input" placeholder="Type a message"></textarea>

                        <div className="d-flex flex-stack">
                            <div className="d-flex align-items-center me-2">
                                <button className="btn btn-sm btn-icon btn-active-light-primary me-1" type="button" data-bs-toggle="tooltip" title="Coming soon">
                                    <i className="bi bi-paperclip fs-3"></i>
                                </button>
                                <button className="btn btn-sm btn-icon btn-active-light-primary me-1" type="button" data-bs-toggle="tooltip" title="Coming soon">
                                    <i className="bi bi-upload fs-3"></i>
                                </button>
                            </div>

                            <button className="btn btn-primary" type="button" data-kt-element="send">
                                Send
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div
                id="kt_shopping_cart"
                className="bg-body"
                data-kt-drawer="true"
                data-kt-drawer-name="cart"
                data-kt-drawer-activate="true"
                data-kt-drawer-overlay="true"
                data-kt-drawer-width="{default:'300px', 'md': '500px'}"
                data-kt-drawer-direction="end"
                data-kt-drawer-toggle="#kt_drawer_shopping_cart_toggle"
                data-kt-drawer-close="#kt_drawer_shopping_cart_close"
            >
                <div className="card card-flush w-100 rounded-0">
                    <div className="card-header">
                        <h3 className="card-title text-gray-900 fw-bold">Shopping Cart</h3>

                        <div className="card-toolbar">
                            <div className="btn btn-sm btn-icon btn-active-light-primary" id="kt_drawer_shopping_cart_close">
                                <span className="svg-icon svg-icon-2">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <rect opacity="0.5" x="6" y="17.3137" width="16" height="2" rx="1" transform="rotate(-45 6 17.3137)" fill="currentColor" />
                                        <rect x="7.41422" y="6" width="16" height="2" rx="1" transform="rotate(45 7.41422 6)" fill="currentColor" />
                                    </svg>
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="card-body hover-scroll-overlay-y h-400px pt-5">
                        <div className="d-flex flex-stack">
                            <div className="d-flex flex-column me-3">
                                <div className="mb-3">
                                    <a href="../../demo1/dist/apps/ecommerce/sales/details.html" className="text-gray-800 text-hover-primary fs-4 fw-bold">
                                        Iblender
                                    </a>
                                    <span className="text-gray-400 fw-semibold d-block">The best kitchen gadget in 2022</span>
                                </div>

                                <div className="d-flex align-items-center">
                                    <span className="fw-bold text-gray-800 fs-5">$ 350</span>
                                    <span className="text-muted mx-2">for</span>
                                    <span className="fw-bold text-gray-800 fs-5 me-3">5</span>
                                    <a href="#" className="btn btn-sm btn-light-success btn-icon-success btn-icon w-25px h-25px me-2">
                                        <span className="svg-icon svg-icon-4">
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <rect x="4.36396" y="11.364" width="16" height="2" rx="1" fill="currentColor" />
                                            </svg>
                                        </span>
                                    </a>
                                    <a href="#" className="btn btn-sm btn-light-success btn-icon w-25px h-25px">
                                        <span className="svg-icon svg-icon-4">
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <rect opacity="0.5" x="11.364" y="20.364" width="16" height="2" rx="1" transform="rotate(-90 11.364 20.364)" fill="currentColor" />
                                                <rect x="4.36396" y="11.364" width="16" height="2" rx="1" fill="currentColor" />
                                            </svg>
                                        </span>
                                    </a>
                                </div>
                            </div>

                            <div className="symbol symbol-70px symbol-2by3 flex-shrink-0">
                                <img src="assets/media/stock/600x400/img-1.jpg" alt="" />
                            </div>
                        </div>

                        <div className="separator separator-dashed my-6"></div>

                        <div className="d-flex flex-stack">
                            <div className="d-flex flex-column me-3">
                                <div className="mb-3">
                                    <a href="../../demo1/dist/apps/ecommerce/sales/details.html" className="text-gray-800 text-hover-primary fs-4 fw-bold">
                                        SmartCleaner
                                    </a>
                                    <span className="text-gray-400 fw-semibold d-block">Smart tool for cooking</span>
                                </div>

                                <div className="d-flex align-items-center">
                                    <span className="fw-bold text-gray-800 fs-5">$ 650</span>
                                    <span className="text-muted mx-2">for</span>
                                    <span className="fw-bold text-gray-800 fs-5 me-3">4</span>
                                    <a href="#" className="btn btn-sm btn-light-success btn-icon-success btn-icon w-25px h-25px me-2">
                                        <span className="svg-icon svg-icon-4">
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <rect x="4.36396" y="11.364" width="16" height="2" rx="1" fill="currentColor" />
                                            </svg>
                                        </span>
                                    </a>
                                    <a href="#" className="btn btn-sm btn-light-success btn-icon w-25px h-25px">
                                        <span className="svg-icon svg-icon-4">
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <rect opacity="0.5" x="11.364" y="20.364" width="16" height="2" rx="1" transform="rotate(-90 11.364 20.364)" fill="currentColor" />
                                                <rect x="4.36396" y="11.364" width="16" height="2" rx="1" fill="currentColor" />
                                            </svg>
                                        </span>
                                    </a>
                                </div>
                            </div>

                            <div className="symbol symbol-70px symbol-2by3 flex-shrink-0">
                                <img src="assets/media/stock/600x400/img-3.jpg" alt="" />
                            </div>
                        </div>

                        <div className="separator separator-dashed my-6"></div>

                        <div className="d-flex flex-stack">
                            <div className="d-flex flex-column me-3">
                                <div className="mb-3">
                                    <a href="../../demo1/dist/apps/ecommerce/sales/details.html" className="text-gray-800 text-hover-primary fs-4 fw-bold">
                                        CameraMaxr
                                    </a>
                                    <span className="text-gray-400 fw-semibold d-block">Professional camera for edge</span>
                                </div>

                                <div className="d-flex align-items-center">
                                    <span className="fw-bold text-gray-800 fs-5">$ 150</span>
                                    <span className="text-muted mx-2">for</span>
                                    <span className="fw-bold text-gray-800 fs-5 me-3">3</span>
                                    <a href="#" className="btn btn-sm btn-light-success btn-icon-success btn-icon w-25px h-25px me-2">
                                        <span className="svg-icon svg-icon-4">
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <rect x="4.36396" y="11.364" width="16" height="2" rx="1" fill="currentColor" />
                                            </svg>
                                        </span>
                                    </a>
                                    <a href="#" className="btn btn-sm btn-light-success btn-icon w-25px h-25px">
                                        <span className="svg-icon svg-icon-4">
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <rect opacity="0.5" x="11.364" y="20.364" width="16" height="2" rx="1" transform="rotate(-90 11.364 20.364)" fill="currentColor" />
                                                <rect x="4.36396" y="11.364" width="16" height="2" rx="1" fill="currentColor" />
                                            </svg>
                                        </span>
                                    </a>
                                </div>
                            </div>

                            <div className="symbol symbol-70px symbol-2by3 flex-shrink-0">
                                <img src="assets/media/stock/600x400/img-8.jpg" alt="" />
                            </div>
                        </div>

                        <div className="separator separator-dashed my-6"></div>

                        <div className="d-flex flex-stack">
                            <div className="d-flex flex-column me-3">
                                <div className="mb-3">
                                    <a href="../../demo1/dist/apps/ecommerce/sales/details.html" className="text-gray-800 text-hover-primary fs-4 fw-bold">
                                        $D Printer
                                    </a>
                                    <span className="text-gray-400 fw-semibold d-block">Manfactoring unique objekts</span>
                                </div>

                                <div className="d-flex align-items-center">
                                    <span className="fw-bold text-gray-800 fs-5">$ 1450</span>
                                    <span className="text-muted mx-2">for</span>
                                    <span className="fw-bold text-gray-800 fs-5 me-3">7</span>
                                    <a href="#" className="btn btn-sm btn-light-success btn-icon-success btn-icon w-25px h-25px me-2">
                                        <span className="svg-icon svg-icon-4">
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <rect x="4.36396" y="11.364" width="16" height="2" rx="1" fill="currentColor" />
                                            </svg>
                                        </span>
                                    </a>
                                    <a href="#" className="btn btn-sm btn-light-success btn-icon w-25px h-25px">
                                        <span className="svg-icon svg-icon-4">
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <rect opacity="0.5" x="11.364" y="20.364" width="16" height="2" rx="1" transform="rotate(-90 11.364 20.364)" fill="currentColor" />
                                                <rect x="4.36396" y="11.364" width="16" height="2" rx="1" fill="currentColor" />
                                            </svg>
                                        </span>
                                    </a>
                                </div>
                            </div>

                            <div className="symbol symbol-70px symbol-2by3 flex-shrink-0">
                                <img src="assets/media/stock/600x400/img-26.jpg" alt="" />
                            </div>
                        </div>

                        <div className="separator separator-dashed my-6"></div>

                        <div className="d-flex flex-stack">
                            <div className="d-flex flex-column me-3">
                                <div className="mb-3">
                                    <a href="../../demo1/dist/apps/ecommerce/sales/details.html" className="text-gray-800 text-hover-primary fs-4 fw-bold">
                                        MotionWire
                                    </a>
                                    <span className="text-gray-400 fw-semibold d-block">Perfect animation tool</span>
                                </div>

                                <div className="d-flex align-items-center">
                                    <span className="fw-bold text-gray-800 fs-5">$ 650</span>
                                    <span className="text-muted mx-2">for</span>
                                    <span className="fw-bold text-gray-800 fs-5 me-3">7</span>
                                    <a href="#" className="btn btn-sm btn-light-success btn-icon-success btn-icon w-25px h-25px me-2">
                                        <span className="svg-icon svg-icon-4">
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <rect x="4.36396" y="11.364" width="16" height="2" rx="1" fill="currentColor" />
                                            </svg>
                                        </span>
                                    </a>
                                    <a href="#" className="btn btn-sm btn-light-success btn-icon w-25px h-25px">
                                        <span className="svg-icon svg-icon-4">
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <rect opacity="0.5" x="11.364" y="20.364" width="16" height="2" rx="1" transform="rotate(-90 11.364 20.364)" fill="currentColor" />
                                                <rect x="4.36396" y="11.364" width="16" height="2" rx="1" fill="currentColor" />
                                            </svg>
                                        </span>
                                    </a>
                                </div>
                            </div>

                            <div className="symbol symbol-70px symbol-2by3 flex-shrink-0">
                                <img src="assets/media/stock/600x400/img-21.jpg" alt="" />
                            </div>
                        </div>

                        <div className="separator separator-dashed my-6"></div>

                        <div className="d-flex flex-stack">
                            <div className="d-flex flex-column me-3">
                                <div className="mb-3">
                                    <a href="../../demo1/dist/apps/ecommerce/sales/details.html" className="text-gray-800 text-hover-primary fs-4 fw-bold">
                                        Samsung
                                    </a>
                                    <span className="text-gray-400 fw-semibold d-block">Profile info,Timeline etc</span>
                                </div>

                                <div className="d-flex align-items-center">
                                    <span className="fw-bold text-gray-800 fs-5">$ 720</span>
                                    <span className="text-muted mx-2">for</span>
                                    <span className="fw-bold text-gray-800 fs-5 me-3">6</span>
                                    <a href="#" className="btn btn-sm btn-light-success btn-icon-success btn-icon w-25px h-25px me-2">
                                        <span className="svg-icon svg-icon-4">
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <rect x="4.36396" y="11.364" width="16" height="2" rx="1" fill="currentColor" />
                                            </svg>
                                        </span>
                                    </a>
                                    <a href="#" className="btn btn-sm btn-light-success btn-icon w-25px h-25px">
                                        <span className="svg-icon svg-icon-4">
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <rect opacity="0.5" x="11.364" y="20.364" width="16" height="2" rx="1" transform="rotate(-90 11.364 20.364)" fill="currentColor" />
                                                <rect x="4.36396" y="11.364" width="16" height="2" rx="1" fill="currentColor" />
                                            </svg>
                                        </span>
                                    </a>
                                </div>
                            </div>

                            <div className="symbol symbol-70px symbol-2by3 flex-shrink-0">
                                <img src="assets/media/stock/600x400/img-34.jpg" alt="" />
                            </div>
                        </div>

                        <div className="separator separator-dashed my-6"></div>

                        <div className="d-flex flex-stack">
                            <div className="d-flex flex-column me-3">
                                <div className="mb-3">
                                    <a href="../../demo1/dist/apps/ecommerce/sales/details.html" className="text-gray-800 text-hover-primary fs-4 fw-bold">
                                        $D Printer
                                    </a>
                                    <span className="text-gray-400 fw-semibold d-block">Manfactoring unique objekts</span>
                                </div>

                                <div className="d-flex align-items-center">
                                    <span className="fw-bold text-gray-800 fs-5">$ 430</span>
                                    <span className="text-muted mx-2">for</span>
                                    <span className="fw-bold text-gray-800 fs-5 me-3">8</span>
                                    <a href="#" className="btn btn-sm btn-light-success btn-icon-success btn-icon w-25px h-25px me-2">
                                        <span className="svg-icon svg-icon-4">
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <rect x="4.36396" y="11.364" width="16" height="2" rx="1" fill="currentColor" />
                                            </svg>
                                        </span>
                                    </a>
                                    <a href="#" className="btn btn-sm btn-light-success btn-icon w-25px h-25px">
                                        <span className="svg-icon svg-icon-4">
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <rect opacity="0.5" x="11.364" y="20.364" width="16" height="2" rx="1" transform="rotate(-90 11.364 20.364)" fill="currentColor" />
                                                <rect x="4.36396" y="11.364" width="16" height="2" rx="1" fill="currentColor" />
                                            </svg>
                                        </span>
                                    </a>
                                </div>
                            </div>

                            <div className="symbol symbol-70px symbol-2by3 flex-shrink-0">
                                <img src="assets/media/stock/600x400/img-27.jpg" alt="" />
                            </div>
                        </div>
                    </div>

                    <div className="card-footer">
                        <div className="d-flex flex-stack">
                            <span className="fw-bold text-gray-600">Total</span>
                            <span className="text-gray-800 fw-bolder fs-5">$ 1840.00</span>
                        </div>

                        <div className="d-flex flex-stack">
                            <span className="fw-bold text-gray-600">Sub total</span>
                            <span className="text-primary fw-bolder fs-5">$ 246.35</span>
                        </div>

                        <div className="d-flex justify-content-end mt-9">
                            <a href="#" className="btn btn-primary d-flex justify-content-end">
                                Pleace Order
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Drawers

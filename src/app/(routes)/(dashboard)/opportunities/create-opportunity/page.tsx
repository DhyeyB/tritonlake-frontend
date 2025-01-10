"use client"

import dynamic from "next/dynamic"
const AddOpportunity = dynamic(() => import("../../../../_components/oppportunity/CreateOpportunityForm"), { ssr: false })
import React from "react"

const Add = () => {
    return <AddOpportunity />
}

export default Add

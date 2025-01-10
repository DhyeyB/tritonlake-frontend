"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function Home() {
    const router = useRouter()

    useEffect(() => {
        router.push("/dashboard")
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return null // Since it will redirect, there's no need to return any JSX
}

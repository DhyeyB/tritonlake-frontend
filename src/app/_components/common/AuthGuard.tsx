"use client"
import { CONFIG } from "@/app/_utils/Constants"
import { getStoredAuthTokenExp, handleError } from "@/app/_utils/Helpers"
import { usePathname, useRouter } from "next/navigation"
import Script from "next/script"
import { ReactNode, useEffect, useState } from "react"

interface AuthGuardProps {
    children: ReactNode
}

const AuthGuard = (props: AuthGuardProps) => {
    const { children } = props
    const router = useRouter()
    const path = usePathname()
    const [authenticated, setAuthenticated] = useState(false)
    const checkToken = async () => {
        try {
            const expTime = getStoredAuthTokenExp()
            if (expTime) {
                setAuthenticated(true)
            } else {
                setAuthenticated(false)
                router.push(`/auth/signin?${CONFIG.PARAMS.REDIRECT_URL_PARAM}=${path}`)
            }
        } catch (error) {
            handleError(error)
            router.push(`/auth/signin?${CONFIG.PARAMS.REDIRECT_URL_PARAM}=${path}`)
        }
    }
    useEffect(() => {
        checkToken()
    })

    useEffect(() => {
        const script = document.getElementById("plugin-script") as HTMLScriptElement
        if (script) {
            setTimeout(() => {
                script.src = CONFIG.PLUGINS_JS_PATH
            }, 0)
        }
    }, [authenticated])

    if (authenticated) {
        return (
            <>
                {children}
                <Script id="plugin-script" async={true} />
            </>
        )
    } else {
        return null
    }
}

export default AuthGuard

"use client"
import { AnyObject } from "@/app/_types/common/Common"
import { CONFIG } from "@/app/_utils/Constants"
import { handleError, isFirmAgent, isNetworkAdmin, isPlatformAdmin } from "@/app/_utils/Helpers"
import { usePathname, useRouter } from "next/navigation"
import { useEffect, useState, ComponentType } from "react"

const withSideBarGuard = <P extends { params: AnyObject }>(WrappedComponent: ComponentType<P>) => {
    const SideBarGuard = ({ params }: P) => {
        const [hasAccess, setHasAccess] = useState(false) // Tracks whether the user has access
        const router = useRouter()
        const path = usePathname()

        const checkAccess = async () => {
            try {
                // Platform Admin: Full access
                if (isPlatformAdmin()) {
                    setHasAccess(true)
                    return
                }

                // Network Admin: Access only to /manage-agents
                if (isNetworkAdmin()) {
                    if (path === CONFIG.REDIRECT_PATHNAME.MANAGE_AGENTS) {
                        setHasAccess(true)
                        return
                    }
                }

                // Firm Agent: No access to any "manage" routes
                if (isFirmAgent()) {
                    if (path.includes("manage")) {
                        setHasAccess(false)
                        router.push("/") // Redirect to the homepage
                        return
                    }
                }

                // Default: Redirect unauthorized users
                router.push("/")
            } catch (error) {
                handleError(error)
                router.push("/") // Redirect on error
            }
        }

        useEffect(() => {
            checkAccess()
        }, [path]) // Re-run if the path changes

        // Show nothing while checking access
        if (!hasAccess) {
            return null
        }

        // Render the wrapped component if access is granted
        return <WrappedComponent {...(params as P)} />
    }

    return SideBarGuard
}

export default withSideBarGuard

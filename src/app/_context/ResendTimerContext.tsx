import React, { createContext, useState, useContext, useCallback, useEffect } from "react"

interface ResendTimerContextType {
    countdown: number
    formattedCountdown: string
    startCountdown: (duration: number) => void
    isActive: boolean
}

const ResendTimerContext = createContext<ResendTimerContextType | undefined>(undefined)

export const useResendTimer = () => {
    const context = useContext(ResendTimerContext)
    if (context === undefined) {
        throw new Error("useResendTimer must be used within a ResendTimerProvider")
    }
    return context
}

export const ResendTimerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [countdown, setCountdown] = useState(0)
    const [isActive, setIsActive] = useState(false)

    const startCountdown = useCallback((duration: number) => {
        setCountdown(duration)
        setIsActive(true)
    }, [])

    // Convert total seconds to 'm s' format
    const formatTime = (seconds: number): string => {
        const minutes = Math.floor(seconds / 60)
        const remainingSeconds = seconds % 60

        return `${minutes > 0 ? `${minutes}m ` : ""}${remainingSeconds}s`
    }

    useEffect(() => {
        let timer: NodeJS.Timeout

        if (isActive && countdown > 0) {
            timer = setInterval(() => {
                setCountdown((prevCountdown) => prevCountdown - 1)
            }, 1000)
        } else if (countdown === 0) {
            setIsActive(false)
        }

        return () => {
            if (timer) clearInterval(timer)
        }
    }, [countdown, isActive])

    const formattedCountdown = formatTime(countdown)

    return <ResendTimerContext.Provider value={{ countdown, formattedCountdown, startCountdown, isActive }}>{children}</ResendTimerContext.Provider>
}

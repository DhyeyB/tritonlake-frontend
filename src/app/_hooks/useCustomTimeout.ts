import { useState, useEffect } from "react"

const useCustomTimeout = () => {
    const [timerId, setTimerId] = useState<NodeJS.Timeout | null>(null)

    const setCustomTimeout = (ms: number, cb: () => void) => {
        if (timerId) clearTimeout(timerId)
        const id = setTimeout(cb, ms)
        setTimerId(id)
    }

    const removeCustomTimeout = (cb?: () => void) => {
        if (timerId) clearTimeout(timerId)
        if (cb) cb()
    }

    useEffect(() => {
        return () => {
            if (timerId) clearTimeout(timerId)
        }
    }, [timerId])

    return { setCustomTimeout, removeCustomTimeout }
}

export default useCustomTimeout

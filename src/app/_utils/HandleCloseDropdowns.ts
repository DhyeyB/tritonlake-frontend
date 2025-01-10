import { RefObject } from "react"

export const handleCloseDropdowns = (dropdownRef: RefObject<HTMLElement>, callback: (arg: boolean) => void) => {
    const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
            callback(false)
        }
    }

    document.addEventListener("mouseenter", handleClickOutside)
    return () => {
        document.removeEventListener("mouseenter", handleClickOutside)
    }
}

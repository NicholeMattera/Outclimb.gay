import { useState } from 'react'

function useDarkMode() {
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)')
    const [darkMode, setDarkMode] = useState(prefersDarkScheme.matches)

    prefersDarkScheme.addEventListener('change', (event) => {
        setDarkMode(event.matches)
    })

    return darkMode
}

export default useDarkMode

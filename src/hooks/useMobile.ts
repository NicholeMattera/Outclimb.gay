import { useState } from 'react'

function useMobile() {
    const isMobileWidth = window.matchMedia('screen and (max-width: 767px)')
    const [mobile, setMobile] = useState(isMobileWidth.matches)

    isMobileWidth.addEventListener('change', (event) => {
        setMobile(event.matches)
    })

    return mobile
}

export default useMobile

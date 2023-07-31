import { useState } from 'react'

function useWindowScroll() {
    const [x, setX] = useState(window.scrollX)
    const [y, setY] = useState(window.scrollY)

    window.addEventListener('scroll', () => {
        setX(window.scrollX)
        setY(window.scrollY)
    })

    return [x, y]
}

export default useWindowScroll

import classNames from 'classnames'
import useDarkMode from 'hooks/useDarkMode'
import useWindowScroll from 'hooks/useWindowScroll'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import './Header.scss'

function Header() {
    const darkMode = useDarkMode()
    const windowScrollPosition = useWindowScroll()
    const headerClass = classNames({
        header: true,
        'header--shadow': windowScrollPosition[1] > 0,
    })

    const [headerImage, setHeaderImage] = useState(darkMode ? '/images/logo_dark.webp' : '/images/logo_light.webp')
    useEffect(() => {
        setHeaderImage(darkMode ? '/images/logo_dark.webp' : '/images/logo_light.webp')
    }, [darkMode])

    return (
        <header className={headerClass}>
            <h1 className="header__logo">
                <Link to="/">
                    <img src={headerImage} height="32" alt="OutClimb" />
                </Link>
            </h1>
            <nav className="header__navigation">
                <ul>
                    <li>
                        <Link to="/events">Events</Link>
                    </li>
                    <li>
                        <Link to="/contact">Contact</Link>
                    </li>
                </ul>
            </nav>
            <ul className="header__social-links">
                <li>
                    <a
                        className="header__facebook"
                        href="https://www.facebook.com/groups/1070762049768453"
                        target="_blank"
                        rel="noreferrer"
                    >
                        <i aria-hidden="true" className="fa-brands fa-square-facebook"></i>
                        <span className="fa-sr-only">Facebook Group</span>
                    </a>
                </li>
                <li>
                    <a
                        className="header__instagram"
                        href="https://www.instagram.com/outclimbmn"
                        target="_blank"
                        rel="noreferrer"
                    >
                        <i aria-hidden="true" className="fa-brands fa-square-instagram"></i>
                        <span className="fa-sr-only">Instagram</span>
                    </a>
                </li>
                <li>
                    <a className="header__discord" href="https://discord.outclimb.gay" target="_blank" rel="noreferrer">
                        <i aria-hidden="true" className="fa-brands fa-discord"></i>
                        <span className="fa-sr-only">Discord Server</span>
                    </a>
                </li>
            </ul>
        </header>
    )
}

export default Header

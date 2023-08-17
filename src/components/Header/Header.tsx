import './Header.scss'
import { useEffect, useState } from 'react'
import Button from 'components/Button/Button'
import { ButtonType } from 'types/ButtonType'
import classNames from 'classnames'
import { Link } from 'react-router-dom'
import useDarkMode from 'hooks/useDarkMode'
import useWindowScroll from 'hooks/useWindowScroll'

function Header() {
    const darkMode = useDarkMode()
    const windowScrollPosition = useWindowScroll()
    const headerClass = classNames({
        header: true,
        'header--shadow': windowScrollPosition[1] > 0,
    })

    const [headerImage, setHeaderImage] = useState(
        darkMode ? '/assets/images/logo_dark.webp' : '/assets/images/logo_light.webp',
    )
    useEffect(() => {
        setHeaderImage(darkMode ? '/assets/images/logo_dark.webp' : '/assets/images/logo_light.webp')
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
                        <Link to="/events" className="header__nav-item">
                            Events
                        </Link>
                    </li>
                    <li>
                        <Link to="/contact" className="header__nav-item">
                            Contact
                        </Link>
                    </li>
                </ul>
            </nav>
            <ul className="header__social-links">
                <li className="header__donate-button">
                    <Button
                        href="https://gofund.me/ca5465d4"
                        label="Donate"
                        target="_blank"
                        type={ButtonType.Primary}
                    />
                </li>
                <li>
                    <a
                        className="header__nav-item header__facebook"
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
                        className="header__nav-item header__instagram"
                        href="https://www.instagram.com/outclimbmn"
                        target="_blank"
                        rel="noreferrer"
                    >
                        <i aria-hidden="true" className="fa-brands fa-square-instagram"></i>
                        <span className="fa-sr-only">Instagram</span>
                    </a>
                </li>
                <li>
                    <a
                        className="header__nav-item header__discord"
                        href="https://discord.outclimb.gay"
                        target="_blank"
                        rel="noreferrer"
                    >
                        <i aria-hidden="true" className="fa-brands fa-discord"></i>
                        <span className="fa-sr-only">Discord Server</span>
                    </a>
                </li>
            </ul>
        </header>
    )
}

export default Header

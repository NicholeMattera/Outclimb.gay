import './Header.scss'
import { useMemo, useState } from 'react'
import Button from 'components/Button/Button'
import { ButtonType } from 'types/ButtonType'
import classNames from 'classnames'
import { Link } from 'react-router-dom'
import Menu from 'components/Menu/Menu'
import useDarkMode from 'hooks/useDarkMode'
import useMobile from 'hooks/useMobile'
import useWindowScroll from 'hooks/useWindowScroll'

function Header() {
    const darkMode = useDarkMode()
    const mobile = useMobile()
    const windowScrollPosition = useWindowScroll()
    const headerClass = classNames({
        header: true,
        'header--mobile': mobile,
        'header--shadow': windowScrollPosition[1] > 0,
    })

    const headerImage = useMemo(() => {
        return darkMode ? '/assets/images/logo_dark.webp' : '/assets/images/logo_light.webp'
    }, [darkMode])

    const [menuIsOpen, setMenuIsOpen] = useState(false)

    const openMenu = () => {
        setMenuIsOpen(true)
    }

    const onMenuClose = () => {
        setMenuIsOpen(false)
    }

    return (
        <header className={headerClass}>
            <a className="header__skip-to-content" href="#main">
                Skip to content
            </a>

            {mobile && (
                <>
                    <div className="header__button-area header__button-area--left">
                        <button className="header__menu" onClick={openMenu}>
                            <i aria-hidden="true" className="fa-solid fa-bars"></i>
                            <span className="fa-sr-only">Open Menu</span>
                        </button>
                    </div>

                    <h1 className="header__logo">
                        <img src={headerImage} height="32" alt="OutClimb" />
                    </h1>

                    <div className="header__button-area header__button-area--right"></div>

                    <Menu onClose={onMenuClose} open={menuIsOpen} />
                </>
            )}

            {!mobile && (
                <>
                    <h1 className="header__logo">
                        <Link to="/">
                            <img src={headerImage} height="32" alt="OutClimb" />
                        </Link>
                    </h1>
                    <nav className="header__navigation">
                        <ul className="header__navigation-main">
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
                </>
            )}
        </header>
    )
}

export default Header

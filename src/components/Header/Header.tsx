import './Header.scss'
import { useEffect, useMemo, useState } from 'react'
import Button from 'components/Button/Button'
import { ButtonType } from 'types/ButtonType'
import classNames from 'classnames'
import { Link } from 'react-router-dom'
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
    const [showBackdrop, setShowBackdrop] = useState(false)
    const closeMenu = () => {
        setMenuIsOpen(false)
        document.querySelector('body')?.classList.remove('no-scroll')
    }
    const openMenu = () => {
        setMenuIsOpen(true)
        setShowBackdrop(true)
        document.querySelector('body')?.classList.add('no-scroll')
    }
    const menuClass = classNames({
        menu: true,
        'menu--open': menuIsOpen,
    })
    useEffect(() => {
        if (!mobile) {
            setMenuIsOpen(false)
            setShowBackdrop(false)
        }
    }, [mobile])

    const hideBackdrop = () => {
        if (!menuIsOpen) {
            setShowBackdrop(false)
        }
    }
    const menuBackdropClass = classNames({
        menu__backdrop: true,
        'menu__backdrop--visible': menuIsOpen,
    })
    const menuBackdropStyle = {
        display: showBackdrop ? 'block' : 'none',
    }
    const menuItemTabIndex = useMemo(() => {
        return menuIsOpen ? 0 : -1
    }, [menuIsOpen])
    const renderMenu = () => {
        if (!mobile) return undefined

        return (
            <>
                <div
                    className={menuBackdropClass}
                    onClick={closeMenu}
                    onTransitionEnd={hideBackdrop}
                    style={menuBackdropStyle}
                    tabIndex={-1}
                ></div>
                <div className={menuClass}>
                    <nav className="menu__navigation">
                        <div className="menu__header">
                            <img src={headerImage} height="32" alt="OutClimb" />
                            <span />
                            <button className="header__menu" onClick={closeMenu}>
                                <i aria-hidden="true" className="fa-solid fa-xmark"></i>
                                <span className="fa-sr-only">Close Menu</span>
                            </button>
                        </div>
                        <ul className="menu__navigation-main">
                            <li>
                                <Link to="/events" className="menu__navigation-item" tabIndex={menuItemTabIndex}>
                                    Events
                                </Link>
                            </li>
                            <li>
                                <Link to="/contact" className="menu__navigation-item" tabIndex={menuItemTabIndex}>
                                    Contact
                                </Link>
                            </li>
                        </ul>
                        <ul className="menu__navigation-social">
                            <li>
                                <a
                                    className="menu__navigation-item"
                                    href="https://gofund.me/ca5465d4"
                                    tabIndex={menuItemTabIndex}
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    Donate
                                </a>
                            </li>
                            <li>
                                <a
                                    className="menu__navigation-item"
                                    href="https://www.facebook.com/groups/1070762049768453"
                                    tabIndex={menuItemTabIndex}
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    Facebook
                                </a>
                            </li>
                            <li>
                                <a
                                    className="menu__navigation-item"
                                    href="https://www.instagram.com/outclimbmn"
                                    tabIndex={menuItemTabIndex}
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    Instagram
                                </a>
                            </li>
                            <li>
                                <a
                                    className="menu__navigation-item"
                                    href="https://discord.outclimb.gay"
                                    tabIndex={menuItemTabIndex}
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    Discord
                                </a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </>
        )
    }

    const renderContent = () => {
        if (mobile) {
            return (
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
                </>
            )
        }

        return (
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
        )
    }

    return (
        <header className={headerClass}>
            {renderContent()}
            {renderMenu()}
        </header>
    )
}

export default Header

import './Menu.scss'
import { useEffect, useMemo, useState } from 'react'
import classNames from 'classnames'
import Link from '../Link/Link'
import useDarkMode from 'hooks/useDarkMode'
import useMobile from 'hooks/useMobile'

type MenuProps = {
    onClose: () => void
    open?: boolean
}

function Menu({ onClose, open }: MenuProps) {
    const darkMode = useDarkMode()
    const mobile = useMobile()

    const menuClass = classNames({
        menu: true,
        'menu--open': open,
    })

    const headerImage = useMemo(() => {
        return darkMode ? '/assets/images/logo_dark.webp' : '/assets/images/logo_light.webp'
    }, [darkMode])

    useEffect(() => {
        return () => {
            document.querySelector('body')?.classList.remove('no-scroll')
        }
    }, [])

    const [showBackdrop, setShowBackdrop] = useState(false)
    useEffect(() => {
        if (open) {
            setShowBackdrop(true)
            document.querySelector('body')?.classList.add('no-scroll')
        } else {
            document.querySelector('body')?.classList.remove('no-scroll')
        }
    }, [open])
    useEffect(() => {
        if (!mobile) {
            onClose()
            setShowBackdrop(false)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [mobile])

    const hideBackdrop = () => {
        if (!open) {
            setShowBackdrop(false)
        }
    }
    const menuBackdropClass = classNames({
        menu__backdrop: true,
        'menu__backdrop--visible': open,
    })
    const menuBackdropStyle = {
        display: showBackdrop ? 'block' : 'none',
    }
    const menuItemTabIndex = useMemo(() => {
        return open ? 0 : -1
    }, [open])

    return (
        mobile && (
            <>
                <div
                    className={menuBackdropClass}
                    onClick={() => onClose()}
                    onTransitionEnd={hideBackdrop}
                    style={menuBackdropStyle}
                    tabIndex={-1}
                ></div>
                <div className={menuClass}>
                    <nav className="menu__navigation">
                        <div className="menu__header">
                            <img src={headerImage} height="32" alt="OutClimb" />
                            <span />
                            <button className="header__menu" onClick={() => onClose()}>
                                <i aria-hidden="true" className="fa-solid fa-xmark"></i>
                                <span className="fa-sr-only">Close Menu</span>
                            </button>
                        </div>
                        <ul className="menu__navigation-main">
                            <li>
                                <Link to="/" className="menu__navigation-item" tabIndex={menuItemTabIndex}>
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link to="/events" className="menu__navigation-item" tabIndex={menuItemTabIndex}>
                                    Events
                                </Link>
                            </li>
                            <li>
                                <Link to="/meet-the-team" className="menu__navigation-item" tabIndex={menuItemTabIndex}>
                                    Meet the Team
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
    )
}

export default Menu

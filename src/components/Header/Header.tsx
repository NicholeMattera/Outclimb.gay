import classNames from 'classnames'
import useWindowScroll from 'hooks/useWindowScroll'
import { Link } from 'react-router-dom'

import './Header.scss'

function Header() {
    const windowScrollPosition = useWindowScroll()
    const headerClass = classNames({
        shadow: windowScrollPosition[1] > 0,
    })

    return (
        <header className={headerClass}>
            <h1 className="logo">
                <Link to="/">Outclimb</Link>
            </h1>
            <nav>
                <ul>
                    <li>
                        <Link to="/events">Events</Link>
                    </li>
                    <li>
                        <Link to="/contact">Contact</Link>
                    </li>
                </ul>
            </nav>
            <ul className="socialLinks">
                <li>
                    <a href="https://www.facebook.com/groups/1070762049768453" target="_blank" rel="noreferrer">
                        <i aria-hidden="true" className="fa-brands fa-square-facebook"></i>
                        <span className="fa-sr-only">Facebook Group</span>
                    </a>
                </li>
                <li>
                    <a href="https://www.instagram.com/outclimbmn" target="_blank" rel="noreferrer">
                        <i aria-hidden="true" className="fa-brands fa-square-instagram"></i>
                        <span className="fa-sr-only">Instagram</span>
                    </a>
                </li>
                <li>
                    <a href="https://discord.outclimb.gay" target="_blank" rel="noreferrer">
                        <i aria-hidden="true" className="fa-brands fa-discord"></i>
                        <span className="fa-sr-only">Discord Server</span>
                    </a>
                </li>
            </ul>
        </header>
    )
}

export default Header

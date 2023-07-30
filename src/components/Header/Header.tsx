import { Link } from 'react-router-dom'

import './Header.scss'

function Header() {
    return (
        <header>
            <div className="top">
                <h1>Outclimb</h1>
                <nav>
                    <ul>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/about">About Us</Link>
                        </li>
                        <li>
                            <Link to="/events">Events</Link>
                        </li>
                        <li>
                            <Link to="/contact">Contact</Link>
                        </li>
                    </ul>
                </nav>
            </div>

            <div className="hero"></div>
        </header>
    )
}

export default Header

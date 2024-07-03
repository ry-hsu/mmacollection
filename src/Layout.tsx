/**
 * Navigation bar
 */
import { Outlet, Link, NavLink } from "react-router-dom"
import './Header.css'

/**
 * 
 * @returns div of nav and outlet for navigation with browserrouter
 */
function Layout() {
    return (
        <div>
            <nav className="Nav">
                <ul>
                    <li><NavLink to="/">Departments</NavLink></li> 
                </ul>
                <ul>
                    <li><NavLink to="/favorites">Favorites</NavLink></li>
                </ul>
            </nav>

            <Outlet/>
        </div>
    )
}

export default Layout;
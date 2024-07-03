import React from 'react'
import "./Header.css"

import { Outlet, Link } from "react-router-dom"

function Banner() {

    return (
        // <div>
        //     <h1>The Metropolitan Museum of Art Collection</h1>
            
        // </div>
        <header className="Header">
            <h1>The Metropolitan Museum of Art Collection</h1>
            {/* <nav className="navbar">
                <ul>
                    <Link to="/">Departments</Link>
                    <Link to="/details">Artwork Details</Link>
                    <Link to="/favorites">Favorites</Link>
                </ul>
            </nav> */}
        </header>
    )
}

export default Banner;
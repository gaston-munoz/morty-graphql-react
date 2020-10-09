import React from 'react';

const Header = (): JSX.Element => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark p-2">
          <div className="container text-center">
            <ul className="navbar-nav mx-auto">
                <li className="nav-item active">
                <a className="nav-link" href="/">FIND YOUR FAVORITE RICK AND MORTY CHARACTERS<span className="sr-only">(current)</span></a>
                </li>
            </ul>
          </div>
        </nav>
    )
}

export default Header;
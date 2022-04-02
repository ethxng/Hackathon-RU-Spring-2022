import React from 'react';
import {Link} from 'react-router-dom'

const navStyles = {
    position: 'fixed',
    top: '0',
    width: '100%',
    height: '50px',
    background: '#f5f5f5'
}

const listStyles = {
    listStyleType: 'none',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative'
}

const linkStyles = {
    marginRight: '20px',
    fontSize: '20px',
    textTransform: 'uppercase',
    color: '#f1f1f1',
    cursor: 'pointer'
}

function Navbar() {

    return (
    <nav style={navStyles}>
        <ul style={listStyles}>
            <li style={linkStyles}>
                <Link to="/">Home</Link>
            </li>
            <li style={linkStyles}>
                <Link to="/Login">Log In</Link>
            </li>
            <li style={linkStyles}>
                <Link to="/Signup">Sign Up</Link>
            </li>
        </ul>
  </nav>
    );
}

export default Navbar;
import React from 'react';
import {Link, useNavigate} from 'react-router-dom'

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
    const navigate = useNavigate();

    const logOut = () => {
        console.log("hello")
        let xhr = new XMLHttpRequest()
        xhr.open("POST", "http://localhost:3000/log-out")
        xhr.setRequestHeader("Accept", "application/json")
        
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
              console.log(xhr.status);
              console.log(xhr.response);
              if (xhr.response === "OK") {
                  
                  navigate("/Login")
              }
            }};
    }

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
            <li>
                <Link to="/Login" style={linkStyles} onClick={logOut}>Log Out</Link>
            </li>
        </ul>
  </nav>
    );
}

export default Navbar;
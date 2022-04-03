import React from 'react';
import Field from "./Field"
import {useNavigate} from "react-router-dom"

function Login() {
  
const logInStyle = {
    height: '250px',
    display: 'flex'
};

const formStyle = {
    margin: 'auto',
    padding: '10px',
    border: '1px solid #c9c9c9',
    borderRadius: '5px',
    background: '#f5f5f5',
    width: '220px',
    display: 'block'
};

const signUpStyle = {
    margin: '10px 0 0 0',
    padding: 'auto',
    border: '#f5f5f5',
    borderRadius: '3px',
    background: '#f5f5f5',
    width: '100%', 
    fontSize: '15px',
    color: 'black',
    display: 'block'
}

const submitStyle = {
    margin: '10px 0 0 0',
    padding: '7px 10px',
    border: '1px solid #efffff',
    borderRadius: '3px',
    background: '#3085d6',
    width: '100%', 
    fontSize: '15px',
    color: 'white',
    display: 'block'
};

let navigate = useNavigate();

const LoginForm = ({onSubmit}) => {
    const usernameRef = React.useRef();
    const passwordRef = React.useRef();
    const handleSubmit = e => {
        e.preventDefault();
        const data = {
            username: usernameRef.current.value,
            password: passwordRef.current.value
        };
        onSubmit(data);
    };
    return (
      <form style={formStyle} onSubmit={handleSubmit} >
        <Field ref={usernameRef} label="Username:" type="text" />
        <Field ref={passwordRef} label="Password:" type="password" />
        <div>
          <button style={submitStyle} type="Log In">Submit</button>
          <button style={signUpStyle} onClick = {() => {
            navigate("/Signup")
          }}>Sign Up</button>
        </div>
      </form>
    );
};

  
  const handleSubmit = info => {
    const json = JSON.stringify(info, null, 4);
    console.log(json);
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "http://localhost:3000/log-in");
    xhr.setRequestHeader("Accept", "application/json");
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        console.log(xhr.status);
        console.log(xhr.response);
      }};

    xhr.send(json);
  }

  return (
    <div className="login" style={logInStyle}>
      <LoginForm onSubmit={handleSubmit}/>
    </div>
  );
}

export default Login;

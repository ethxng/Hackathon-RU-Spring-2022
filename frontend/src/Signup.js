import React from 'react';
import Field from "./Field"
import {useNavigate} from "react-router-dom"

function Signup() {
  
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

const SignupForm = ({onSubmit}) => {
    const usernameRef = React.useRef();
    const passwordRef = React.useRef();
    const confPassRef = React.useRef();
    const firstNameRef = React.useRef();
    const lastNameRef = React.useRef();
    const handleSubmit = e => {
        e.preventDefault();
        const data = {
            email: usernameRef.current.value,
            first_name: firstNameRef.current.value,
            last_name: lastNameRef.current.value,
            password: passwordRef.current.value,
            password2: confPassRef.current.value,
        };
        onSubmit(data);
    };
    return (
      <form style={formStyle} onSubmit={handleSubmit} >
        <Field ref={usernameRef} label="Email:" type="text" />
        <Field ref={firstNameRef} label="First Name:" type="text" />
        <Field ref={lastNameRef} label="Last Name:" type="text" />
        <Field ref={passwordRef} label="Password:" type="password" />
        <Field ref={confPassRef} label="Confirm Password:" type="password" />
        <div>
          <button style={submitStyle} type="Log In">Submit</button>
        </div>
      </form>
    );
};

  
  const handleSubmit = info => {
    const json = JSON.stringify(info, null, 4);
    console.log(json);
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "http://localhost:3000/sign-up");
    xhr.setRequestHeader("Accept", "application/json");
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        console.log(xhr.status);
        console.log(xhr.response);
        if (xhr.response === "OK") {
            console.log("hello")
            navigate("/Login")
        }
      }};

    xhr.send(json);
  }

  return (
    <div className="login" style={logInStyle}>
      <SignupForm onSubmit={handleSubmit}/>
    </div>
  );
}

export default Signup;

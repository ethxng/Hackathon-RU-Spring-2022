import React from 'react';
import ReactDOM from 'react-dom';
import Login from './Login';
import Home from './Home'
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import Signup from './Signup';

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path='/Login' element={<Login />} />
      <Route path='/Signup' element={<Signup />} />
    </Routes>
  </BrowserRouter>,
  document.getElementById("root")
);
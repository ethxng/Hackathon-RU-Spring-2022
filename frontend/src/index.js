import React from 'react';
import {createRoot} from 'react-dom/client';
import Login from './Login';
import Home from './Home'
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import Signup from './Signup';


let container =   document.getElementById("root")
let root = createRoot(container)
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path='/Login' element={<Login />} />
      <Route path='/Signup' element={<Signup />} />
    </Routes>
  </BrowserRouter>);
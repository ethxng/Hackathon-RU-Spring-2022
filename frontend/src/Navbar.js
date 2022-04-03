import {useNavigate} from 'react-router-dom'
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

function Navbar() {

    const logOut = () => {
        sessionStorage.setItem("token", null)
        let xhr = new XMLHttpRequest()
        xhr.open("POST", "http://localhost:3000/log-out")
        xhr.send()
    }

    let navigate = useNavigate()

    return (
        <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Rutgers List
          </Typography>
          <Button color="inherit" onClick={() => navigate("/Login")}>Login</Button>
          <Button color="inherit" onClick={() => {
            navigate("/Login")
            logOut()
            }}>Logout</Button>
          <Button color="inherit" onClick={() => navigate("/Signup")}>Signup</Button>
        </Toolbar>
      </AppBar>
    </Box>
)}
export default Navbar;
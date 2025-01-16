import React from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'
import { Button, ButtonGroup, Chip, Stack } from '@mui/material'
import './App.css'

export default function Layout({user, logout}) {
    const { pathname } = useLocation();
    return (
        <>
        <div className='menu'>
        <Stack  direction="row" spacing={1} className='buttongroup' variant="contained" aria-label="Basic button group">
          <Link to="/"><Button  variant={pathname=="/" ? "outlined" : "contained"}>Messages</Button></Link>
          <Link to="/users"><Button  variant={pathname=="/users" ? "outlined" : "contained"}>Users</Button></Link>
          <Link to="/about"><Button  variant={pathname=="/about" ? "outlined" : "contained"}>About</Button></Link>
        </Stack>
        {user ?
          <div className='email'>
            <Link to="/admin"><Button variant={pathname == "/admin" ? "outlined" : "contained"}>Admin</Button></Link>
            <Chip label={user.email} variant='contained' className='c'></Chip>
            <Button variant='contained' onClick={logout} className='logout'> Logout </Button>
        </div>
        : <Link to="/login"><Button  variant={pathname=="/login" ? "outlined" : "contained"}>Login</Button></Link>
      }
      </div>
      <div className='page'>
        <Outlet />
      </div>
    </>
    )
}

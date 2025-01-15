import React from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'
import { Button, ButtonGroup, Chip } from '@mui/material'

export default function Layout({user, logout, auth}) {
    const { pathname } = useLocation();
    return (
        <>
        <div className='menu'>
        <ButtonGroup variant="contained" aria-label="Basic button group">
          <Link to="/"><Button variant={pathname=="/" ? "outlined" : "contained"}>Messages</Button></Link>
          <Link to="/users"><Button variant={pathname=="/users" ? "outlined" : "contained"}>Users</Button></Link>
          <Link to="/about"><Button variant={pathname=="/about" ? "outlined" : "contained"}>About</Button></Link>
        </ButtonGroup>
        {user ?
          <div>
            <Chip label={user.email} variant='contained'></Chip>
            <Button variant='contained' onClick={logout}> Logout </Button>
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
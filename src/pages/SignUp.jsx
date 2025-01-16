import React from 'react'
import { useState } from 'react'
import { Button, TextField } from '@mui/material'
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

export default function SignUp() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loginError, setLoginError] = useState(false);

  return (
    <div className='login'>
    <TextField
      error={loginError}
      required
      label="Email"
      value={email}
      onChange={e => {setEmail(e.target.value); setLoginError(false);}}
    />
    <TextField
      required
      label="Password"
      type="password"
      value={password}
      onChange={e => setPassword(e.target.value)}
      helperText={loginError ? "Wrong username or password!" : "Please Register! "}
    />
    <Button
          variant="contained"
          >
      Sign up
    </Button>
  </div>
  )
}

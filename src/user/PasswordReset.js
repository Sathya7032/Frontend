// src/components/PasswordReset.js
import React, { useState } from 'react';
import axios from 'axios';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CircularProgress from '@mui/material/CircularProgress';

const swal = require('sweetalert2')

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        <h3><span style={{ color: 'black' }}>Academic</span><span style={{ color: 'tomato' }}>Folio</span></h3>
      </Link>{' '}
      {new Date().getFullYear()}
    </Typography>
  );
}

const defaultTheme = createTheme();

const PasswordReset = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false); 

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('https://acadamicfolios.pythonanywhere.com/auth/password/reset/', { email });
      setMessage('Password reset link sent. Please check your email.');
      setLoading(true);
      swal.fire({
        title: "Password reset link sent. Please check your email.",
        icon: "success",
        toast: true,
        timer: 6000,
        position: 'center',
        timerProgressBar: true,
        showConfirmButton: false,
    })
    } catch (error) {
      setMessage('Error sending password reset email.');
      setLoading(false);
      swal.fire({
        title: "Something went wrong",
        icon: "error",
        toast: true,
        timer: 6000,
        position: 'center',
        timerProgressBar: true,
        showConfirmButton: false,
    })
    }
  };

  return (
    <div>
    
      <ThemeProvider theme={defaultTheme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Reset Password 
            </Typography>

            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                autoFocus
              />

              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
                disabled={loading} // Disable while loading
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                disabled={loading} // Disable while loading
              >
                {loading ? <CircularProgress size={24} /> : 'Change Password'} {/* Show loading spinner */}
              </Button>
              <Grid container>
               
                <Grid item>
                  <Link href="/signup" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Copyright sx={{ mt: 8, mb: 4 }} />
        </Container>
      </ThemeProvider>

    </div>


  );
};

export default PasswordReset;
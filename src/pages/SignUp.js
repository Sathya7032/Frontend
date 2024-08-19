import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CircularProgress from '@mui/material/CircularProgress';

import { Link as RouterLink } from 'react-router-dom';
import { Link } from '@mui/material';
import AuthContext from '../context/AuthContext';

function validateEmail(email) {
    // Basic email validation
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validateUsername(username) {
    // Basic username validation (min length 3)
    return username.length >= 3;
}

function validatePassword(password) {
    // Password validation: min 6 characters, at least one uppercase letter, one number, and one symbol
    return /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{6,}$/.test(password);
}

function validateForm(email, username, password, password2) {
    return {
        email: email.trim() !== '' ? validateEmail(email) : false, // Check if email is valid and not empty
        username: username.trim() !== '' ? validateUsername(username) : false, // Check if username is valid and not empty
        password: password.trim() !== '' ? validatePassword(password) : false, // Check if password is valid and not empty
        password2: password2.trim() !== '' ? password === password2 : false, // Check if password2 matches password and not empty
    };
}

const defaultTheme = createTheme();

export default function SignUp() {
    const [email, setEmail] = React.useState("");
    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [password2, setPassword2] = React.useState("");
    const [loading, setLoading] = React.useState(false); // Loading state
    const [formErrors, setFormErrors] = React.useState({
        email: null,
        username: null,
        password: null,
        password2: null,
    });

    const { registerUser } = React.useContext(AuthContext);

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handlePassword2Change = (e) => {
        setPassword2(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formValidation = validateForm(email, username, password, password2);
        setFormErrors(formValidation);
        if (Object.values(formValidation).every(value => value !== false)) {
            setLoading(true); // Set loading to true
            try {
                // If all validations pass, register user
                await registerUser(email, username, password, password2);
            } finally {
                setLoading(false); // Set loading to false once done
            }
        }
    };

   
    return (
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
                        Sign up
                    </Typography>
                   
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    value={email}
                                    onChange={handleEmailChange}
                                    error={formErrors.email === false}
                                    helperText={formErrors.email === false ? "Invalid email address" : ""}
                                    disabled={loading} // Disable while loading
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="username"
                                    label="Username"
                                    name="username"
                                    autoComplete="username"
                                    value={username}
                                    onChange={handleUsernameChange}
                                    error={formErrors.username === false}
                                    helperText={formErrors.username === false ? "Username must be at least 3 characters long" : ""}
                                    disabled={loading} // Disable while loading
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                    value={password}
                                    onChange={handlePasswordChange}
                                    error={formErrors.password === false}
                                    helperText={formErrors.password === false ? "Password must be at least 6 characters long and contain one uppercase letter, one number, and one symbol" : ""}
                                    disabled={loading} // Disable while loading
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="password2"
                                    label="Confirm Password"
                                    type="password"
                                    id="password2"
                                    autoComplete="new-password"
                                    value={password2}
                                    onChange={handlePassword2Change}
                                    error={formErrors.password2 === false}
                                    helperText={formErrors.password2 === false ? "Passwords do not match" : ""}
                                    disabled={loading} // Disable while loading
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            disabled={loading} // Disable while loading
                        >
                            {loading ? <CircularProgress size={24} /> : 'Sign Up'} {/* Show loading spinner */}
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <RouterLink to="/signin" variant="body2">
                                    Already have an account? Sign in
                                </RouterLink>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <Box mt={5}>
                    <Typography variant="body2" color="text.secondary" align="center">
                        {'Copyright © '}
                        <Link color="inherit" href="https://acadamicfolio.info/">
                            AcademicFolio
                        </Link>{' '}
                        {new Date().getFullYear()}
                        {'.'}
                    </Typography>
                </Box>
            </Container>
        </ThemeProvider>
    );
}
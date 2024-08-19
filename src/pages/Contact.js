import React, { useState } from 'react'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import getLPTheme from '../getLPTheme';
import { CssBaseline, Divider } from '@mui/material';
import AppAppBar from '../components/AppAppBar';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from "sweetalert2";
import {
    Container,
    Box,
    Typography,
    TextField,
    Button,
    Grid,
    Card,
    CardContent,
    CardActions,
} from '@mui/material';

const Contact = () => {
    const [mode, setMode] = React.useState('light');
    const [showCustomTheme, setShowCustomTheme] = React.useState(true);
    const LPtheme = createTheme(getLPTheme(mode));
    const defaultTheme = createTheme({ palette: { mode } });

    const toggleColorMode = () => {
        setMode((prev) => (prev === 'dark' ? 'light' : 'dark'));
    };

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [subject, setSubject] = useState("")
    const [message, setMessage] = useState("")
    const [errors, setErrors] = useState({});


    const baseUrl = "https://acadamicfolios.pythonanywhere.com/app";
    const navigate = useNavigate();


    const handleSubmit = async (e) => {
        e.preventDefault();
        const errors = {};
        if (!name.trim()) {
            errors.name = 'Name is required';
        }
        if (!email.trim()) {
            errors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            errors.email = 'Email is invalid';
        }
        if (!subject.trim()) {
            errors.subject = 'Subject is required';
        }
        if (!message.trim()) {
            errors.message = 'Message is required';
        }
        setErrors(errors);

        // If errors exist, return without submitting the form
        if (Object.keys(errors).length > 0) {
            return;
        }

        const formData = new FormData();
        formData.append("name", name);
        formData.append("email", email);
        formData.append("subject", subject);
        formData.append("message", message);

        try {
            const response = await axios.post(baseUrl + "/contact/", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            navigate("/contact");
            Swal.fire({
                title: "Thank you for contacting us....",
                width: 400,
                timer: 2000,
                toast: true,
                timerProgressBar: true,
                padding: "3em",
                color: "#716add",
            });
            console.log(response.data);
        } catch (error) {
            console.error("Error creating blog post:", error);
        }

    };
    return (
        <ThemeProvider theme={showCustomTheme ? defaultTheme : LPtheme}>
            <CssBaseline />
            <AppAppBar mode={mode} toggleColorMode={toggleColorMode} />
            

            <Container  id="hero" sx={{
                pt: { xs: 4, sm: 12 },
                pb: { xs: 8, sm: 16 },
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: { xs: 6, sm: 6 },
            }}>
                <Divider/>

                <Grid container justifyContent="center">
                    <Grid item xs={12} md={8}>
                        <Card sx={{ borderRadius: 2, p: 5,width:'100%' }}>
                            <Box sx={{ textAlign: 'center', mb: 5 }}>
                                <Typography variant="h5" sx={{ color: 'primary.main', textTransform: 'uppercase', letterSpacing: '5px' }}>
                                    Contact
                                </Typography>
                                <Typography variant="h4">Contact For Any Query</Typography>
                            </Box>
                            <CardContent>
                                <form noValidate onSubmit={handleSubmit}>
                                    <TextField
                                        fullWidth
                                        margin="normal"
                                        variant="outlined"
                                        label="Your Name"
                                        id="name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        error={!!errors.name}
                                        helperText={errors.name}
                                    />
                                    <TextField
                                        fullWidth
                                        margin="normal"
                                        variant="outlined"
                                        label="Your Email"
                                        id="email"
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        error={!!errors.email}
                                        helperText={errors.email}
                                    />
                                    <TextField
                                        fullWidth
                                        margin="normal"
                                        variant="outlined"
                                        label="Subject"
                                        id="subject"
                                        value={subject}
                                        onChange={(e) => setSubject(e.target.value)}
                                        error={!!errors.subject}
                                        helperText={errors.subject}
                                    />
                                    <TextField
                                        fullWidth
                                        margin="normal"
                                        variant="outlined"
                                        label="Message"
                                        id="message"
                                        multiline
                                        rows={5}
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                        error={!!errors.message}
                                        helperText={errors.message}
                                    />
                                    <Box sx={{ textAlign: 'center', mt: 2 }}>
                                        <Button
                                            type="submit"
                                            variant="contained"
                                            color="primary"
                                            size="large"
                                        >
                                            Send Message
                                        </Button>
                                    </Box>
                                </form>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Container>
            <Divider/>
            <Footer />
        </ThemeProvider>
    )
}

export default Contact

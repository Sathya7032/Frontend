import React, { useEffect, useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import getLPTheme from '../getLPTheme';
import axios from 'axios';
import {
    Container,
    Box,
    Typography,
    Grid,
    Card,
    CardMedia,
    CardContent,
    CardActions,
    Button,
    CssBaseline,
} from '@mui/material';
import AppAppBar from '../components/AppAppBar';
import Footer from '../components/Footer';

export default function Tutorials() {
    const baseUrl = 'https://acadamicfolios.pythonanywhere.com/app';

    const [tutorials, setTutorials] = useState([]);

    useEffect(() => {
        fetchTodos();
    }, []);

    const fetchTodos = async () => {
        await axios
            .get(baseUrl + '/tutorials/', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            .then((res) => {
                console.log(res.data);
                setTutorials(res.data);
            });
    };

    const [mode, setMode] = React.useState('light');
    const [showCustomTheme, setShowCustomTheme] = React.useState(true);
    const LPtheme = createTheme(getLPTheme(mode));
    const defaultTheme = createTheme({ palette: { mode } });

    const toggleColorMode = () => {
        setMode((prev) => (prev === 'dark' ? 'light' : 'dark'));
    };

    return (
        <ThemeProvider theme={showCustomTheme ? defaultTheme : LPtheme}>
            <CssBaseline />
            <AppAppBar mode={mode} toggleColorMode={toggleColorMode} />
            <Container id="hero" sx={{
                pt: { xs: 4, sm: 5 },
                pb: { xs: 8, sm: 16 },
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: { xs: 3, sm: 6 },
            }}>
               <Typography variant='h3' className='pt-5 fw-bold'>Tutorials</Typography>
                {/* Tutorials List */}
                <Box sx={{ py: 6, backgroundColor: 'background.default' }}>
                    <Container maxWidth="lg">

                        <Grid container spacing={4}>
                            {tutorials.map((tutorial, index) => (
                                <Grid item key={index} xs={12} sm={6} md={4}>
                                    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                                        <CardMedia
                                            component="img"
                                            alt={tutorial.tutorialName}
                                            image={tutorial.tutorialImage}
                                            title={tutorial.tutorialName}
                                        />
                                        <CardContent sx={{ flexGrow: 1 }}>
                                            <Typography
                                                variant="h5"
                                                component="div"
                                                sx={{ color: 'tomato', textTransform: 'uppercase', textAlign: 'center', mb: 2 }}
                                            >
                                                {tutorial.tutorialName}
                                            </Typography>
                                            <Typography variant="body2">{tutorial.tutorialContent}</Typography>
                                        </CardContent>
                                        <CardActions sx={{ justifyContent: 'center' }}>
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                href={`/tutorials/${tutorial.url}`}
                                                sx={{ py: 1, px: 4, fontWeight: 'bold' }}
                                            >
                                                Explore
                                            </Button>
                                        </CardActions>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                    </Container>
                </Box>
            </Container>
            <Footer/>
        </ThemeProvider>
    );
}

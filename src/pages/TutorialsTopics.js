import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import axios from "axios";
import { Container, Grid, Card, CardMedia, CardContent, Typography, Button, CssBaseline } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import getLPTheme from '../getLPTheme';
import Footer from '../components/Footer';
import AppAppBar from '../components/AppAppBar';

export default function TutorialTopics() {
    const [mode, setMode] = React.useState('light');
    const [showCustomTheme, setShowCustomTheme] = React.useState(true);
    const LPtheme = createTheme(getLPTheme(mode));
    const defaultTheme = createTheme({ palette: { mode } });

    const toggleColorMode = () => {
        setMode((prev) => (prev === 'dark' ? 'light' : 'dark'));
    };
    const baseUrl = "https://acadamicfolios.pythonanywhere.com/app";
    const { url } = useParams();
    const [topics, setTopics] = useState([]);

    useEffect(() => {
        axios
            .get(baseUrl + `/tutorials/${url}/`)
            .then((response) => {
                setTopics(response.data);
                console.log(response.data);
            })
            .catch((error) => {
                console.error("Error fetching tutorials:", error);
            });
    }, [url]);

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
                <Typography variant="h4" align="center" gutterBottom>
                    Topics
                </Typography>
                <Grid container spacing={4}>
                    {topics.length > 0 ? (
                        topics.map(topic => (
                            <Grid item key={topic.id} xs={12} sm={6} md={4}>
                                <Card sx={{ height: '100%' }}>
                                    <CardMedia
                                        component="iframe"
                                        height="200"
                                        src={topic.post_video}
                                        title={topic.title}
                                        allowFullScreen
                                    />
                                    <CardContent>
                                        <Typography variant="h6" component="div">
                                            {topic.post_title}
                                        </Typography>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            href={`/tutorials/posts/${topic.url}`}
                                            sx={{ mt: 2 }}
                                            fullWidth
                                        >
                                            Explore full topic
                                        </Button>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))
                    ) : (
                        <Typography variant="body1" align="center" sx={{ mt: 2 }}>
                            No videos available in this category.
                        </Typography>
                    )}
                </Grid>
            </Container>
            <Footer/>
            </ThemeProvider>
    );
}

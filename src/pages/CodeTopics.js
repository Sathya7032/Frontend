import React, { useEffect, useState } from 'react'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import getLPTheme from '../getLPTheme';
import { Box, Container, CssBaseline, Divider, List, ListItem, ListItemText } from '@mui/material';
import AppAppBar from '../components/AppAppBar';
import Footer from '../components/Footer';
import axios from 'axios';
import { Grid, Paper, Button, Typography } from '@mui/material';
import { Link, useParams } from 'react-router-dom';
import AddComponent from '../AddComponent';


const Codetopics = () => {
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
            .get(baseUrl + `/languages/${url}/topics/`)
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
            <Divider />
            <Container id="hero" sx={{ marginTop: 12 }}>
                <Box>
                    <Divider />
                    <Typography variant="h4" align="center" sx={{ my: 5, color: 'black' }}>
                        Topics
                    </Typography>
                    <Box>
                        {topics ? (
                            <List>
                                {topics.map((topic, index) => (
                                    <Link href={`/languages/${topic.url}/codes/`} underline="none" key={topic.id}>
                                        <ListItem button>
                                            <ListItemText
                                                primary={`${index + 1}. ${topic.topic}`}
                                                primaryTypographyProps={{
                                                    fontSize: 15,
                                                    textTransform: 'uppercase',
                                                    fontWeight: 'bold',
                                                    color: 'darkslategrey',
                                                    padding: 1,
                                                }}
                                            />
                                        </ListItem>
                                    </Link>
                                ))}
                            </List>
                        ) : (
                            <Typography>No posts yet</Typography>
                        )}
                    </Box>
                </Box>
            </Container>
            <Divider />
            <Footer />
        </ThemeProvider>
    )
}

export default Codetopics

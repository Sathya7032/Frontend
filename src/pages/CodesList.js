import React, { useEffect, useState } from 'react'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import getLPTheme from '../getLPTheme';
import { Box, Container, CssBaseline } from '@mui/material';
import AppAppBar from '../components/AppAppBar';
import Footer from '../components/Footer';
import axios from 'axios';
import AddComponent from '../AddComponent';
import { useParams } from 'react-router-dom';
import { Paper, Typography, List, ListItem, ListItemText, Link } from '@mui/material';

const CodesList = () => {
    const [mode, setMode] = React.useState('light');
    const [showCustomTheme, setShowCustomTheme] = React.useState(true);
    const LPtheme = createTheme(getLPTheme(mode));
    const defaultTheme = createTheme({ palette: { mode } });

    const toggleColorMode = () => {
        setMode((prev) => (prev === 'dark' ? 'light' : 'dark'));
    };

    const baseUrl = "https://acadamicfolios.pythonanywhere.com/app";

    const { url } = useParams();

    const [codes, setCodes] = useState([]);

    useEffect(() => {
        axios
            .get(baseUrl + `/languages/${url}/codes/`)
            .then((response) => {
                setCodes(response.data);
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
            <Container sx={{marginTop:12}}>
                <Paper sx={{ margin: 2, backgroundColor: 'darkslategrey' }}>
                    <Typography variant="h4" align="center" color="white" sx={{ padding: 2 }}>
                        Programs
                    </Typography>
                </Paper>

                {codes ? (
                    <List>
                        {codes.map((code, index) => (
                            <Link href={`/languages/codes/${code.url}/`} underline="none" key={code.id}>
                                <ListItem button>
                                    <ListItemText
                                        primary={`${index + 1}. ${code.title}`}
                                        primaryTypographyProps={{
                                            fontSize: 15,
                                            fontWeight: 'bolder',
                                            color: 'darkslategrey',
                                            padding: 1,
                                        }}
                                    />
                                </ListItem>
                            </Link>
                        ))}
                    </List>
                ) : (
                    <Typography variant="h5" color="white" align="center">
                        No codes yet
                    </Typography>
                )}
            </Container>
            <Footer />
        </ThemeProvider>
    )
}

export default CodesList

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Paper, Typography, Box, CssBaseline, Container } from "@mui/material";
import CodeDisplay from "./CodeDisplay";
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import getLPTheme from '../getLPTheme';
import AppAppBar from "../components/AppAppBar";
import Footer from "../components/Footer";

const Codes = () => {
    const baseUrl = "https://acadamicfolios.pythonanywhere.com/app";
    const { url } = useParams();
    const [topics, setTopics] = useState(null);
    const [error, setError] = useState(null);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    useEffect(() => {
        axios
            .get(`${baseUrl}/languages/codes/${url}/`)
            .then((response) => {
                setTopics(response.data);
            })
            .catch((error) => {
                setError("Error fetching tutorials");
                console.error("Error fetching tutorials:", error);
            });
    }, [url]);
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
                <Box sx={{ margin: isMobile ? 0 : 2, padding: isMobile ? '10px' : '40px' }}>
                    {error && (
                        <Typography color="error" sx={{ margin: 2 }}>
                            {error}
                        </Typography>
                    )}
                    {topics && (
                        <>
                            <Paper sx={{ margin: isMobile ? 0 : 2, backgroundColor: "darkslategrey" }}>
                                <Typography
                                    variant={isMobile ? "h6" : "h4"}
                                    sx={{ textAlign: "center", color: 'white', padding: isMobile ? 1 : 2, textTransform: 'uppercase' }}
                                >
                                    {topics.title}
                                </Typography>
                                <script
                                    async
                                    src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6919135852803356"
                                    crossorigin="anonymous"
                                ></script>
                                <ins
                                    className="adsbygoogle"
                                    style={{ display: "block", textAlign: "center" }}
                                    data-ad-layout="in-article"
                                    data-ad-format="fluid"
                                    data-ad-client="ca-pub-6919135852803356"
                                    data-ad-slot="9140112864"
                                ></ins>
                            </Paper>
                            <Paper sx={{ margin: isMobile ? 0 : 2, padding: isMobile ? 1 : 2 }}>
                                <CodeDisplay code={topics.code} />
                            </Paper>
                            <Paper sx={{ margin: isMobile ? 0 : 2, padding: isMobile ? 1 : 2 }}>
                                <Typography
                                    sx={{ fontSize: isMobile ? '14px' : 'inherit' }}
                                    dangerouslySetInnerHTML={{ __html: topics.content }}
                                />
                            </Paper>
                        </>
                    )}
                </Box>
            </Container>
            <Footer />
        </ThemeProvider>
    );
};

export default Codes;

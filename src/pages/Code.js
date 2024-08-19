import React, { useEffect, useState } from 'react'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import getLPTheme from '../getLPTheme';
import { Box, Container, CssBaseline, Divider } from '@mui/material';
import AppAppBar from '../components/AppAppBar';
import Footer from '../components/Footer';
import axios from 'axios';
import { Grid, Paper, Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import AddComponent from '../AddComponent';

const Code = () => {
  const [mode, setMode] = React.useState('light');
  const [showCustomTheme, setShowCustomTheme] = React.useState(true);
  const LPtheme = createTheme(getLPTheme(mode));
  const defaultTheme = createTheme({ palette: { mode } });

  const toggleColorMode = () => {
    setMode((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const baseUrl = "https://acadamicfolios.pythonanywhere.com/app";

  const [lang, setLang] = useState([]);
  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    await axios.get(baseUrl + "/languages/").then((res) => {
      console.log(res.data);
      setLang(res.data);
    });
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
        <Divider/>
        <Typography className='mt-4 fw-bold' variant="h4" align="center">
          Code Snippets
        </Typography>
        
        <Grid container spacing={2} >
          {lang.map((langs, index) => (
            <Grid item xs={12} md={6} lg={5} key={langs.id}>
              <Paper
                elevation={3}
                style={{
                  padding: '20px',
                  margin: '5px',
                  borderRadius: 15,
                  textTransform: 'uppercase',
                  border: '1px solid black'
                }}
              >
                <Typography variant="h6" gutterBottom>
                  <Link to={`/topics/${langs.url}/`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    {index + 1}. {langs.language}
                  </Link>
                </Typography>
                <Button
                  component={Link}
                  to={`/topics/${langs.url}/`}
                  variant="contained"
                  color="primary"
                  style={{ marginTop: '10px' }}
                >
                  Topics
                </Button>
              </Paper>
            </Grid>
          ))}
        </Grid>
        
      </Container>
      <Footer />
    </ThemeProvider>
  )
}

export default Code

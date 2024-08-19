import React, { useEffect, useState } from 'react'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import getLPTheme from '../getLPTheme';
import { CssBaseline } from '@mui/material';
import AppAppBar from '../components/AppAppBar';
import Footer from '../components/Footer';
import axios from 'axios';
import { Container, Typography, FormControl, InputLabel, Select, MenuItem, Grid, Card, CardContent, CardMedia, Box } from '@mui/material';
import ReactPlayer from 'react-player';

const Shorts = () => {
  const [mode, setMode] = React.useState('light');
  const [showCustomTheme, setShowCustomTheme] = React.useState(true);
  const LPtheme = createTheme(getLPTheme(mode));
  const defaultTheme = createTheme({ palette: { mode } });

  const toggleColorMode = () => {
    setMode((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const [categories, setCategories] = useState([]);
  const [videos, setVideos] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    // Fetch categories from API
    axios.get('https://acadamicfolios.pythonanywhere.com/app/api/categories/')
      .then(response => {
        setCategories(response.data);
      })
      .catch(error => {
        console.error("Error fetching categories:", error);
      });
  }, []);

  useEffect(() => {
    // Fetch videos based on selected category from API
    let url = 'https://acadamicfolios.pythonanywhere.com/app/api/shorts/';
    if (selectedCategory) {
      url += `?category_id=${selectedCategory}`;
    }

    axios.get(url)
      .then(response => {
        setVideos(response.data);
      })
      .catch(error => {
        console.error("Error fetching videos:", error);
      });
  }, [selectedCategory]);
  return (
    <ThemeProvider theme={showCustomTheme ? defaultTheme : LPtheme}>
      <CssBaseline />
      <AppAppBar mode={mode} toggleColorMode={toggleColorMode} />
      <Container sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Video Library
        </Typography>

        {/* Category Selector */}
        <FormControl fullWidth sx={{ mb: 4 }}>
          <InputLabel id="category-select-label">Select Category</InputLabel>
          <Select
            labelId="category-select-label"
            id="category-select"
            onChange={e => setSelectedCategory(e.target.value)}
            defaultValue=""
          >
            <MenuItem value="">All Categories</MenuItem>
            {categories.map(category => (
              <MenuItem key={category.id} value={category.id}>
                {category.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Video Display */}
        <Box>
          {videos.length > 0 ? (
            <Grid container spacing={4}>
              {videos.map(video => (
                <Grid item xs={12} sm={6} md={4} key={video.id}>
                  <Card>
                    <CardMedia>
                      <ReactPlayer
                        url={video.video_url}
                        playing={false}
                        controls
                        width="100%"
                      />
                    </CardMedia>
                    <CardContent>
                      <Typography variant="h6" component="div">
                        {video.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {video.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          ) : (
            <Typography>No videos available in this category.</Typography>
          )}
        </Box>
      </Container>
      <Footer />
    </ThemeProvider>
  )
}

export default Shorts

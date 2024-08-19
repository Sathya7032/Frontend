import { ThemeProvider, createTheme } from '@mui/material/styles';
import getLPTheme from '../getLPTheme';
import AppAppBar from '../components/AppAppBar';
import Footer from '../components/Footer';
import axios from "axios";
import moment from "moment";
import {
    Container,
    TextField,
    Button,
    Grid,
    Card,
    CardContent,
    Typography,
    Divider,
    CircularProgress,
    Box,
    CssBaseline,
    CardActions,
    Stack,
} from '@mui/material';
import { useState } from 'react';
import * as React from 'react';


const Blogs = () => {
    const [mode, setMode] = React.useState('light');
    const [showCustomTheme, setShowCustomTheme] = React.useState(true);
    const LPtheme = createTheme(getLPTheme(mode));
    const defaultTheme = createTheme({ palette: { mode } });

    const toggleColorMode = () => {
        setMode((prev) => (prev === 'dark' ? 'light' : 'dark'));
    };

    const baseUrl = "https://acadamicfolios.pythonanywhere.com/app";
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [query, setQuery] = useState(""); // State to hold search query

    React.useEffect(() => {
        fetchBlogs();
    }, [currentPage, query]); // Fetch blogs on page or query change

    const fetchBlogs = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${baseUrl}/blogs/`, {
                params: {
                    page: currentPage,
                    query: query.trim() // Include query parameter if it's not empty
                }
            });
            setBlogs(response.data.results);

            // Assuming the API response includes a count field indicating the total number of blog entries
            const totalEntries = response.data.count;

            // Assuming each page returns 10 entries, calculate total pages
            const entriesPerPage = 10;
            setTotalPages(Math.ceil(totalEntries / entriesPerPage));
        } catch (error) {
            console.error("Error fetching blogs:", error);
        }
        setLoading(false);
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        setCurrentPage(1); // Reset to first page on new search
        fetchBlogs(); // Fetch blogs with the current query
    };

    const clearSearch = () => {
        setQuery(""); // Clear the search query
        setCurrentPage(1); // Reset to first page when clearing search
        fetchBlogs(); // Fetch all blogs without search query
    };

    return (
        <ThemeProvider theme={showCustomTheme ? defaultTheme : LPtheme}>
            <CssBaseline />
            <AppAppBar mode={mode} toggleColorMode={toggleColorMode} />
            <Container id="hero" sx={{
                pt: { xs: 4, sm: 12 },
                pb: { xs: 8, sm: 16 },
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: { xs: 3, sm: 6 },
            }}>
                <Stack spacing={1} useFlexGap sx={{ width: { xs: '100%', sm: '100%' } }}>
                    <Typography spacing={2} variant='h3' style={{ fontWeight: 'bold' }} sx={{
                        display: 'flex',
                        flexDirection: { xs: 'column', md: 'row' },
                        alignSelf: 'center',
                        textAlign: 'center',
                        mt: { xs: 5},
                    }}>
                        Blogs
                    </Typography>
                    <Box component="form" onSubmit={handleSearch} sx={{ mb: 4 }}>
                        <Grid container spacing={2} alignItems="center">
                            <Grid item xs={12} md={8}>
                                <TextField
                                    fullWidth
                                    sx={{ width: '100%' }}
                                    placeholder="Search blogs..."
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    variant="outlined"
                                />
                            </Grid>
                            <Grid item>
                                <Button type="submit" variant="contained" color="primary">
                                    Search
                                </Button>
                            </Grid>
                            {query && (
                                <Grid item>
                                    <Button onClick={clearSearch} variant="outlined" color="secondary">
                                        Clear
                                    </Button>
                                </Grid>
                            )}
                        </Grid>
                    </Box>

                    <Grid container spacing={2}>
                        {loading ? (
                            <Grid item xs={12}>
                                <Box display="flex" justifyContent="center">
                                    <CircularProgress />
                                </Box>
                            </Grid>
                        ) : (
                            blogs.map((blog) => (
                                <Grid item xs={12} key={blog.id}>
                                    <Card>
                                        <CardContent>
                                            <Typography variant="h5" component="div">
                                                {blog.title}
                                            </Typography>
                                            <Divider sx={{ my: 2 }} />
                                            <Typography variant="body2" dangerouslySetInnerHTML={{ __html: blog.content.slice(0, 400) }} />
                                            <Box mt={2}>
                                                <Typography variant="body2" color="textSecondary">
                                                    Views: {blog.views}
                                                </Typography>
                                                <Typography variant="body2" color="textSecondary">
                                                    {moment(blog.date).format('DD-MMMM-YYYY')}
                                                </Typography>
                                            </Box>
                                            <Box mt={2}>
                                                <Button
                                                    variant="contained"
                                                    color="primary"
                                                    href={`/blogs/${blog.url}/`}
                                                    rel="noopener noreferrer"
                                                >
                                                    Continue Reading
                                                </Button>
                                            </Box>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            ))
                        )}
                    </Grid>

                    {/* Pagination controls */}
                    <Box display="flex" justifyContent="center" mt={4}>
                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={handlePreviousPage}
                            disabled={currentPage === 1}
                            sx={{ mr: 2 }}
                        >
                            Previous
                        </Button>
                        <Typography variant="body1">
                            {currentPage} / {totalPages}
                        </Typography>
                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={handleNextPage}
                            disabled={currentPage === totalPages}
                            sx={{ ml: 2 }}
                        >
                            Next
                        </Button>
                    </Box>
                </Stack>
            </Container>
            <Footer />
        </ThemeProvider>
    )
}

export default Blogs

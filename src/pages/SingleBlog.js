import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Grid, Paper, Typography, Divider, Button, List, ListItemButton, ListItemText, CssBaseline, Container } from "@mui/material";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import useAxios from "../utils/useAxios";
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import AddComponent from "../AddComponent";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import getLPTheme from '../getLPTheme';
import Footer from "../components/Footer";
import AppAppBar from "../components/AppAppBar";

const SingleBlog = () => {
    const baseUrl = "https://acadamicfolios.pythonanywhere.com/app";
    const api = useAxios();
    const { url } = useParams();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const [post, setPost] = useState(null);
    const [comments, setComments] = useState([]);
    const [content, setContent] = useState("");
    const token = localStorage.getItem("authTokens");
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await axios.get(baseUrl + '/blogsindex/'); // Update the API endpoint accordingly
                setBlogs(response.data.slice(0, 6)); // Slice the response to get the first 6 blogs
            } catch (error) {
                console.error('Error fetching blogs:', error);
            }
        };

        fetchBlogs();
    }, []);


    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await axios.get(`${baseUrl}/blogs/${url}`);
                setPost(response.data);
                console.log("Blog post data:", response.data);
            } catch (error) {
                console.error("Error fetching blog:", error);
            }
        };

        fetchPost();
    }, [url]);

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const response = await axios.get(`${baseUrl}/blogs/${url}/comments/`);
                setComments(response.data);
                console.log("Comments data:", response.data);
            } catch (error) {
                console.error("Error fetching comments:", error);
            }
        };

        fetchComments();
    }, [url]);

    const handleChange = (event, editor) => {
        const data = editor.getData();
        setContent(data);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post(`${baseUrl}/blogs/${url}/comment/create/`, {
                content: content,
            });
            console.log("Comment posted successfully:", response.data);
            setContent("");
            setComments([...comments, response.data]);
        } catch (error) {
            console.error("Error posting comment:", error);
        }
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
                pt: { xs: 8, sm: 12 },
                pb: { xs: 8, sm: 16 },
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: { xs: 3, sm: 6 },
            }}>
                <Grid container style={{ margin: 0, padding: isMobile ? '10px' : '10px' }}>
                    <Grid item xs={12} md={9}>

                        {post ? (
                            <>
                                <Paper className="bg-success" style={{ padding: isMobile ? '10px' : '0px', marginBottom: 20 }}>
                                    <Typography
                                        variant={isMobile ? "h6" : "h4"}
                                        style={{
                                            fontWeight: "bolder",
                                            textTransform: "uppercase",
                                            textAlign: "center",
                                            padding: 5,
                                        }}
                                    >
                                        {post.title}
                                    </Typography>
                                </Paper>
                                <Paper style={{ padding: isMobile ? '10px' : '10px', marginBottom: 20 }}>
                                    <Typography
                                        className="text-black"
                                        style={{
                                            paddingTop: 10,
                                            fontSize: isMobile ? '14px' : 'inherit'
                                        }}
                                        dangerouslySetInnerHTML={{ __html: post.content }}
                                    />
                                    <Divider />
                                </Paper>
                                <Paper style={{ padding: isMobile ? '10px' : '10px' }}>
                                    <center>
                                        <h5 className="text-danger p-2" style={{ fontSize: isMobile ? '16px' : 'inherit' }}>
                                            <span className="text-primary">Blog written by: </span>
                                            <span className="text-danger">
                                                {post.user ? post.user.username : "Unknown"}
                                            </span>
                                        </h5>
                                    </center>
                                </Paper>
                            </>
                        ) : (
                            <Typography variant="h6" style={{ textAlign: "center", color: "red" }}>
                                Loading...
                            </Typography>
                        )}

                        <div style={{ padding: isMobile ? '10px' : '10px' }}>
                            <Typography variant="h4" style={{ textAlign: "center", color: "green", fontSize: isMobile ? '18px' : 'inherit' }}>
                                Comments:
                            </Typography>
                            {comments.length > 0 ? (
                                comments.map((comment) => (
                                    <Paper key={comment.id} style={{ padding: isMobile ? '10px' : '20px', marginBottom: 20 }}>
                                        <Typography
                                            style={{
                                                color: "black",
                                                paddingTop: 10,
                                                fontSize: isMobile ? '14px' : 'inherit'
                                            }}
                                            dangerouslySetInnerHTML={{ __html: comment.content }}
                                        />
                                        <Typography className="text-danger" variant="subtitle2" style={{ marginTop: 10 }}>
                                            Posted by: {comment.user ? comment.user.username : "Unknown"}
                                        </Typography>
                                        <Divider />
                                    </Paper>
                                ))
                            ) : (
                                <Typography variant="h6" style={{ textAlign: "center", color: "red", fontSize: isMobile ? '16px' : 'inherit' }}>
                                    No comments yet. Be the first to comment!
                                </Typography>
                            )}

                            {token ? (
                                <div style={{ marginTop: 20 }}>
                                    <Typography variant="h4" style={{ fontSize: isMobile ? '18px' : 'inherit' }}>
                                        Post a Comment
                                    </Typography>
                                    <form onSubmit={handleSubmit}>
                                        <CKEditor
                                            editor={ClassicEditor}
                                            data={content}
                                            onChange={handleChange}
                                        />
                                        <Button type="submit" variant="contained" color="primary" style={{ marginTop: 10 }}>
                                            Post Comment
                                        </Button>
                                    </form>
                                </div>
                            ) : (
                                <Typography style={{ textAlign: "center", marginTop: 20 }}>
                                    Please <a href="/login">login</a> to post a comment.
                                </Typography>
                            )}
                        </div>
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <Divider />
                        <Typography className="text-center" style={{ position: 'sticky', color: 'tomato', fontWeight: 'bold', fontSize: 20, padding: 10 }}>Latest Blogs</Typography>
                        <Divider />
                        <List style={{ top: 20, marginTop: 10, position: 'sticky' }}>
                            {blogs.map((blog) => (
                                <>
                                    <ListItemButton key={blog.url} href={`/blogs/${blog.url}/`}>
                                        <ListItemText primary={blog.title} />
                                    </ListItemButton>
                                    <Divider />
                                </>
                            ))}
                        </List>
                    </Grid>
                </Grid>
            </Container>
            <Footer />
        </ThemeProvider>
    );
};

export default SingleBlog;
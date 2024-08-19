import React, { useEffect, useState } from "react";
import homepage from '../homepage1.jpg'
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Divider,
  Grid,
  IconButton,
  Link,
  List,
  ListItem,
  Typography,
} from "@mui/material";
import { jwtDecode } from "jwt-decode";
import useAxios from "../utils/useAxios";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Base1 from "./Base1";



const Dashboard = () => {
  const api = useAxios();
  const baseUrl = "https://acadamicfolios.pythonanywhere.com/app";
  const token = localStorage.getItem("authTokens");

  if (token) {
    const decode = jwtDecode(token);
    var user_id = decode.user_id;
    var username = decode.username;
  }

  const [todo, setTodo] = useState([]);
  const [blog, setBlog] = useState([]);
  useEffect(() => {
    fetchTodos();
    fetchBlogs();
  }, []);

  const fetchTodos = async () => {
    await api.get(baseUrl + "/todos/" + user_id + "/summary/").then((res) => {
      console.log(res.data);
      setTodo(res.data);
    });
  };

  const fetchBlogs = async () => {
    await api.get(baseUrl + "/blog/" + user_id + "/").then((res) => {
      console.log(res.data);
      setBlog(res.data);
    });
  };

  return (
    <div>
      <Base1>
        <Typography
          variant="h4"
          color="primary"
          style={{ textAlign: "center", fontWeight: "bolder" }}
        >
          Dashboard
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <Card>
              <Box margin={2}>
                <CardMedia component="img" image={homepage} height="250" />
              </Box>
            </Card>
          </Grid>

          <Grid item xs={12} sm={8}>
            <Card>
              <Box margin={2}>
                <CardContent>
                  <Typography
                    align="center"
                    variant="h4"
                    style={{ color: "brown", marginBottom: "14px" }}
                  >
                    Welcome {username}
                  </Typography>
                  <Typography
                    variant="p"
                    align="center"
                    style={{ fontFamily: "cursive", fontWeight: "bold" }}
                  >
                    "Welcome to AcademicFolio, your all-in-one destination for
                    academic excellence and social connectivity. Explore
                    insightful blogs, comprehensive tutorials, and stay
                    organized with our todo lists. Stay updated with the latest
                    news and trends, and lighten your mood with our collection
                    of memes. Connect and collaborate with friends to foster a
                    supportive academic community. Start your journey towards
                    academic success and meaningful connections today with
                    AcademicFolio."
                  </Typography>
                </CardContent>
              </Box>
            </Card>
          </Grid>
        </Grid>

        <Grid container spacing={2} marginTop={2}>
          <Grid item xs={12} sm={6} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h5" align="center">
                  Your Tasks
                </Typography>
                <Typography variant="h2" align="center">
                  {todo.total_tasks}
                </Typography>
                <Box marginTop={2}>
                  <center>
                    <a href="/todo/">
                      <button href="/todo/" className="btn btn-primary">
                        Goto Tasks
                      </button>
                    </a>
                  </center>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h5" align="center">
                  Active Tasks
                </Typography>
                <Typography variant="h2" align="center">
                  {todo.active_tasks}
                </Typography>
                <Box marginTop={2}>
                  <center>
                    <a href="/todo/">
                      <button href="/todo/" className="btn btn-primary" style={{backgroundColor:'black'}}>
                        Goto Tasks
                      </button>
                    </a>
                  </center>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h5" align="center">
                  completed Tasks
                </Typography>
                <Typography variant="h2" align="center">
                  {todo.completed_tasks}
                </Typography>
                <Box marginTop={2}>
                  <center>
                    <a href="/todo/">
                      <button href="/todo/" className="btn btn-primary" >
                        Goto Tasks
                      </button>
                    </a>
                  </center>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Grid container spacing={1} marginTop={2}>
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography
                  variant="h5"
                  align="center"
                  style={{ fontWeight: "bold" }}
                >
                  Your Blogs
                </Typography>
                <List>
                  {blog.map((blogs) => (
                    <div key={blogs.id}>
                      <Link href={`/your_blogs`}>
                        <ListItem
                          secondaryAction={
                            <IconButton aria-label="comment">
                              <ChevronRightIcon />
                            </IconButton>
                          }
                        >
                          <Typography
                            variant="p"
                            style={{ fontWeight: "bold" }}
                          >
                            {blogs.title}
                          </Typography>
                        </ListItem>
                      </Link>
                      <Divider />
                    </div>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

       
      </Base1>
    </div>
  );
};

export default Dashboard;
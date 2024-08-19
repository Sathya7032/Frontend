import React, { useEffect, useState } from "react";
import useAxios from "../utils/useAxios";
import { jwtDecode } from "jwt-decode";
import { Delete, Favorite, FavoriteBorder, Share } from "@mui/icons-material";
import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Checkbox,
  IconButton,
  Typography,
} from "@mui/material";
import Swal from "sweetalert2";
import Base1 from "./Base1";
const YourBlogs = () => {
  const api = useAxios();
  const baseUrl = "https://acadamicfolios.pythonanywhere.com/app";
  const token = localStorage.getItem("authTokens");
  const decoded = jwtDecode(token);
  const user_id = decoded.user_id;

  const [blog, setBlog] = useState([]);

  const fetchBlogs = async () => {
    await api.get(baseUrl + "/blog/" + user_id + "/").then((res) => {
      console.log(res.data);
      setBlog(res.data);
    });
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const deleteBlog = async (blog_id) => {
    await api.delete(baseUrl + "/blog/" + user_id + "/" + blog_id + "/");
    Swal.fire({
      title: "Blog Deleted successfully",
      icon: "success",
      toast: true,
      timer: 2000,
      position: "center",
      timerProgressBar: true,
    });
    fetchBlogs();
  };
  return (
    <div>
      <Base1>
        {blog.map((item) => (
          <div key={item.id}>
            <Card sx={{ margin: 1 }}>
              <CardHeader
                avatar={
                  <Avatar
                    sx={{ bgcolor: "red" }}
                    src=""
                    aria-label="recipe"
                  ></Avatar>
                }
                action={
                  <IconButton
                    aria-label="settings"
                    onClick={() => deleteBlog(item.id)}
                  >
                    <Delete />
                  </IconButton>
                }
                title={item.user.email}
                subheader={item.date}
              />

              <CardContent>
                <Typography varient="h1" color="text.primary">
                  {item.title}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  dangerouslySetInnerHTML={{ __html: item.content }}
                ></Typography>
              </CardContent>
              <CardActions disableSpacing>
                <IconButton aria-label="add to favorites">
                  <Checkbox
                    icon={<FavoriteBorder />}
                    checkedIcon={<Favorite sx={{ color: "red" }} />}
                  />
                </IconButton>
                <IconButton aria-label="share">
                  <Share />
                </IconButton>
              </CardActions>
            </Card>
          </div>
        ))}
      </Base1>
    </div>
  );
};

export default YourBlogs;
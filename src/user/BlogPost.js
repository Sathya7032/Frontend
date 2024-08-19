import React, { useState } from "react";
import useAxios from "../utils/useAxios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Base1 from "../user/Base1";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

function BlogPost({ placeholder }) {
  const baseUrl = "https://acadamicfolios.pythonanywhere.com/app";
  const api = useAxios();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleCreatePost = async () => {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);

    try {
      const response = await api.post(baseUrl + "/post-blog/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      navigate("/your_blogs");
      Swal.fire({
        title: "You have added a new Blog.....",
        width: 400,
        timer: 2000,
        toast: true,
        timerProgressBar: true,
        padding: "3em",
        color: "#716add",
      });
      console.log(response.data);
    } catch (error) {
      console.error("Error creating blog post:", error);
    }
  };

  // Customize Quill toolbar and default text color
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ color: [] }, { background: [] }], // drop-down for selecting text color and background color
      [{ align: [] }],
      [{ list: "ordered" }, { list: "bullet" }],
      ["blockquote", "code-block"],
      ["link", "image", "video"],
      ["clean"],
    ],
  };

  // Set default text color
  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "color",
    "background",
    "align",
    "list",
    "bullet",
    "blockquote",
    "code-block",
    "link",
    "image",
    "video",
  ];

  return (
    <div>
      <Base1>
        <div className="container">
          <div className="row justify-content-center align-items-center mt-5">
            <div className="col-md-12">
              <div className="card">
                <div className="card-header bg-primary text-white">
                  <h4 className="mb-0">Add Your Blog Here</h4>
                </div>
                <div className="card-body">
                  <div className="mb-3">
                    <label htmlFor="title" className="form-label">
                      Title
                    </label>
                    <input
                      id="title"
                      name="title"
                      onChange={(e) => setTitle(e.target.value)}
                      value={title}
                      type="text"
                      className="form-control"
                      placeholder="Title"
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="content" className="form-label">
                      Content
                    </label>
                    <ReactQuill
                      value={content}
                      onChange={setContent}
                      placeholder={placeholder || "Start typing..."}
                      modules={modules}
                      formats={formats}
                      style={{ color: "#000000" }} // Set default text color to black
                    />
                  </div>
                </div>
                <div className="card-footer text-end">
                  <button
                    type="button"
                    onClick={handleCreatePost}
                    className="btn btn-primary"
                  >
                    Add Blog
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Base1>
    </div>
  );
}

export default BlogPost;
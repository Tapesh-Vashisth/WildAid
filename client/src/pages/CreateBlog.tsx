import React, { useState } from "react";
import styles from "../styles/createblog.module.css";
import { useAppSelector } from "../store/hooks";
import { Button, Stack, TextField } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import convertToBase64 from "../helper/ConvertToBase64";
import axiosInstance from "../api/axios";

const CreateBlog = () => {
  const navigate = useNavigate();
  const User = useAppSelector((state) => state.user);

  const author = User.name;
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [image, setFileName] = useState<any>("");

  const handleImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      if (
        file.type === "image/jpeg" ||
        file.type === "image/png" ||
        file.type === "image/jpg"
      ) {
        let base64 = await convertToBase64(file);
        setFileName(base64);
      } else {
      }
    }
  };

  const createBlogHandler = async () => {
    const res = await axiosInstance.post("/blog/createblog", {
      author: User.name,
      title,
      content,
      image,
    });

    if (res.status < 400) {
      navigate("/");
    }
  };

  return (
    <React.Fragment>
      <form onSubmit={createBlogHandler}>
        <Stack
          gap={2}
          spacing={2}
          direction="column"
          sx={{ marginBottom: 4, padding: "50px" }}
        >
          <h2 style={{ marginTop: "10px" }}>Create Blog</h2>
          <h6>Put down your thoughts and spread your knowledge...</h6>
          <TextField
            type="text"
            variant="outlined"
            color="secondary"
            label="Title"
            onChange={(e) => setTitle(e.target.value)}
            // value={firstName}
            fullWidth
            required
          />
          <TextField
            type="text"
            variant="outlined"
            color="secondary"
            label="Content"
            onChange={(e) => setContent(e.target.value)}
            multiline
            rows={4}
            maxRows={8}
            required
            fullWidth
          />
          <Stack direction={"row"}>
            <label htmlFor="image" style={{ fontSize: "20px", marginRight: "15px", fontWeight: 600 }}>
              Thumbnail: 
            </label>
            <input
              type="file"
              id="image"
              // onChange={(e) => setFileName(e.target.value)}
              onChange={handleImage}
            ></input>
          </Stack>
          <Button variant="outlined" color="secondary" type="submit">
            Create Blog
          </Button>
        </Stack>
      </form>
    </React.Fragment>
  );
};

export default CreateBlog;

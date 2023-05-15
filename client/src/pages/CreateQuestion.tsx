import {
  Button,
  IconButton,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";
import styles from "../styles/createblog.module.css";
import { useAppSelector } from "../store/hooks";
import { Link, useNavigate } from "react-router-dom";
import convertToBase64 from "../helper/ConvertToBase64";
import axiosInstance from "../api/axios";
import TagField from "../components/TagField";
import TagItem from "../components/TagItem";
import CancelIcon from "@mui/icons-material/Cancel";

const CreateQuestion = () => {
  const navigate = useNavigate();
  const User = useAppSelector((state) => state.user);

  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [image, setFileName] = useState<any>("");
  const [currentTag, setCurrentTag] = useState<string>("");
  const [tags, setTags] = useState<Array<string>>([]);

  const handleCurrentTag = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentTag(event.target.value);
  };

  const setDefaultStateCurrentTag = () => {
    setCurrentTag("");
  };

  const addTag = () => {
    if (currentTag != "") {
      setTags((prevTags) => {
        return [...prevTags, currentTag];
      });
      setDefaultStateCurrentTag();
    } else {
    }

    setCurrentTag("");
  };

  const deleteTag = (id: Number) => {
    // console.log("Id is : ", id)
    setTags((prevTags) => {
      return prevTags.filter((item, index) => {
        return index !== id;
      });
    });
  };

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

  const createQuestionHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("hi");
    const res = await axiosInstance.post("/question/createquestion", {
      author: User.name,
      title,
      content,
      image,
      tags,
    });
    console.log(res);

    if (res.status < 400) {
      navigate("/questions");
    }
  };

  const theme = useTheme();
  const FiveTwenty = useMediaQuery(theme.breakpoints.down(520));

  return (
    <React.Fragment>
      <form onSubmit={(e) => createQuestionHandler(e)}>
        <Stack
          gap={2}
          spacing={2}
          direction="column"
          sx={{ marginBottom: 4, padding: "50px" }}
        >
          <h2 style={{ marginTop: "10px", fontWeight: 600 }}>
            Ask a Public Question
          </h2>

          <div className={styles.gques}>
            <h4>Writing a Good Question</h4>
            <p>Steps</p>
            <ul>
              <li>Summarize your question/problem in a one-line title.</li>
              <li>Describe your question in more detail.</li>
              <li>Describe what you tried and expected to happen.</li>
              <li>Add a supportive image if necessary.</li>
              <li>
                Add at least 1 and at most 3 tags to help others find your
                question.
              </li>
              <li>
                Ensure that your question is not a duplicate by browsing the
                site.
              </li>
              <li>Review your question and post it to the site.</li>
            </ul>
          </div>
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
          <Typography
            variant={FiveTwenty ? "body1" : "h6"}
            style={{ fontWeight: 700 }}
          >
            TAGS :
          </Typography>
          <TagField
            handleChangeTagField={handleCurrentTag}
            addTag={addTag}
            value={currentTag}
          />
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            {tags.map((item: any, index: any) => (
              <>
                <ul
                  style={{
                    display: "inline-flex",
                    fontSize: "15px",
                    backgroundColor: "lightblue",
                    borderRadius: "5px",
                    border: "1px solid lightcyan",
                    padding: "5px",
                    letterSpacing: "0.2px",
                  }}
                  key={index}
                >
                  <TagItem tagName={item.toUpperCase()} />
                </ul>
                <IconButton
                  style={{
                    marginBottom: "3.75%",
                    marginLeft: "0.5%",
                    alignSelf: "center",
                  }}
                  aria-label="delete"
                  color="error"
                  size="small"
                  onClick={() => deleteTag(index)}
                >
                  <CancelIcon />
                </IconButton>
              </>
            ))}
          </div>
          <Stack direction={"row"}>
            <label
              htmlFor="image"
              style={{ fontSize: "20px", marginRight: "15px", fontWeight: 600 }}
            >
              Thumbnail:
            </label>
            <input type="file" id="image" onChange={handleImage}></input>
          </Stack>
          <Button
            variant="outlined"
            color="secondary"
            type="submit"
            style={{
              width: "50%",
              alignSelf: "center",
              border: "2px solid black",
              color: "black",
              backgroundColor: "lightcyan",
            }}
          >
            Ask Question
          </Button>
        </Stack>
      </form>
    </React.Fragment>
  );
};

export default CreateQuestion;

import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../api/axios";
import styles from "../styles/blog.module.css";
import { Button, CircularProgress, TextField } from "@mui/material";
import TagItem from "../components/TagItem";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import { useAppSelector } from "../store/hooks";

type commentBlock = {
  author: string;
  date: Date;
  comment: string;
  likes: number;
};

type myQuestion = {
  title: string;
  content: string;
  uuid: string;
  author: string;
  image: string;
  date: Date;
  comments: Array<commentBlock>;
  likes: number;
  tags: Array<string>;
};

const Question = () => {
  const myUser = useAppSelector((state) => state.user);
  const author = myUser.name;
  console.log(myUser);

  const initialState = {
    title: "",
    content: "",
    uuid: "",
    author: "",
    image: "",
    date: new Date(Date.now()),
    comments: [
      {
        author: "",
        date: Date.prototype,
        comment: "",
        likes: 0,
      },
    ],
    likes: 0,
    tags: [""],
  };

  const [question, setQuestion] = useState<myQuestion>(initialState);
  const [isLoading, setLoading] = useState<Boolean>(false);

  const [answer, setAnswer] = useState<string>("");

  const navigate = useNavigate();

  const id = useParams().id;
  console.log(id);

  const postComment = async () => {
    const res = await axiosInstance.put("/question/addcomment/" + id, {
      author,
      comment: answer,
    });
    console.log(res);
    window.location.reload();
  };

  const getQuestions = async () => {
    setLoading(true);
    const res = await axiosInstance.get("/question/getquestion/" + id);
    setQuestion(res.data);
    if (res.data === null) navigate("/404");
    setLoading(false);
  };

  useEffect(() => {
    getQuestions();
  }, []);

  return (
    <>
      {isLoading ? (
        <div className={styles.main}>
          <CircularProgress color="secondary" />
        </div>
      ) : (
        <>
          <main className={styles.container}>
            <header className={styles.header}>
              <p className={styles.subheading}>by - {question.author}</p>
              <p className={styles.subheading}>
                {" "}
                {new Date(question.date).toUTCString()}{" "}
              </p>
              <h1 className={styles.heading}> {question.title} </h1>
            </header>
            <section className={styles.content}>
              {question.image ? (
                <img
                  src={question.image}
                  alt="large-image"
                  className={styles.poster_image}
                  style={{
                    maxWidth: "50%",
                  }}
                />
              ) : null}
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  alignSelf: "center",
                  gap: "5px",
                  marginTop: "15px",
                }}
              >
                {question.tags.map((tag: any, index: any) => (
                  <>
                    <ul
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center",
                        textAlign: "center",
                        backgroundColor: "lightcyan",
                        padding: "5px",
                        borderRadius: "5px",
                        border: "1px solid lightblue",
                      }}
                      key={index}
                    >
                      <TagItem tagName={tag.toUpperCase()} />
                    </ul>
                  </>
                ))}
              </div>
              <p style={{ marginTop: "0px" }}>
                {question.content}
                {/* Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum doloremque ipsa enim, maxime dolorum, eum, incidunt a libero cupiditate nemo esse beatae officiis. Aspernatur, corrupti ipsa quam assumenda at minus asperiores facere culpa numquam. Quod dicta iure aliquam quas, aspernatur quae! Distinctio sapiente consequatur sequi? Assumenda dolor soluta veritatis sapiente, molestiae veniam quaerat nihil praesentium consequuntur. Praesentium et eos, quidem nobis quo alias cum expedita aliquam quaerat itaque ea, libero architecto culpa ex doloribus! Sit recusandae laborum numquam placeat quod quaerat voluptatibus accusamus, labore consequatur ipsum reprehenderit quas eligendi, maxime, eos cupiditate harum modi doloribus architecto enim assumenda eveniet! Dolorum a nihil facere velit magni laboriosam atque voluptatum error ad porro numquam ipsum, corporis in molestiae omnis amet nisi ipsa? */}
              </p>
              {/* <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  alignItems: "center",
                  gap: "10px",
                }}
              >
                <button
                  style={{
                    backgroundColor: "transparent",
                    border: "none",
                    color: "blue",
                  }}
                >
                  {" "}
                  <ThumbUpIcon />{" "}
                </button>
                <p style={{ margin: "0" }}> {question.likes} </p>
                <button
                  style={{
                    backgroundColor: "transparent",
                    border: "none",
                    color: "red",
                  }}
                >
                  {" "}
                  <ThumbDownIcon />{" "}
                </button>
              </div> */}
              <hr style={{ border: "2px solid black" }} />
              <h3>Comments</h3>
              <hr />
              {question.comments.map((item) => {
                return (
                  <>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                        justifyContent: "center",
                      }}
                    >
                      <p style={{ margin: 0 }}> {item.comment} </p>
                      <p style={{ margin: 0 }}> -by {item.author} </p>
                    </div>
                    <hr />
                  </>
                );
              })}
              <hr style={{ border: "2px solid black" }} />
              <h3>Post Your Answer</h3>
              <TextField
                type="text"
                variant="outlined"
                color="secondary"
                label="Content"
                onChange={(e) => setAnswer(e.target.value)}
                multiline
                rows={4}
                maxRows={8}
                fullWidth
              />
              <Button
                variant="outlined"
                color="secondary"
                type="button"
                style={{
                  width: "50%",
                  alignSelf: "center",
                  border: "2px solid lightblue",
                  color: "white",
                  backgroundColor: "blue",
                  marginTop: "5px",
                }}
                onClick={postComment}
              >
                Post Answer
              </Button>
            </section>
          </main>
        </>
      )}
    </>
  );
};

export default Question;

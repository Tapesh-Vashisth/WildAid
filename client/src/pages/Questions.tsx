import React, { useEffect, useState } from "react";
import axiosInstance from "../api/axios";
import styles from "../styles/questions.module.css";
import TagItem from "../components/TagItem";
import { CircularProgress } from "@mui/material";

type myQuestion = {
  title: string;
  content: string;
  uuid: string;
  author: string;
  image: string;
  date: Date;
  comments: [
    {
      author: string;
      date: Date;
      comment: string;
      likes: number;
    }
  ];
  likes: number;
  tags: [string];
};

const Questions = () => {
  const [questions, setQuestions] = useState<Array<myQuestion>>([]);
  const [isLoading, setIsLoading] = useState<Boolean>(false);

  const getQuestions = async () => {
    setIsLoading(true);
    const res = await axiosInstance.get("/question/getquestions");
    console.log(res.data);
    setQuestions(res.data);
    setIsLoading(false);
  };

  useEffect(() => {
    getQuestions();
  }, []);

  return (
    <div className={styles.container}>
      <h2>RECENT QUESTIONS</h2>
      <a href={"/addquestion/"}>
        <button className={styles.askques}>ASK QUESTION</button>
      </a>
      {isLoading ? (
        <div className={styles.load}>
          <CircularProgress color="secondary" />
        </div>
      ) : (
        questions.map((item) => {
          return (
            <>
              <div className={styles.main}>
                <img src={item.image ? item.image : "/"} width={"100%"} />
                <div className={styles.middle}>
                  <p>{item.comments.length + " comments"}</p>
                  <p>{item.likes + " votes"}</p>
                </div>
                <div className={styles.right}>
                  <a style={{ textDecoration: "none", color: "none" }} href={"/question/"+item.uuid}>
                    <p className={styles.quesTitle}>{item.title}</p>
                  </a>
                  <p className={styles.quesDesc}>
                    {item.content.length > 50
                      ? item.content.substring(0, 50) + "..."
                      : item.content}
                  </p>
                  <div className={styles.bottom}>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "flex-start",
                        alignSelf: "center",
                        gap: "5px",
                      }}
                    >
                      {item.tags.map((tag: any, index: any) => (
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
                    <p>by Prasad</p>
                  </div>
                </div>
              </div>
            </>
          );
        })
      )}
    </div>
  );
};

export default Questions;

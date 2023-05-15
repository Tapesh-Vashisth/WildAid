import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../api/axios";

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

  const navigate = useNavigate();

  const id = useParams().id;

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
    <div>
        
    </div>
  )
    
};

export default Question;

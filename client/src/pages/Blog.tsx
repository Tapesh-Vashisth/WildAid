import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../api/axios";
import { CircularProgress } from "@mui/material";
import styles from "../styles/blog.module.css";

type commentBlock = {
  author: string;
  date: Date;
  comment: string;
};

type myBlog = {
  title: string;
  content: string;
  uuid: string;
  author: string;
  image: string;
  date: Date;
  comments: Array<commentBlock>;
};

const Blog = () => {
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
      },
    ],
  };

  const [blog, setBlog] = useState<myBlog>(initialState);
  const [isLoading, setLoading] = useState<Boolean>(false);

  const id = useParams().id;
  const getBlogs = async () => {
    setLoading(true);
    const res = await axiosInstance.get("/blog/getblog/" + id);
    console.log(res.data);
    setBlog(res.data);
    setLoading(false);
  };

  useEffect(() => {
    getBlogs();
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
              <p className={styles.subheading}>by - {blog.author}</p>
              <p className={styles.subheading}> {new Date(blog.date).toISOString()} </p>
              <h1 className={styles.heading}> {blog.title} </h1>
            </header>
            <section className={styles.content}>
              <img
                src="https://images.unsplash.com/photo-1466436578965-5cba086a1824?ixlib=rb-0.3.5&q=85&fm=jpg&crop=entropy&cs=srgb&ixid=eyJhcHBfaWQiOjE0NTg5fQ&s=ac7f8b732c22f512fd982ffddc2078d6"
                alt="large-image"
                className={styles.poster_image}
              />
              <p>
               {blog.content}
               Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum doloremque ipsa enim, maxime dolorum, eum, incidunt a libero cupiditate nemo esse beatae officiis. Aspernatur, corrupti ipsa quam assumenda at minus asperiores facere culpa numquam. Quod dicta iure aliquam quas, aspernatur quae! Distinctio sapiente consequatur sequi? Assumenda dolor soluta veritatis sapiente, molestiae veniam quaerat nihil praesentium consequuntur. Praesentium et eos, quidem nobis quo alias cum expedita aliquam quaerat itaque ea, libero architecto culpa ex doloribus! Sit recusandae laborum numquam placeat quod quaerat voluptatibus accusamus, labore consequatur ipsum reprehenderit quas eligendi, maxime, eos cupiditate harum modi doloribus architecto enim assumenda eveniet! Dolorum a nihil facere velit magni laboriosam atque voluptatum error ad porro numquam ipsum, corporis in molestiae omnis amet nisi ipsa?
              </p>
            </section>
            <aside className={styles.aside}>
              <h4 className={styles.heading}>Other Articles you might Enjoy</h4>
              <div className={styles.card}>
                <img
                  src="https://images.unsplash.com/photo-1457269315919-3cfc794943cd?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ&s=2c42c1cac3092204f4c1afdca4d44e99"
                  alt=""
                />
                <div>
                  <p className={`${styles.heading} ${styles.title}`}>The big subtext</p>
                  <p className={styles.author}>Mathews</p>
                </div>
              </div>
              <div className={styles.card}>
                <img
                  src="https://images.unsplash.com/photo-1528640936814-4460bc015292?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ&s=66812b5fda04c80ff762c8a920f562f3"
                  alt=""
                />
                <div>
                  <p className={`${styles.heading} ${styles.title}`}>The bug subtext</p>
                  <p className={styles.author}>Harsha</p>
                </div>
              </div>
            </aside>
            <footer className={styles.footer}>
              <a
                href="https://twitter.com/agneymenon"
                target="_blank"
                className={styles.name_link}
              >
                Boy with Silver Wings
              </a>
            </footer>
          </main>
        </>
      )}
    </>
  );
};

export default Blog;

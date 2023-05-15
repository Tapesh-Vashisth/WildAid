import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
  const [otherBlogs, setOtherBlogs] = useState<Array<myBlog>>([initialState]);
  const [isLoading, setLoading] = useState<Boolean>(false);
  const [isLoadingOther, setLoadingOther] = useState<Boolean>(false);

  const navigate = useNavigate();

  const id = useParams().id;
  //   const [blogId, setId] = useState<any>(id)

  const getBlogs = async () => {
    setLoading(true);
    const res = await axiosInstance.get("/blog/getblog/" + id);
    setBlog(res.data);
    if (res.data === null) navigate("/404");
    setLoading(false);
  };

  const getOtherBlogs = async () => {
    setLoadingOther(true);
    const res = await axiosInstance.get("/blog/getotherblogs/" + id);
    setOtherBlogs(res.data);
    console.log(res.data);
    setLoadingOther(false);
  };

  useEffect(() => {
    getBlogs();
    getOtherBlogs();
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
              <p className={styles.subheading}>
                {" "}
                {new Date(blog.date).toUTCString()}{" "}
              </p>
              <h1 className={styles.heading}> {blog.title} </h1>
            </header>
            <section className={styles.content}>
              <img
                src={blog.image}
                alt="large-image"
                className={styles.poster_image}
              />
              <p style={{ marginTop: "30px" }}>
                {blog.content}
                {/* Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum doloremque ipsa enim, maxime dolorum, eum, incidunt a libero cupiditate nemo esse beatae officiis. Aspernatur, corrupti ipsa quam assumenda at minus asperiores facere culpa numquam. Quod dicta iure aliquam quas, aspernatur quae! Distinctio sapiente consequatur sequi? Assumenda dolor soluta veritatis sapiente, molestiae veniam quaerat nihil praesentium consequuntur. Praesentium et eos, quidem nobis quo alias cum expedita aliquam quaerat itaque ea, libero architecto culpa ex doloribus! Sit recusandae laborum numquam placeat quod quaerat voluptatibus accusamus, labore consequatur ipsum reprehenderit quas eligendi, maxime, eos cupiditate harum modi doloribus architecto enim assumenda eveniet! Dolorum a nihil facere velit magni laboriosam atque voluptatum error ad porro numquam ipsum, corporis in molestiae omnis amet nisi ipsa? */}
              </p>
            </section>
            <aside className={styles.aside}>
              <h4 className={styles.heading}>Other Articles you might Enjoy</h4>
              {isLoadingOther ? (
                <div className={styles.main}>
                  <CircularProgress color="secondary" />
                </div>
              ) : (
                otherBlogs.map((item) => {
                  return (
                    <a
                      href={"/blog/" + item.uuid}
                      style={{ textDecoration: "none", color: "black" }}
                    >
                      <div className={styles.card}>
                        <img src={item.image} alt="" />
                        <div>
                          <p className={`${styles.heading} ${styles.title}`}>
                            {item.title}
                          </p>
                          <p className={styles.author}>by {item.author}</p>
                        </div>
                      </div>
                    </a>
                  );
                })
              )}
            </aside>
          </main>
        </>
      )}
    </>
  );
};

export default Blog;

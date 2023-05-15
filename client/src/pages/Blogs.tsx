import React, { useEffect, useState } from 'react'
import axiosInstance from "../api/axios";
import { CircularProgress } from '@mui/material';
import styles from "../styles/blogs.module.css"
import { useNavigate } from 'react-router-dom';

type myBlog = {
    title: string,
    content: string,
    uuid: string,
    author: string,
    image: string,
    date: Date,
    comments: [{
        author: string,
        date: Date,
        comment: string
    }]
}

const Blogs = () => {

    const [blogs, setBlogs] = useState<Array<myBlog>>([])
    const [isLoading, setIsLoading] = useState<Boolean>(false)

    const navigate = useNavigate()

    interface Blog {
        author: String
        title: String
    }

    const getBlogs = async () => {
        setIsLoading(true)
        const res = await axiosInstance.get('/blog/getblogs')
        setBlogs(res.data)
        setIsLoading(false)
    }

    useEffect(() => {
        getBlogs()
    }, [])

  return (
    <>
    {isLoading ?
        <div className={styles.load}>
            <CircularProgress color="secondary" />
        </div>
    :
        blogs.length === 0 
        ?
        <p>No blogs!</p> 
        :
        <div className={styles.skc}>
            <div className={styles.heading}>
                <h2>Recent Blogs</h2>
            </div>
            <a href={"/createblog/"}>
                <button className={styles.askques}>WRITE A BLOG</button>
            </a>
            <div className={styles.main}>
                {blogs.map((item) => {
                    return (
                        <section>
                            <h3> {item.title} </h3>
                            <img src={item.image} width={250} alt="" />
                            <p className={styles.date}>{new Date(item.date).toUTCString()}</p>
                            <p>{item.content.length > 40 ? item.content.substring(0, 40)+"..." : item.content}</p>
                            <a href={"/blog/"+item.uuid}>Read More</a>
                        </section>
                    )
                })}
            </div>
        </div>
    }
    </>
  )
}

export default Blogs
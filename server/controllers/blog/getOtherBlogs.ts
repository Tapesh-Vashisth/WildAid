import { Request, Response } from "express";
import Blog from "../../models/Blog";

const getOtherBlogs = async (req: Request, res: Response) => {
    const id = req.params.id

    let blogs: any 
    try {
        blogs = await Blog.find({}).exec()
    } catch (err) {
        return res
            .status(500)
            .json({ message: "Internal Server Error!" })
    }

    let ans = []
    for (let i=0; i<Math.min(3, blogs.length); i++) {
        if (blogs[i].uuid === id) continue
        ans.push(blogs[i])
    }

    return res
        .status(200)
        .json(ans)
}

export default getOtherBlogs
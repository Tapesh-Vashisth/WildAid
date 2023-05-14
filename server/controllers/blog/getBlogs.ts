import Blog from "../../models/Blog"
import { Request, Response } from "express"

const getBlogs = async (req: Request, res: Response) => {
    let blogs: any

    try {
        blogs = await Blog.find({}).exec()
    } catch (err) {
        return res
            .status(500)
            .json({ message: "Internal Server Error!" })
    }

    return res
        .status(200)
        .json(blogs)
}

export default getBlogs
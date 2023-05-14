import { Request, Response } from "express";
import Blog from "../../models/Blog";

const addComment = async (req:Request, res: Response) => {
    const { author, comment, blogId } = req.body

    let existingBlog: any
    try {
        existingBlog = await Blog.findOne({ uuid: blogId }).exec()
    } catch (err) {
        return res.status(500).json({message: "Internal Server Error!"})
    }

    if (!existingBlog) {
        return res.status(404).json({ message: "The blog you are trying to add your comment to was not found!!" })
    }

    const date = new Date(Date.now())
    const newComment = {
        author,
        date,
        comment
    }

    existingBlog.comments.push(newComment)

    try {
        await existingBlog.save()
    } catch (err) {
        return res.status(500).json({message: "Internal Server Error!"})
    }

    return res
        .status(200)
        .json({ message: "Added comment successfully!" })
}

export default addComment
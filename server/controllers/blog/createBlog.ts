import { randomUUID } from "crypto";
import { Request, Response } from "express";
import Blog from "../../models/Blog";

const createBlog = async (req: Request, res: Response) => {
    const { author, title, content, image } = req.body
    const date = new Date(Date.now())
    const comments: Array<Object> = []
    const uuid: String = randomUUID();

    const newBlog = new Blog({
        uuid,
        author,
        title,
        content,
        image,
        date,
        comments
    })

    try {
        await newBlog.save()
    } catch (err) {
        return res.status(500).json({message: "Internal server error!"});
    }

    return res
        .status(200)
        .json({ message: "Blog created successfully!" })
}

export default createBlog
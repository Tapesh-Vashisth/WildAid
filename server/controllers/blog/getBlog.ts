import { Request, Response } from "express";
import Blog from "../../models/Blog";

const getBlog = async (req: Request, res: Response) => {
    const id = req.params.id

    let blog: any
    try {
        blog = await Blog.findOne({ uuid: id }).exec()
    } catch (err) {
        return res
            .status(500)
            .json({ message: "Internal Server Error!" })
    }

    return res
        .status(200)
        .json(blog)
}

export default getBlog
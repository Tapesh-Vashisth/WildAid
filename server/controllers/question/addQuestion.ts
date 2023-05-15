import { Request, Response } from "express";
import Question from "../../models/Question";
import { randomUUID } from "crypto";

const addQuestion = async (req: Request, res: Response) => {
    const { author, title, content, image, tags } = req.body
    const date = new Date(Date.now())
    const comments: Array<Object> = []
    const uuid: String = randomUUID();

    const newQuestion = new Question({
        uuid,
        author,
        title,
        content,
        image,
        date,
        comments,
        likes: 0,
        tags
    })

    try {
        await newQuestion.save()
    } catch (err) {
        console.log(err)
        return res.status(500).json({message: "Internal server error!"});
    }

    console.log("done!")
    return res
        .status(200)
        .json({ message: "Question created successfully!" })
}

export default addQuestion
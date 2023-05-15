import { Request, Response } from "express";
import Question from "../../models/Question";

const addComment = async (req:Request, res: Response) => {
    const { author, comment } = req.body
    const questionId = req.params.id

    let existingQuestion: any
    try {
        existingQuestion = await Question.findOne({ uuid: questionId }).exec()
    } catch (err) {
        return res.status(500).json({message: "Internal Server Error!"})
    }

    if (!existingQuestion) {
        return res.status(404).json({ message: "The question you are trying to add your comment to was not found!!" })
    }

    const date = new Date(Date.now())
    const newComment = {
        author,
        date,
        comment,
        likes: 0
    }

    existingQuestion.comments.push(newComment)

    try {
        await existingQuestion.save()
    } catch (err) {
        return res.status(500).json({message: "Internal Server Error!"})
    }

    return res
        .status(200)
        .json({ message: "Added comment successfully!" })
}

export default addComment
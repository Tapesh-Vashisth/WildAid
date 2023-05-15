import { Request, Response } from "express";
import Question from "../../models/Question";

const getQuestion = async (req: Request, res: Response) => {
    console.log("get question")
    const id = req.params.id

    let question: any
    try {
        question = await Question.findOne({ uuid: id }).exec()
    } catch (err) {
        return res
            .status(500)
            .json({ message: "Internal Server Error!" })
    }

    return res
        .status(200)
        .json(question)
}

export default getQuestion
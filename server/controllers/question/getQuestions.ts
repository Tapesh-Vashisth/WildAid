import Question from "../../models/Question"
import { Request, Response } from "express"

const getQuestions = async (req: Request, res: Response) => {
    let questions: any

    try {
        questions = await Question.find({}).exec()
    } catch (err) {
        return res
            .status(500)
            .json({ message: "Internal Server Error!" })
    }

    return res
        .status(200)
        .json(questions)
}

export default getQuestions
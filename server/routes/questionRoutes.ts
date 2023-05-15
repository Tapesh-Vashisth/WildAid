import express from "express";
import verifyJWT from "../middleware/verifyJWT"
import getQuestions from "../controllers/question/getQuestions";
import addQuestion from "../controllers/question/addQuestion";
import addComment from "../controllers/question/addComment";
import getQuestion from "../controllers/question/getQuestion";

const router = express.Router();

router.get('/getquestions', getQuestions)
router.get('/getquestion/:id', getQuestion)
// router.get('/getotherblogs/:id', getOtherBlogs)

// router.use(verifyJWT)

router.post('/createquestion', addQuestion)
router.put('/addcomment/:id', addComment)

export default router;

import express from "express";
import verifyJWT from "../middleware/verifyJWT"
import createBlog from "../controllers/blog/createBlog";
import getBlogs from "../controllers/blog/getBlogs";
import addComment from "../controllers/blog/addComment";

const router = express.Router();

router.get('/getblogs', getBlogs)

router.use(verifyJWT)

router.post('/createblog', createBlog)
router.put('/addcomment/:id', addComment)

export default router;

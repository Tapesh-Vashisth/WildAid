"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const getQuestions_1 = __importDefault(require("../controllers/question/getQuestions"));
const addQuestion_1 = __importDefault(require("../controllers/question/addQuestion"));
const addComment_1 = __importDefault(require("../controllers/question/addComment"));
const getQuestion_1 = __importDefault(require("../controllers/question/getQuestion"));
const router = express_1.default.Router();
router.get('/getquestions', getQuestions_1.default);
router.get('/getquestion/:id', getQuestion_1.default);
// router.get('/getotherblogs/:id', getOtherBlogs)
// router.use(verifyJWT)
router.post('/createquestion', addQuestion_1.default);
router.put('/addcomment/:id', addComment_1.default);
exports.default = router;

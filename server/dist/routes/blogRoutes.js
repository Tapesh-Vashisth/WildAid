"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const createBlog_1 = __importDefault(require("../controllers/blog/createBlog"));
const getBlogs_1 = __importDefault(require("../controllers/blog/getBlogs"));
const addComment_1 = __importDefault(require("../controllers/blog/addComment"));
const getBlog_1 = __importDefault(require("../controllers/blog/getBlog"));
const router = express_1.default.Router();
router.get('/getblogs', getBlogs_1.default);
router.get('/getblog/:id', getBlog_1.default);
// router.use(verifyJWT)
router.post('/createblog', createBlog_1.default);
router.put('/addcomment/:id', addComment_1.default);
exports.default = router;

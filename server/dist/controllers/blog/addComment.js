"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Blog_1 = __importDefault(require("../../models/Blog"));
const addComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { author, comment, blogId } = req.body;
    let existingBlog;
    try {
        existingBlog = yield Blog_1.default.findOne({ uuid: blogId }).exec();
    }
    catch (err) {
        return res.status(500).json({ message: "Internal Server Error!" });
    }
    if (!existingBlog) {
        return res.status(404).json({ message: "The blog you are trying to add your comment to was not found!!" });
    }
    const date = new Date(Date.now());
    const newComment = {
        author,
        date,
        comment
    };
    existingBlog.comments.push(newComment);
    try {
        yield existingBlog.save();
    }
    catch (err) {
        return res.status(500).json({ message: "Internal Server Error!" });
    }
    return res
        .status(200)
        .json({ message: "Added comment successfully!" });
});
exports.default = addComment;

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
const Question_1 = __importDefault(require("../../models/Question"));
const addComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { author, comment } = req.body;
    const questionId = req.params.id;
    let existingQuestion;
    try {
        existingQuestion = yield Question_1.default.findOne({ uuid: questionId }).exec();
    }
    catch (err) {
        return res.status(500).json({ message: "Internal Server Error!" });
    }
    if (!existingQuestion) {
        return res.status(404).json({ message: "The question you are trying to add your comment to was not found!!" });
    }
    const date = new Date(Date.now());
    const newComment = {
        author,
        date,
        comment,
        likes: 0
    };
    existingQuestion.comments.push(newComment);
    try {
        yield existingQuestion.save();
    }
    catch (err) {
        return res.status(500).json({ message: "Internal Server Error!" });
    }
    return res
        .status(200)
        .json({ message: "Added comment successfully!" });
});
exports.default = addComment;

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
const crypto_1 = require("crypto");
const Blog_1 = __importDefault(require("../../models/Blog"));
const createBlog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    const { author, title, content, image } = req.body;
    const date = new Date(Date.now());
    const comments = [];
    const uuid = (0, crypto_1.randomUUID)();
    const newBlog = new Blog_1.default({
        uuid,
        author,
        title,
        content,
        image,
        date,
        comments
    });
    try {
        yield newBlog.save();
    }
    catch (err) {
        return res.status(500).json({ message: "Internal server error!" });
    }
    return res
        .status(200)
        .json({ message: "Blog created successfully!" });
});
exports.default = createBlog;

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
const getQuestion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("get question");
    const id = req.params.id;
    let question;
    try {
        question = yield Question_1.default.findOne({ uuid: id }).exec();
    }
    catch (err) {
        return res
            .status(500)
            .json({ message: "Internal Server Error!" });
    }
    return res
        .status(200)
        .json(question);
});
exports.default = getQuestion;

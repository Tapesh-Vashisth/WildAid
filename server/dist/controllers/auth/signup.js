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
const User_1 = __importDefault(require("../../models/User"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const crypto_1 = require("crypto");
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("signup");
    const { name, email, password } = req.body;
    const uuid = (0, crypto_1.randomUUID)();
    let existingUser;
    try {
        existingUser = yield User_1.default.findOne({ email: email }).exec();
    }
    catch (err) {
        return res.status(400).json({ message: 'Database Error' });
    }
    // if an account with the provided email address already exists
    if (existingUser) {
        return res
            .status(409)
            .json({ message: "An account with this email already exists!" });
    }
    // hashing the password using bcryptjs (synchronous) 
    const hashedPassword = bcryptjs_1.default.hashSync(password, 5);
    const user = new User_1.default({
        uuid: uuid,
        name,
        email,
        password: hashedPassword,
        emailVerified: true,
        image: ""
    });
    // after all validation, creating the user in the database
    try {
        yield user.save();
    }
    catch (err) {
        return res.status(400).json({ message: 'Database Error' });
    }
    return res
        .status(201)
        .json({ message: "User signed up successfully!" });
});
exports.default = signup;

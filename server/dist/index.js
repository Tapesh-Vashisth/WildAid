"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const blogRoutes_1 = __importDefault(require("./routes/blogRoutes"));
const questionRoutes_1 = __importDefault(require("./routes/questionRoutes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
// middleware
app.use(express_1.default.json({ limit: '50mb' }));
app.use((0, cors_1.default)({
    origin: ["http://localhost:3000", "https://stock-hub.netlify.app"],
    methods: ['POST', 'GET', 'HEAD', 'PUT', 'DELETE'],
    credentials: true
}));
app.use((0, cookie_parser_1.default)());
app.use('/api/auth', authRoutes_1.default);
app.use('/api/blog', blogRoutes_1.default);
app.use('/api/question', questionRoutes_1.default);
const port = process.env.PORT || 5500;
mongoose_1.default.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@wildaid-db.04bar7c.mongodb.net/?retryWrites=true&w=majority`).then(() => {
    console.log("database connected");
    app.listen(port, () => {
        console.log(`server listening on port ${port}`);
    });
}).catch((err) => {
    console.log(err);
});

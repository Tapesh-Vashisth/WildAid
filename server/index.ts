import dotenv from "dotenv";
import express, { Express, Request, Response } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import mongoose from "mongoose";
import authRouter from "./routes/authRoutes";
import blogRouter from "./routes/blogRoutes";
import questionRouter from "./routes/questionRoutes";

dotenv.config();

const app: Express = express();

// middleware
app.use(express.json({limit: '50mb'}));
app.use(cors({
    origin:["http://localhost:3000", "https://wildaid.netlify.app"],
    methods:['POST','GET','HEAD','PUT','DELETE'],
    credentials: true
}))
app.use(cookieParser());

app.use('/api/auth', authRouter);
app.use('/api/blog', blogRouter);
app.use('/api/question', questionRouter)

const port = process.env.PORT || 5500;

mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@wildaid-db.04bar7c.mongodb.net/?retryWrites=true&w=majority`).then(() => {
    console.log("database connected");
    app.listen(port, () => {
        console.log(`server listening on port ${port}`)
    });
}).catch((err) => {
    console.log(err);
})

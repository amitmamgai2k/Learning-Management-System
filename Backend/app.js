import express from "express";
import dotenv from "dotenv";

import cookieParser from "cookie-parser";
import cors from "cors";
import morgan from "morgan";
import connectToDB from "./src/db/db.js";
import userRoutes from "./src/routes/user.routes.js";
import errorMiddleware from "./src/middlewares/error.middleware.js";
const app = express();
dotenv.config();
connectToDB();
app.use(express.json());
app.use(cors({credentials: true, origin: "http://localhost:5173"}));
app.use(cookieParser());
app.use(express.urlencoded({extended: true}));
app.use(morgan('dev'));
app.route("/").get((req, res) => {
    res.send("Hello World!");
})

app.use('/users',userRoutes);
app.use(errorMiddleware);
app.all("*", (req, res) => {
    res.status(404).send("Page Not Found");
})
export default app;

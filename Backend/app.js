import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import morgan from "morgan";
import connectToDB from "./src/db/db.js";
import userRoutes from "./src/routes/user.routes.js";
import courseRoutes from "./src/routes/course.routes.js";
import paymentRoutes from "./src/routes/payment.route.js";
import errorMiddleware from "./src/middlewares/error.middleware.js";
import adminRoutes from "./src/routes/AdminRoutes.js";

// Load environment variables
dotenv.config();

const app = express(); // FIX: Declare `app` properly
connectToDB();

app.use(express.json());
app.use(cors({ credentials: true, origin: "http://localhost:5173" }));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.use("/users", userRoutes);
app.use("/courses", courseRoutes);
app.use("/payments", paymentRoutes);
app.use("/admin",adminRoutes);
app.use(errorMiddleware);

app.all("*", (req, res) => {
    res.status(404).send("Page Not Found");
});
console.log("App.js is being executed");


export default app; // FIX: Ensure `app` is exported properly

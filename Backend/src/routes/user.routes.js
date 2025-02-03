import express from "express";
import {register, login, getProfile, logout} from "../controllers/user.controller.js";
import {isLoggedIn} from "../middlewares/auth.middleware.js";
import upload from "../middlewares/multer.middleware.js";

const router = express.Router();


router.post("/register",   upload.single('avatar'),register);
router.post("/login", login);
router.get("/me",isLoggedIn, getProfile);
router.get('/logout', logout);

export default router;
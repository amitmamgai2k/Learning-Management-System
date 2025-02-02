import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import User from "../models/user.model.js";
import  {uploadOnCloudinary } from "../utils/cloudinary.js";
import { validationResult } from "express-validator";
import { log } from "console";


const cookieOptions = {
    maxAge: 24 * 60 * 60 * 1000,
    httpOnly: true,
    secure: true
}
const register = asyncHandler(async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { fullname, email, password, mobileNumber } = req.body;
        if (!fullname || !email || !password || !mobileNumber) {
            return next(new ApiError(400, "Please fill all the details", 400)); // ✅ Correct
        }

        const userExists = await User.findOne({
            $or: [{ email: email }, { mobileNumber: mobileNumber }]
        });

        if (userExists) {
            return next(new ApiError("User already exists", 400)); // ✅ Correct
        }

        const avatarLocalPath = req.file?.path;
        console.log(avatarLocalPath, 'avatarLocalPath');

        if (!avatarLocalPath) {
            return next(new ApiError(400, "Avatar file is required")); // ✅ Correct
        }

        const hashPassword = await User.hashPassword(password);
        const avatar = await uploadOnCloudinary(avatarLocalPath);

        const user = await User.create({
            fullname,
            email,
            password: hashPassword,
            avatar: avatar?.url,
            mobileNumber,
        });

        if (!user) {
            return next(new ApiError("User not created", 400)); // ✅ Correct
        }

        await user.save();
        user.password = undefined;
        const token = await user.generateAuthToken();
        res.cookie('token', token, cookieOptions);

        return res.status(201).json(new ApiResponse(200, user, "User registered Successfully")); // ✅ Correct
    } catch (err) {
        return next(new ApiError(400, err.message)); // ✅ Correct
    }
});


const login = asyncHandler(async (req, res,next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
        const { email, password } = req.body;
        if (!email || !password) {
          throw new ApiError(400, "Email and password are required");
        }
        console.log(email,password);

        const user = await User.findOne({ email }).select("+password");
        if (!user) {
          throw new ApiError(400, "User not found");
        }
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
          throw new ApiError(400, "Invalid password");
        }
        const token = await user.generateAuthToken();
        user.password = undefined;
        res.cookie('token',token,cookieOptions);
        return res.status(200).json(new ApiResponse(200, user, "Login successful"));
    } catch (error) {
        throw next(new ApiError(400,error.message))

    }
});
const logout = asyncHandler(async (req, res) => {
    try {
        res.clearCookie('token');
        return res.status(200).json(new ApiResponse(200, null,{
            success: true,
            maxAge:0,
            httpOnly: true,

        } ,"Logout successful"));
    } catch (error) {
        throw next(new ApiError(400,error.message))
    }
});
const getProfile = asyncHandler(async (req, res) => {
    try {
       const userId = req.user.id;
       const user = await User.findById(userId);
       return res.status(200).json(new ApiResponse(200, user, "Profile fetched successfully"));
    } catch (error) {
        throw next(new ApiError(400,error.message))
    }
});
const updateProfile = asyncHandler(async (req, res) => {});
const changePassword = asyncHandler(async (req, res) => {});
const forgotPassword = asyncHandler(async (req, res) => {});
const resetPassword = asyncHandler(async (req, res) => {});
const updateRole = asyncHandler(async (req, res) => {});
const deleteProfile = asyncHandler(async (req, res) => {});

export { register, login, logout, getProfile, updateProfile, changePassword, forgotPassword, resetPassword, updateRole, deleteProfile };
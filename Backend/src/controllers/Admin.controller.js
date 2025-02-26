
import asyncHandler from "../utils/asyncHandler.js";
import User from "../models/user.model.js";
import ApiError from "../utils/ApiError.js";
import sendEmail from "../utils/sendEmail.js";


export const contactUs = asyncHandler(async (req, res, next) => {

    const { name, email, message } = req.body;

    // Checking if values are valid
    if (!name || !email || !message) {
        return next(new ApiError("Name, Email, Message are required"));
    }

    try {
        const subject = "Contact Us Form";
        const textMessage = `${name} - ${email} <br /> ${message}`;

        // Await the send email
        await sendEmail(process.env.CONTACT_US_EMAIL, subject, textMessage);
    } catch (error) {
        return next(new ApiError(error.message, 400));
    }

    res.status(200).json({
        success: true,
        message: "Your request has been submitted successfully",
    });
});


export const userStats = asyncHandler(async (req, res, next) => {
    const allUsersCount = await User.countDocuments();

    const subscribedUsersCount = await User.countDocuments({
        "subscription.status": "active",
    });

    res.status(200).json({
        success: true,
        message: "All registered users count",
        allUsersCount,
        subscribedUsersCount,
    });
});

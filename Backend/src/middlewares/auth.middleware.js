import ApiError from "../utils/ApiError.js";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import asyncHandler from "../utils/asyncHandler.js";
const isLoggedIn = async(req, res, next) => {
const {token} = req.cookies;


if(!token){
    return next(new ApiError(401,"You are not logged in"));
}
const userDetails =  await jwt.verify(token,process.env.JWT_SECRET);
req.user = userDetails;
next();

}
const authorizedRoles = (...roles) => async (req, res, next) => {
    try {
        if (!req.user) {
            return next(new ApiError(401, "User not authenticated"));
        }

        const currentUserRoles = req.user.role; // Check how roles are stored

        // If role is a string (single role user)
        if (typeof currentUserRoles === "string") {
            if (!roles.includes(currentUserRoles)) {
                return next(new ApiError(403, "You are not authorized to access this route"));
            }
        }

        // If role is an array (multi-role user)
        else if (Array.isArray(currentUserRoles)) {
            const hasRole = roles.some(role => currentUserRoles.includes(role));
            if (!hasRole) {
                return next(new ApiError(403, "You are not authorized to access this route"));
            }
        }

        next();
    } catch (error) {
        next(error);
    }
};
const authorizedSubscriber = asyncHandler(async (req, res, next) => {
    const id = req.user.id;
    const user = await User.findById(id);
    if (user.role !== "ADMIN" && user.subscription.status !== "active") {
        return next(new ApiError("please subscribe to access this route!", 400));
    }
    next();
});

export { isLoggedIn, authorizedRoles, authorizedSubscriber };

import ApiError from "../utils/ApiError.js";
import jwt from "jsonwebtoken";

const isLoggedIn = async(req, res, next) => {
const {token} = req.cookies;


if(!token){
    return next(new ApiError(401,"You are not logged in"));
}
const userDetails =  await jwt.verify(token,process.env.JWT_SECRET);
req.user = userDetails;
next();

}
export default isLoggedIn;
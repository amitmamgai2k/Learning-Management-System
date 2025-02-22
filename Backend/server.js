import app from "./app.js";
import dotenv from "dotenv";
import Razorpay from "razorpay";
import razorpay from "razorpay";
dotenv.config();
export const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,

})
app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});
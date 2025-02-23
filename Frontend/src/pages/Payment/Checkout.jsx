import { useEffect } from "react";
import toast from "react-hot-toast";
import { IndianRupee } from 'lucide-react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import HomeLayout from "../../Layouts/HomeLayout";
import { getRazorPayId, purchaseCourseBundle, verifyUserPayment } from "../../Redux/Slices/RazorpaySlice";


function Checkout() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const razorpayKey = useSelector((state) => state?.razorpay?.key);
    const subscription_id = useSelector((state) => state?.razorpay?.subscription_id);
    const userData = useSelector((state) => state?.auth?.data);

    const paymentDetails = {
        razorpay_payment_id: "",
        razorpay_subscription_id: "",
        razorpay_signature: "",
    };

    async function handleSubscription(e) {
        e.preventDefault();
        if (!razorpayKey || !subscription_id) {
            toast.error("Something went wrong");
            return;
        }
        const options = {
            key: razorpayKey,
            subscription_id: subscription_id,
            name: "Learnly Pvt. Ltd.",
            description: "Subscription",
            theme: {
                color: "#F37254",
            },
            prefill: { email: userData.email, name: userData.fullName },
            handler: async function (response) {
                paymentDetails.razorpay_payment_id = response.razorpay_payment_id;
                paymentDetails.razorpay_signature = response.razorpay_signature;
                paymentDetails.razorpay_subscription_id = response.razorpay_subscription_id;

                toast.success("Payment successful");

                const res =  dispatch(verifyUserPayment(paymentDetails));
                res?.payload?.success ? navigate("/checkout/success") : navigate("/checkout/fail");
            },
        };
        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
    }

    async function load() {
         dispatch(getRazorPayId());
         dispatch(purchaseCourseBundle());
    }

    useEffect(() => {
        load();
    }, []);

    return (
        <HomeLayout>
            <div className="min-h-[90vh] flex items-center justify-center p-4 bg-gray-50">
                <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-purple-600 to-blue-600  px-6 py-8">
                        <h1 className="text-3xl font-bold text-white text-center">
                            Buy Course
                        </h1>
                        <p className="text-yellow-100 text-center mt-2">
                            Unlock All Lectures
                        </p>
                    </div>

                    {/* Pricing */}
                    <div className="px-6 py-8">
                        <div className="flex items-center justify-center gap-2 mb-8">
                            <span className="text-4xl font-bold text-gray-900 flex items-center">
                                <IndianRupee className="w-8 h-8 mt-1" />
                                499
                            </span>
                            <span className="text-gray-600">/year</span>
                        </div>

                        {/* Features */}
                        <div className="space-y-4 mb-8">
                            <div className="flex items-center gap-3">
                                <div className="flex-shrink-0 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <p className="text-gray-600">Access to all Lectures</p>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="flex-shrink-0 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <p className="text-gray-600">Access to new Lectures</p>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="flex-shrink-0 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <p className="text-gray-600">1 Year duration access</p>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="flex-shrink-0 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <p className="text-gray-600">100% refund on cancellation</p>
                            </div>
                        </div>

                        {/* Terms */}
                        <p className="text-sm text-gray-500 text-center mb-8">
                            * Terms and conditions applied *
                        </p>

                        {/* Button */}
                        <button
                            onClick={handleSubscription}
                            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white py-4 rounded-xl text-lg font-semibold transition-all duration-300 transform hover:scale-[1.02]"
                        >
                            Subscribe Now
                        </button>
                    </div>
                </div>
            </div>
        </HomeLayout>
    );
}

export default Checkout;
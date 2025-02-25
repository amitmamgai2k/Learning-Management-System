import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import HomeLayout from "../../Layouts/HomeLayout";
import { getUserData } from "../../Redux/Slices/AuthSlice";
import { cancelCourseBundle } from "../../Redux/Slices/RazorpaySlice";

function Profile() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userData = useSelector((state) => state?.auth?.data);

    // Format dates without using date-fns
    const formatDate = (dateString) => {
        if (!dateString) return "N/A";
        try {
            const date = new Date(dateString);
            const options = { year: 'numeric', month: 'short', day: 'numeric' };
            return date.toLocaleDateString('en-US', options);
        } catch (error) {
            return dateString;
        }
    };

    async function handleCancellation() {
        toast("Initiating cancellation");
        await dispatch(cancelCourseBundle());
        await dispatch(getUserData());
        toast.success("Cancellation completed!");
        navigate("/");
    }

    return (
        <HomeLayout>
            <div className="flex items-center justify-center h-screen overflow-hidden relative  bg-white">
                <div className="w-full max-w-md">
                    {/* Main card */}
                    <div className=" flex flex-col gap-6 rounded-xl bg-white p-8 text-gray-800 shadow-lg border border-gray-200">
                        {/* Header section with avatar */}
                        <div className="flex flex-col items-center">
                            <div className="relative mb-6">
                                <img
                                    src={userData?.avatar?.secure_url || "http://res.cloudinary.com/ddjo2iypg/image/upload/v1738473073/ynbl7gmfhrplujgxloxf.png"}
                                    className="w-28 h-28 rounded-full object-cover border-4 border-white shadow-lg ring-2 ring-gray-200"
                                    alt={userData?.fullName}
                                />
                                {userData?.subscription?.status === "active" && (
                                    <div className="absolute bottom-1 right-1 bg-green-500 h-5 w-5 rounded-full border-2 border-white z-10 flex items-center justify-center">
                                        <div className="h-2 w-2 rounded-full bg-green-300 animate-pulse"></div>
                                    </div>
                                )}
                            </div>
                            <h3 className="text-2xl font-bold text-center capitalize text-gray-800 mb-1">{userData?.fullName || userData?.fullname}</h3>
                            <span className="px-3 py-1 text-xs font-semibold text-blue-600 bg-blue-100 rounded-full mb-2">{userData?.role}</span>
                        </div>

                        {/* Information box */}
                        <div className="bg-gray-50 rounded-lg p-5 border border-gray-200">
                            <div className="space-y-4">
                                <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                                    <p className="text-gray-600 font-medium">Email</p>
                                    <p className="font-medium text-gray-800">{userData?.email}</p>
                                </div>

                                <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                                    <p className="text-gray-600 font-medium">Mobile</p>
                                    <p className="font-medium text-gray-800">{userData?.mobileNumber || "Not provided"}</p>
                                </div>

                                <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                                    <p className="text-gray-600 font-medium">Member Since</p>
                                    <p className="font-medium text-gray-800">{formatDate(userData?.createdAt)}</p>
                                </div>

                                <div className="flex justify-between items-center">
                                    <p className="text-gray-600 font-medium">Subscription</p>
                                    <div className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-2 ${
                                        userData?.subscription?.status === "active"
                                        ? "bg-green-100 text-green-700 border border-green-200"
                                        : "bg-red-100 text-red-700 border border-red-200"
                                    }`}>
                                        {userData?.subscription?.status === "active" && (
                                            <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
                                        )}
                                        {userData?.subscription?.status || "Inactive"}
                                    </div>
                                </div>

                                {userData?.subscription?.id && (
                                    <div className="flex justify-between items-center pt-3 border-t border-gray-200 text-xs">
                                        <p className="text-gray-600 font-medium">Subscription ID</p>
                                        <p className="font-medium text-gray-500">{userData.subscription.id}</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Action buttons */}
                        <div className="grid grid-cols-2 gap-4 mt-2">
                            <Link
                                to="/changepassword"
                                className="bg-gray-100 hover:bg-gray-200 transition-all ease-in-out duration-300 rounded-lg font-medium py-3 px-4 cursor-pointer text-center flex items-center justify-center border border-gray-200 text-gray-700"
                            >
                                <button>Change Password</button>
                            </Link>
                            <Link
                                to="/user/editprofile"
                                className="bg-blue-600 hover:bg-blue-700 transition-all ease-in-out duration-300 rounded-lg font-medium py-3 px-4 cursor-pointer text-center flex items-center justify-center shadow-md text-white"
                            >
                                <button>Edit Profile</button>
                            </Link>
                        </div>

                        {/* Cancel subscription button */}
                        {(userData?.subscription?.status === "active" || userData?.subscription?.status === "created") && (
                            <button
                                onClick={handleCancellation}
                                className="mt-2 w-full bg-red-600 hover:bg-red-700 transition-all ease-in-out duration-300 rounded-lg font-semibold py-3 cursor-pointer text-center shadow-md text-white"
                            >
                                Cancel Subscription
                            </button>
                        )}

                        <div className="text-center text-xs text-gray-500 mt-4">
                            Last updated: {formatDate(userData?.updatedAt)}
                        </div>
                    </div>
                </div>
            </div>
        </HomeLayout>
    );
}

export default Profile;
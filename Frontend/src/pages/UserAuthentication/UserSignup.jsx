
import { useState } from "react";
import { toast } from "react-hot-toast";
import { BsPersonCircle } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import HomeLayout from "../../Layouts/HomeLayout";
import { isEmail, isValidPassword } from "../../Helpers/regexMatcher";
import { createAccount } from "../../Redux/Slices/AuthSlice";

function UserSignup() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [previewImage, setPreviewImage] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [signupData, setSignupData] = useState({
        fullname: "",
        email: "",
        password: "",
        mobileNumber: "",
        avatar: null  // Changed from empty string to null
    });

    function handleUserInput(e) {
        const { name, value } = e.target;
        setSignupData(prev => ({
            ...prev,
            [name]: value,
        }));
    }

    function getImage(event) {
        event.preventDefault();
        const uploadedImage = event.target.files[0];

        if (uploadedImage) {
            // Validate file type and size
            const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/svg+xml'];
            if (!validTypes.includes(uploadedImage.type)) {
                toast.error("Please upload a valid image file (JPG, PNG, or SVG)");
                return;
            }

            if (uploadedImage.size > 1024 * 1024) { // 1MB limit
                toast.error("Image size should be less than 1MB");
                return;
            }

            setSignupData(prev => ({
                ...prev,
                avatar: uploadedImage,
            }));

            const fileReader = new FileReader();
            fileReader.readAsDataURL(uploadedImage);
            fileReader.addEventListener("load", function () {
                setPreviewImage(this.result);
            });
        }
    }

    async function createNewAccount(event) {
        event.preventDefault();

        try {
            setIsSubmitting(true);

            // Validate all fields
            if (!signupData.email?.trim() ||
                !signupData.password?.trim() ||
                !signupData.fullname?.trim() ||
                !signupData.avatar ||
                !signupData.mobileNumber?.trim()) {
                toast.error("Please fill all the details");
                return;
            }

            // Validation checks
            if (signupData.fullname.trim().length < 5) {
                toast.error("Name should be at least 5 characters");
                return;
            }

            if (!isEmail(signupData.email.trim())) {
                toast.error("Invalid email id");
                return;
            }

            if (!isValidPassword(signupData.password)) {
                toast.error("Password should be 6 - 16 characters long with at least a number and special character");
                return;
            }

            if (signupData.mobileNumber.trim().length !== 10 || !/^\d+$/.test(signupData.mobileNumber)) {
                toast.error("Invalid mobile number");
                return;
            }

            // Create FormData
            const formData = new FormData();
            formData.append("fullname", signupData.fullname.trim());
            formData.append("email", signupData.email.trim().toLowerCase());
            formData.append("password", signupData.password);
            formData.append("avatar", signupData.avatar);
            formData.append("mobileNumber", signupData.mobileNumber.trim());

            // Dispatch create account action
            const response = await dispatch(createAccount(formData));

            if (response?.payload?.success) {
                // Reset form only after successful submission
                setSignupData({
                    fullname: "",
                    email: "",
                    password: "",
                    avatar: null,
                    mobileNumber: "",
                });
                setPreviewImage("");
                navigate("/");
            }

        } catch (error) {
            toast.error("Failed to create account. Please try again.");
            console.error("Signup error:", error);
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <HomeLayout>
            <div className="flex items-center justify-center min-h-screen">
                <form
                    noValidate
                    onSubmit={createNewAccount}
                    className="bg-gray-800 flex flex-col justify-center gap-3 rounded-[40px] p-4 text-white w-96 shadow-[10px_10px_150px_gray]"
                >
                    <h1 className="text-center text-2xl font-bold">Registration Page</h1>

                    <label htmlFor="image_uploads" className="cursor-pointer">
                        {previewImage ? (
                            <img className="w-24 h-24 rounded-full m-auto" src={previewImage} alt="Profile preview" />
                        ) : (
                            <BsPersonCircle className="w-24 h-24 rounded-full m-auto" />
                        )}
                    </label>
                    <input
                        onChange={getImage}
                        className="hidden"
                        type="file"
                        name="image_uploads"
                        id="image_uploads"
                        accept=".jpg, .jpeg, .png, .svg"
                    />

                    <div className="flex flex-col gap-1">
                        <label htmlFor="fullname" className="font-semibold">
                            Name
                       </label>
                         <input
                            type="text"
                            required
                            name="fullname"
                            id="fullname"
                            placeholder="Enter your name.."
                            className="bg-transparent px-2 py-1 border rounded-md"
                            onChange={handleUserInput}
                            value={signupData.fullname}
                        />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label htmlFor="email" className="font-semibold">
                            Email
                        </label>
                        <input
                            type="email"
                            required
                            name="email"
                            id="email"
                            placeholder="Enter your email.."
                            className="bg-transparent px-2 py-1 border rounded-md"
                            onChange={handleUserInput}
                            value={signupData.email}
                        />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label htmlFor="mobileNumber" className="font-semibold">
                            Mobile Number
                        </label>
                        <input
                            type="number"
                            required
                            name="mobileNumber"
                            id="mobileNumber"
                            placeholder="Enter your Mobile Number.."
                            className="bg-transparent px-2 py-1 border rounded-md"
                            onChange={handleUserInput}
                            value={signupData.mobileNumber}
                        />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label htmlFor="password" className="font-semibold">
                            Password
                        </label>
                        <input
                            type="password"
                            required
                            name="password"
                            id="password"
                            placeholder="Enter your password.."
                            className="bg-transparent px-2 py-1 border rounded-md"
                            onChange={handleUserInput}
                            value={signupData.password}
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`mt-2 bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300 rounded-full py-2 font-semibold text-lg
                            ${isSubmitting ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                    >
                        {isSubmitting ? 'Creating account...' : 'Create account'}
                    </button>

                    <p className="text-center">
                        Already have an account?{" "}
                        <Link to="/login" className="link text-accent cursor-pointer">
                            Login
                        </Link>
                    </p>
                </form>
            </div>
        </HomeLayout>
    );
}

export default UserSignup;
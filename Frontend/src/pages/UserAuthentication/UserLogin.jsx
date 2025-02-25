import { useState } from "react";
import { toast } from "react-hot-toast";
import { BsPersonCircle } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import HomeLayout from "../../Layouts/HomeLayout";

import { isEmail, isValidPassword } from "../../Helpers/regexMatcher";
import { login } from "../../Redux/Slices/AuthSlice";

function UserLogin() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [LoginData, setLoginData] = useState({
        email: "",
        password: "",
    });

    function handleUserInput(e) {
        const { name, value } = e.target;
        setLoginData({
            ...LoginData,
            [name]: value,
        });
    }

    async function Login(event) {
        event.preventDefault();
        if (!LoginData.email || !LoginData.password) {
            toast.error("Please fill all the details");
            return;
        }

        if (!isEmail(LoginData.email)) {
            toast.error("Invalid email id");
            return;
        }

        if (!isValidPassword(LoginData.password)) {
            toast.error("Password should be 6 - 16 character long with atleast a number and special character");
            return;
        }

        const response = await dispatch(login(LoginData));
        if (response?.payload?.success) navigate("/");

        setLoginData({
            email: "",
            password: "",
        });
    }

    return (
        <HomeLayout>
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <form
                    noValidate
                    onSubmit={Login}
                    className="bg-white p-8 rounded-xl shadow-md w-96"
                >
                    <div className="flex flex-col items-center mb-6">
                        <BsPersonCircle className="text-gray-700" size={64} />
                        <h1 className="mt-2 text-3xl font-bold text-gray-800">Login</h1>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-700 font-medium mb-1">
                            Email
                        </label>
                        <input
                            type="email"
                            required
                            name="email"
                            id="email"
                            placeholder="Enter your email..."
                            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            onChange={handleUserInput}
                            value={LoginData.email}
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="password" className="block text-gray-700 font-medium mb-1">
                            Password
                        </label>
                        <input
                            type="password"
                            required
                            name="password"
                            id="password"
                            placeholder="Enter your password..."
                            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            onChange={handleUserInput}
                            value={LoginData.password}
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-500 transition-colors text-white font-semibold py-2 rounded-lg shadow"
                    >
                        Login
                    </button>
                    <p className="mt-4 text-center text-gray-600">
                        Don't have an account?{" "}
                        <Link to="/signup" className="text-blue-600 hover:underline">
                            Sign Up
                        </Link>
                    </p>
                </form>
            </div>
        </HomeLayout>
    );
}

export default UserLogin;

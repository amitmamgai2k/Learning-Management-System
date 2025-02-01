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
        setSignupData({
            ...signupData,
            [name]: value,
        });
    }


    async function Login(event) {
        event.preventDefault();
        if (!LoginData.email || !LoginData.password )  {
            toast.error("Please fill all the details");
            return;
        }

        // checking name field length


        // checking email validation
        if (!isEmail(LoginData.email)) {
            toast.error("Invalid email id");
            return;
        }
        // checking password validation
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
            <div className="flex items-center justify-center min-h-screen">
                <form
                    noValidate // it is stopping default html validation for toast
                    onSubmit={Login}
                      className="bg-gray-800 flex flex-col justify-center gap-3 rounded-[40px] p-4 text-white w-96 shadow-[10px_10px_150px_gray]"
                >
                    <h1 className="text-center text-2xl font-bold">Login Page</h1>




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
                            value={LoginData.email}
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
                            value={LoginData.password}
                        />
                    </div>

                    <button
                        type="submit"
                        className="mt-2 bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300 rounded-full py-2 font-semibold text-lg cursor-pointer"
                    >
                        Login
                    </button>

                    <p className="text-center">
                        Don't have an account ?{" "}
                        <Link to="/signup" className="link text-accent cursor-pointer">
                            {" "}
                            Sign Up
                        </Link>
                    </p>
                </form>
            </div>
        </HomeLayout>
    );
}

export default UserLogin;
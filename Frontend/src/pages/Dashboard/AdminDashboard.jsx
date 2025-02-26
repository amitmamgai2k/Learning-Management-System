import {
    ArcElement,
    BarElement,
    CategoryScale,
    Chart as ChartJS,
    Legend,
    LinearScale,
    Title,
    Tooltip,
} from "chart.js";
import { useEffect } from "react";
import { Bar, Pie } from "react-chartjs-2";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
    Users,
    Play,
    Trash2,
    BarChart3,
    DollarSign
} from "lucide-react";

import HomeLayout from "../../Layouts/HomeLayout";
import { deleteCourse, getAllCourses } from "../../Redux/Slices/CourseSlice";
import { getPaymentRecord } from "../../Redux/Slices/RazorpaySlice";
import { getStatsData } from "../../Redux/Slices/StatSlice";
ChartJS.register(ArcElement, BarElement, CategoryScale, Legend, LinearScale, Title, Tooltip);

function AdminDashboard() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { allUsersCount, subscribedCount } = useSelector((state) => state.stat);
    const { allPayments, monthlySalesRecord } = useSelector((state) => state.razorpay);
    const myCourses = useSelector((state) => state?.course?.coursesData);

    const userData = {
        labels: ["Registered User", "Enrolled User"],
        datasets: [
            {
                label: "User Details",
                data: [allUsersCount, subscribedCount],
                backgroundColor: ["rgba(255, 206, 86, 0.8)", "rgba(75, 192, 192, 0.8)"],
                borderWidth: 2,
                borderColor: ["#FFD43B", "#4BC0C0"],
            },
        ],
    };

    const salesData = {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        datasets: [
            {
                label: "Sales / Month",
                data: monthlySalesRecord,
                backgroundColor: ["rgba(255, 99, 132, 0.7)"],
                borderColor: ["rgba(255, 99, 132, 1)"],
                borderWidth: 2,
            },
        ],
    };

    const chartOptions = {
        plugins: {
            legend: {
                labels: {
                    color: "#E5E7EB" // Light text for chart legends
                }
            }
        },
        scales: {
            y: {
                ticks: {
                    color: "#E5E7EB"
                },
                grid: {
                    color: "rgba(255, 255, 255, 0.1)"
                }
            },
            x: {
                ticks: {
                    color: "#E5E7EB"
                },
                grid: {
                    color: "rgba(255, 255, 255, 0.1)"
                }
            }
        }
    };

    async function onCourseDelete(id) {
        if (window.confirm("Are you sure you want to delete the course?")) {
            const res = await dispatch(deleteCourse(id));
            if (res?.payload?.success) {
                await dispatch(getAllCourses());
            }
        }
    }

    useEffect(() => {
        (async () => {
            await dispatch(getAllCourses());
            await dispatch(getStatsData());
            await dispatch(getPaymentRecord());
        })();
    }, []);

    return (
        <HomeLayout>
            <div className="min-h-screen  py-10 px-4 sm:px-6 lg:px-8 text-gray-100">
                <div className="max-w-7xl mx-auto">
                    <h1 className="text-center text-4xl font-bold mb-10">
                        <span className=" text-white bg-gradient-to-r from-gray-800 to-gray-700  border-2 border-solid p-4 rounded-lg ">
                            Admin Dashboard
                        </span>
                    </h1>

                    {/* Stats Overview */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 mb-2">
                        {/* User Stats */}
                        <div className="bg-gradient-to-br from-gray-800 to-gray-700 rounded-xl shadow-lg overflow-hidden p-6 border border-gray-700">
                            <h2 className="text-2xl font-semibold text-gray-100 mb-4">User Statistics</h2>
                            <div className="flex flex-col md:flex-row items-center gap-8">
                                <div className="w-64 h-64">
                                    <Pie
                                        data={userData}
                                        options={{
                                            plugins: {
                                                legend: {
                                                    position: 'bottom',
                                                    labels: {
                                                        color: "#E5E7EB"
                                                    }
                                                }
                                            }
                                        }}
                                    />
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 w-full">
                                    <div className="bg-gradient-to-r from-gray-700 to-gray-600 rounded-lg p-5 flex items-center justify-between shadow-md">
                                        <div>
                                            <p className="text-gray-300 text-sm">Registered Users</p>
                                            <h3 className="text-3xl font-bold text-white">{allUsersCount}</h3>
                                        </div>
                                        <div className="bg-yellow-900/30 p-3 rounded-full">
                                            <Users className="text-yellow-400 h-6 w-6" />
                                        </div>
                                    </div>
                                    <div className="bg-gradient-to-r from-gray-700 to-gray-600 rounded-lg p-5 flex items-center justify-between shadow-md">
                                        <div>
                                            <p className="text-gray-300 text-sm">Subscribed Users</p>
                                            <h3 className="text-3xl font-bold text-white">{subscribedCount}</h3>
                                        </div>
                                        <div className="bg-green-900/30 p-3 rounded-full">
                                            <Users className="text-green-400 h-6 w-6" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Sales Stats */}
                        <div className="bg-gradient-to-br from-gray-800 to-gray-700 rounded-xl shadow-lg overflow-hidden p-6 border border-gray-700">
                            <h2 className="text-2xl font-semibold text-gray-100 mb-4">Sales Statistics</h2>
                            <div className="h-64 mb-6">
                                <Bar
                                    data={salesData}
                                    options={{
                                        ...chartOptions,
                                        responsive: true,
                                        maintainAspectRatio: false,
                                        plugins: {
                                            legend: { display: false }
                                        }
                                    }}
                                />
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="bg-gradient-to-r from-gray-700 to-gray-600 rounded-lg p-5 flex items-center justify-between shadow-md">
                                    <div>
                                        <p className="text-gray-300 text-sm">Subscription Count</p>
                                        <h3 className="text-3xl font-bold text-white">{allPayments?.count || 0}</h3>
                                    </div>
                                    <div className="bg-blue-900/30 p-3 rounded-full">
                                        <BarChart3 className="text-blue-400 h-6 w-6" />
                                    </div>
                                </div>
                                <div className="bg-gradient-to-r from-gray-700 to-gray-600 rounded-lg p-5 flex items-center justify-between shadow-md">
                                    <div>
                                        <p className="text-gray-300 text-sm">Total Revenue</p>
                                        <h3 className="text-3xl font-bold text-white">${allPayments?.count * 3 || 0}</h3>
                                    </div>
                                    <div className="bg-green-900/30 p-3 rounded-full">
                                        <DollarSign className="text-green-400 h-6 w-6" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Courses Section */}
                    <div className="bg-gradient-to-br from-gray-800 to-gray-700 rounded-xl shadow-lg overflow-hidden p-6 mb-12 border border-gray-700">
                        <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
                            <h2 className="text-2xl font-semibold text-gray-100">Courses Overview</h2>
                            <button
                                onClick={() => navigate("/course/create")}
                                className="mt-4 sm:mt-0 bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white py-2 px-6 rounded-lg font-medium transition-all duration-300 flex items-center"
                            >
                                Create New Course
                            </button>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-600">
                                <thead className="bg-gray-700">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">S No</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Course Title</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Category</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Instructor</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Lectures</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Description</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-gray-800 divide-y divide-gray-700">
                                    {myCourses?.map((course, idx) => (
                                        <tr key={course._id} className="hover:bg-gray-700 transition-colors duration-150">
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{idx + 1}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                                                <textarea
                                                    readOnly
                                                    value={course?.title}
                                                    className="w-40 bg-transparent resize-none border-none focus:ring-0 p-0 text-gray-300"
                                                ></textarea>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{course?.category}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{course?.instructor}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{course?.numbersoflectures}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                                                <textarea
                                                    value={course?.description}
                                                    readOnly
                                                    className="w-60 bg-transparent resize-none overflow-hidden border-none focus:ring-0 p-0 text-gray-300"
                                                ></textarea>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                                                <div className="flex space-x-2">
                                                    <button
                                                        className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white p-2 rounded-md transition-all duration-200"
                                                        onClick={() => navigate("/courses/displayLectures", { state: course })}
                                                        title="View Lectures"
                                                    >
                                                        <Play className="h-5 w-5" />
                                                    </button>
                                                    <button
                                                        className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white p-2 rounded-md transition-all duration-200"
                                                        onClick={() => onCourseDelete(course?._id)}
                                                        title="Delete Course"
                                                    >
                                                        <Trash2 className="h-5 w-5" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                    {(!myCourses || myCourses.length === 0) && (
                                        <tr>
                                            <td colSpan="7" className="px-6 py-4 text-center text-sm text-gray-400">
                                                No courses available
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </HomeLayout>
    );
}

export default AdminDashboard;
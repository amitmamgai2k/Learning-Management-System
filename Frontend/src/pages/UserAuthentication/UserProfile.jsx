import React from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import HomeLayout from '../../Layouts/HomeLayout';
import { Camera, Mail, Phone, Calendar, Shield, Edit, Users, BookOpen, TrendingUp, Settings } from 'lucide-react';

function UserProfile() {
    const dispatch = useDispatch();
    const userData = useSelector((state) => state?.auth?.data);
    const isAdmin = userData?.role === "ADMIN";

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    const userStats = isAdmin ? {
        totalUsers: 150,
        totalCourses: 25,
        totalRevenue: "₹45,000",
        activeStudents: 89
    } : {
        coursesEnrolled: 3,
        completedCourses: 1,
        certificatesEarned: 1,
        totalProgress: "65%"
    };

    return (
        <HomeLayout>
            <div className="min-h-screen bg-gray-50 py-12 px-4">
                <div className="max-w-6xl mx-auto">
                    {/* Main Profile Card */}
                    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                        {/* Cover Image */}
                        <div className="h-40 bg-gradient-to-r from-blue-500 to-blue-600"></div>

                        {/* Profile Info */}
                        <div className="relative px-6 pb-6">
                            {/* Avatar */}
                            <div className="relative -mt-20 mb-6 flex justify-between items-end px-4">
                                <div className="relative">
                                    <img
                                        src={userData.avatar}
                                        alt={userData.fullname}
                                        className="w-40 h-40 rounded-full border-4 border-white shadow-lg object-cover"
                                    />
                                    <button className="absolute bottom-2 right-2 p-2 bg-blue-500 rounded-full text-white hover:bg-blue-600 transition-colors">
                                        <Camera className="w-5 h-5" />
                                    </button>
                                </div>
                                <div className="mb-4">
                                    <span className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium ${
                                        isAdmin ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'
                                    }`}>
                                        <Shield className="w-4 h-4 mr-2" />
                                        {userData.role}
                                    </span>
                                </div>
                            </div>

                            {/* Basic Info */}
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
                                <div>
                                    <h1 className="text-3xl font-bold text-gray-900 mb-2">{userData.fullname}</h1>
                                    <div className="flex items-center gap-4 text-gray-600">
                                        <span className="flex items-center">
                                            <Mail className="w-4 h-4 mr-2" />
                                            {userData.email}
                                        </span>
                                        <span className="flex items-center">
                                            <Phone className="w-4 h-4 mr-2" />
                                            +91 {userData.mobileNumber}
                                        </span>
                                    </div>
                                </div>
                                {isAdmin && (
                                    <button className="mt-4 md:mt-0 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center gap-2">
                                        <Settings className="w-4 h-4" />
                                        Admin Dashboard
                                    </button>
                                )}
                            </div>

                            {/* Stats Grid */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                                {isAdmin ? (
                                    <>
                                        <div className="bg-gray-50 p-4 rounded-xl text-center">
                                            <Users className="w-6 h-6 text-purple-500 mx-auto mb-2" />
                                            <p className="text-2xl font-bold text-gray-900">{userStats.totalUsers}</p>
                                            <p className="text-sm text-gray-600">Total Users</p>
                                        </div>
                                        <div className="bg-gray-50 p-4 rounded-xl text-center">
                                            <BookOpen className="w-6 h-6 text-purple-500 mx-auto mb-2" />
                                            <p className="text-2xl font-bold text-gray-900">{userStats.totalCourses}</p>
                                            <p className="text-sm text-gray-600">Total Courses</p>
                                        </div>
                                        <div className="bg-gray-50 p-4 rounded-xl text-center">
                                            <TrendingUp className="w-6 h-6 text-purple-500 mx-auto mb-2" />
                                            <p className="text-2xl font-bold text-gray-900">{userStats.totalRevenue}</p>
                                            <p className="text-sm text-gray-600">Total Revenue</p>
                                        </div>
                                        <div className="bg-gray-50 p-4 rounded-xl text-center">
                                            <Users className="w-6 h-6 text-purple-500 mx-auto mb-2" />
                                            <p className="text-2xl font-bold text-gray-900">{userStats.activeStudents}</p>
                                            <p className="text-sm text-gray-600">Active Students</p>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div className="bg-gray-50 p-4 rounded-xl text-center">
                                            <BookOpen className="w-6 h-6 text-blue-500 mx-auto mb-2" />
                                            <p className="text-2xl font-bold text-gray-900">{userStats.coursesEnrolled}</p>
                                            <p className="text-sm text-gray-600">Courses Enrolled</p>
                                        </div>
                                        <div className="bg-gray-50 p-4 rounded-xl text-center">
                                            <Shield className="w-6 h-6 text-blue-500 mx-auto mb-2" />
                                            <p className="text-2xl font-bold text-gray-900">{userStats.completedCourses}</p>
                                            <p className="text-sm text-gray-600">Completed Courses</p>
                                        </div>
                                        <div className="bg-gray-50 p-4 rounded-xl text-center">
                                            <Award className="w-6 h-6 text-blue-500 mx-auto mb-2" />
                                            <p className="text-2xl font-bold text-gray-900">{userStats.certificatesEarned}</p>
                                            <p className="text-sm text-gray-600">Certificates Earned</p>
                                        </div>
                                        <div className="bg-gray-50 p-4 rounded-xl text-center">
                                            <TrendingUp className="w-6 h-6 text-blue-500 mx-auto mb-2" />
                                            <p className="text-2xl font-bold text-gray-900">{userStats.totalProgress}</p>
                                            <p className="text-sm text-gray-600">Total Progress</p>
                                        </div>
                                    </>
                                )}
                            </div>

                            {/* Action Buttons */}
                            <div className="flex flex-col sm:flex-row gap-4">
                                <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                                    <Edit className="w-4 h-4" />
                                    Edit Profile
                                </button>
                                <button className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                                    Change Password
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Activity Section */}
                    <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-white rounded-xl shadow-md p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">
                                {isAdmin ? "Recent System Activity" : "Learning Activity"}
                            </h3>
                            <div className="text-center text-gray-500 py-8">
                                No recent activity to show
                            </div>
                        </div>

                        <div className="bg-white rounded-xl shadow-md p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">
                                {isAdmin ? "System Statistics" : "Learning Progress"}
                            </h3>
                            <div className="text-center text-gray-500 py-8">
                                No data to display
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </HomeLayout>
    );
}

export default UserProfile;
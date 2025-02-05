import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import HomeLayout from "../../Layouts/HomeLayout";
import { Clock, BookOpen, Users, Star, Award } from 'lucide-react';

function CourseDescription() {
    const location = useLocation();
    const [course, setCourse] = useState(null);

    useEffect(() => {
        if (location.state) {
            setCourse(location.state);
        }
    }, [location.state]);

    if (!course) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    const features = [
        {
            icon: Clock,
            label: "Duration",
            value: "8 weeks"
        },
        {
            icon: BookOpen,
            label: "Lectures",
            value: course.numbersoflectures
        },
        {
            icon: Users,
            label: "Students",
            value: "1.5k+"
        },
        {
            icon: Star,
            label: "Rating",
            value: "4.8/5"
        }
    ];

    return (
        <HomeLayout>
            <div className="min-h-screen bg-gray-50 py-8 px-4">
                <div className="max-w-7xl mx-auto">
                    {/* Main Content */}
                    <div className="bg-white rounded-lg shadow-md overflow-hidden">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
                            {/* Left Side - Image */}
                            <div className="flex items-center justify-center">
                                <img
                                    src={course.thumbnail}
                                    alt={course.title}
                                    className="w-full max-h-[400px] object-contain rounded-lg"
                                />
                            </div>

                            {/* Right Side - Course Details */}
                            <div className="flex flex-col justify-between">
                                <div>
                                    <div className="flex items-center gap-2 mb-4">
                                        <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm font-medium">
                                            {course.category}
                                        </span>
                                    </div>

                                    <h1 className="text-3xl font-bold text-gray-800 mb-4">
                                        {course.title}
                                    </h1>

                                    <p className="text-gray-600 mb-6">
                                        {course.description}
                                    </p>

                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                                        {features.map((feature, index) => (
                                            <div key={index} className="bg-gray-50 p-4 rounded-lg text-center">
                                                <feature.icon className="w-6 h-6 text-blue-500 mx-auto mb-2" />
                                                <p className="text-gray-600 text-sm">{feature.label}</p>
                                                <p className="font-semibold text-gray-800">{feature.value}</p>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="flex items-center justify-between mb-6 bg-gray-50 p-4 rounded-lg">
                                        <div>
                                            <p className="text-gray-600 text-sm">Instructor</p>
                                            <p className="text-gray-800 font-semibold flex items-center gap-2">
                                                {course.instructor}
                                                <Award className="w-4 h-4 text-yellow-500" />
                                            </p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-gray-600 text-sm">Price</p>
                                            <p className="text-3xl font-bold text-blue-600">₹{course.price}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <button className="w-full py-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-all transform hover:scale-[1.02] active:scale-[0.98]">
                                        Enroll Now
                                    </button>
                                    <button className="w-full py-4 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition-all">
                                        Add to Wishlist
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Course Content Preview */}
                    <div className="mt-8 bg-white rounded-lg shadow-md p-8">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6">Course Content</h2>
                        <div className="space-y-4">
                            {[1, 2, 3].map((section) => (
                                <div key={section} className="bg-gray-50 rounded-lg p-4">
                                    <div className="flex items-center justify-between mb-2">
                                        <h3 className="text-gray-800 font-semibold">Section {section}: Introduction</h3>
                                        <span className="text-gray-600 text-sm">3 lectures • 15 min</span>
                                    </div>
                                    <p className="text-gray-600 text-sm">
                                        Learn the fundamentals and core concepts.
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </HomeLayout>
    );
}

export default CourseDescription;
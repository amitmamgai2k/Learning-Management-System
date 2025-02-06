import React, { useState } from 'react';
import HomeLayout from '../../Layouts/HomeLayout';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Upload, Plus, X } from 'lucide-react';
import toast from 'react-hot-toast';
import { createNewCourse } from '../../Redux/Slices/CourseSlice';

function CreateCourse() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [courseData, setCourseData] = useState({
        title: "",
        description: "",
        thumbnail: "",
        price: "",
        category: "",
        instructor: "",
    });

    const [previewImage, setPreviewImage] = useState("");

    const handleImageUpload = (e) => {
        e.preventDefault();
        const file = e.target.files[0];
        if (file) {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload = () => {
                setPreviewImage(fileReader.result);
                setCourseData({ ...courseData, thumbnail: file });
            };
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCourseData({ ...courseData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(!courseData.title || !courseData.description || !courseData.thumbnail || !courseData.price || !courseData.category || !courseData.instructor) {
            toast.error("Please fill all the details");
            return;
        }
        const response = await dispatch(createNewCourse(courseData));
        if(response?.payload?.success){
            toast.success(response?.payload?.message);
            setCourseData({
                title: "",
                description: "",
                thumbnail: "",
                price: "",
                category: "",
                instructor: "",
            });
            navigate("/courses");
        }
    };

    return (
        <HomeLayout>
            <div className="min-h-screen py-12 px-4 bg-gradient-to-b from-blue-50 to-white">
                <div className="max-w-7xl mx-auto">
                    <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                        <div className="px-6 py-8 bg-gray-600 sm:p-10 sm:pb-6">
                            <div className="max-w-4xl mx-auto">
                                <h2 className="text-3xl font-extrabold text-white text-center">
                                    Create New Course
                                </h2>
                            </div>
                        </div>

                        <form onSubmit={handleSubmit}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
                                {/* Left Side - Image Upload */}
                                <div className="flex flex-col space-y-6">
                                    <div className="space-y-2">
                                        <label className="block text-sm font-medium text-gray-700">Course Thumbnail</label>
                                        <div className="flex items-center justify-center w-full">
                                            <label className="relative flex flex-col items-center justify-center w-full h-[400px] border-2 border-gray-600 border-dashed rounded-xl cursor-pointer bg-blue-50 hover:bg-blue-100 transition-all duration-300">
                                                {previewImage ? (
                                                    <>
                                                        <img src={previewImage} alt="preview" className="w-full h-full object-cover rounded-xl" />
                                                        <button
                                                            type="button"
                                                            onClick={() => setPreviewImage("")}
                                                            className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                                                        >
                                                            <X className="w-4 h-4" />
                                                        </button>
                                                    </>
                                                ) : (
                                                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                        <Upload className="w-12 h-12 mb-4 text-gray-600" />
                                                        <p className="mb-2 text-sm text-gray-500">Click to upload thumbnail</p>
                                                        <p className="text-xs text-gray-500">PNG, JPG up to 5MB</p>
                                                    </div>
                                                )}
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    className="hidden"
                                                    onChange={handleImageUpload}
                                                />
                                            </label>
                                        </div>
                                    </div>
                                    <button
                                        type="submit"
                                        className="w-full flex items-center justify-center px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl text-sm font-semibold hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 transform hover:scale-[1.02]"
                                    >
                                        <Plus className="w-5 h-5 mr-2" />
                                        Create Course
                                    </button>
                                </div>

                                {/* Right Side - Course Details */}
                                <div className="space-y-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Course Title</label>
                                        <input
                                            type="text"
                                            name="title"
                                            value={courseData.title}
                                            onChange={handleInputChange}
                                            className="mt-1 block w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                                            required
                                            placeholder="e.g., Mastering JavaScript for Beginners to Advanced"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Description</label>
                                        <textarea
                                            name="description"
                                            value={courseData.description}
                                            onChange={handleInputChange}
                                            rows="4"
                                            className="mt-1 block w-full px-4 py-3 text-black bg-gray-50 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            required
                                            placeholder="Enter course description..."
                                        />
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">Category</label>
                                            <input
                                                type="text"
                                                name="category"
                                                value={courseData.category}
                                                onChange={handleInputChange}
                                                className="mt-1 block w-full px-4 py-3 text-black bg-gray-50 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                required
                                                placeholder="e.g., JavaScript Programming"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">Price (₹)</label>
                                            <input
                                                type="number"
                                                name="price"
                                                value={courseData.price}
                                                onChange={handleInputChange}
                                                className="mt-1 block w-full px-4 py-3 text-black bg-gray-50 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                required
                                                min="0"
                                                placeholder="e.g., 499"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Instructor Name</label>
                                        <input
                                            type="text"
                                            name="instructor"
                                            value={courseData.instructor}
                                            onChange={handleInputChange}
                                            className="mt-1 block w-full px-4 py-3 text-black bg-gray-50 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            required
                                            placeholder="e.g., John Doe"
                                        />
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </HomeLayout>
    );
}

export default CreateCourse;
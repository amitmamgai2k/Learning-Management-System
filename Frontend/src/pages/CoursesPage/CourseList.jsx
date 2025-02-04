import React, { useEffect, useState } from 'react';
import HomeLayout from '../../Layouts/HomeLayout';
import CourseCard from '../../components/CourseCard';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCourses } from '../../Redux/Slices/CourseSlice';

import { Search, Filter } from 'lucide-react';

function CourseList() {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const dispatch = useDispatch();
    const { coursesData} = useSelector(state => state.course);
    console.log('courseData', coursesData);


    async function loadCourses(){
        await dispatch(getAllCourses());
    }
useEffect(() => {
    loadCourses();
}, []);




    // Get unique categories
    const categories = ['All', ...new Set(coursesData.map(course => course.category))];

    // Filter courses based on search and category
    const filteredCourses = coursesData.filter(course => {
        const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            course.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'All' || course.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    return (
        <HomeLayout>
            <div className="bg-gray-50 min-h-screen py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header Section */}
                    <div className="text-center mb-12">
                        <h1 className="text-4xl font-bold text-gray-900 mb-4">
                            Explore Our Courses
                        </h1>
                        <p className="text-xl text-gray-600">
                            Discover the perfect course to advance your skills
                        </p>
                    </div>

                    {/* Search and Filter Section */}
                    <div className="mb-8 flex flex-col md:flex-row gap-4 justify-between">
                        {/* Search Bar */}
                        <div className="relative flex-1 max-w-xl  rounded-lg text-black">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2  h-5 w-5" />
                            <input
                                type="text"
                                placeholder="Search courses..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 rounded-xl border bg-white  border-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        {/* Category Filter */}
                        <div className="flex items-center space-x-2 text-black">
                            <Filter className="text-gray-700 h-5 w-5" />
                            <select
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                                className="py-3 px-4 rounded-lg border border-gray-500 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                {categories.map(category => (
                                    <option key={category} value={category}>
                                        {category}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Course Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredCourses?.map(course => (
                            <CourseCard key={course._id} course={course} />
                        ))}
                    </div>

                    {/* Empty State */}
                    {filteredCourses.length === 0 && (
                        <div className="text-center py-12">
                            <h3 className="text-xl font-medium text-gray-900 mb-2">
                                No courses found
                            </h3>
                            <p className="text-gray-600">
                                Try adjusting your search or filter criteria
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </HomeLayout>
    );
}

export default CourseList;
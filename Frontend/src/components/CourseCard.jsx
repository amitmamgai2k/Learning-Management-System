import React from 'react';
import { Star, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function CourseCard({ course }) {

    const navigate = useNavigate();

    return (
        <div className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"  onClick={() => navigate(`/courses/description/${course.title}`,{state:{...course}})}>
            {/* Course Image */}
            <div className="relative" >
                <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 right-4 bg-black/80 text-white px-3 py-1 rounded-full text-sm">
                    {course.category}
                </div>
            </div>

            {/* Course Content */}
            <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-gray-800">{course.title}</h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{course.description}</p>

                {/* Instructor */}
                <p className="text-gray-500 text-sm mb-4">Instructor: {course.instructor}</p>

                {/* Stats Row */}
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                        <span className="text-sm font-medium">5 star</span>
                    </div>
                    <div className="flex items-center space-x-1">
                        <Users className="w-4 h-4 text-gray-500" />
                        <span className="text-sm text-gray-500">
                           500K+
                        </span>
                    </div>
                </div>

                {/* Price and Action */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="text-2xl font-bold text-gray-900">
                       ₹{course.price}
                    </div>
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-300">
                        Enroll Now
                    </button>
                </div>
            </div>
        </div>
    );
}

export default CourseCard;
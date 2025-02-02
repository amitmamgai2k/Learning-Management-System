import React, { useState } from 'react';
import HomeLayout from '../../Layouts/HomeLayout';
import CourseCard from '../../components/CourseCard';

import { Search, Filter } from 'lucide-react';

function CourseList() {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');

     const sampleCourses = [
        {
            id: 1,
            title: "Complete Web Development Bootcamp",
            description: "Master HTML, CSS, JavaScript, React and Node.js in this comprehensive course. Build real-world projects and learn modern web development practices.",
            thumbnail: "https://img-c.udemycdn.com/course/750x422/2314160_8d61_6.jpg",
            price: 499,
            category: "Web Development",
            instructor: "Sarah Johnson",
            rating: 4.8,
            studentsEnrolled: 15430
        },
        {
            id: 2,
            title: "Python for Data Science and ML",
            description: "Learn Python programming with focus on data analysis, visualization, and machine learning. Includes pandas, numpy, scikit-learn and more.",
            thumbnail: "https://img-c.udemycdn.com/course/750x422/2314160_8d61_6.jpg",
            price: 599,
            category: "Data Science",
            instructor: "Michael Chen",
            rating: 4.9,
            studentsEnrolled: 12850
        },
        {
            id: 3,
            title: "UI/UX Design Masterclass",
            description: "Create stunning user interfaces and experiences. Learn Figma, design principles, and modern UI/UX practices through practical projects.",
            thumbnail: "https://img-c.udemycdn.com/course/750x422/2314160_8d61_6.jpg",
            price: 449,
            category: "Design",
            instructor: "Emily Parker",
            rating: 4.7,
            studentsEnrolled: 8920
        },
        {
            id: 4,
            title: "Mobile App Development with React Native",
            description: "Build cross-platform mobile apps using React Native. Create iOS and Android apps with a single codebase.",
            thumbnail: "https://img-c.udemycdn.com/course/750x422/2314160_8d61_6.jpg",
            price: 549,
            category: "Mobile Development",
            instructor: "David Wilson",
            rating: 4.6,
            studentsEnrolled: 10240
        },
        {
            id: 5,
            title: "AWS Cloud Practitioner Certification",
            description: "Prepare for AWS Cloud Practitioner certification. Learn cloud concepts, AWS services, security, architecture, and pricing.",
            thumbnail: "https://img-c.udemycdn.com/course/750x422/2314160_8d61_6.jpg",
            price: 399,
            category: "Cloud Computing",
            instructor: "Alex Thompson",
            rating: 4.8,
            studentsEnrolled: 9650
        },
        {
            id: 6,
            title: "Digital Marketing Strategy",
            description: "Master digital marketing channels including SEO, social media, email marketing, and PPC. Learn to create effective marketing campaigns.",
            thumbnail: "https://img-c.udemycdn.com/course/750x422/2314160_8d61_6.jpg",
            price: 349,
            category: "Marketing",
            instructor: "Lisa Anderson",
            rating: 4.7,
            studentsEnrolled: 11320
        },
        {
            id: 7,
            title: "Blockchain Development with Solidity",
            description: "Learn to build decentralized applications (DApps) using Solidity and Ethereum. Includes smart contracts and Web3 integration.",
            thumbnail: "https://img-c.udemycdn.com/course/750x422/2314160_8d61_6.jpg",
            price: 699,
            category: "Blockchain",
            instructor: "James Mitchell",
            rating: 4.9,
            studentsEnrolled: 7840
        },
        {
            id: 8,
            title: "Cybersecurity Fundamentals",
            description: "Understanding cyber threats, security practices, and protection mechanisms. Learn ethical hacking and security tools.",
            thumbnail: "https://img-c.udemycdn.com/course/750x422/2314160_8d61_6.jpg",
            price: 599,
            category: "Security",
            instructor: "Robert Turner",
            rating: 4.8,
            studentsEnrolled: 9120
        },
        {
            id: 9,
            title: "Game Development with Unity",
            description: "Create 2D and 3D games using Unity engine. Learn C# programming, game design principles, and animation.",
            thumbnail: "https://img-c.udemycdn.com/course/750x422/2314160_8d61_6.jpg",
            price: 549,
            category: "Game Development",
            instructor: "Maria Garcia",
            rating: 4.7,
            studentsEnrolled: 8750
        },
        {
            id: 10,
            title: "DevOps Engineering Professional",
            description: "Master DevOps tools and practices including Docker, Kubernetes, Jenkins, and Git. Learn CI/CD pipelines and automation.",
            thumbnail: "https://img-c.udemycdn.com/course/750x422/2314160_8d61_6.jpg",
            price: 649,
            category: "DevOps",
            instructor: "Chris Baker",
            rating: 4.8,
            studentsEnrolled: 10580
        }
    ];
    // Get unique categories
    const categories = ['All', ...new Set(sampleCourses.map(course => course.category))];

    // Filter courses based on search and category
    const filteredCourses = sampleCourses.filter(course => {
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
                        <div className="relative flex-1 max-w-xl">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                            <input
                                type="text"
                                placeholder="Search courses..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        {/* Category Filter */}
                        <div className="flex items-center space-x-2">
                            <Filter className="text-gray-400 h-5 w-5" />
                            <select
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                                className="py-3 px-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                        {filteredCourses.map(course => (
                            <CourseCard key={course.id} course={course} />
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
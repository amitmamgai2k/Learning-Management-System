import React from 'react';
import { BookOpen, Users, Star, ArrowRight } from 'lucide-react';
import HomeLayout from '../Layouts/HomeLayout';

const HomePage = () => {
  const featuredCourses = [
    {
      title: "Web Development",
      students: "1.5k+",
      rating: 4.8,
      price: "₹5000",
      image: "https://ideogram.ai/assets/image/lossless/response/haay7pQxQ96BQmgEYyC46g"
    },
    {
      title: "Data Science",
      students: "1.2k+",
      rating: 4.9,
      price: "₹6000",
      image: "https://ideogram.ai/assets/image/lossless/response/haay7pQxQ96BQmgEYyC46g"
    },
    {
      title: "Mobile App Development",
      students: "980+",
      rating: 4.7,
      price: "₹5999",
      image: "https://ideogram.ai/assets/image/lossless/response/haay7pQxQ96BQmgEYyC46g"
    }
  ];

  return (
    <HomeLayout>
      <div className="w-full overflow-x-hidden">
        {/* Hero Section */}
        <section className="pt-8 pb-16">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Discover Your Path to Success
              </h1>
              <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                Explore our curated collection of courses designed to help you master new skills
                and advance your career.
              </p>
              <div className="flex gap-4 justify-center">
                <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors">
                  Explore Courses
                </button>
                <button className="border border-gray-300 px-6 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors">
                  Learn More
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="bg-gray-50 py-12">
          <div className="max-w-6xl mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-sm text-center">
                <BookOpen className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                <h3 className="text-2xl font-bold text-gray-900">100+</h3>
                <p className="text-gray-600">Expert-led courses</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm text-center">
                <Users className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                <h3 className="text-2xl font-bold text-gray-900">10k+</h3>
                <p className="text-gray-600">Active students</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm text-center">
                <Star className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                <h3 className="text-2xl font-bold text-gray-900">4.8</h3>
                <p className="text-gray-600">Average rating</p>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Courses Section */}
        <section className="py-16">
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900">Featured Courses</h2>
              <a href="/courses" className="text-blue-600 hover:text-blue-700 flex items-center gap-2">
                View All
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredCourses.map((course, index) => (
                <div key={index} className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{course.title}</h3>
                    <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                      <span className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        {course.students}
                      </span>
                      <span className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-400" />
                        {course.rating}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-bold text-gray-900">{course.price}</span>
                      <button className="text-blue-600 hover:text-blue-700 font-medium">
                        Learn More
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className=" text-black py-16">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Start Learning?</h2>
            <p className="text-lg mb-8 opacity-90">
              Join thousands of students who are already learning and growing with us.
            </p>
            <button className="bg-white border-2 text-blue-600 px-8 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors">
              Get Started Today
            </button>
          </div>
        </section>
      </div>
    </HomeLayout>
  );
};

export default HomePage;
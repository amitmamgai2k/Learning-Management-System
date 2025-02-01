import React from 'react';
import HomeLayout from '../Layouts/HomeLayout';
import { Users, Target, Award, BookOpen } from 'lucide-react';

const AboutPage = () => {
  const stats = [
    {
      icon: Users,
      count: "10,000+",
      label: "Active Students",
      description: "Learners from around the globe"
    },
    {
      icon: BookOpen,
      count: "200+",
      label: "Courses",
      description: "In various domains"
    },
    {
      icon: Target,
      count: "95%",
      label: "Success Rate",
      description: "Course completion rate"
    },
    {
      icon: Award,
      count: "50+",
      label: "Expert Instructors",
      description: "Industry professionals"
    }
  ];

  const values = [
    {
      title: "Quality Education",
      description: "We believe in providing top-tier educational content that meets industry standards and helps students achieve their goals."
    },
    {
      title: "Student Success",
      description: "Our primary focus is on ensuring student success through comprehensive support and practical learning experiences."
    },
    {
      title: "Innovation",
      description: "We continuously update our curriculum and teaching methods to reflect the latest industry trends and technologies."
    },
    {
      title: "Accessibility",
      description: "Making quality education accessible to everyone through flexible learning options and competitive pricing."
    }
  ];

  return (
    <HomeLayout>
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-white py-20">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                About Our Learning Platform
              </h1>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                We're dedicated to transforming education through technology and innovation.
                Our platform connects ambitious learners with expert instructors to create
                an engaging learning experience.
              </p>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16">
          <div className="max-w-6xl mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-sm text-center">
                  <stat.icon className="w-8 h-8 text-blue-600 mx-auto mb-4" />
                  <h3 className="text-3xl font-bold text-gray-900 mb-2">{stat.count}</h3>
                  <h4 className="text-lg font-semibold text-gray-800 mb-2">{stat.label}</h4>
                  <p className="text-gray-600">{stat.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="bg-white py-16">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Mission</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                To empower individuals with the knowledge and skills they need to succeed
                in today's rapidly evolving digital world. We strive to make quality education
                accessible, engaging, and effective for everyone.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
              {values.map((value, index) => (
                <div key={index} className="p-6 bg-gray-50 rounded-lg">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {value.title}
                  </h3>
                  <p className="text-gray-600">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg- text-black py-16">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Start Your Learning Journey Today</h2>
            <p className="text-lg opacity-90 mb-8">
              Join our community of learners and take the first step towards achieving your goals.
            </p>
            <button className="bg-white border-2 text-blue-600 px-8 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors">
              Explore Courses
            </button>
          </div>
        </section>
      </div>
    </HomeLayout>
  );
};

export default AboutPage;
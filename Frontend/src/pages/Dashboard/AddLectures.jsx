import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addCourseLectures } from '../../Redux/Slices/LectureSlice';
import HomeLayout from '../../Layouts/HomeLayout';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { FiUpload } from 'react-icons/fi';
import toast from 'react-hot-toast';

const AddLecturePage = () => {

    const courseDetails = useLocation().state;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log('courseDetails', courseDetails._id);
  const courseId = courseDetails._id






  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({

    title: '',
    description: '',
    videoUrl: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title || !formData.description || !formData.videoUrl || !courseId) {
      toast.error("Please fill all the details");
      return;
    }

    setIsLoading(true);


    console.log("Sending Payload:", {
      title: formData.title,
      description: formData.description,
      videoUrl: formData.videoUrl,
      courseId
    });

    try {
    const response =  await dispatch(
        addCourseLectures({
          title: formData.title,
          description: formData.description,
          videoUrl: formData.videoUrl,
          courseId
        })
      ).unwrap();
      if(response){
        setTimeout(() => {
            navigate(-1);
          }, 2000);

      setFormData({ title: '', description: '', videoUrl: '' });
      }
    } catch (error) {
      console.error("Error adding lecture:", error.response?.data || error.message);
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <HomeLayout>
      <div className="min-h-screen py-12">
        <div className="max-w-4xl mx-auto bg-gradient-to-b from-gray-900 to-gray-700 rounded-lg p-4 shadow-lg">
          <div className="bg-gradient-to-b from-violet-900 to-violet-800 rounded-lg p-6 text-white">
            <h1 className="text-3xl font-bold">Add New Lecture</h1>
            <p className="mt-2 opacity-90">Create and upload lecture content for your course</p>
          </div>

          <form onSubmit={handleSubmit} className="p-8">
            <div className="grid gap-6">
              <div>
                <label className="block text-lg font-semibold text-gray-200 mb-2">Lecture Title</label>
                <input
                  name="title"
                  type="text"
                  required
                  value={formData.title}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  placeholder="Enter title"
                />
              </div>

              <div>
                <label className="block text-lg font-semibold text-gray-200 mb-2">Description</label>
                <textarea
                  name="description"
                  rows={3}
                  required
                  value={formData.description}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  placeholder="Lecture description"
                />
              </div>

              <div>
                <label className="block text-lg font-semibold text-gray-200 mb-2">Video URL</label>
                <input
                  name="videoUrl"
                  type="url"
                  required
                  value={formData.videoUrl}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  placeholder="Enter video URL"
                />
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full py-3 px-4 flex items-center justify-center rounded-lg text-white font-medium transition-all ${
                    isLoading ? 'bg-blue-400 cursor-not-allowed' : 'bg-violet-600 hover:bg-violet-500 shadow-lg hover:shadow-xl'
                  }`}
                >
                  {isLoading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Adding Lecture...
                    </>
                  ) : (
                    <>
                      <FiUpload className="mr-2" /> Publish Lecture
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </HomeLayout>
  );
};

export default AddLecturePage;

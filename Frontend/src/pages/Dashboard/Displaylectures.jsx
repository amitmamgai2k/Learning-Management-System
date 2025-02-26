import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import HomeLayout from '../../Layouts/HomeLayout'
import { deleteCourseLectures , getAllLectures } from '../../Redux/Slices/LectureSlice'

function Displaylectures() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { state } = useLocation();

  const { lectures } = useSelector((state) => state.lectures);
  const { role } = useSelector((state) => state.auth);

  const [currentVideo, setCurrentVideo] = useState(0);

  // Function to convert YouTube URL to embed URL
  const getEmbedUrl = (url) => {
    if (!url) return '';

    // Check if it's a YouTube URL
    const youtubeRegex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
    const match = url.match(youtubeRegex);

    if (match && match[1]) {
      // Return YouTube embed URL
      return `https://www.youtube.com/embed/${match[1]}`;
    }

    // Return original URL if not YouTube or if transformation fails
    return url;
  };

  async function handleLectureDelete(courseId, lectureId) {
    await dispatch(deleteCourseLectures({ courseId, lectureId }));
    await dispatch(getAllLectures(courseId));
  }

  useEffect(() => {
    if (!state) navigate('/courses');
    dispatch(getAllLectures(state.state._id));
  }, []);

  return (
    <HomeLayout>
      <div className=" overflow-auto scrollbar-hide min-h-screen">
        <div className="container mx-auto px-4 py-8 max-w-7xl">
          {/* Course Header */}
          <div className="mb-10 text-center flex-1 overflow-y-auto">
            <h1 className="text-3xl md:text-4xl font-bold text-black mb-3">
              {state?.state?.title}
            </h1>
            <p className="text-gray-900 max-w-3xl mx-auto">
              {state?.state?.description}
            </p>
          </div>

          {lectures && lectures.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-1 ">

              <div className="lg:col-span-2 bg-gradient-to-b from-gray-700 to-gray-900 rounded-xl overflow-hidden shadow-2xl border border-gray-700">
                <div className="aspect-video w-full bg-black">
                  {lectures && lectures[currentVideo]?.lectureThumbnail ? (
                    <iframe
                      src={getEmbedUrl(lectures[currentVideo]?.lectureThumbnail)}
                      className="w-full h-full"
                      title={lectures[currentVideo]?.title}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <p className="text-gray-400">Video not available</p>
                    </div>
                  )}
                </div>

                <div className="p-6">
                  <h2 className="text-2xl font-bold text-white mb-2">
                    {lectures && lectures[currentVideo]?.title}
                  </h2>
                  <div className="h-[1px] bg-gradient-to-r from-green-500 to-transparent mb-4"></div>
                  <p className="text-gray-300 leading-relaxed">
                    {lectures && lectures[currentVideo]?.description}
                  </p>
                </div>
              </div>

              <div className="lg:col-span-1">
                <div className=" bg-gradient-to-b from-gray-700 to-gray-900 rounded-xl overflow-hidden shadow-2xl border border-black h-full flex flex-col">
                <h1 className="text-yellow-300 text-center items-center font-bold text-2xl mt-2 ">Course Content</h1>
                  <div className=" bg-gradient-to-b from-gray-700 to-gray-900 p-4 border-b border-gray-600  flex justify-between items-center ">

                    <div className="font-bold text-xl text-yellow-300">
                    Number Of Lectures   {lectures.length}
                    </div>
                    <div >

                    {role === "ADMIN" && (
                      <button
                        onClick={() => navigate("/course/addlecture", { state: { ...state.state } })}
                        className="bg-yellow-300 hover:bg-yellow-400 text-gray-900 px-3 py-2 rounded-lg font-semibold text-sm transition-all duration-200 shadow-lg hover:shadow-xl"
                      >
                        Add Lecture
                      </button>
                    )}
                    </div>
                  </div>
                  <div className="h-[2px] bg-gradient-to-r from-violet-600 to-violet-300 mb-4"></div>

                  <div className="overflow-y-auto flex-grow max-h-[60vh]">
                    {lectures.map((lecture, idx) => (
                      <div
                        key={lecture._id}
                        className={`border-b border-gray-800 transition-all duration-200 ${
                          currentVideo === idx
                            ? 'bg-gradient-to-b from-gray-700 to-gray-900'
                            : 'hover:bg-gray-700/50'
                        }`}
                      >
                        <div
                          className="p-4 cursor-pointer"
                          onClick={() => setCurrentVideo(idx)}
                        >
                          <div className="flex items-start gap-3">
                            <div className={`h-6 w-6 rounded-full flex items-center justify-center text-sm flex-shrink-0 mt-1 ${
                              currentVideo === idx
                                ? 'bg-gradient-to-b from-violet-600 to-violet-400 text-gray-900'
                                : 'bg-gray-600 text-black'
                            }`}>
                              {idx + 1}
                            </div>

                            <div className="flex-grow">
                              <h4 className={`font-medium ${
                                currentVideo === idx ? 'text-violet-500' : 'text-white'
                              }`}>
                                {lecture?.title}
                              </h4>

                              {currentVideo === idx && (
                                <p className="text-gray-300 text-sm mt-1 line-clamp-2">
                                  {lecture?.description}
                                </p>
                              )}
                            </div>
                          {/* delete */}
                            {role === "ADMIN" && (
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleLectureDelete(state.state._id, lecture._id);
                                }}
                                className="text-red-400 hover:text-red-500 bg-gray-800 hover:bg-gray-700 p-1.5 rounded-md text-sm transition-colors"
                                title="Delete lecture"
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-gray-800 rounded-xl p-8 text-center max-w-2xl mx-auto border border-gray-700 shadow-2xl">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-700 text-yellow-500 mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>

              <h2 className="text-2xl font-bold text-white mb-3">No Lectures Available</h2>
              <p className="text-gray-300 mb-6">This course doesn't have any lectures yet.</p>

              {role === "ADMIN" && (
                <button
                  onClick={() => navigate("/course/addlecture", { state: { ...state.state } })}
                  className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 px-6 py-3 rounded-lg font-semibold transition-all duration-200 shadow-lg hover:shadow-xl inline-flex items-center gap-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Add Your First Lecture
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </HomeLayout>
  )
}

export default Displaylectures
import Course from "../models/course.model.js";
import asyncHandler from "../utils/asyncHandler.js";

 const getAllCourses = asyncHandler(async (req, res) => {
    try {
      const courses = await Course.find({}).select("-lectures");
      res.status(200).json({
        success: true,
        message: 'Courses fetched successfully',
        courses,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  const getLecturesByCourseId = asyncHandler(async (req, res,next) => {
    try {
        const{id} = req.params;
      const course = await Course.findById(id);
      if (!course) {
        return res.status(404).json({ error: 'Course not found' });
      }
      res.status(200).json({
        success: true,
        message: 'Lectures fetched successfully',
        lectures: course.lectures,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  export { getAllCourses, getLecturesByCourseId};
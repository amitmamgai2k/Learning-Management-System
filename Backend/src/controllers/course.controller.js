import Course from "../models/course.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import { validationResult } from "express-validator";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

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
        const {id} = req.body;
      const course = await Course.find({_id:id});
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
  const createCourse = asyncHandler(async (req, res,next) => {
    const erros = validationResult(req);
    if (!erros.isEmpty()) {
      return res.status(400).json({ errors: erros.array() });
    }
    try {
        const {title,description,category,price,instructor} = req.body;
        console.log(title,description,category,price,instructor);

        if(!title || !description || !category || !price || !instructor){
            throw new ApiError(400,"All fields are required");
        }
        const thumbnailLocalPath = req.file.path;
        if(!thumbnailLocalPath){
            throw new ApiError(400,"Thumbnail is required");
        }

        const thumbnail = await uploadOnCloudinary(thumbnailLocalPath);
        if(!thumbnail){
            throw new ApiError(400,"Thumbnail not uploaded");
        }

        const course  = await Course.create({title:title,description:description,category:category,price:price,instructor:instructor,thumbnail:thumbnail.url});
        if(!course){
            throw new ApiError(400,"Course not created");
        }
        await course.save();

        return res.status(200).json(new ApiResponse(200,course,"Course created successfully"));

    } catch (error) {
        throw next(new ApiError(400,error.message));


    }

  })
  const updateCourse = asyncHandler(async (req, res) => {
   const errors  = validationResult(req);
   if(!errors.isEmpty()){
    return res.status(400).json({errors:errors.array()});
   }
   try {

    const {id} = req.body;
    const course = await Course.findByIdAndUpdate(
        id,
        {
          $set:req.body
        },
        {runValidators:true}
    );

    if(!course){
        throw new ApiError(400,"Course not found");
    }

    return res.status(200).json(new ApiResponse(200,course,"Course updated successfully"));

   } catch (error) {

   }

  });
  const deleteCourse = asyncHandler(async (req, res) => {
    const errors  = validationResult(req);
    if(!errors.isEmpty()){
     return res.status(400).json({errors:errors.array()});
    }
    try {
      const {id} = req.body;
      const course = await Course.findByIdAndDelete(id);
      if(!course){
        throw new ApiError(400,"Course not found");
      }
      return res.status(200).json(new ApiResponse(200,course,"Course deleted successfully"));

    } catch (error) {

    }
  });
  const addLectures = asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const {courseId, title, description} = req.body;
      if(!courseId || !title || !description) {
        throw new ApiError(400, "All fields are required");
      }
      const course = await Course.find(courseId);
      if (!course) {
        throw new ApiError(400, "Course not found");
      }
      const lectureLocalPath = req.file.path;
      if (!lectureLocalPath) {
        throw new ApiError(400, "Lecture file is required");
      }
      const lecture = await uploadOnCloudinary(lectureLocalPath);
      if (!lecture) {
        throw new ApiError(400, "Lecture not uploaded");
      }

      course.lectures.push({title,description,lectureThumbnail:lecture.url});
      course.numbersoflectures = course.lectures.length;
      await course.save();

      return res.status(200).json(new ApiResponse(200, course, "Lecture added successfully"));
    } catch (error) {
      throw new ApiError(400, error.message);
    }

  });

  const deleteLectures = asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { courseId, lectureTitle } = req.body;

        // Find the course by ID
        const course = await Course.findById(courseId);
        if (!course) {
            throw new ApiError(400, "Course not found");
        }

        // Find the lecture index by title
        const lectureIndex = course.lectures.findIndex(lecture => lecture.title === lectureTitle);
        if (lectureIndex === -1) {
            throw new ApiError(400, "Lecture not found");
        }

        // Remove the lecture from the array
        course.lectures.splice(lectureIndex, 1);

        // Update the number of lectures
        course.numbersoflectures = course.lectures.length;

        // Save the updated course
        await course.save();

        return res.status(200).json(new ApiResponse(200, course, "Lecture deleted successfully"));
    } catch (error) {
        return res.status(500).json(new ApiResponse(500, null, error.message));
    }
});


  export { getAllCourses, getLecturesByCourseId, createCourse , updateCourse,deleteCourse,addLectures,deleteLectures};
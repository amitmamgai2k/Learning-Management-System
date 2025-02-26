import {Router} from "express";
import {createCourse, getAllCourses,getLecturesByCourseId, updateCourse,deleteCourse,addLectures,deleteLectures} from "../controllers/course.controller.js";
import { isLoggedIn ,authorizedRoles } from "../middlewares/auth.middleware.js";
import upload from "../middlewares/multer.middleware.js";
const router = Router();
router.get('/',getAllCourses);
 router.post('/getLectures', isLoggedIn, getLecturesByCourseId);

router.post('/create-course',upload.single('thumbnail'),isLoggedIn,authorizedRoles('ADMIN'),  createCourse);
router.get('/update-course',upload.single('thumbnail'),isLoggedIn,authorizedRoles('ADMIN'),updateCourse);
router.get('/delete-course',isLoggedIn,authorizedRoles('ADMIN'),deleteCourse);
router.post('/add-lectures',isLoggedIn,authorizedRoles('ADMIN'),addLectures);
router.post('/delete-lectures',isLoggedIn,authorizedRoles('ADMIN'),deleteLectures);
export default router;
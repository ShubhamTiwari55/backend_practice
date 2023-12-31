import {Router} from 'express';
import {
    getAllCourses,
    getLecturesByCourseId,
    createCourse,
    updateCourse,
    deleteCourse,
    addLectureToCourseById
} from '../controllers/course.controller.js'
import {isLoggedIn, authorizedRoles, authorizedSubscriber} from '../middleware/auth.middleware.js';
import upload from '../middleware/multer.middleware.js';

const router = Router();

router
    .route('/')
    .get(getAllCourses)
    .post(
        isLoggedIn,
        authorizedRoles('ADMIN'),
        upload.single('thumbnail'),
        createCourse);

router
.route('/:courseId')
.get(isLoggedIn,
    authorizedSubscriber, 
    getLecturesByCourseId)
.put(isLoggedIn,
    authorizedRoles('ADMIN'),
    updateCourse)
.delete(isLoggedIn,
    authorizedRoles('ADMIN'),
    deleteCourse)
.post(
    isLoggedIn,
    authorizedRoles('ADMIN'),
    upload.single('lectures'),
    addLectureToCourseById
);


export default router;
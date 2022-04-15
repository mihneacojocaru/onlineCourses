import express from 'express';
import { errorHandler } from '../middleware/errorMiddleware.js';

import { createCourse, deleteCourseById, getAllCourses, getCourseById, updateCourse } from '../controllers/coursesController.js';

import protect from '../middleware/authentification.js';


const router = express.Router();

router.route('/')
.get(getAllCourses,errorHandler)
.post(protect,createCourse,errorHandler);

router.route('/:id')
.get(getCourseById,errorHandler)
.put(protect,updateCourse,errorHandler)
.delete(protect,deleteCourseById,errorHandler);


export default router;
import express from 'express';

import { errorHandler } from '../middleware/errorMiddleware.js';

import { addCourseDetails, getCourseDetailsById, updateCourseDetails } from '../controllers/courseDetailsController.js';

import protect from '../middleware/authentification.js';

const router = express.Router();

router.route('/')
.post(addCourseDetails,errorHandler);

router.route('/:id')
.get(getCourseDetailsById,errorHandler)
.put(protect,updateCourseDetails,errorHandler);

export default router;
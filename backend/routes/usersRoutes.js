import express, { response } from 'express'
import {errorHandler} from "../middleware/errorMiddleware.js";

import { authentificateUser, getAllUsers, registerUser } from '../controllers/usersController.js';



const router = express.Router();


router.route('/')
.get(getAllUsers,errorHandler)
.post(registerUser,errorHandler);

router.route('/login')
.post(authentificateUser,errorHandler);

export default router;

import express from 'express';
import dotenv from 'dotenv';
import cors from "cors";
import db from "./config/db.js";


import usersRoutes from './routes/usersRoutes.js';
import coursesRoutes from './routes/coursesRoutes.js';
import courseDetailsRoutes from './routes/courseDetailsRoutes.js';
import { errorHandler } from './middleware/errorMiddleware.js';


dotenv.config();

const app = express();
const port = 3350;

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cors());

app.get('/api', (req, res) => {
    res.json({
        message: 'Welcome to the REST API project!',
    });
});

app.use('/api/v1/users', usersRoutes);
app.use('/api/v1/courses', coursesRoutes);
app.use('/api/v1/courseDetails', courseDetailsRoutes);

app.use(errorHandler);

app.listen({ port }, async () => {
    console.log(`Server up on http://localhost:${port}/`);
    await db.sequelize.sync();
    //await sequelize.sync({ force: true });
    console.log("Database Connected!");
});
  
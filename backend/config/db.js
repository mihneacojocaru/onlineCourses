import { Sequelize } from "sequelize";

import Users from '../models/users.js';
import Courses from '../models/courses.js';
import CourseDetails from '../models/coursedetails.js';

import dotenv from 'dotenv';

dotenv.config();

const connectDB = ()=>{
    try {
        
        let sequelize = new Sequelize
        (process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, 
            {
              host: process.env.DB_HOST,
              dialect: process.env.DB_DIALECT
            }
        );

        let db={
            models:{}
        }

        db.sequelize = sequelize;
        db.Sequelize = Sequelize;

        db.models.Users = Users(sequelize);
        db.models.Courses = Courses(sequelize);
        db.models.CourseDetails = CourseDetails(sequelize);

        db.models.Courses.hasOne(db.models.CourseDetails, {
            onDelete:'CASCADE',
            as:'fk_course_id',
            foreignKey:{
                name:'course_id',
                allowNull: false
            }
        });

        db.models.CourseDetails.belongsTo(db.models.Courses, {
            as:'fk_course_id',
            foreignKey:{
                name:'course_id',
                allowNull: false
            }
        });

        return db;


    } catch (e) {
        throw new Error(e);
    }
}

let db = connectDB();

export default db;
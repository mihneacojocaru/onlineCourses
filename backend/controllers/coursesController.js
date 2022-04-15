
import db from '../config/db.js';
import asyncHandler from 'express-async-handler';

const getAllCourses = asyncHandler(async (req,res)=>{
    const d = await db.models.Courses.findAll();
    const error = new Error('There are no current courses in the database');

    if(d.length == 0){
        throw error
    }

    return res.status(200).json(d);
});

const createCourse = asyncHandler(async (req,res)=>{
    const {course_name,department} = req.body;
    const {title,professor,description,estimated_time,materials_needed} = req.body;

    const postCourse = await db.models.Courses.create({course_name,department});
    const course_id = postCourse.id;
    const newDetails = await db.models.CourseDetails.create({title,professor,description,estimated_time,materials_needed,course_id});
    return res.status(201).json([postCourse,newDetails]);
});

const getCourseById = asyncHandler(async (req,res)=>{
    const {id} = req.params;
    console.log(id);
    const d = await db.models.Courses.findByPk(id);
    return res.status(200).json(d);
});

const updateCourse = asyncHandler(async(req,res)=>{
    let item = req.body;
    let {id} = req.params;
    let d = await db.models.Courses.findByPk(id);

    if(item.course_name != '') d.course_name = item.course_name;
    if(item.department != '') d.department = item.department;
    if(item.updatedAt != '') d.updatedAt = item.updatedAt;
    
    d.save();
    res.status(200).json(d);
});

const deleteCourseById = asyncHandler(async(req,res)=>{
    let {id} = req.params;
    let course = await db.models.Courses.findByPk(id);
    await course.destroy();
    return res.status(202).json(`Course ${course.course_name} was deleted succesfully.`);
});



export {getAllCourses, getCourseById, createCourse, updateCourse, deleteCourseById};
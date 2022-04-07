import asyncHandler from "express-async-handler";

import db from "../config/db.js";

const getCourseDetailsById = asyncHandler(async(req,res,next)=>{
    const {id} = req.params;
    const d = await db.models.CourseDetails.findOne({
        where: {
            course_id: id
        }
    });
    return res.status(200).json(d);
});


const addCourseDetails = asyncHandler(async(req,res,next)=>{
    const {title,professor,description,estimated_time,materials_needed,course_id} = req.body;
    const postDetails = await db.models.CourseDetails.create({title,professor,description,estimated_time,materials_needed,course_id});
    return res.status(201).json(postDetails);
});

const updateCourseDetails = asyncHandler(async(req,res,next)=>{
    let {id} = req.params;
    let item = req.body;
    let details = await db.models.CourseDetails.findAll({
        where:{
            course_id: id
        }
    });

    let detailsId = details[0].id
    
    let d = await db.models.CourseDetails.findByPk(detailsId);
    if(item.professor != '') d.professor = item.professor;
    if(item.title != '') d.title = item.title;
    if(item.description != '') d.description = item.description;
    if(item.estimated_time != '') d.estimated_time = item.estimated_time;
    if(item.materials_needed != '') d.materials_needed = item.materials_needed;

    d.save();
    res.status(200).send(d);

})


export {getCourseDetailsById, addCourseDetails, updateCourseDetails}
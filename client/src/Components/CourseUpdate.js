import React, { useEffect, useState, useContext } from "react";
import { useHistory, Link, useParams } from "react-router-dom";
import { Context } from "../Context";

import Data from '../ApiData/data';

const CourseUpdate = () => {

  const [user, setUser] = useContext(Context);

  const [course, setCourse] = useState([]);
  const [details, setDetails] = useState({});
  const history = useHistory();
  const { id } = useParams();

  const goBack = () => {
    history.push(`/course-details/${id}`);
  };
  const goHome = () => {
    history.push(`/`);
  };

  const getCourse = async () => {
    const data = new Data();
    const course = await data.getOneCourse(id);
    setCourse(course);
  }

  const getDetails = async () => {
    const courseApi = new Data();
    let d = await courseApi.getDetails(id);
    setDetails(d);
  };

  useEffect(() => {
    getCourse();
    getDetails();
  }, []);
  
  const changeHandle = (e) => {
    let obj = e.target;

    if(obj.classList.contains('course_title')){
      setDetails((prev=>({
          ...prev,
          title:obj.value        
      }))) 
    }else if(obj.classList.contains('professor')){
      setDetails((prev=>({
        ...prev,
        professor:obj.value        
    })))
    }else if(obj.classList.contains('course_description')){
      setDetails((prev=>({
        ...prev,
        description:obj.value        
    })))
    }else if(obj.classList.contains('estimated_time')){
      setDetails((prev=>({
        ...prev,
        estimated_time:obj.value        
    })))
    }else if(obj.classList.contains('materials_needed')){
      setDetails((prev=>({
        ...prev,
        materials_needed:obj.value        
    })))
    }else if(obj.classList.contains('course_name')){
      setCourse((prev=>({...prev,course_name:obj.value})));
    }else if(obj.classList.contains('deparment')){
      setCourse((prev)=>({...prev,department:obj.value}));
    }
  }

  const submitFunction = async ()=>{
    const data = new Data();
    await data.updateCourseDetails(id,details, user.token);
    await data.updateCourse(id,course,user.token);
    goBack();
  } 

  const delCourse = async () => {
    const data = new Data();
    await data.deleteCourse(id,user.token);
    goHome();
  }

  return (
    <>
      <div className="fcnBtn">
        <div onClick={submitFunction} className="navBtn">
          <h2>Save Modifications</h2>
        </div>
        <div onClick={delCourse} className="navBtn">
          <h2>Delete Course</h2>
        </div>
        <div onClick={goBack} className="navBtn returnBtn">
          <h2 onClick={goBack}>Cancel</h2>
        </div>
      </div>
      <form onChange={changeHandle} className="course-box course__update">
        <div className="info1">
          <h3>Course</h3>
          <hr />
          <div className="course__update-container1">
            <label>Course Name</label>
            <input className="course_name" type="text" defaultValue={course.course_name} />
            <label>Department</label>
            <input className="department" type="text" defaultValue={course.department} />
            <label>Course Title</label>
            <input
              className="course__update-title course_title"
              type="text"
              defaultValue={details.title}
            />
            <label>Professor</label>
            <input className="professor" type="text" defaultValue={details.professor} />
            <label>Description</label>
            <textarea
              className="course_description"
              defaultValue={details.description}
            ></textarea>
          </div>
        </div>
        <div className="info2">
          <h3>Course Durration</h3>
          <hr />
          <input
            className="course__update-info2Input estimated_time"
            type="text"
            defaultValue={details.estimated_time}
          />
          <h3>Prerequisites</h3>
          <hr />
          <textarea
            className="course__update-info2TextArea materials_needed"
            defaultValue={details.materials_needed}
          ></textarea>
        </div>
      </form>
    </>
  );
};

export default CourseUpdate;

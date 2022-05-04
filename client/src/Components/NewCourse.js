import React,{useState,useEffect, useContext} from "react";
import { useHistory, Link, useParams } from "react-router-dom";

import { Context } from "../Context";

import Data from "../ApiData/data";

const NewCourse = () => {

  const [user,setUser] = useContext(Context);

  const [courseName, setCourseName] = useState('');
  const [department, setDepartment] = useState('');
  const [title, setTitle] = useState('');
  const [professor, setProfessor] = useState('');
  const [description, setDescription] = useState('');
  const [estimatedTime, setEstimatedTime] = useState('');
  const [materialsNeeded, setMaterialsNeeded] = useState('');

  const history = useHistory();

  const { courseId } = useParams();

  const goBack = () => {
    history.push(`/`);
  };

  const onClick = async () => {
    let obj = {};
    
    obj.course_name = courseName;
    obj.department = department;
    obj.title = title;
    obj.professor = professor;
    obj.description = description;
    obj.estimated_time = estimatedTime;
    obj.materials_needed = materialsNeeded;

    let data = new Data();
    await data.newCourse(obj,user.token);
    goBack();
  }

  const changeHandler = (e) => {
      let obj = e.target;

      if(obj.classList.contains("course_name")){
        setCourseName(obj.value);
      }else if(obj.classList.contains("department")){
        setDepartment(obj.value);
      }else if(obj.classList.contains('course_title')){
        setTitle(obj.value);
      }else if(obj.classList.contains('professor')){
        setProfessor(obj.value);
      }else if(obj.classList.contains('course_description')){
        setDescription(obj.value);
      }else if(obj.classList.contains('estimated_time')){
        setEstimatedTime(obj.value);
      }else if(obj.classList.contains('materials_needed')){
        setMaterialsNeeded(obj.value);
      } 
  }

  return (
    <>
      <div className="fcnBtn">
        <div onClick={onClick} className="navBtn">
          <h2>Add Course</h2>
        </div>
        <div onClick={goBack} className="navBtn returnBtn">
          <h2 onClick={goBack}>Cancel</h2>
        </div>
      </div>
      <form onChange={changeHandler} className="course-box course__update">
        <div className="info1">
          <h3>Course</h3>
          <hr />
          <div className="course__update-container1">
          <label>Course Name</label>
            <input
              className="course__update-title course_name"
              type="text"
              placeholder="Short Title"
            />
            <label>Department</label>
            <input
              className="course__update-title department"
              type="text"
              placeholder="Department"
            />
            <label>Course Title</label>
            <input
              className="course__update-title course_title"
              type="text"
              placeholder="Course Title"
            />
            <label>Professor</label>
            <input type="text" placeholder="by John Smith" className="professor"/>
            <label>Course Description</label>
            <textarea className="course_description" placeholder="A summery description of the course"></textarea>
          </div>
        </div>
        <div className="info2">
          <h3>Course Durration</h3>
          <hr />
          <input className="course__update-info2Input estimated_time" type="text" placeholder="the total course durration in semesters"/>
          <h3>Prerequisites</h3>
          <hr />
          <textarea className="course__update-info2TextArea materials_needed" placeholder="prerequisites have to be marked with *-"></textarea>
        </div>
      </form>
    </>
  );
};

export default NewCourse;

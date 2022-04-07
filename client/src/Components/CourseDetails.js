import React, { useState, useEffect, useContext } from "react";

import { useHistory, Link, useParams } from "react-router-dom";
import Data from "../ApiData/data";
import { Context } from "../Context";

const CourseDetails = () => {
  const [user, setUser] = useContext(Context);

  const history = useHistory();
  let { id } = useParams();

  const returnHome = () => {
    history.push("/");
  };

  const [course, setCourse] = useState([]);
  const [details, setDetails] = useState([]);
  const [materialsList, setMaterialsList] = useState([]);

  const getCourse = async () => {
    const data = new Data();
    const course = await data.getOneCourse(id);
    setCourse(course);
  };

  const getDetails = async () => {
    const courseApi = new Data();
    let d = await courseApi.getDetails(id);
    setDetails(d);
  };

  const separatePrereq = () => {
    if (details.materials_needed) {
      let string = details.materials_needed;
      string = string.split("* ");
      string.shift();
      setMaterialsList(string);
    }
  };

  useEffect(() => {
    separatePrereq();
  }, [details]);

  useEffect(() => {
    getCourse();
    getDetails();
  }, []);

  return (
    <>
      <div className="fcnBtn">
        {user && (
          <>
            <Link to={`/course-update/${id}`} className="navBtn">
              <h2 id="enroll">Update Course</h2>
            </Link>
          </>
        )}
        <div onClick={returnHome} className="navBtn returnBtn">
          <h2 onClick={returnHome}>Return to Courses</h2>
        </div>
      </div>
      <div className="erollOption"></div>
      <div id="courseBox" className="course-box">
        <div className="info1">
          <h3>Course</h3>
          <hr />
          <h2>
            <strong>{details.title}</strong>
          </h2>
          <h5>by {details.professor}</h5>
          <br />
          <p>{details.description}</p>
          <br />
        </div>
        <div className="info2">
          <h3>Course Durration</h3>
          <hr />
          <br />
          <ul>
            <li>{details.estimated_time}</li>
          </ul>
          <br />
          <h3>Prerequisites</h3>
          <hr />
          <br />
          <ul>
            {materialsList ? (
              materialsList.map((el, index) => <li key={index}>{el}</li>)
            ) : (
              <li>No Prerequisites for this course</li>
            )}
          </ul>
        </div>
      </div>
    </>
  );
};

export default CourseDetails;

import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../Context";

import Header from "./Header";
import Card from "./Card";
import Data from "../ApiData/data";


const Home = () => {

  const [user, setUser] = useContext(Context);
  const [courses, setCourses] = useState([]);

  const getCourses = async () => {
    const courseApi = new Data();
    let d = await courseApi.getCourses();
    setCourses(d);
  };

  useEffect(() => {
    getCourses();
  }, []);

  return (
    <>
      <div className="container">
        <div className="container-courses">
          <div className="cards-container">
            {
              courses 
              ?courses.map( (c,index) => (<Card key={index} c={c}/>))
              : <p>Loading courses</p>
            }
            {
              user && <>
              <Link to="/newCourse" className="newCourse">
              <h2>+ New Course</h2>
              </Link>
              </>
            }
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;

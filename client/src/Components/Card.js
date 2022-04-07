import React from "react";
import { Link } from "react-router-dom";

const Card = ({c}) => {

  return (
    <Link to={`/course-details/${c.id}`} className="card">
        <span id={c.course_id}>{c.department}</span>
        <h2 id={c.course_id}>{c.course_name}</h2>
    </Link>
  );
};

export default Card;

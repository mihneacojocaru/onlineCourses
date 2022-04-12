import React, { useContext, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { Context } from "../Context";
import Cookies from "js-cookie";
import SignOut from "./SignOut";

const Header = () => {
  const history = useHistory();

  const [username, setUsername] = useContext(Context);

  const onClick = () => {
    history.push("/");
  };

  // useEffect(() => {
  //   if (username) {
  //     Cookies.set("authentificatedUser", JSON.stringify(username));
  //   }
  // }, []);

  return (
    <nav>
      <h1 onClick={onClick} className="homeLink">
        Enrolment&trade;
      </h1>
      <div className="elements">
        {username ? (
          <SignOut/>
        ) : (
          <>
            <Link to="/signUp">Sign Up</Link>
            <Link to="/signIn">Sign In</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Header;

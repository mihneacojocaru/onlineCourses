import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Data from "../ApiData/data";
import Cookies from "js-cookie";

import { Context } from "../Context";

const SignIn = () => {
  const [user, setUser] = useContext(Context);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const [error, setError] = useState("Username or Password are incorrect");

  const history = useHistory();

  const returnHome = () => {
    history.push("/");
  };

  const authentificate = async () => {
    const d = new Data();
    try {
      const auth = await d.authentificate({ email, password });
      if (auth != "Email or Password is invalid") {
        setEmail(auth.email);
        setUser(auth);
        Cookies.set("authentificatedUser", JSON.stringify(auth));
        returnHome();
      } 
    } catch (e) {
      console.log(e);
    }
  };

  

  const changeHandler = (e) => {
    let obj = e.target;
    if (obj.classList.contains("username")) {
      setEmail(obj.value);
    } else if (obj.classList.contains("password")) {
      setPassword(obj.value);
    }
  };

  return (
    <div className="signIn">
      <div className="addSectionStyle">
        <h2>Sign In</h2>
        <form onChange={changeHandler}>
          <label htmlFor="">Username</label>
          <input type="text" className="username" />
          <label htmlFor="">Password</label>
          <input type="password" className="password" />
        </form>
        <div className="buttons">
          <button onClick={authentificate}>Sign In</button>
          <button onClick={returnHome}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default SignIn;

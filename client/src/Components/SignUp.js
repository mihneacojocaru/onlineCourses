import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Data from "../ApiData/data";
const SignUp = () => {
  const history = useHistory();
  const returnHome = () => {
    history.push("/");
  };

  const [userData, setUserData] = useState({});

  const regExNameVerifyer = (obj) => {
    const nameRegEx = /^[a-zA-Z]+ [a-zA-Z]+$/;
    return nameRegEx.test(String(obj).trim());
  };
  const regExEmailVerifyer = (email) => {
    const emailRegEx = /\S+@\S+\.\S+/;
    return emailRegEx.test(String(email).toLowerCase());
  };

  const onChange = (e) => {
    let obj = e.target;

    if (obj.classList.contains("userName")) {
      if (regExNameVerifyer(obj.value)) {
        setUserData((prev) => ({
          ...prev,
          username: obj.value,
        }));
      }
    } else if (obj.classList.contains("email")) {
      if (regExEmailVerifyer) {
        setUserData((prev) => ({
          ...prev,
          email: obj.value,
        }));
      }
    } else if (obj.classList.contains("password")) {
      setUserData((prev) => ({
        ...prev,
        password: obj.value,
        confirmedPassword: obj.value,
      }));
    }
  };

  const onSignUp = async () => {
    const d = new Data();

    try {
      if (userData.username && userData.email && userData.password) {
        const signUp = await d.signUp(userData);
        if (signUp) returnHome();
      } else {
        alert("Please verify your info and try again.");
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="signIn">
      <div className="addSectionStyle">
        <h2>Sign Up</h2>
        <form onChange={onChange}>
          <label htmlFor="">Full Name</label>
          <input type="text" className="userName" />
          <label htmlFor="">Email</label>
          <input type="text" className="email" />
          <label htmlFor="">Password</label>
          <input type="password" className="password" />
        </form>
        <div className="buttons">
          <button id="cancel2" onClick={onSignUp}>
            Sign Up
          </button>
          <button onClick={returnHome}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default SignUp;

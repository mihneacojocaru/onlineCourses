import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
const SignUp = () => {


  const history = useHistory();
  const returnHome = () => {
    history.push('/');
  }

  const [userData, setUserData] = useState({})

  const onChange = (e) => {
    let obj = e.target;

    if(obj.classList.contains('userName')){
      setUserData((prev=>({
        ...prev,
        username:obj.value
      })))
    }else if(obj.classList.contains('email')){
      setUserData((prev=>({
        ...prev,
        email:obj.value
      })))
    }else if(obj.classList.contains('password')){
      setUserData((prev=>({
        ...prev,
        password:obj.value
      })))
    }
  }

  const onSignUp = () => {
    
  }
  

  return (
    <div className="signIn">
      <div className="addSectionStyle">
        <h2>Sign Up</h2>
        <form onChange={onChange} >
          <label htmlFor="">Username</label>
          <input type="text" className="userName" />
          <label htmlFor="">Email</label>
          <input type="text" className="email" />
          <label htmlFor="">Password</label>
          <input type="password" className="password"/>
        </form>
        <div className="buttons">
          <button id="cancel2" onClick={onSignUp}>Sign Up</button>
          <button onClick={returnHome}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default SignUp;

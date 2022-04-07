import React, {useContext} from "react";
import { Context } from "../Context";
import Cookies from "js-cookie";


const SignOut = () => {

  const [user, setUser] = useContext(Context);

  
  const SignOut = (e) => {
    e.preventDefault();
    if (user) {
        Cookies.set("authentificatedUser", JSON.stringify(null));
        setUser(null);    
    }
  };

  return (
      <>
      <span>Hi, {user.username}!</span>
      <a onClick={SignOut}>SignOut</a>
      </>
  );
};

export default SignOut;

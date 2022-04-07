import React, { createContext, useState } from "react";
import Cookies from "js-cookie";

import { useEffect } from "react";

export const Context = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {

    if (Cookies.get("authentificatedUser")) {

      setUser(JSON.parse(Cookies.get("authentificatedUser")));
      
    }
  }, []);

  return (
    <Context.Provider value={[user, setUser]}>{children}</Context.Provider>
  );
};

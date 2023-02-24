import React, { createContext, useState } from "react";

export const GeneralContext = createContext();

const GeneralContextProvider = (props) => {
  const [userData, setUserData] = useState([]);
  const [user, setUser] = useState();
  const [userFirstName, setUserFirstName] = useState();
  const [userLastName, setUserLastName] = useState();
  const [contextPassword, setContextPassword] = useState();
  const [userId, setUserId] = useState();
  const [completedTimeSession, setCompletedTimeSession] = useState(true);
  const [role, setRole] = useState();
  return (
    <GeneralContext.Provider
      value={{
        user,
        setUser,
        userData,
        setUserData,
        userLastName,
        userFirstName,
        setUserFirstName,
        setUserLastName,
        contextPassword,
        setContextPassword,
        userId,
        setUserId,
        completedTimeSession,
        setCompletedTimeSession,
        role,
        setRole,
      }}
    >
      {props.children}
    </GeneralContext.Provider>
  );
};

export default GeneralContextProvider;

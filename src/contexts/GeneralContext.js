import React, { createContext, useState } from "react";

export const GeneralContext = createContext();

const GeneralContextProvider = (props) => {
  const [state, setState] = useState();
  const [user, setUser] = useState();
  return (
    <GeneralContext.Provider value={{ user, setUser }}>
      {props.children}
    </GeneralContext.Provider>
  );
};

export default GeneralContextProvider;

import React, { createContext, useState } from "react";

export const GeneralContext = createContext();

const GeneralContextProvider = (props) => {
  const [state, setState] = useState();
  return (
    <GeneralContext.Provider value={{ state, setState }}>
      {props.children}
    </GeneralContext.Provider>
  );
};

export default GeneralContextProvider;

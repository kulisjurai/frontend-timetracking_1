import React, { useContext, useEffect } from "react";
import { GeneralContext } from "../../contexts/GeneralContext";

function Support() {
  const { state } = useContext(GeneralContext);
  useEffect(() => {}, [state]);
  return (
    <div className="reports">
      {Array.isArray(state) && (
        <ul>
          {state.map((item, index) => {
            return (
              <li key={index}>
                {item.id}_{item.title}
              </li>
            );
          })}
        </ul>
      )}
      {state && !Array.isArray(state) && (
        <ul>
          {state.id}_{state.title}
        </ul>
      )}

      <h1>this is support</h1>
    </div>
  );
}

export default Support;

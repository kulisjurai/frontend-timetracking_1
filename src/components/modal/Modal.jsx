import React, { useEffect } from "react";

export default function Modal({ name }) {
  useEffect(() => {
    console.log(name);
    return () => {};
  }, [name]);

  return (
    <div>
      Modal
      <div>
        <hr />
        {name.state && <p>{name.state.title}</p>}
      </div>
    </div>
  );
}

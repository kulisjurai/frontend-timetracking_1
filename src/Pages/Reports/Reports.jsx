import React, { useContext } from "react";
import Modal from "../../components/modal/Modal";
import { GeneralContext } from "../../contexts/GeneralContext";

function Reports() {
  const { state } = useContext(GeneralContext);
  return (
    <div className="reports">
      <h1>this is report</h1>
      <Modal name={{ state }}></Modal>
    </div>
  );
}

export default Reports;

import React from "react";

const BackendErrorMessages = ({ backendError }) => {
  return <div style={{ color: "red" }}>{backendError.message}</div>;
};

export default BackendErrorMessages;

import React from "react";
import { db } from "../data/database";

export const ReportPage: React.FC = () => {

  const submit = () => {
    db.saveReport({
      userId: "guest",
      description: "Sample"
    });
  };

  return (
    <button onClick={submit}>
      Submit Report
    </button>
  );
};

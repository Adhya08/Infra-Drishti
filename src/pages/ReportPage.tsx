import React, { useState } from "react";

export const ReportPage: React.FC = () => {
  const [category, setCategory] = useState("Flyover / Overpass");
  const [location, setLocation] = useState("Mumbai Metropolitan");
  const [description, setDescription] = useState("");

  return (
    <div>
      <h1>Report Structural Anomaly</h1>

      <input value={category} onChange={e => setCategory(e.target.value)} />
      <input value={location} onChange={e => setLocation(e.target.value)} />
      <textarea value={description} onChange={e => setDescription(e.target.value)} />
    </div>
  );
};

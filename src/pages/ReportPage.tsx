import React, { useState } from "react";

export const ReportPage: React.FC = () => {
  const [category, setCategory] = useState("Flyover / Overpass");
  const [location, setLocation] = useState("Mumbai Metropolitan");
  const [description, setDescription] = useState("");
  const [severity, setSeverity] = useState<"Low" | "Medium" | "High">("Medium");

  return (
    <div>
      <h1>Report Structural Anomaly</h1>

      <select value={severity} onChange={e => setSeverity(e.target.value as any)}>
        <option>Low</option>
        <option>Medium</option>
        <option>High</option>
      </select>
    </div>
  );
};

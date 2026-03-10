import React, { useState } from "react";

export const ReportPage: React.FC = () => {
  const [location, setLocation] = useState("");

  const handleDetectLocation = () => {
    navigator.geolocation.getCurrentPosition((pos) => {
      const lat = pos.coords.latitude.toFixed(4);
      const lng = pos.coords.longitude.toFixed(4);
      setLocation(`${lat}, ${lng}`);
    });
  };

  return (
    <div>
      <button onClick={handleDetectLocation}>Detect Location</button>
      <p>{location}</p>
    </div>
  );
};

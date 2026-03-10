import React, { useState, useRef } from "react";

export const ReportPage: React.FC = () => {
  const [hasPhoto, setHasPhoto] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handlePhotoClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = () => {
    setHasPhoto(true);
  };

  return (
    <div>
      <h1>Upload Evidence</h1>

      <input type="file" ref={fileInputRef} hidden onChange={handleFileChange}/>
      <button onClick={handlePhotoClick}>
        {hasPhoto ? "Evidence Secured" : "Upload Photo"}
      </button>
    </div>
  );
};

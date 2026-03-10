import React, { useState } from "react";
import { GoogleGenAI } from "@google/genai";

export const ReportPage: React.FC = () => {
  const [assessment, setAssessment] = useState("");

  const generateAI = async () => {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

    const res = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: "Analyze infrastructure issue."
    });

    setAssessment(res.text || "");
  };

  return (
    <div>
      <button onClick={generateAI}>Run AI</button>
      <p>{assessment}</p>
    </div>
  );
};

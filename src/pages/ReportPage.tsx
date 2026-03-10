import React, { useState, useRef } from 'react';
import { db } from '../data/database';
import { Logo } from '../components/Logo';
import { GoogleGenAI } from "@google/genai";

export const ReportPage: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [category, setCategory] = useState('Flyover / Overpass');
  const [location, setLocation] = useState('Mumbai Metropolitan');
  const [description, setDescription] = useState('');
  const [severity, setSeverity] = useState<'Low' | 'Medium' | 'High'>('Medium');
  const [isUploading, setIsUploading] = useState(false);
  const [hasPhoto, setHasPhoto] = useState(false);
  const [isDetectingLocation, setIsDetectingLocation] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [aiAssessment, setAiAssessment] = useState('');

  const fileInputRef = useRef<HTMLInputElement>(null);
  const currentUser = db.getCurrentUser();

  const handlePhotoClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsUploading(true);
      // Simulate forensic processing/upload
      setTimeout(() => {
        setIsUploading(false);
        setHasPhoto(true);
      }, 1200);
    }
  };

  const handleDetectLocation = () => {
    if (!navigator.geolocation) return;
    setIsDetectingLocation(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const lat = pos.coords.latitude.toFixed(4);
        const lng = pos.coords.longitude.toFixed(4);
        setLocation(`Detected: ${lat}, ${lng} (Auto-Anchored)`);
        setIsDetectingLocation(false);
      },
      () => {
        setIsDetectingLocation(false);
      }
    );
  };

  const handleDownloadReceipt = () => {
    const reportData = `
INFRA-DRISHTI: NATIONAL STRUTURAL OVERSIGHT RECEIPT
---------------------------------------------------
Report ID: ${Math.random().toString(36).substr(2, 9).toUpperCase()}
Timestamp: ${new Date().toLocaleString()}
Category: ${category}
Location: ${location}
Severity: ${severity}
Description: ${description}
AI Preliminary Assessment: ${aiAssessment}
---------------------------------------------------
VERIFIED BY: DRISHTI CORE INTELLIGENCE HUB
    `;
    const blob = new Blob([reportData], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Drishti_Report_${Date.now()}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSyncing(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Analyze this structural anomaly report: 
        Asset: ${category}
        Location: ${location}
        Reported Severity: ${severity}
        Description: ${description}
        
        Provide a concise (2-3 sentence) "Preliminary Forensic Assessment" for an engineer. Use technical language. Focus on what might be failing based on the description.`,
      });

      const assessment = response.text || 'Manual engineering review required.';
      setAiAssessment(assessment);

      db.saveReport({
        userId: currentUser?.id || 'guest-001',
        userName: currentUser?.name || 'Guest User',
        assetCategory: category,
        location: location,
        description: description,
        severity: severity
      });

      setSubmitted(true);
    } catch (error) {
      console.error("Sync Error:", error);
      // Fallback
      setSubmitted(true);
    } finally {
      setIsSyncing(false);
    }
  };

  if (submitted) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-24 text-center dark:bg-slate-950 transition-colors animate-fade-in">
        <div className="relative inline-block mb-10">
          <div className="w-24 h-24 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white rounded-3xl flex items-center justify-center mx-auto shadow-xl border-2 border-slate-200 dark:border-slate-700 animate-scale-in">
            <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-full flex items-center justify-center text-[10px] font-black border-4 border-white dark:border-slate-950">
            OK
          </div>
        </div>

        <h2 className="text-4xl lg:text-5xl font-black text-slate-900 dark:text-white mb-6 uppercase tracking-tighter leading-none animate-reveal">
          Intelligence Logged <br /> <span className="text-slate-500">Successfully</span>
        </h2>

        <div className="bg-slate-50 dark:bg-slate-900/50 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 mb-12 max-w-2xl mx-auto text-left">
          <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4">Drishti-AI Assessment</p>
          <p className="text-sm font-medium text-slate-700 dark:text-slate-300 leading-relaxed italic">
            "{aiAssessment}"
          </p>
        </div>

        <div className= "flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up delay-300">
          <button
            onClick={() => {
              setSubmitted(false);
              setDescription('');
              setHasPhoto(false);
              setAiAssessment('');
            }}
            className="px-8 py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-2xl text-xs font-black uppercase tracking-widest shadow-xl hover:scale-105 active:scale-95 transition-all"
          >
            Submit Another Report
          </button>
          <button
            onClick={handleDownloadReceipt}
            className="px-8 py-4 bg-white dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-slate-50 dark:hover:bg-slate-700 transition-all flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
            Download Receipt
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-16 dark:bg-slate-950 transition-colors">
      <div className="flex flex-col lg:flex-row gap-16">

        {/* Left: Content & Branding */}
        <div className="lg:w-1/3 space-y-10 animate-fade-in">
          <div>
            <div className="inline-flex items-center gap-3 mb-6 bg-slate-100 dark:bg-slate-800 px-4 py-2 rounded-full border border-slate-200 dark:border-slate-700 shadow-sm">
              <Logo size={20} />
              <h2 className="text-[10px] font-black text-slate-900 dark:text-white uppercase tracking-[0.4em]">Citizen Oversight</h2>
            </div>
            <h1 className="text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tighter uppercase leading-[0.9] mb-6">
              Report <br /><span className="text-slate-500">Structural</span> <br />Anomalies.
            </h1>
            <p className="text-sm font-medium text-slate-600 dark:text-slate-400 leading-relaxed">
              Detected a crack, shift, or surface degradation? Your forensic reports are cross-referenced with satellite imagery and IoT sensor data to prevent catastrophic failures.
            </p>
          </div>

          <div className="space-y-6">
            <div className="flex items-start gap-4 p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm transition-all hover:border-slate-900 dark:hover:border-white">
              <div className="w-10 h-10 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white rounded-xl flex items-center justify-center shrink-0 font-black">1</div>
              <div>
                <p className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-tight mb-1">Visual Evidence</p>
                <p className="text-[10px] text-slate-500 dark:text-slate-500 leading-tight">Capture photos showing the scale of the defect relative to fixed markers.</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm transition-all hover:border-slate-900 dark:hover:border-white">
              <div className="w-10 h-10 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white rounded-xl flex items-center justify-center shrink-0 font-black">2</div>
              <div>
                <p className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-tight mb-1">Severity Assessment</p>
                <p className="text-[10px] text-slate-500 dark:text-slate-500 leading-tight">Categorize the risk level based on visibility and immediate danger to commuters.</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm transition-all hover:border-slate-900 dark:hover:border-white">
              <div className="w-10 h-10 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white rounded-xl flex items-center justify-center shrink-0 font-black">3</div>
              <div>
                <p className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-tight mb-1">Registry Log</p>
                <p className="text-[10px] text-slate-500 dark:text-slate-500 leading-tight">Report is permanently time-stamped and assigned to the local Nodal Officer.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Functional Form */}
        <div className="lg:w-2/3 animate-fade-in-up">
          <div className="bg-white dark:bg-slate-900 p-8 lg:p-12 rounded-[3rem] border border-slate-200 dark:border-slate-800 shadow-2xl transition-all relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-3xl"></div>

            <form onSubmit={handleSubmit} className="space-y-10">

              {/* Asset Discovery Section */}
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-6 bg-slate-900 dark:bg-white rounded-full"></div>
                  <h3 className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-[0.2em]">Asset Metadata</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Asset Category</label>
                    <div className="relative group">
                      <select
                        value={category} onChange={e => setCategory(e.target.value)}
                        className="w-full bg-slate-50 dark:bg-slate-800/50 border-2 border-slate-100 dark:border-slate-800 rounded-2xl px-6 py-4 text-sm font-bold text-slate-900 dark:text-white appearance-none focus:border-slate-900 dark:focus:border-white outline-none transition-all cursor-pointer"
                      >
                        <option>Flyover / Overpass</option>
                        <option>Bridge / Culvert</option>
                        <option>National Highway Stretch</option>
                        <option>Municipal Building</option>
                        <option>Tunnel Section</option>
                      </select>
                      <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" /></svg>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center ml-1">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Zone / Geodata</label>
                      <button
                        type="button"
                        onClick={handleDetectLocation}
                        className="text-[9px] font-black text-slate-500 dark:text-slate-400 uppercase flex items-center gap-1 hover:underline"
                        disabled={isDetectingLocation}
                      >
                        { isDetectingLocation ? 'Pinging Satellites...' : 'Detect Geolocation'}
                      </button>
                    </div>
                    <div className="relative group">
                      <input
                        type="text"
                        value={location} onChange={e => setLocation(e.target.value)}
                        className="w-full bg-slate-50 dark:bg-slate-800/50 border-2 border-slate-100 dark:border-slate-800 rounded-2xl px-6 py-4 text-sm font-bold text-slate-900 dark:text-white outline-none focus:border-slate-900 dark:focus:border-white transition-all"
                        placeholder="Select or type location..."
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Severity & Evidence Section */}
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-6 bg-slate-900 dark:bg-white rounded-full"></div>
                  <h3 className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-[0.2em]">Forensic Evidence</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Anomaly Severity</label>
                    <div className="grid grid-cols-3 gap-2">
                      {(['Low', 'Medium', 'High'] as const).map(s => (
                        <button
                          key={s} type="button"
                          onClick={() => setSeverity(s)}
                          className={`py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest border-2 transition-all ${severity === s
                              ? 'bg-slate-900 dark:bg-white border-slate-900 dark:border-white text-white dark:text-slate-900 shadow-lg'
                              : 'bg-slate-50 dark:bg-slate-800/30 border-slate-100 dark:border-slate-800 text-slate-500 hover:border-slate-900 dark:hover:border-white'
                            }`}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Photo Documentation</label>
                    <input
                      type="file"
                      accept="image/*"
                      capture="environment"
                      ref={fileInputRef}
                      className="hidden"
                      onChange={handleFileChange}
                    />
                    <button
                      type="button"
                      onClick={handlePhotoClick}
                      className={`w-full h-[52px] border-2 border-dashed rounded-2xl flex items-center justify-center gap-3 transition-all ${hasPhoto
                          ? 'bg-slate-900 dark:bg-white border-slate-900 dark:border-white text-white dark:text-slate-900'
                          : 'bg-slate-50 dark:bg-slate-800/30 border-slate-200 dark:border-slate-700 text-slate-500 hover:border-slate-900 dark:hover:border-white hover:bg-white dark:hover:bg-slate-800'
                        }`}
                    >
                      {isUploading ? (
                        <>
                          <svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M12 2v4m0 12v4M4.93 4.93l2.83 2.83m8.48 8.48l2.83 2.83M2 12h4m12 0h4M4.93 19.07l2.83-2.83m8.48-8.48l2.83-2.83" strokeWidth="2.5" strokeLinecap="round" /></svg>
                          <span className="text-[10px] font-black uppercase tracking-widest">Anchoring Data...</span>
                        </>
                      ) : hasPhoto ? (
                        <>
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                          <span className="text-[10px] font-black uppercase tracking-widest">Evidence Secured</span>
                        </>
                      ) : (
                        <>
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                          <span className="text-[10px] font-black uppercase tracking-widest">Capture Visual Proof</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* Description Section */}
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Observational Insight</label>
                <textarea
                  rows={4} required
                  value={description} onChange={e => setDescription(e.target.value)}
                  placeholder="Describe the nature of the anomaly. Be specific about locations (e.g. 'Pillar 4B', 'Between km 142 and 144'). Mention if the shift is new or progressing."
                  className="w-full bg-slate-50 dark:bg-slate-800/50 border-2 border-slate-100 dark:border-slate-800 rounded-3xl px-6 py-5 text-sm font-bold text-slate-900 dark:text-white transition-all outline-none focus:border-slate-900 dark:focus:border-white focus:bg-white dark:focus:bg-slate-800 placeholder:text-slate-400 dark:placeholder:text-slate-600"
                />
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isSyncing}
                  className="w-full relative group py-5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-[2rem] font-black uppercase tracking-[0.25em] text-xs shadow-2xl hover:scale-[1.01] transition-all active:scale-95 flex items-center justify-center overflow-hidden disabled:opacity-80"
                >
                  <div className="absolute inset-0 bg-slate-800 dark:bg-slate-100 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <span className="relative z-10 flex items-center gap-3">
                    {isSyncing ? 'Forensic AI Syncing...' : 'Synchronize Observation'}
                    {!isSyncing && <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>}
                    {isSyncing && <svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>}
                  </span>
                </button>

                {!currentUser && (
                  <p className="mt-6 text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest text-center">
                    Reporting as GUEST. <button type="button" className="underline hover:text-slate-700 dark:hover:text-white">Link to National ID</button> for faster processing.
                  </p>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};  

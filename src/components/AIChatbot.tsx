
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { GoogleGenAI, GenerateContentResponse, Modality, LiveServerMessage } from "@google/genai";
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { ChatMessage, Asset } from '../types';
import { Logo } from './Logo';
import {
  Trash2,
  Mic,
  X,
  Copy,
  Camera,
  SendHorizonal,
  Bot,
  MessageSquare,
  Sparkles,
  RefreshCw,
  MoreVertical,
  Check
} from 'lucide-react';

// Helper functions for base64 encoding/decoding as per Gemini API guidelines
function encode(bytes: Uint8Array) {
  let binary = '';
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

function decode(base64: string) {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

async function decodeAudioData(
  data: Uint8Array,
  ctx: AudioContext,
  sampleRate: number,
  numChannels: number,
): Promise<AudioBuffer> {
  const dataInt16 = new Int16Array(data.buffer);
  const frameCount = dataInt16.length / numChannels;
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);

  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) {
      channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
    }
  }
  return buffer;
}

interface AIChatbotProps {
  isSidebarOpen?: boolean;
  selectedAsset?: Asset | null;
}

export const AIChatbot: React.FC<AIChatbotProps> = ({ isSidebarOpen = false, selectedAsset = null }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLiveMode, setIsLiveMode] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'model',
      text: "Hello! I'm **Drishti-Bot**, your elite forensic structural intelligence unit.\n\nI've been upgraded with **Multimodal Vision** and **Real-time Grounding**. You can now:\n- **Upload images** of structural concerns for forensic analysis.\n- Ask for **real-time data** on weather, seismic activity, or traffic loads.\n- Perform **simulated stress tests** on specific assets.\n\nHow can I assist with your structural audit today?",
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isThinking, setIsThinking] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [imageMimeType, setImageMimeType] = useState<string | null>(null);

  const scrollRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const liveSessionRef = useRef<any>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const nextStartTimeRef = useRef<number>(0);
  const audioSourcesRef = useRef<Set<AudioBufferSourceNode>>(new Set());
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);

  const suggestions = [
    { label: "Stress Test", query: "Perform a simulated stress test on this asset's current loading." },
    { label: "Predict Failure", query: "Calculate the probability of failure within the next 2 monsoon cycles." },
    { label: "NDT Check", query: "What Non-Destructive Testing is recommended for this asset's specific materials?" },
    { label: "BIS Review", query: "Are there any recent BIS standard revisions affecting this asset's safety zone?" }
  ];

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isOpen]);

  // Audio Visualizer Logic
  const drawVisualizer = useCallback(() => {
    if (!canvasRef.current || !isOpen) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    ctx.clearRect(0, 0, width, height);

    // Waveform simulation
    ctx.beginPath();
    ctx.lineWidth = 2;
    ctx.strokeStyle = isLiveMode ? '#ffffff' : '#475569';

    const sliceWidth = width / 100;
    let x = 0;

    for (let i = 0; i < 100; i++) {
      const v = Math.random() * (isLiveMode ? 0.8 : 0.2);
      const y = (v * height / 2) + height / 2;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
      x += sliceWidth;
    }
    ctx.stroke();

    animationRef.current = requestAnimationFrame(drawVisualizer);
  }, [isLiveMode, isOpen]);

  useEffect(() => {
    if (isOpen) {
      drawVisualizer();
    } else {
      cancelAnimationFrame(animationRef.current);
    }
    return () => cancelAnimationFrame(animationRef.current);
  }, [isOpen, drawVisualizer]);

  const stopLiveMode = () => {
    if (liveSessionRef.current) {
      liveSessionRef.current.close();
      liveSessionRef.current = null;
    }
    for (const source of audioSourcesRef.current) {
      source.stop();
    }
    audioSourcesRef.current.clear();
    setIsLiveMode(false);
  };

  const startLiveMode = async () => {
    if (isLiveMode) {
      stopLiveMode();
      return;
    }

    setIsLiveMode(true);
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
    }

    const outputCtx = audioContextRef.current;
    const outputNode = outputCtx.createGain();
    outputNode.connect(outputCtx.destination);

    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const inputCtx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });

    const sessionPromise = ai.live.connect({
      model: 'gemini-2.5-flash-native-audio-preview-09-2025',
      callbacks: {
        onopen: () => {
          const source = inputCtx.createMediaStreamSource(stream);
          const scriptProcessor = inputCtx.createScriptProcessor(4096, 1, 1);
          scriptProcessor.onaudioprocess = (e) => {
            const inputData = e.inputBuffer.getChannelData(0);
            const int16 = new Int16Array(inputData.length);
            for (let i = 0; i < inputData.length; i++) {
              int16[i] = inputData[i] * 32768;
            }
            const pcmBlob = {
              data: encode(new Uint8Array(int16.buffer)),
              mimeType: 'audio/pcm;rate=16000',
            };
            sessionPromise.then(session => session.sendRealtimeInput({ media: pcmBlob }));
          };
          source.connect(scriptProcessor);
          scriptProcessor.connect(inputCtx.destination);
        },
        onmessage: async (message: LiveServerMessage) => {
          const audioBase64 = message.serverContent?.modelTurn?.parts?.[0]?.inlineData?.data;
          if (audioBase64) {
            nextStartTimeRef.current = Math.max(nextStartTimeRef.current, outputCtx.currentTime);
            const audioBuffer = await decodeAudioData(decode(audioBase64), outputCtx, 24000, 1);
            const source = outputCtx.createBufferSource();
            source.buffer = audioBuffer;
            source.connect(outputNode);
            source.start(nextStartTimeRef.current);
            nextStartTimeRef.current += audioBuffer.duration;
            audioSourcesRef.current.add(source);
            source.onended = () => audioSourcesRef.current.delete(source);
          }

          if (message.serverContent?.interrupted) {
            for (const s of audioSourcesRef.current) s.stop();
            audioSourcesRef.current.clear();
            nextStartTimeRef.current = 0;
          }

          if (message.serverContent?.outputTranscription) {
            const text = message.serverContent.outputTranscription.text;
            setMessages(prev => {
              const last = prev[prev.length - 1];
              if (last && last.role === 'model' && last.timestamp.getTime() > Date.now() - 5000) {
                const updated = [...prev];
                updated[updated.length - 1] = { ...last, text: last.text + text };
                return updated;
              }
              return [...prev, { role: 'model', text: text, timestamp: new Date() }];
            });
          }
        },
        onclose: () => stopLiveMode(),
        onerror: () => stopLiveMode(),
      },
      config: {
        responseModalities: [Modality.AUDIO],
        outputAudioTranscription: {},
        inputAudioTranscription: {},
        systemInstruction: `You are DRISHTI-BOT, an elite forensic structural intelligence unit. You speak with calm, technical precision. You are currently conducting a live field audit of ${selectedAsset ? selectedAsset.name : 'the national grid'}. Focus on risk scores, sensor telemetry, and safety protocols.`
      }
    });

    liveSessionRef.current = await sessionPromise;
  };

  const handleSendMessage = async (e?: React.FormEvent, textOverride?: string) => {
    if (e) e.preventDefault();
    const query = textOverride || inputValue;
    if (!query.trim() && !selectedImage) return;
    if (isLoading) return;

    const userMessage: ChatMessage = {
      role: 'user',
      text: query || (selectedImage ? "Analyze this infrastructure image." : ""),
      timestamp: new Date(),
      image: selectedImage || undefined
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    const currentImage = selectedImage;
    const currentMime = imageMimeType;
    setSelectedImage(null);
    setImageMimeType(null);
    setIsLoading(true);
    setIsThinking(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const context = selectedAsset
        ? `ANALYZING ASSET: ${selectedAsset.name} [ID: ${selectedAsset.id}]
           Type: ${selectedAsset.type}
           Zone: ${selectedAsset.zone}
           Age: ${selectedAsset.age} years
           Last Maintenance: ${selectedAsset.lastMaintenance}
           Current Risk Score: ${selectedAsset.riskScore}%
           
           ENGINEERING TELEMETRY:
           - Stress: ${selectedAsset.telemetry.stress} MPa
           - Strain: ${selectedAsset.telemetry.strain} μm/m
           - Vibration Frequency: ${selectedAsset.telemetry.vibrationFrequency} Hz
           - Load Capacity: ${selectedAsset.telemetry.loadCapacity} Tons/day
           - Operational Load Factor: ${selectedAsset.loadFactor}/10
           - Climate Impact Factor: ${selectedAsset.climateImpact}/10`
        : `SYSTEM STATUS: Global Grid Active. No specific asset focus. Monitoring strategic nodes across India.`;

      const parts: any[] = [];
      if (query) parts.push({ text: query });
      if (currentImage && currentMime) {
        parts.push({
          inlineData: {
            data: currentImage.split(',')[1],
            mimeType: currentMime
          }
        });
      }

      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: { parts },
        config: {
          thinkingConfig: { thinkingBudget: 4000 },
          tools: [{ googleSearch: {} }],
          systemInstruction: `You are DRISHTI-BOT, a high-fidelity forensic structural intelligence unit.
          - Role: Chief Forensic Engineer for NHAI/NHIDCL.
          - Context: ${context}
          - Tone: Professional, authoritative, data-driven, and slightly futuristic.
          - Output: Use Markdown for formatting. Bold critical numbers. Use engineering terms like 'Factor of Safety', 'Hysteresis', 'Modulus', 'Tensile Strength', 'Carbonation Depth'.
          - Image Analysis: If an image is provided, perform a deep forensic scan. Look for spalling, rebar corrosion, shear cracks, or settlement signs.
          - Grounding: Use Google Search to cross-reference local seismic activity, monsoon intensity, or recent traffic load changes for the specific asset or region.
          - Goal: Predict failure probability and recommend immediate engineering interventions.`,
        }
      });

      setMessages(prev => [...prev, {
        role: 'model',
        text: response.text || "Diagnostic failure. Neural connection timed out.",
        timestamp: new Date(),
        groundingMetadata: response.candidates?.[0]?.groundingMetadata
      }]);
    } catch (error) {
      console.error("Diagnostic Error:", error);
      setMessages(prev => [...prev, {
        role: 'model',
        text: "Neural Link severed. Re-initialize security handshake.",
        timestamp: new Date()
      }]);
    } finally {
      setIsLoading(false);
      setIsThinking(false);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
        setImageMimeType(file.type);
      };
      reader.readAsDataURL(file);
    }
  };

  const getRightPosition = () => {
    if (selectedAsset) return '470px';
    return '24px';
  };

  return (
    <div
      className="fixed bottom-6 z-[2000] flex flex-col items-end transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
      style={{ right: getRightPosition() }}
    >
      {isOpen && (
        <div className="mb-6 w-[360px] sm:w-[480px] h-[600px] sm:h-[700px] bg-slate-900/95 dark:bg-black/95 backdrop-blur-3xl rounded-[3rem] shadow-[0_40px_80px_-16px_rgba(0,0,0,0.6)] border border-slate-700/50 flex flex-col overflow-hidden animate-scale-in origin-bottom-right">

          {/* SCANLINE EFFECT */}
          <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-50 bg-[length:100%_2px,3px_100%]"></div>

          {/* Forensic Header */}
          <div className="bg-slate-950 p-6 flex items-center justify-between border-b border-slate-800 shrink-0 relative">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="w-12 h-12 bg-slate-800 dark:bg-slate-700 rounded-2xl flex items-center justify-center p-2 shadow-xl animate-pulse-slow">
                  <Logo size={32} variant="light" />
                </div>
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-slate-400 rounded-full border-4 border-slate-950 animate-pulse"></div>
              </div>
              <div>
                <h3 className="text-sm font-black text-white uppercase tracking-[0.3em] leading-none mb-1">DRISHTI-BOT </h3>
                <div className="flex items-center space-x-2">
                  <canvas ref={canvasRef} width={60} height={10} className="rounded opacity-60" />
                  <span className="text-[9px] text-slate-400 font-black uppercase tracking-[0.2em]">{isLiveMode ? 'Live Intercept' : 'Neural Link Active'}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setMessages([{
                  role: 'model',
                  text: "Neural buffers purged. Diagnostic history reset. Ready for new session.",
                  timestamp: new Date()
                }])}
                className="p-2 text-slate-500 hover:text-red-400 transition-all hover:bg-slate-800 rounded-xl active:scale-90"
                title="Clear History"
              >
                <Trash2 className="w-5 h-5" />
              </button>
              <button
                onClick={startLiveMode}
                className={`p-3 rounded-xl transition-all active:scale-90 ${isLiveMode ? 'bg-red-500 text-white shadow-lg' : 'bg-slate-800 text-slate-400 hover:text-white'}`}
                title="Toggle Voice Mode"
              >
                <Mic className="w-5 h-5" />
              </button>
              <button onClick={() => setIsOpen(false)} className="text-slate-500 hover:text-white transition-all p-2 hover:bg-slate-800 rounded-xl active:scale-90">
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Context Banner */}
          {selectedAsset && (
            <div className="bg-slate-100 dark:bg-slate-800/10 px-6 py-2 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <span className="text-[9px] font-black text-slate-600 dark:text-slate-400 uppercase tracking-widest">Target: {selectedAsset.name}</span>
              <span className="text-[9px] font-bold text-slate-400 uppercase">Risk Index: {selectedAsset.riskScore}%</span>
            </div>
          )}

          {/* Terminal Console */}
          <div ref={scrollRef} className="flex-grow overflow-y-auto p-6 space-y-6 bg-slate-950/40 no-scrollbar relative">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in-up`}>
                <div className={`max-w-[90%] p-5 rounded-3xl text-[13px] leading-relaxed relative ${msg.role === 'user'
                  ? 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white rounded-tr-none shadow-lg'
                  : 'bg-slate-900 text-slate-100 border border-slate-800 rounded-tl-none border-l-4 border-l-slate-400 shadow-xl'
                  }`}>
                  {msg.image && (
                    <div className="mb-3 rounded-xl overflow-hidden border border-white/20">
                      <img src={msg.image} alt="Uploaded for analysis" className="w-full h-auto max-h-48 object-cover" />
                    </div>
                  )}
                  <div className="markdown-body prose prose-invert prose-sm max-w-none">
                    <Markdown remarkPlugins={[remarkGfm]}>{msg.text}</Markdown>
                  </div>

                  <div className="flex items-center justify-between mt-4">
                    <div className={`text-[8px] font-black uppercase tracking-widest opacity-30`}>
                      {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                    </div>
                    {msg.role === 'model' && (
                      <button
                        onClick={() => navigator.clipboard.writeText(msg.text)}
                        className="p-1.5 hover:bg-white/10 rounded-lg transition-colors text-slate-500 hover:text-white"
                        title="Copy to clipboard"
                      >
                        <Copy className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>

                  {msg.groundingMetadata?.groundingChunks && (
                    <div className="mt-4 pt-4 border-t border-slate-800">
                      <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-2">Grounding Sources</p>
                      <div className="flex flex-wrap gap-2">
                        {msg.groundingMetadata.groundingChunks.map((chunk: any, idx: number) => (
                          chunk.web && (
                            <a
                              key={idx}
                              href={chunk.web.uri}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-[10px] bg-slate-800 hover:bg-slate-700 text-slate-300 px-2 py-1 rounded border border-slate-700 transition-colors truncate max-w-[150px]"
                            >
                              {chunk.web.title || 'Source'}
                            </a>
                          )
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}

            {(isLoading || isThinking) && (
              <div className="flex justify-start">
                <div className="bg-slate-900 border border-slate-800 p-5 rounded-3xl rounded-tl-none shadow-xl flex flex-col gap-3">
                  <div className="flex items-center space-x-3">
                    <div className="flex space-x-1">
                      <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce"></div>
                      <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                      <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                    </div>
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">{isThinking ? 'Forensic Simulation' : 'Syncing Data'}</span>
                  </div>
                  {isThinking && <div className="w-48 h-1 bg-slate-800 rounded-full overflow-hidden"><div className="h-full bg-slate-500 animate-progress-indeterminate"></div></div>}
                </div>
              </div>
            )}
          </div>

          {/* Quick Command Chips */}
          <div className="px-6 py-4 bg-slate-950/60 flex gap-3 overflow-x-auto no-scrollbar border-t border-slate-800 shrink-0">
            {suggestions.map(chip => (
              <button
                key={chip.label}
                onClick={() => handleSendMessage(undefined, chip.query)}
                className="shrink-0 px-4 py-2 rounded-xl bg-slate-900 text-[10px] font-black text-slate-400 hover:bg-slate-100 hover:text-slate-900 transition-all uppercase tracking-widest border border-slate-800"
              >
                {chip.label}
              </button>
            ))}
          </div>

          {/* Input Buffer */}
          <form onSubmit={handleSendMessage} className="p-6 bg-slate-950 border-t border-slate-800 flex flex-col gap-4 shrink-0">
            {selectedImage && (
              <div className="relative w-20 h-20 rounded-xl overflow-hidden border-2 border-slate-500 animate-scale-in">
                <img src={selectedImage} className="w-full h-full object-cover" alt="Preview" />
                <button
                  type="button"
                  onClick={() => setSelectedImage(null)}
                  className="absolute top-1 right-1 bg-red-500 text-white p-0.5 rounded-full shadow-lg"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            )}
            <div className="flex items-center space-x-4">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="p-4 bg-slate-900 text-slate-400 hover:text-white border-2 border-slate-800 rounded-2xl transition-all active:scale-90"
                title="Upload Image for Analysis"
              >
                <Camera className="w-6 h-6" />
              </button>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageUpload}
                className="hidden"
                accept="image/*"
              />
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder={isLiveMode ? "Listening for audio cues..." : "Initialize diagnostic query..."}
                className="flex-grow bg-slate-900 border-2 border-slate-800 rounded-2xl px-6 py-4 text-sm font-bold focus:border-slate-500 outline-none text-white placeholder-slate-700 transition-all"
                disabled={isLiveMode}
              />
              <button
                type="submit"
                disabled={isLoading || isThinking || isLiveMode}
                className="bg-slate-100 dark:bg-white text-slate-900 p-4 rounded-2xl hover:bg-slate-200 disabled:opacity-30 transition-all active:scale-95 shadow-xl group"
              >
                {isLoading ? <RefreshCw className="w-6 h-6 animate-spin" /> : <SendHorizonal className="w-6 h-6 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Primary Gateway Toggle */}
      <div className="relative">
        {selectedAsset && !isOpen && (
          <div className="absolute -top-14 right-0 bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-[10px] font-black uppercase tracking-widest py-2 px-6 rounded-full shadow-2xl animate-bounce pointer-events-none whitespace-nowrap border-2 border-white dark:border-slate-900">
            Analyzing: {selectedAsset.name}
          </div>
        )}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`w-14 h-14 sm:w-16 h-16 rounded-2xl shadow-[0_20px_40px_rgba(0,0,0,0.4)] flex items-center justify-center transition-all active:scale-90 transform hover:scale-105 ${isOpen ? 'bg-slate-800 text-white rotate-90' : 'bg-slate-900 dark:bg-white text-white dark:text-slate-900'
            }`}
        >
          {isOpen ? (
            <X className="w-8 h-8" />
          ) : (
            <div className="relative">
              <Logo size={window.innerWidth < 640 ? 40 : 48} variant="light" />
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-slate-400 border-4 border-slate-950 rounded-full animate-ping"></div>
            </div>
          )}
        </button>
      </div>

      <style>{`
        @keyframes progress-indeterminate {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
        .animate-progress-indeterminate {
          animation: progress-indeterminate 1.5s infinite linear;
        }
      `}</style>
    </div>
  );
};

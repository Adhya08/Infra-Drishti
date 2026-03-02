
import React, { useState, useEffect } from 'react';
import { db, User } from '../data/database';
import { Logo } from '../components/Logo';
import {
    ShieldCheck,
    User as UserIcon,
    Mail,
    Lock,
    Eye,
    EyeOff,
    AlertCircle,
    ArrowRight,
    Loader2,
    Info
} from 'lucide-react';

interface LoginPageProps {
    onLoginSuccess: (user: User) => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onLoginSuccess }) => {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [error, setError] = useState('');
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        // Artificial delay for high-tech "authenticating" feel
        await new Promise(resolve => setTimeout(resolve, 800));

        try {
            if (isLogin) {
                const users = db.getUsers();
                const user = users.find(u => u.email.toLowerCase() === email.toLowerCase() && u.password === password);
                if (user) {
                    db.setCurrentUser(user);
                    onLoginSuccess(user);
                } else {
                    setError('Verification failed: Identifier or Access Key mismatch.');
                }
            } else {
                const users = db.getUsers();
                if (users.find(u => u.email.toLowerCase() === email.toLowerCase())) {
                    setError('Security alert: Entity identifier already exists in registry.');
                    setIsLoading(false);
                    return;
                }
                const newUser: User = {
                    id: `u-${Date.now()}`,
                    email: email.toLowerCase(),
                    name,
                    role: 'citizen',
                    password
                };
                db.saveUser(newUser);
                db.setCurrentUser(newUser);
                onLoginSuccess(newUser);
            }
        } catch (err) {
            setError('System Error: Registry synchronization failed.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-[calc(100vh-64px)] flex items-center justify-center p-4 sm:p-6 bg-slate-50 dark:bg-slate-950 transition-colors relative overflow-hidden">
            {/* Dynamic Cyber Background Elements */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-slate-500/10 dark:bg-slate-500/5 rounded-full blur-[120px] animate-pulse"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-slate-900/10 dark:bg-slate-900/5 rounded-full blur-[120px] animate-pulse [animation-delay:2s]"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-[0.02] dark:opacity-[0.05]"
                    style={{ backgroundImage: 'radial-gradient(#94a3b8 1.5px, transparent 1.5px)', backgroundSize: '40px 40px' }}></div>
            </div>

            <div className="w-full max-w-4xl bg-white dark:bg-slate-900 rounded-[3rem] border border-slate-200 dark:border-slate-800 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] overflow-hidden animate-fade-in-up relative z-10 flex flex-col md:flex-row transition-all duration-500">

                {/* Left Panel: Strategic Branding */}
                <div className="hidden md:flex w-2/5 bg-slate-900 dark:bg-black p-12 flex-col justify-between relative overflow-hidden">
                    <div className="absolute inset-0 opacity-20 pointer-events-none">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-slate-600/20 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2"></div>
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-slate-800/10 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2"></div>
                    </div>

                    <div className="relative z-10 space-y-8">
                        <div className="w-16 h-16 bg-slate-800 dark:bg-slate-700 rounded-2xl flex items-center justify-center shadow-xl group hover:scale-110 transition-transform cursor-pointer">
                            <Logo size={40} variant="light" />
                        </div>

                        <div className="space-y-4">
                            <h2 className="text-4xl font-black text-white uppercase tracking-tighter leading-[0.9]">
                                Drishti<br />
                                <span className="text-slate-400">Gateway</span>
                            </h2>
                            <div className="w-12 h-1.5 bg-slate-700 rounded-full"></div>
                            <p className="text-slate-400 text-sm font-medium leading-relaxed">
                                Secured access to the National Infrastructure Risk Repository & Citizen Portal.
                            </p>
                        </div>
                    </div>

                    <div className="relative z-10 space-y-6 pt-12">
                        <div className="space-y-2">
                            <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em]">Security Protocol</p>
                            <div className="flex items-center gap-2 text-[11px] font-bold text-slate-300">
                                <ShieldCheck className="w-4 h-4 text-slate-400" />
                                End-to-End Encrypted Registry
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <div className="flex-1 p-4 rounded-2xl bg-white/5 border border-white/10 text-center">
                                <span className="block text-2xl font-black text-white">99.9</span>
                                <span className="text-[8px] font-bold text-slate-500 uppercase tracking-widest">Uptime</span>
                            </div>
                            <div className="flex-1 p-4 rounded-2xl bg-white/5 border border-white/10 text-center">
                                <span className="block text-2xl font-black text-white">12k+</span>
                                <span className="text-[8px] font-bold text-slate-500 uppercase tracking-widest">Nodes</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Panel: Functional Forms */}
                <div className="flex-grow p-8 lg:p-16 flex flex-col justify-center bg-white dark:bg-slate-900">
                    <div className="max-w-md mx-auto w-full">

                        <div className="mb-12">
                            <div className="inline-flex bg-slate-100 dark:bg-slate-800/80 p-1.5 rounded-2xl border border-slate-200 dark:border-slate-700/50 mb-10 w-full shadow-inner">
                                <button
                                    onClick={() => { setIsLogin(true); setError(''); }}
                                    className={`flex-1 py-3.5 rounded-xl text-[11px] font-black uppercase tracking-[0.2em] transition-all duration-300 ${isLogin ? 'bg-white dark:bg-slate-700 shadow-md text-slate-900 dark:text-white' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
                                >
                                    Gateway Login
                                </button>
                                <button
                                    onClick={() => { setIsLogin(false); setError(''); }}
                                    className={`flex-1 py-3.5 rounded-xl text-[11px] font-black uppercase tracking-[0.2em] transition-all duration-300 ${!isLogin ? 'bg-white dark:bg-slate-700 shadow-md text-slate-900 dark:text-white' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
                                >
                                    Create Identity
                                </button>
                            </div>

                            <div className="space-y-2">
                                <h1 className="text-4xl font-black text-slate-900 dark:text-white uppercase tracking-tighter transition-all">
                                    {isLogin ? 'Verification' : 'Registration'}
                                </h1>
                                <p className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-[0.4em]">
                                    National Infra Registry Access
                                </p>
                            </div>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            {!isLogin && (
                                <div className="space-y-2 animate-fade-in-up">
                                    <label className="text-[10px] font-black text-slate-500 dark:text-slate-500 uppercase tracking-widest ml-1">Full Legal Name</label>
                                    <div className="relative group">
                                        <div className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-slate-900 dark:group-focus-within:text-white transition-colors">
                                            <UserIcon className="w-5 h-5" />
                                        </div>
                                        <input
                                            type="text" required value={name} onChange={e => setName(e.target.value)}
                                            placeholder="Jane Doe"
                                            className="w-full bg-slate-50 dark:bg-slate-800/50 border-2 border-slate-100 dark:border-slate-800 rounded-[1.25rem] pl-14 pr-6 py-5 text-sm font-bold focus:border-slate-500 focus:bg-white dark:focus:bg-slate-800 outline-none transition-all dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-600"
                                        />
                                    </div>
                                </div>
                            )}

                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-500 dark:text-slate-500 uppercase tracking-widest ml-1">Email Identifier</label>
                                <div className="relative group">
                                    <div className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-slate-900 dark:group-focus-within:text-white transition-colors">
                                        <Mail className="w-5 h-5" />
                                    </div>
                                    <input
                                        type="email" required value={email} onChange={e => setEmail(e.target.value)}
                                        placeholder="name@agency.gov.in"
                                        className="w-full bg-slate-50 dark:bg-slate-800/50 border-2 border-slate-100 dark:border-slate-800 rounded-[1.25rem] pl-14 pr-6 py-5 text-sm font-bold focus:border-slate-500 focus:bg-white dark:focus:bg-slate-800 outline-none transition-all dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-600"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <div className="flex justify-between items-center ml-1">
                                    <label className="text-[10px] font-black text-slate-500 dark:text-slate-500 uppercase tracking-widest">Access Key</label>
                                    {isLogin && (
                                        <button type="button" className="text-[9px] font-black text-slate-900 dark:text-slate-400 uppercase tracking-widest hover:underline">Forgot Key?</button>
                                    )}
                                </div>
                                <div className="relative group">
                                    <div className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-slate-900 dark:group-focus-within:text-white transition-colors">
                                        <Lock className="w-5 h-5" />
                                    </div>
                                    <input
                                        type={isPasswordVisible ? "text" : "password"} required value={password} onChange={e => setPassword(e.target.value)}
                                        placeholder="••••••••"
                                        className="w-full bg-slate-50 dark:bg-slate-800/50 border-2 border-slate-100 dark:border-slate-800 rounded-[1.25rem] pl-14 pr-14 py-5 text-sm font-bold focus:border-slate-500 focus:bg-white dark:focus:bg-slate-800 outline-none transition-all dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-600"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                                        className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 p-1 rounded-lg"
                                    >
                                        {isPasswordVisible ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                    </button>
                                </div>
                            </div>

                            {error && (
                                <div className="flex items-center gap-3 p-4 bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/30 rounded-2xl animate-shake">
                                    <div className="shrink-0 text-red-500">
                                        <AlertCircle className="w-5 h-5" />
                                    </div>
                                    <p className="text-[11px] font-black text-red-600 dark:text-red-400 uppercase tracking-tight leading-tight">{error}</p>
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full relative py-5 bg-slate-900 dark:bg-white text-white dark:text-slate-950 rounded-[1.5rem] font-black uppercase tracking-[0.25em] text-xs shadow-2xl hover:scale-[1.01] transition-all active:scale-95 disabled:opacity-70 disabled:hover:scale-100 flex items-center justify-center group overflow-hidden"
                            >
                                <span className={`flex items-center gap-3 transition-all ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
                                    {isLogin ? 'Verify Identity' : 'Initialize Registry'}
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </span>

                                {isLoading && (
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <Loader2 className="animate-spin h-5 w-5 text-white dark:text-slate-900" />
                                    </div>
                                )}
                            </button>

                            {isLogin && (
                                <div className="mt-8 pt-8 border-t border-slate-100 dark:border-slate-800">
                                    <div className="p-5 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-700 flex items-start gap-4">
                                        <div className="shrink-0 text-slate-600 dark:text-slate-400 pt-1">
                                            <Info className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-black text-slate-800 dark:text-slate-300 uppercase tracking-widest mb-1">Administrative Hint</p>
                                            <p className="text-[11px] font-bold text-slate-600 dark:text-slate-400">
                                                Default Access: <code className="bg-white dark:bg-slate-900 px-1.5 py-0.5 rounded text-slate-900 dark:text-white font-black">admin@infra.gov.in</code> / <code className="bg-white dark:bg-slate-900 px-1.5 py-0.5 rounded text-slate-900 dark:text-white font-black">admin</code>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </form>
                    </div>
                </div>
            </div>

            <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-4px); }
          75% { transform: translateX(4px); }
        }
        .animate-shake {
          animation: shake 0.2s ease-in-out 0s 2;
        }
      `}</style>
        </div>
    );
};

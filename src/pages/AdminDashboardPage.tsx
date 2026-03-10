
import React, { useState, useEffect } from 'react';
import { db, InfrastructureReport, User } from '../data/database';
import { Trash2, Users, FileText, ShieldCheck } from 'lucide-react';

export const AdminDashboardPage: React.FC = () => {
    const [reports, setReports] = useState<InfrastructureReport[]>([]);
    const [users, setUsers] = useState<User[]>([]);
    const [view, setView] = useState<'reports' | 'users'>('reports');

    useEffect(() => {
        setReports(db.getReports());
        setUsers(db.getUsers());
    }, []);

    const handleStatusChange = (id: string, status: InfrastructureReport['status']) => {
        db.updateReportStatus(id, status);
        setReports(db.getReports());
    };

    return (
        <div className="max-w-7xl mx-auto px-6 py-12 dark:bg-slate-950 transition-colors min-h-screen">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
                <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 mb-4">
                        <ShieldCheck className="w-3.5 h-3.5 text-slate-900 dark:text-white" />
                        <span className="text-[10px] font-black text-slate-900 dark:text-white uppercase tracking-widest">Secure Admin Node</span>
                    </div>
                    <h1 className="text-4xl font-black text-slate-900 dark:text-white uppercase tracking-tighter">Oversight Command</h1>
                </div>
                <div className="flex bg-slate-100 dark:bg-slate-900 p-1 rounded-2xl border border-slate-200 dark:border-slate-800">
                    <button
                        onClick={() => setView('reports')}
                        className={`px-6 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all flex items-center gap-2 ${view === 'reports' ? 'bg-white dark:bg-slate-800 shadow-md text-slate-900 dark:text-white' : 'text-slate-500'}`}
                    >
                        <FileText className="w-4 h-4" />
                        Citizen Reports ({reports.length})
                    </button>
                    <button
                        onClick={() => setView('users')}
                        className={`px-6 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all flex items-center gap-2 ${view === 'users' ? 'bg-white dark:bg-slate-800 shadow-md text-slate-900 dark:text-white' : 'text-slate-500'}`}
                    >
                        <Users className="w-4 h-4" />
                        User Registry ({users.length})
                    </button>
                </div>
            </div>
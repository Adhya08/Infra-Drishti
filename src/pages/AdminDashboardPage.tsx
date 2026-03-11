
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

            {view === 'reports' ? (
                <div className="grid grid-cols-1 gap-6">
                    {reports.length === 0 ? (
                        <div className="bg-white dark:bg-slate-900 p-20 rounded-[3rem] border border-dashed border-slate-200 dark:border-slate-800 text-center">
                            <p className="text-slate-400 font-bold uppercase tracking-widest">No active reports in the database</p>
                        </div>
                    ) : (
                        reports.map(report => (
                            <div key={report.id} className="bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-200 dark:border-slate-800 p-8 shadow-sm flex flex-col lg:flex-row justify-between gap-8 group hover:border-blue-500/30 transition-all">
                                <div className="max-w-2xl">
                                    <div className="flex items-center gap-4 mb-4">
                                        <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${report.status === 'Resolved' ? 'bg-slate-900 text-white' : 'bg-slate-200 text-slate-700'
                                            }`}>
                                            {report.status}
                                        </span>
                                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
                                            Filed by: {report.userName} • {new Date(report.timestamp).toLocaleDateString()}
                                        </span>
                                    </div>
                                    <h3 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-tighter mb-2">{report.assetCategory} - {report.location}</h3>
                                    <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-medium">"{report.description}"</p>
                                </div>

                                <div className="flex items-center gap-4 shrink-0">
                                    <select
                                        value={report.status}
                                        onChange={(e) => handleStatusChange(report.id, e.target.value as any)}
                                        className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2 text-xs font-black uppercase tracking-widest focus:ring-2 focus:ring-blue-500 outline-none dark:text-white"
                                    >
                                        <option value="Pending">Pending</option>
                                        <option value="In-Review">In-Review</option>
                                        <option value="Resolved">Resolved</option>
                                    </select>
                                    <button className="p-3 bg-red-500/10 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all">
                                        <Trash2 className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            ) : (
                <div className="bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-200 dark:border-slate-800 overflow-hidden">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-slate-50 dark:bg-slate-800 text-[10px] font-black text-slate-500 uppercase tracking-widest border-b border-slate-100 dark:border-slate-800">
                                <th className="px-8 py-4">Registry Name</th>
                                <th className="px-8 py-4">Entity Type</th>
                                <th className="px-8 py-4">Security Identifier</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                            {users.map(user => (
                                <tr key={user.id} className="hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                                    <td className="px-8 py-5">
                                        <p className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-tight">{user.name}</p>
                                        <p className="text-[10px] text-slate-400 font-bold">{user.email}</p>
                                    </td>
                                    <td className="px-8 py-5">
                                        <span className={`px-2 py-1 rounded text-[9px] font-black uppercase ${user.role === 'admin' ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900' : 'bg-slate-100 dark:bg-slate-800 text-slate-500'}`}>
                                            {user.role}
                                        </span>
                                    </td>
                                    <td className="px-8 py-5 font-mono text-[10px] text-slate-400">
                                        {user.id}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

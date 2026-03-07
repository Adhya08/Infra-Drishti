
import { Asset } from '../types';

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'citizen';
  password?: string; // In a real app, this would be hashed on a server
}

export interface InfrastructureReport {
  id: string;
  userId: string;
  userName: string;
  assetCategory: string;
  location: string;
  description: string;
  status: 'Pending' | 'In-Review' | 'Resolved';
  timestamp: string;
  severity: 'Low' | 'Medium' | 'High';
}

const DB_KEYS = {
  USERS: 'infra_drishti_users',
  REPORTS: 'infra_drishti_reports',
  CURRENT_USER: 'infra_drishti_session'
};

// Initialize DB with a default admin if empty
const initDB = () => {
  if (!localStorage.getItem(DB_KEYS.USERS)) {
    const defaultAdmin: User = {
      id: 'admin-001',
      email: 'admin@infra.gov.in',
      name: 'Nodal Officer (Admin)',
      role: 'admin',
      password: 'admin'
    };
    localStorage.setItem(DB_KEYS.USERS, JSON.stringify([defaultAdmin]));
  }
  if (!localStorage.getItem(DB_KEYS.REPORTS)) {
    localStorage.setItem(DB_KEYS.REPORTS, JSON.stringify([]));
  }
};

initDB();

export const db = {
  // User Methods
  getUsers: (): User[] => JSON.parse(localStorage.getItem(DB_KEYS.USERS) || '[]'),
  
  saveUser: (user: User) => {
    const users = db.getUsers();
    users.push(user);
    localStorage.setItem(DB_KEYS.USERS, JSON.stringify(users));
  },

  // Report Methods
  getReports: (): InfrastructureReport[] => JSON.parse(localStorage.getItem(DB_KEYS.REPORTS) || '[]'),
  
  saveReport: (report: Omit<InfrastructureReport, 'id' | 'status' | 'timestamp'>) => {
    const reports = db.getReports();
    const newReport: InfrastructureReport = {
      ...report,
      id: `rep-${Date.now()}`,
      status: 'Pending',
      timestamp: new Date().toISOString()
    };
    reports.unshift(newReport);
    localStorage.setItem(DB_KEYS.REPORTS, JSON.stringify(reports));
    return newReport;
  },

  updateReportStatus: (id: string, status: InfrastructureReport['status']) => {
    const reports = db.getReports();
    const index = reports.findIndex(r => r.id === id);
    if (index !== -1) {
      reports[index].status = status;
      localStorage.setItem(DB_KEYS.REPORTS, JSON.stringify(reports));
    }
  },

  // Session Methods
  setCurrentUser: (user: User | null) => {
    if (user) localStorage.setItem(DB_KEYS.CURRENT_USER, JSON.stringify(user));
    else localStorage.removeItem(DB_KEYS.CURRENT_USER);
  },

  getCurrentUser: (): User | null => {
    const session = localStorage.getItem(DB_KEYS.CURRENT_USER);
    return session ? JSON.parse(session) : null;
  }
};

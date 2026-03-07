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

  await new Promise(resolve => setTimeout(resolve, 800));
  if (isLogin) {
  const users = db.getUsers();
  const user = users.find(
    u => u.email.toLowerCase() === email.toLowerCase() && u.password === password
  );

  if (user) {
    db.setCurrentUser(user);
    onLoginSuccess(user);
  } else {
    setError('Verification failed: Identifier or Access Key mismatch.');
  }
}
else {
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
return (
  <div className="min-h-[calc(100vh-64px)] flex items-center justify-center p-4 sm:p-6 bg-slate-50 dark:bg-slate-950 transition-colors relative overflow-hidden">
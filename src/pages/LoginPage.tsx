import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, LogIn, Sparkles, Code2, BookOpen, Cpu, ShieldCheck, CheckCircle2, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { HuskyExaminerAvatar } from '../components/HuskyExaminerAvatar';
import { ParticleBackground } from '../components/particleBackground';

interface LoginPageProps {
  onLoginSuccess: (userData: any) => void;
  onGoToRegister: () => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onLoginSuccess, onGoToRegister }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email.trim() || !email.includes('@')) {
      setError('Please enter a valid Gmail / Email address.');
      return;
    }

    if (!password) {
      setError('Please enter your password.');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ emailOrUsername: email, password })
      });
      const data = await res.json();

      if (data.success && data.user) {
        onLoginSuccess(data.user);
      } else {
        setError(data.error || 'Invalid email or password.');
      }
    } catch (err) {
      setError('Connection error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const stats = [
    { label: 'DSA Questions', value: '3,200+', icon: Code2, desc: 'LeetCode, Striver, GFG' },
    { label: 'Curated Sheets', value: '71+', icon: BookOpen, desc: 'Striver A2Z, PW, Alpha' },
    { label: 'AI Viva Examiner', value: '24/7', icon: Cpu, desc: 'Voice & Code Feedback' },
    { label: 'Placement Ready', value: '99.4%', icon: ShieldCheck, desc: 'Student Success Rate' },
  ];

  const highlights = [
    'Real-time C++, Python & Java Code Test Execution Engine',
    'Striver A2Z, PW College Wallah & CodeChef CP Sheets',
    'Interactive AI Viva Room with Voice & Logic Analytics',
    'Automated Academic Calendar & Subject Roadmaps'
  ];

  return (
    <div className="relative min-h-[calc(100vh-4rem)] bg-slate-950 text-slate-100 flex items-center justify-center py-8 lg:py-12 px-4 sm:px-6 lg:px-8 overflow-hidden font-sans">
      
      {/* Background Particles & Glows */}
      <ParticleBackground />

      <div className="relative z-10 w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        
        {/* Left Column: Hero Section + Mascot + Stats Cards */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left space-y-6"
        >
          
          {/* Badge */}
          <motion.div 
            whileHover={{ scale: 1.03 }}
            className="inline-flex items-center gap-2 rounded-full border border-cyan-500/40 bg-cyan-950/50 px-4 py-1.5 text-xs text-cyan-300 font-mono shadow-[0_0_20px_rgba(6,182,212,0.2)] backdrop-blur-md"
          >
            <Sparkles className="h-4 w-4 text-cyan-400 animate-pulse" />
            <span className="font-semibold tracking-wide">ApexTech Engineering Portal v2.4</span>
          </motion.div>

          {/* Headline */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Master CS Engineering & <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400 bg-clip-text text-transparent">
              Tech Placement Interviews
            </span>
          </h1>

          <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed font-normal">
            Sign in to access 3,200+ DSA practice problems, Striver & PW curated sheets, real-time code execution, and your personal AI Senior Technical Examiner.
          </p>

          {/* Large Interactive Husky AI Mascot Section */}
          <div className="w-full flex flex-col sm:flex-row items-center gap-6 p-5 rounded-3xl border border-slate-800/80 bg-slate-900/60 backdrop-blur-xl shadow-2xl">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="shrink-0"
            >
              <HuskyExaminerAvatar
                isSpeaking={false}
                isListening={false}
                isEvaluating={false}
                isClosedEyes={isPasswordFocused || (!showPassword && password.length > 0)}
                examinerName="EduCore Senior AI Examiner"
                size="xl"
              />
            </motion.div>

            <div className="text-left space-y-2">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-cyan-400">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
                <span>AI VIVA & CODE EVALUATOR READY</span>
              </div>
              <h3 className="text-base font-bold text-white">Interactive Password-Aware Mascot</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Your AI mentor watches over your preparation and closes eyes during password typing to protect your session privacy!
              </p>
            </div>
          </div>

          {/* Stats Cards Grid (Fills Empty Space Elegantly) */}
          <div className="w-full grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 pt-2">
            {stats.map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 * idx }}
                  whileHover={{ y: -4, borderColor: 'rgba(6, 182, 212, 0.4)' }}
                  className="p-3.5 sm:p-4 rounded-2xl border border-slate-800 bg-slate-900/60 backdrop-blur-md shadow-lg transition-all"
                >
                  <div className="flex items-center gap-2 mb-1.5">
                    <div className="p-1.5 rounded-lg bg-cyan-950/80 border border-cyan-500/30 text-cyan-400">
                      <Icon className="h-4 w-4" />
                    </div>
                    <span className="text-lg sm:text-xl font-bold font-mono text-white tracking-tight">{stat.value}</span>
                  </div>
                  <div className="text-xs font-bold text-slate-200">{stat.label}</div>
                  <div className="text-[10px] text-slate-400 truncate">{stat.desc}</div>
                </motion.div>
              );
            })}
          </div>

          {/* Highlights */}
          <div className="w-full pt-2 hidden sm:block">
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300 font-mono">
              {highlights.map((item, i) => (
                <li key={i} className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-cyan-400 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

        </motion.div>

        {/* Right Column: Glassmorphic Login Form Container */}
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
          className="lg:col-span-5 w-full max-w-md mx-auto"
        >
          <div className="relative rounded-3xl border border-slate-800/90 bg-slate-900/80 backdrop-blur-2xl p-6 sm:p-8 shadow-[0_20px_60px_rgba(6,182,212,0.12)]">
            
            {/* Ambient Corner Glow */}
            <div className="absolute -top-12 -right-12 w-32 h-32 rounded-full bg-cyan-500/20 blur-3xl pointer-events-none" />

            {/* Header Tabs Toggle */}
            <div className="flex items-center justify-between mb-6 border-b border-slate-800 pb-4">
              <div>
                <h2 className="text-xl font-bold font-mono tracking-tight text-white flex items-center gap-2">
                  <span>Sign In</span>
                  <span className="text-xs px-2 py-0.5 rounded-md bg-cyan-950 border border-cyan-500/30 text-cyan-300 font-normal">Student</span>
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">Welcome back to your learning hub</p>
              </div>

              <button
                onClick={onGoToRegister}
                className="text-xs font-mono font-bold text-cyan-400 hover:text-cyan-300 transition-colors flex items-center gap-1 group"
              >
                <span>Register</span>
                <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {error && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-4 rounded-xl border border-rose-500/40 bg-rose-950/60 p-3 text-xs text-rose-300 font-mono flex items-center gap-2"
              >
                <span className="text-rose-400 font-bold">⚠️</span>
                <span>{error}</span>
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Email Address */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1 font-mono">
                  Gmail / Email Address ✉️
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500 group-focus-within:text-cyan-400 transition-colors">
                    <Mail className="h-4 w-4" />
                  </div>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="student@gmail.com"
                    className="block w-full rounded-xl border border-slate-700 bg-slate-950/90 pl-10 pr-3 py-3 text-xs text-white placeholder-slate-500 focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 font-mono transition-all"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1 font-mono">
                  Password 🔑
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500 group-focus-within:text-cyan-400 transition-colors">
                    <Lock className="h-4 w-4" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    onFocus={() => setIsPasswordFocused(true)}
                    onBlur={() => setIsPasswordFocused(false)}
                    placeholder="••••••••"
                    className="block w-full rounded-xl border border-slate-700 bg-slate-950/90 pl-10 pr-10 py-3 text-xs text-white placeholder-slate-500 focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 font-mono transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-white transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {/* Remember & Forgot */}
              <div className="flex items-center justify-between text-xs py-1">
                <label className="flex items-center gap-2 text-slate-400 cursor-pointer hover:text-slate-200 transition-colors">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={e => setRememberMe(e.target.checked)}
                    className="rounded border-slate-700 bg-slate-950 text-cyan-500 focus:ring-cyan-500/50"
                  />
                  <span>Remember session</span>
                </label>

                <button
                  type="button"
                  onClick={() => setShowForgotPasswordModal(true)}
                  className="text-cyan-400 hover:text-cyan-300 hover:underline font-medium font-mono"
                >
                  Forgot Password?
                </button>
              </div>

              {/* Submit Button */}
              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 via-sky-500 to-indigo-600 py-3.5 text-xs font-bold text-slate-950 shadow-lg shadow-cyan-500/25 hover:brightness-110 transition-all disabled:opacity-50 font-mono cursor-pointer"
              >
                {loading ? (
                  <div className="h-4 w-4 rounded-full border-2 border-slate-950 border-t-transparent animate-spin" />
                ) : (
                  <>
                    <LogIn className="h-4 w-4" />
                    <span>Login to ApexTech Portal 🚀</span>
                  </>
                )}
              </motion.button>

            </form>

            <div className="mt-6 pt-4 border-t border-slate-800 text-center">
              <p className="text-xs text-slate-400">
                New to ApexTech?{' '}
                <button 
                  onClick={onGoToRegister} 
                  className="text-cyan-400 font-bold hover:underline font-mono"
                >
                  Create Account & Password Generator ✨
                </button>
              </p>
            </div>

          </div>
        </motion.div>

      </div>

      {/* Forgot Password Modal */}
      <AnimatePresence>
        {showForgotPasswordModal && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md"
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="w-full max-w-sm rounded-2xl border border-slate-800 bg-slate-900 p-6 text-white shadow-2xl space-y-4"
            >
              <h3 className="text-lg font-bold font-mono text-cyan-300">Password Recovery</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Enter your registered Gmail or email address to receive password reset instructions.
              </p>
              <input
                type="email"
                placeholder="student@gmail.com"
                className="block w-full rounded-xl border border-slate-700 bg-slate-950 p-3 text-xs text-white focus:border-cyan-500 focus:outline-none font-mono"
              />
              <div className="flex gap-2">
                <button
                  onClick={() => setShowForgotPasswordModal(false)}
                  className="w-1/2 rounded-xl border border-slate-700 bg-slate-950 py-2.5 text-xs font-medium text-slate-300 hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    alert('Reset link sent to registered email address!');
                    setShowForgotPasswordModal(false);
                  }}
                  className="w-1/2 rounded-xl bg-cyan-500 py-2.5 text-xs font-bold text-slate-950 hover:brightness-110 transition-all font-mono"
                >
                  Send Reset Link
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};

import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, ShieldCheck, Sparkles, KeyRound, Copy, Check, RefreshCw, User, Code2, BookOpen, Cpu, Building2, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { HuskyExaminerAvatar } from '../components/HuskyExaminerAvatar';
import { ParticleBackground } from '../components/ParticleBackground';

interface RegisterPageProps {
  onRegisterSuccess: (userData: any) => void;
  onGoToLogin: () => void;
}

export const RegisterPage: React.FC<RegisterPageProps> = ({ onRegisterSuccess, onGoToLogin }) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [targetRole, setTargetRole] = useState('Full Stack Software Engineer');
  const [primaryStack, setPrimaryStack] = useState('React, Node.js, C++ & Python');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Password Generator Utility
  const generatePassword = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()';
    let result = '';
    for (let i = 0; i < 14; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setPassword(result);
    setConfirmPassword(result);
  };

  const copyPasswordToClipboard = () => {
    if (password) {
      navigator.clipboard.writeText(password);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const getPasswordStrength = (pass: string) => {
    let score = 0;
    if (pass.length >= 8) score++;
    if (pass.length >= 12) score++;
    if (/[A-Z]/.test(pass)) score++;
    if (/[0-9]/.test(pass)) score++;
    if (/[^A-Za-z0-9]/.test(pass)) score++;
    return score;
  };

  const strength = getPasswordStrength(password);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email.includes('@')) {
      setError('Please enter a valid Gmail / Email address.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName,
          email,
          password,
          targetRole,
          primaryStack
        })
      });

      const data = await res.json();
      if (data.success && data.user) {
        onRegisterSuccess(data.user);
      } else {
        setError(data.error || 'Registration failed. Please check inputs.');
      }
    } catch (err) {
      setError('Connection error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const stats = [
    { label: 'DSA Questions', value: '5,000+', icon: Code2, desc: 'LeetCode, HackerRank, GFG' },
    { label: 'Curated Sheets', value: '71+', icon: BookOpen, desc: 'Striver A2Z, PW, Alpha' },
    { label: 'AI Viva Examiner', value: '24/7', icon: Cpu, desc: 'Voice & Code Feedback' },
    { label: 'Company-Wise', value: '500+', icon: Building2, desc: 'Google, Amazon, TCS & MAANG' },
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
          className="lg:col-span-6 flex flex-col items-center lg:items-start text-center lg:text-left space-y-6"
        >
          
          {/* Badge */}
          <motion.div 
            whileHover={{ scale: 1.03 }}
            className="inline-flex items-center gap-2 rounded-full border border-cyan-500/40 bg-cyan-950/50 px-4 py-1.5 text-xs text-cyan-300 font-mono shadow-[0_0_20px_rgba(6,182,212,0.2)] backdrop-blur-md"
          >
            <Sparkles className="h-4 w-4 text-cyan-400 animate-pulse" />
            <span className="font-semibold tracking-wide">Instant Gmail & Developer Registration</span>
          </motion.div>

          {/* Headline */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Create Your Tech Profile & <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400 bg-clip-text text-transparent">
              Start Practice Instantly
            </span>
          </h1>

          <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed font-normal">
            Join thousands of engineering students preparing for top product startups, MAANG companies, and technical vivas. Sign up with your Gmail and generate a strong secure password with one click.
          </p>

          {/* Large Interactive Mascot Card */}
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
                <span>AI ACADEMIC MENTOR READY</span>
              </div>
              <h3 className="text-base font-bold text-white">Smart Interactive Mascot</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Eyes automatically close during password typing for privacy. Supports real-time viva audio & logic review.
              </p>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="w-full grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 pt-2">
            {stats.map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 25, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.4, delay: 0.08 * idx, type: 'spring', stiffness: 120 }}
                  whileHover={{ y: -6, scale: 1.02, borderColor: 'rgba(6, 182, 212, 0.6)', boxShadow: '0 10px 25px -5px rgba(6, 182, 212, 0.25)' }}
                  className="p-3.5 sm:p-4 rounded-2xl border border-slate-800 bg-slate-900/70 backdrop-blur-md shadow-lg transition-all"
                >
                  <div className="flex items-center gap-2 mb-1.5 min-w-0">
                    <div className="p-1.5 rounded-lg bg-cyan-950/80 border border-cyan-500/30 text-cyan-400 shrink-0">
                      <Icon className="h-4 w-4" />
                    </div>
                    <span className="text-base sm:text-lg font-bold font-mono text-white tracking-tight truncate">{stat.value}</span>
                  </div>
                  <div className="text-xs font-bold text-slate-200 truncate">{stat.label}</div>
                  <div className="text-[10px] text-slate-400 truncate">{stat.desc}</div>
                </motion.div>
              );
            })}
          </div>

        </motion.div>

        {/* Right Column: Glassmorphic Register Form Container */}
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
          className="lg:col-span-6 w-full max-w-lg mx-auto"
        >
          <div className="relative rounded-3xl border border-slate-800/90 bg-slate-900/80 backdrop-blur-2xl p-6 sm:p-8 shadow-[0_20px_60px_rgba(6,182,212,0.12)] space-y-5">
            
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <h2 className="text-xl font-bold font-mono tracking-tight text-white flex items-center gap-2">
                  <span>Create Account</span>
                  <span className="text-xs px-2 py-0.5 rounded-md bg-cyan-950 border border-cyan-500/30 text-cyan-300 font-normal">Developer Profile</span>
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">Quick registration with Gmail & Password Generator</p>
              </div>

              <button
                onClick={onGoToLogin}
                className="text-xs font-mono font-bold text-cyan-400 hover:text-cyan-300 transition-colors flex items-center gap-1 group"
              >
                <span>Sign In</span>
                <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {error && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-xl border border-rose-500/40 bg-rose-950/60 p-3 text-xs text-rose-300 font-mono flex items-center gap-2"
              >
                <span className="text-rose-400 font-bold">⚠️</span>
                <span>{error}</span>
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Full Name */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1 font-mono">Full Name</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500 group-focus-within:text-cyan-400 transition-colors">
                    <User className="h-4 w-4" />
                  </div>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={e => setFullName(e.target.value)}
                    placeholder="e.g. Ashwani Rai"
                    className="block w-full rounded-xl border border-slate-700 bg-slate-950/90 pl-10 pr-3 py-2.5 text-xs text-white placeholder-slate-500 focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 font-mono transition-all"
                  />
                </div>
              </div>

              {/* Email Address */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1 font-mono">Gmail / Email Address</label>
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
                    className="block w-full rounded-xl border border-slate-700 bg-slate-950/90 pl-10 pr-3 py-2.5 text-xs text-white placeholder-slate-500 focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 font-mono transition-all"
                  />
                </div>
              </div>

              {/* Target Engineering Role */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1 font-mono">Target Engineering Role</label>
                <select
                  value={targetRole}
                  onChange={e => setTargetRole(e.target.value)}
                  className="block w-full rounded-xl border border-slate-700 bg-slate-950/90 px-3 py-2.5 text-xs text-white focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 font-mono transition-all cursor-pointer"
                >
                  <option value="Full Stack Software Engineer">Full Stack Software Engineer</option>
                  <option value="Backend & Distributed Systems Developer">Backend & Distributed Systems Developer</option>
                  <option value="Frontend Engineering Lead">Frontend Engineering Lead</option>
                  <option value="AI / ML & Data Scientist">AI / ML & Data Scientist</option>
                  <option value="DevOps & Cloud Engineer">DevOps & Cloud Engineer</option>
                  <option value="Mobile App Developer (Android/iOS)">Mobile App Developer (Android/iOS)</option>
                </select>
              </div>

              {/* Password Generator Box */}
              <div className="p-3.5 rounded-2xl border border-cyan-500/30 bg-cyan-950/30 backdrop-blur-md space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono font-bold text-cyan-300 flex items-center gap-1.5">
                    <KeyRound className="h-3.5 w-3.5 text-cyan-400" />
                    Auto Password Generator
                  </span>
                  <button
                    type="button"
                    onClick={generatePassword}
                    className="flex items-center gap-1 text-[10px] font-mono font-bold px-2.5 py-1 rounded-lg bg-cyan-500 text-slate-950 hover:brightness-110 transition-all cursor-pointer shadow-md shadow-cyan-500/20"
                  >
                    <RefreshCw className="h-3 w-3" />
                    <span>Generate Password</span>
                  </button>
                </div>

                {password && (
                  <div className="flex items-center justify-between bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                    <code className="text-xs font-mono font-bold text-emerald-400 truncate">{password}</code>
                    <button
                      type="button"
                      onClick={copyPasswordToClipboard}
                      className="p-1 text-slate-400 hover:text-white transition-colors cursor-pointer"
                      title="Copy generated password"
                    >
                      {copied ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
                    </button>
                  </div>
                )}
              </div>

              {/* Password Inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1 font-mono">Password 🔑</label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500 group-focus-within:text-cyan-400 transition-colors">
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
                      className="block w-full rounded-xl border border-slate-700 bg-slate-950/90 pl-9 pr-8 py-2.5 text-xs text-white focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 font-mono transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-2.5 flex items-center text-slate-400 hover:text-white"
                    >
                      {showPassword ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1 font-mono">Confirm 🔑</label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500 group-focus-within:text-cyan-400 transition-colors">
                      <Lock className="h-4 w-4" />
                    </div>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={confirmPassword}
                      onChange={e => setConfirmPassword(e.target.value)}
                      onFocus={() => setIsPasswordFocused(true)}
                      onBlur={() => setIsPasswordFocused(false)}
                      placeholder="••••••••"
                      className="block w-full rounded-xl border border-slate-700 bg-slate-950/90 pl-9 pr-8 py-2.5 text-xs text-white focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 font-mono transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-2.5 flex items-center text-slate-400 hover:text-white"
                    >
                      {showPassword ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                    </button>
                  </div>
                </div>
              </div>

              {/* Password Strength Gauge */}
              {password.length > 0 && (
                <div className="space-y-1 pt-1">
                  <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                    <span>Security Strength</span>
                    <span className={strength >= 4 ? 'text-emerald-400 font-bold' : strength >= 2 ? 'text-amber-400' : 'text-rose-400'}>
                      {strength >= 4 ? 'Very Strong' : strength >= 2 ? 'Good' : 'Weak'}
                    </span>
                  </div>
                  <div className="flex h-1.5 w-full gap-1">
                    {[1, 2, 3, 4, 5].map(step => (
                      <div
                        key={step}
                        className={`h-full flex-1 rounded-full transition-all duration-300 ${
                          step <= strength
                            ? strength >= 4 ? 'bg-emerald-500' : strength >= 2 ? 'bg-amber-500' : 'bg-rose-500'
                            : 'bg-slate-800'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Submit Button */}
              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 via-sky-500 to-indigo-600 py-3.5 text-xs font-bold text-slate-950 shadow-lg shadow-cyan-500/25 hover:brightness-110 transition-all disabled:opacity-50 mt-2 font-mono cursor-pointer"
              >
                {loading ? (
                  <div className="h-4 w-4 rounded-full border-2 border-slate-950 border-t-transparent animate-spin" />
                ) : (
                  <>
                    <ShieldCheck className="h-4 w-4" />
                    <span>Create Account & Register Profile 🚀</span>
                  </>
                )}
              </motion.button>

            </form>

            <div className="pt-3 border-t border-slate-800 text-center">
              <p className="text-xs text-slate-400">
                Already registered?{' '}
                <button onClick={onGoToLogin} className="text-cyan-400 font-bold hover:underline font-mono">
                  Sign In to Your Account
                </button>
              </p>
            </div>

          </div>
        </motion.div>

      </div>

    </div>
  );
};

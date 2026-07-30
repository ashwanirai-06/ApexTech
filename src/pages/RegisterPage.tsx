import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, ShieldCheck, Sparkles, KeyRound, Copy, Check, RefreshCw } from 'lucide-react';
import { HuskyExaminerAvatar } from '../components/HuskyExaminerAvatar';

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

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-950 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <div className="flex justify-center mb-3">
          <HuskyExaminerAvatar
            isSpeaking={false}
            isListening={false}
            isEvaluating={false}
            isClosedEyes={isPasswordFocused || (!showPassword && password.length > 0)}
            examinerName="EduCore AI Academic Mentor"
          />
        </div>
        <div className="inline-flex items-center gap-1.5 rounded-full border border-cyan-500/30 bg-cyan-950/40 px-3 py-1 text-xs text-cyan-300 mb-3 font-mono">
          <Sparkles className="h-4 w-4 text-cyan-400" />
          <span>Quick Gmail / Email Registration</span>
        </div>
        <h2 className="text-2xl font-bold font-mono tracking-tight text-white">
          Create Developer Profile
        </h2>
        <p className="mt-1 text-xs text-slate-400">
          Sign up with your Gmail & generate a strong secure password instantly.
        </p>
      </div>

      <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="border border-slate-800 bg-slate-900/80 px-6 py-8 shadow-2xl rounded-2xl backdrop-blur-xl">
          
          {error && (
            <div className="mb-4 rounded-xl border border-rose-500/30 bg-rose-950/40 p-3 text-xs text-rose-300 font-mono">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Full Name */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Full Name</label>
              <input
                type="text"
                required
                value={fullName}
                onChange={e => setFullName(e.target.value)}
                placeholder="e.g. Ashwani Rai"
                className="block w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2.5 text-xs text-white focus:border-cyan-500 focus:outline-none"
              />
            </div>

            {/* Email Address */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Gmail / Email Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                  <Mail className="h-4 w-4" />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="student@gmail.com"
                  className="block w-full rounded-xl border border-slate-700 bg-slate-950 pl-10 pr-3 py-2.5 text-xs text-white focus:border-cyan-500 focus:outline-none font-mono"
                />
              </div>
            </div>

            {/* Target Tech Role & Primary Tech Stack */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Target Engineering Role</label>
              <select
                value={targetRole}
                onChange={e => setTargetRole(e.target.value)}
                className="block w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2.5 text-xs text-white focus:border-cyan-500 focus:outline-none font-mono"
              >
                <option value="Full Stack Software Engineer">Full Stack Software Engineer</option>
                <option value="Backend & Distributed Systems Developer">Backend & Distributed Systems Developer</option>
                <option value="Frontend Engineering Lead">Frontend Engineering Lead</option>
                <option value="AI / ML & Data Scientist">AI / ML & Data Scientist</option>
                <option value="DevOps & Cloud Engineer">DevOps & Cloud Engineer</option>
                <option value="Mobile App Developer (Android/iOS)">Mobile App Developer (Android/iOS)</option>
              </select>
            </div>

            {/* Password Generator Feature */}
            <div className="p-3.5 rounded-xl border border-cyan-500/30 bg-cyan-950/20 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono font-bold text-cyan-300 flex items-center gap-1.5">
                  <KeyRound className="h-3.5 w-3.5 text-cyan-400" />
                  Auto Password Generator
                </span>
                <button
                  type="button"
                  onClick={generatePassword}
                  className="flex items-center gap-1 text-[10px] font-mono font-bold px-2.5 py-1 rounded-lg bg-cyan-500 text-slate-950 hover:brightness-110 transition-all"
                >
                  <RefreshCw className="h-3 w-3" />
                  <span>Generate Password</span>
                </button>
              </div>

              {password && (
                <div className="flex items-center justify-between bg-slate-950 p-2 rounded-lg border border-slate-800">
                  <code className="text-xs font-mono font-bold text-emerald-400 truncate">{password}</code>
                  <button
                    type="button"
                    onClick={copyPasswordToClipboard}
                    className="p-1 text-slate-400 hover:text-white transition-colors"
                    title="Copy generated password"
                  >
                    {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                  </button>
                </div>
              )}
            </div>

            {/* Password Inputs */}
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Password 🔑</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
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
                    className="block w-full rounded-xl border border-slate-700 bg-slate-950 pl-10 pr-10 py-2.5 text-xs text-white focus:border-cyan-500 focus:outline-none font-mono"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-white"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Confirm Password 🔑</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
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
                    className="block w-full rounded-xl border border-slate-700 bg-slate-950 pl-10 pr-10 py-2.5 text-xs text-white focus:border-cyan-500 focus:outline-none font-mono"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-white"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
            </div>

            {/* Strength meter */}
            {password.length > 0 && (
              <div className="space-y-1">
                <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                  <span>Security Rating</span>
                  <span className={strength >= 4 ? 'text-emerald-400 font-bold' : strength >= 2 ? 'text-amber-400' : 'text-rose-400'}>
                    {strength >= 4 ? 'Very Strong' : strength >= 2 ? 'Good' : 'Weak'}
                  </span>
                </div>
                <div className="flex h-1.5 w-full gap-1">
                  {[1, 2, 3, 4, 5].map(step => (
                    <div
                      key={step}
                      className={`h-full flex-1 rounded-full transition-colors ${
                        step <= strength
                          ? strength >= 4 ? 'bg-emerald-500' : strength >= 2 ? 'bg-amber-500' : 'bg-rose-500'
                          : 'bg-slate-800'
                      }`}
                    />
                  ))}
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 py-3 text-xs font-bold text-slate-950 shadow-lg shadow-cyan-500/20 hover:brightness-110 transition-all disabled:opacity-50 mt-4 font-mono"
            >
              {loading ? (
                <div className="h-4 w-4 rounded-full border-2 border-slate-950 border-t-transparent animate-spin" />
              ) : (
                <>
                  <ShieldCheck className="h-4 w-4" />
                  <span>Create Account</span>
                </>
              )}
            </button>

          </form>

          <p className="mt-6 text-center text-xs text-slate-400">
            Already registered?{' '}
            <button onClick={onGoToLogin} className="text-cyan-400 font-bold hover:underline">
              Sign In to Your Account
            </button>
          </p>

        </div>
      </div>

    </div>
  );
};

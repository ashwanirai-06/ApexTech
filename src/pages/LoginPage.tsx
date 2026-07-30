import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, LogIn, KeyRound, Sparkles, RefreshCw, Copy, Check } from 'lucide-react';
import { HuskyExaminerAvatar } from '../components/HuskyExaminerAvatar';

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
      setError('Please enter a valid email address.');
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

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-950 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      
      <div className="sm:mx-auto sm:w-full sm:max-w-md relative">
        <div className="border border-slate-800/80 bg-slate-900/95 px-6 py-8 shadow-2xl shadow-cyan-950/50 rounded-3xl backdrop-blur-xl">

          <div className="flex justify-center mb-3">
            <HuskyExaminerAvatar
              isSpeaking={false}
              isListening={false}
              isEvaluating={false}
              isClosedEyes={isPasswordFocused || (!showPassword && password.length > 0)}
              examinerName="EduCore AI Academic Mentor"
            />
          </div>

          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-1.5 rounded-full border border-cyan-500/30 bg-cyan-950/60 px-3 py-1 text-xs text-cyan-300 mb-3 font-mono">
              <Sparkles className="h-3.5 w-3.5 text-cyan-400" />
              <span>Developer & Tech Student Portal</span>
            </div>
            <h2 className="text-2xl font-bold font-mono tracking-tight text-white">
              Sign In to ApexTech
            </h2>
            <p className="mt-1 text-xs text-slate-400">
              Access Striver, PW, CodeChef & Apna College Sheets and Domain Roadmaps
            </p>
          </div>
          
          {error && (
            <div className="mb-4 rounded-xl border border-rose-500/30 bg-rose-950/40 p-3 text-xs text-rose-300 font-mono">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Email Address */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Gmail / Email Address ✉️
              </label>
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
                  className="block w-full rounded-xl border border-slate-700 bg-slate-950/80 pl-10 pr-3 py-2.5 text-xs text-white placeholder-slate-500 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500/50 font-mono"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Password 🔑
              </label>
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
                  className="block w-full rounded-xl border border-slate-700 bg-slate-950/80 pl-10 pr-10 py-2.5 text-xs text-white placeholder-slate-500 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500/50 font-mono"
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

            {/* Remember & Forgot */}
            <div className="flex items-center justify-between text-xs">
              <label className="flex items-center gap-2 text-slate-400 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={e => setRememberMe(e.target.checked)}
                  className="rounded border-slate-700 bg-slate-950 text-cyan-500 focus:ring-cyan-500"
                />
                <span>Remember session</span>
              </label>

              <button
                type="button"
                onClick={() => setShowForgotPasswordModal(true)}
                className="text-cyan-400 hover:underline font-medium"
              >
                Forgot Password?
              </button>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 py-3 text-xs font-bold text-slate-950 shadow-lg shadow-cyan-500/20 hover:brightness-110 transition-all disabled:opacity-50 font-mono"
            >
              {loading ? (
                <div className="h-4 w-4 rounded-full border-2 border-slate-950 border-t-transparent animate-spin" />
              ) : (
                <>
                  <LogIn className="h-4 w-4" />
                  <span>Login to ApexTech Portal 🚀</span>
                </>
              )}
            </button>

          </form>

          <p className="mt-6 text-center text-xs text-slate-400">
            Don't have an account?{' '}
            <button onClick={onGoToRegister} className="text-cyan-400 font-bold hover:underline">
              Create Account & Generate Password ✨
            </button>
          </p>

        </div>
      </div>

      {/* Forgot Password Modal */}
      {showForgotPasswordModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">
          <div className="w-full max-w-sm rounded-2xl border border-slate-800 bg-slate-900 p-6 text-white shadow-2xl">
            <h3 className="text-lg font-bold font-mono text-cyan-300 mb-2">Password Recovery</h3>
            <p className="text-xs text-slate-400 mb-4 leading-relaxed">
              Enter your registered Gmail or email address to receive password reset instructions.
            </p>
            <input
              type="email"
              placeholder="student@gmail.com"
              className="block w-full rounded-xl border border-slate-700 bg-slate-950 p-2.5 text-xs text-white mb-4 font-mono"
            />
            <div className="flex gap-2">
              <button
                onClick={() => setShowForgotPasswordModal(false)}
                className="w-1/2 rounded-xl border border-slate-700 bg-slate-950 py-2 text-xs font-medium text-slate-300"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  alert('Reset link sent to registered email address!');
                  setShowForgotPasswordModal(false);
                }}
                className="w-1/2 rounded-xl bg-cyan-500 py-2 text-xs font-bold text-slate-950"
              >
                Send Reset Link
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { User } from './types';
import { openTopicVideo } from './utils/videoUtils';
import { DBService } from './db/dbService';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { ThemeProvider, useTheme } from './context/ThemeContext';

// Pages
import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { DashboardPage } from './pages/DashboardPage';
import { DomainRoadmapsPage } from './pages/DomainRoadmapsPage';
import { DSAMasteryPage } from './pages/DSAMasteryPage';
import { StudyPlannerPage } from './pages/StudyPlannerPage';
import { ResourcesPage } from './pages/ResourcesPage';
import { CodeReviewerPage } from './pages/CodeReviewerPage';
import { WeakConceptDrillsPage } from './pages/WeakConceptDrillsPage';
import { HistoryPage } from './pages/HistoryPage';
import { AnalyticsPage } from './pages/AnalyticsPage';
import { ProfilePage } from './pages/ProfilePage';
import { SettingsPage } from './pages/SettingsPage';
import { RecommendationsPage } from './pages/RecommendationsPage';
import { QuestionBankPage } from './pages/QuestionBankPage';
import { AIVivaRoomPage } from './pages/AIVivaRoomPage';

export default function App() {
  return (
    <ThemeProvider>
      <MainAppContent />
    </ThemeProvider>
  );
}

function MainAppContent() {
  const [dbReady, setDbReady] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState<string>('register');
  const [demoMode, setDemoMode] = useState<boolean>(true);

  // Cross-page selection state
  const [selectedSubjectCode, setSelectedSubjectCode] = useState<string>('DSA-101');
  const [selectedTopic, setSelectedTopic] = useState<string>('Arrays, Two Pointers & Sliding Window');
  const [resourceTopic, setResourceTopic] = useState<string>('');
  const [selectedCompany, setSelectedCompany] = useState<string>('All');

  // Theme state from Context
  const { themeConfig, currentThemeId, setTheme } = useTheme();

  // Initialize Database and Restore Login Session
  useEffect(() => {
    DBService.init().then(() => {
      setDbReady(true);
      
      const savedUser = localStorage.getItem('apextech_user') || localStorage.getItem('kalamverse_user') || localStorage.getItem('vivaai_user');
      if (savedUser) {
        try {
          const parsed = JSON.parse(savedUser);
          setUser(parsed);
          setActiveTab('dashboard');
        } catch (e) {
          console.error('Failed to parse saved session, loading default profile', e);
          setUser(null);
          setActiveTab('login');
        }
      } else {
        setUser(null);
        setActiveTab('register');
      }
    });
  }, []);

  // Strict route protection: redirect unauthenticated users attempting to access private routes
  useEffect(() => {
    if (dbReady && !user && activeTab !== 'landing' && activeTab !== 'login' && activeTab !== 'register') {
      setActiveTab('login');
    }
  }, [user, activeTab, dbReady]);

  const handleLoginSuccess = (userData: User) => {
    setUser(userData);
    localStorage.setItem('apextech_user', JSON.stringify(userData));
    setActiveTab('dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('apextech_user');
    localStorage.removeItem('kalamverse_user');
    localStorage.removeItem('vivaai_user');
    setActiveTab('login');
  };

  const handleSelectSubjectForRoadmap = (subjectCode: string, topic?: string) => {
    setSelectedSubjectCode(subjectCode);
    if (topic) setSelectedTopic(topic);
    setActiveTab('questionbank');
  };

  if (!dbReady) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-[#020204] text-cyan-400">
        <div className="flex flex-col items-center gap-3">
          <div className="h-10 w-10 rounded-full border-4 border-cyan-500 border-t-transparent animate-spin" />
          <p className="font-mono text-xs font-semibold tracking-wider uppercase text-cyan-300">Booting ApexTech Engine...</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen font-sans selection:bg-cyan-500 selection:text-slate-950 flex flex-col relative overflow-x-hidden transition-colors duration-300 ${
        themeConfig.mode === 'light' ? 'bg-slate-100 text-slate-900' : 'text-slate-300'
      }`}
      style={{
        backgroundColor: themeConfig.bgHex
      }}
    >
      
      {/* Background Radial Glows matching current theme */}
      <div 
        className="fixed -top-[10%] -left-[5%] w-[45%] h-[45%] rounded-full blur-[120px] pointer-events-none z-0"
        style={{ backgroundColor: themeConfig.glowColor || 'rgba(6, 182, 212, 0.15)' }}
      ></div>
      <div 
        className="fixed -bottom-[10%] -right-[5%] w-[45%] h-[45%] rounded-full blur-[120px] pointer-events-none z-0"
        style={{ backgroundColor: themeConfig.glowColor || 'rgba(99, 102, 241, 0.15)' }}
      ></div>

      {/* Top Navbar */}
      <Navbar
        user={user}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        demoMode={demoMode}
        setDemoMode={setDemoMode}
        onLogout={handleLogout}
      />

      {/* Main Container */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="flex-1 flex flex-col w-full"
        >
          {activeTab === 'landing' ? (
            <LandingPage
              onStart={() => setActiveTab(user ? 'dashboard' : 'register')}
              onLogin={() => setActiveTab('login')}
            />
          ) : activeTab === 'login' ? (
            <LoginPage
              onLoginSuccess={handleLoginSuccess}
              onGoToRegister={() => setActiveTab('register')}
            />
          ) : activeTab === 'register' ? (
            <RegisterPage
              onRegisterSuccess={handleLoginSuccess}
              onGoToLogin={() => setActiveTab('login')}
            />
          ) : (
            <div className="flex flex-1">
              {/* Sidebar */}
              <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

              {/* Page Views */}
              <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full overflow-y-auto">
                {activeTab === 'dashboard' && user && (
                  <DashboardPage
                    user={user}
                    setActiveTab={setActiveTab}
                    onSelectSubjectForViva={handleSelectSubjectForRoadmap}
                    onSelectCompany={(company) => {
                      setSelectedCompany(company);
                      setActiveTab('questionbank');
                    }}
                  />
                )}

                {activeTab === 'domains' && (
                  <DomainRoadmapsPage onStartViva={handleSelectSubjectForRoadmap} />
                )}

                {(activeTab === 'questionbank' ||
                  activeTab === 'questionbank-company' ||
                  activeTab === 'questionbank-topic' ||
                  activeTab === 'questionbank-diff' ||
                  activeTab === 'saved') && (
                  <QuestionBankPage
                    initialTopic={resourceTopic}
                    initialCompany={selectedCompany}
                    onSelectTopicForPractice={handleSelectSubjectForRoadmap}
                  />
                )}

                {(activeTab === 'dsa' ||
                  activeTab === 'dsa-striver' ||
                  activeTab === 'dsa-beginner' ||
                  activeTab === 'dsa-advanced' ||
                  activeTab === 'dsa-progress') && (
                  <DSAMasteryPage
                    initialFilter={activeTab.startsWith('dsa-') ? activeTab.replace('dsa-', '') : undefined}
                    onStartVivaForTopic={handleSelectSubjectForRoadmap}
                  />
                )}

                {activeTab.startsWith('domain-') && (
                  <QuestionBankPage
                    initialTopic={activeTab.replace('domain-', '')}
                    onSelectTopicForPractice={handleSelectSubjectForRoadmap}
                  />
                )}

                {(activeTab === 'mock-interview' || activeTab === 'mock-interview-viva') && user && (
                  <AIVivaRoomPage
                    user={user}
                    initialSubjectCode={selectedSubjectCode}
                    initialTopic={selectedTopic}
                  />
                )}

                {activeTab === 'history' && <HistoryPage />}

                {activeTab === 'planner' && <StudyPlannerPage />}

                {activeTab === 'resources' && (
                  <ResourcesPage initialTopic={resourceTopic} />
                )}

                {activeTab === 'code' && <CodeReviewerPage />}

                {activeTab === 'weaks' && <WeakConceptDrillsPage />}

                {(activeTab === 'analytics' || activeTab === 'analytics-progress' || activeTab === 'analytics-skills') && user && (
                  <AnalyticsPage userId={user.id} />
                )}

                {activeTab === 'recommendations' && (
                  <RecommendationsPage onStartViva={handleSelectSubjectForRoadmap} />
                )}

                {(activeTab === 'profile' || activeTab === 'achievements') && user && (
                  <ProfilePage user={user} onLogout={handleLogout} />
                )}

                {(activeTab === 'settings' || activeTab === 'settings-theme' || activeTab === 'resume') && (
                  <SettingsPage
                    demoMode={demoMode}
                    setDemoMode={setDemoMode}
                    currentTheme={currentThemeId}
                    onThemeChange={setTheme}
                    onLogout={handleLogout}
                  />
                )}
              </main>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

    </div>
  );
}

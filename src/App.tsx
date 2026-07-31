import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { User } from './types';
import { openTopicVideo } from './utils/videoUtils';
import { DBService } from './db/dbService';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';

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
import { WeakTopicsPage } from './pages/WeakTopicsPage';
import { AnalyticsPage } from './pages/AnalyticsPage';
import { ProfilePage } from './pages/ProfilePage';
import { SettingsPage } from './pages/SettingsPage';
import { RecommendationsPage } from './pages/RecommendationsPage';
import { QuestionBankPage } from './pages/QuestionBankPage';

export default function App() {
  const [dbReady, setDbReady] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState<string>('register');
  const [demoMode, setDemoMode] = useState<boolean>(true);

  // Cross-page selection state
  const [selectedSubjectCode, setSelectedSubjectCode] = useState<string>('DSA-101');
  const [selectedTopic, setSelectedTopic] = useState<string>('Arrays, Two Pointers & Sliding Window');
  const [resourceTopic, setResourceTopic] = useState<string>('Data Structures - Trees & Graphs');

  // Theme State
  const [currentTheme, setCurrentTheme] = useState<string>(() => {
    return localStorage.getItem('apextech_theme') || localStorage.getItem('kalamverse_theme') || 'cyan';
  });

  const handleThemeChange = (newTheme: string) => {
    setCurrentTheme(newTheme);
    localStorage.setItem('apextech_theme', newTheme);
  };

  // Initialize Database and Restore Login Session
  useEffect(() => {
    DBService.init().then(() => {
      setDbReady(true);
      
      // Auto-restore logged-in session from localStorage
      const savedUser = localStorage.getItem('apextech_user') || localStorage.getItem('kalamverse_user') || localStorage.getItem('vivaai_user');
      if (savedUser) {
        try {
          const parsed = JSON.parse(savedUser);
          setUser(parsed);
          setActiveTab('dashboard');
        } catch (e) {
          console.error('Failed to parse saved session, loading default profile', e);
        }
      } else {
        // Default Tech & Developer profile
       
  setUser(null);
  setActiveTab('register');
}
    });
  }, []);

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
    setActiveTab('domains');
  };

  const handleGenerateRoadmapForSubject = (subjectCode: string) => {
    setSelectedSubjectCode(subjectCode);
    setActiveTab('domains');
  };

  const handleSearchVideosForTopic = (topicName: string) => {
    setResourceTopic(topicName);
    openTopicVideo(topicName);
    setActiveTab('resources');
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

  const bgThemeClass = currentTheme === 'yellow'
    ? 'bg-[#181402]'
    : currentTheme === 'emerald'
    ? 'bg-[#02120b]'
    : currentTheme === 'purple'
    ? 'bg-[#0c061a]'
    : currentTheme === 'rose'
    ? 'bg-[#1a0510]'
    : currentTheme === 'neon'
    ? 'bg-[#031c17]'
    : currentTheme === 'amber'
    ? 'bg-[#18040a]'
    : currentTheme === 'oled'
    ? 'bg-black'
    : currentTheme === 'slate'
    ? 'bg-[#0f172a]'
    : 'bg-[#020204]';

  return (
    <div className={`min-h-screen ${bgThemeClass} text-slate-300 font-sans selection:bg-cyan-500 selection:text-slate-950 flex flex-col relative overflow-x-hidden transition-colors duration-500`}>
      
      {/* Background Radial Glows */}
      <div className="fixed -top-[10%] -left-[5%] w-[45%] h-[45%] rounded-full bg-cyan-600/5 blur-[120px] pointer-events-none z-0"></div>
      <div className="fixed -bottom-[10%] -right-[5%] w-[45%] h-[45%] rounded-full bg-indigo-600/5 blur-[120px] pointer-events-none z-0"></div>

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
                  />
                )}

                {activeTab === 'domains' && (
                  <DomainRoadmapsPage onStartViva={handleSelectSubjectForRoadmap} />
                )}

                {activeTab === 'questionbank' && (
                  <QuestionBankPage
                    initialTopic={resourceTopic}
                    onSelectTopicForPractice={handleSelectSubjectForRoadmap}
                  />
                )}

                {activeTab === 'dsa' && (
                  <DSAMasteryPage onStartVivaForTopic={handleSelectSubjectForRoadmap} />
                )}

                {activeTab === 'planner' && <StudyPlannerPage />}

                {activeTab === 'resources' && (
                  <ResourcesPage initialTopic={resourceTopic} />
                )}

                {activeTab === 'code' && <CodeReviewerPage />}

                {activeTab === 'weaks' && user && (
                  <WeakTopicsPage
                    userId={user.id}
                    onPracticeTopic={handleSelectSubjectForRoadmap}
                  />
                )}

                {activeTab === 'analytics' && user && (
                  <AnalyticsPage userId={user.id} />
                )}

                {activeTab === 'recommendations' && (
                  <RecommendationsPage onStartViva={handleSelectSubjectForRoadmap} />
                )}

                {activeTab === 'profile' && user && <ProfilePage user={user} onLogout={handleLogout} />}

                {activeTab === 'settings' && (
                  <SettingsPage
                    demoMode={demoMode}
                    setDemoMode={setDemoMode}
                    currentTheme={currentTheme}
                    onThemeChange={handleThemeChange}
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

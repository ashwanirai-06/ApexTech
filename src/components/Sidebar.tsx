import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useTheme } from '../context/ThemeContext';
import {
  Home,
  Database,
  Terminal,
  History,
  Settings,
  Palette,
  ChevronLeft,
  ChevronRight,
  X,
  Zap,
  BookOpen,
  Sparkles,
  Layers,
  Compass,
  BarChart3,
  User,
  Building2,
  Check
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const {
    currentThemeId,
    themeConfig,
    setTheme,
    isCollapsed,
    toggleCollapse,
    isMobileOpen,
    setIsMobileOpen
  } = useTheme();

  const [showThemePicker, setShowThemePicker] = useState(false);

  // Available themes as per requirements
  const themeOptions = [
    { id: 'default-blue', name: 'Blue', color: 'bg-cyan-500' },
    { id: 'green', name: 'Green', color: 'bg-emerald-500' },
    { id: 'yellow', name: 'Yellow', color: 'bg-yellow-500' },
    { id: 'magenta', name: 'Magenta', color: 'bg-fuchsia-500' },
    { id: 'purple', name: 'Purple', color: 'bg-purple-500' },
    { id: 'ocean', name: 'Ocean', color: 'bg-teal-500' },
    { id: 'navy-blue', name: 'Navy Blue', color: 'bg-blue-600' },
    { id: 'sky-blue', name: 'Sky Blue', color: 'bg-sky-400' },
    { id: 'dark', name: 'Dark', color: 'bg-slate-700' },
    { id: 'light', name: 'Light', color: 'bg-slate-200' }
  ];

  const primaryNavItems = [
    { id: 'dashboard', label: 'Home', icon: Home },
    { id: 'questionbank', label: 'Questions', icon: Database },
    { id: 'dsa', label: 'Practice', icon: Terminal },
    { id: 'history', label: 'History', icon: History },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  const secondaryNavItems = [
    { id: 'domains', label: 'Roadmaps', icon: Compass },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'profile', label: 'Profile', icon: User }
  ];

  const isLight = themeConfig.mode === 'light';

  const renderContent = () => (
    <div className="flex flex-col justify-between h-full font-sans">
      
      {/* Top Header & Collapse Toggle */}
      <div className={`p-4 border-b flex items-center justify-between shrink-0 ${
        isLight ? 'border-slate-200' : 'border-slate-800/80'
      }`}>
        {!isCollapsed && (
          <div className="flex items-center gap-3">
            <div className={`p-2.5 rounded-xl bg-gradient-to-br ${themeConfig.accentGradient} text-slate-950 font-bold shadow-md`}>
              <Zap className="h-5 w-5 text-white" />
            </div>
            <div>
              <span className={`text-base font-extrabold tracking-wide block ${isLight ? 'text-slate-900' : 'text-white'}`}>
                APEXTECH
              </span>
              <span className="text-[10px] text-slate-400 font-mono tracking-wider uppercase block">
                AI Interview Platform
              </span>
            </div>
          </div>
        )}

        {isCollapsed && (
          <div className={`mx-auto p-2 rounded-xl bg-gradient-to-br ${themeConfig.accentGradient} text-white shadow-md`}>
            <Zap className="h-5 w-5 text-white" />
          </div>
        )}

        <button
          onClick={toggleCollapse}
          className={`hidden md:flex p-2 rounded-xl transition-all cursor-pointer ${
            isLight
              ? 'hover:bg-slate-200 text-slate-600 hover:text-slate-900'
              : 'hover:bg-slate-800/80 text-slate-400 hover:text-white border border-transparent hover:border-slate-800'
          }`}
          title={isCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
        >
          {isCollapsed ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
        </button>
      </div>

      {/* Nav Menu List */}
      <div className="flex-1 overflow-y-auto px-3 py-5 space-y-6 scrollbar-thin">
        
        {/* Main Required Navigation */}
        <div className="space-y-1.5">
          {!isCollapsed && (
            <p className="px-3 text-xs font-mono font-bold tracking-widest text-slate-400 uppercase mb-2">
              Main Menu
            </p>
          )}

          {primaryNavItems.map(item => {
            const Icon = item.icon;
            const isActive = activeTab === item.id || (item.id === 'questionbank' && activeTab.startsWith('questionbank'));

            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setIsMobileOpen(false);
                }}
                title={isCollapsed ? item.label : undefined}
                className={`group relative flex w-full items-center gap-3.5 px-3.5 py-3 text-sm font-semibold rounded-2xl transition-all duration-200 cursor-pointer ${
                  isActive
                    ? `${themeConfig.activeTabClass} shadow-md`
                    : isLight
                    ? 'text-slate-700 hover:bg-slate-200/80 hover:text-slate-950'
                    : 'text-slate-300 hover:bg-slate-900/90 hover:text-white border border-transparent hover:border-slate-800'
                } ${isCollapsed ? 'justify-center px-2.5 py-3' : ''}`}
              >
                <Icon
                  className={`h-5 w-5 shrink-0 transition-transform duration-200 group-hover:scale-110 ${
                    isActive ? themeConfig.textAccentClass : 'text-slate-400 group-hover:text-white'
                  }`}
                />

                {!isCollapsed && (
                  <span className="truncate font-sans font-semibold text-sm tracking-wide">
                    {item.label}
                  </span>
                )}

                {!isCollapsed && isActive && (
                  <span className={`ml-auto w-2 h-2 rounded-full animate-ping ${
                    themeConfig.accentHex ? 'bg-cyan-400' : 'bg-blue-500'
                  }`} />
                )}
              </button>
            );
          })}
        </div>

        {/* Learning & Tools */}
        <div className="space-y-1.5 pt-2 border-t border-slate-800/40">
          {!isCollapsed && (
            <p className="px-3 text-xs font-mono font-bold tracking-widest text-slate-400 uppercase mb-2">
              Explore & Tools
            </p>
          )}

          {secondaryNavItems.map(item => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setIsMobileOpen(false);
                }}
                title={isCollapsed ? item.label : undefined}
                className={`group relative flex w-full items-center gap-3.5 px-3.5 py-2.5 text-sm font-medium rounded-2xl transition-all duration-200 cursor-pointer ${
                  isActive
                    ? `${themeConfig.activeTabClass} shadow-md`
                    : isLight
                    ? 'text-slate-600 hover:bg-slate-200/80 hover:text-slate-900'
                    : 'text-slate-400 hover:bg-slate-900/90 hover:text-white border border-transparent hover:border-slate-800'
                } ${isCollapsed ? 'justify-center px-2.5 py-3' : ''}`}
              >
                <Icon className="h-5 w-5 shrink-0 text-slate-400 group-hover:text-white" />
                {!isCollapsed && (
                  <span className="truncate font-sans font-medium text-sm">
                    {item.label}
                  </span>
                )}
              </button>
            );
          })}
        </div>

      </div>

      {/* Bottom Section: Theme Selector */}
      <div className={`p-4 border-t shrink-0 ${
        isLight ? 'border-slate-200 bg-slate-100/50' : 'border-slate-800/80 bg-slate-950/40'
      }`}>
        {!isCollapsed ? (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <Palette className={`h-4 w-4 ${themeConfig.textAccentClass}`} />
                <span>Theme Selector</span>
              </span>
              <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-md ${themeConfig.badgeClass}`}>
                {themeConfig.name.split(' ')[0]}
              </span>
            </div>

            {/* Theme Selector Options */}
            <div className="grid grid-cols-5 gap-1.5 pt-1">
              {themeOptions.map(t => {
                const isSelected = currentThemeId === t.id;
                return (
                  <button
                    key={t.id}
                    onClick={() => setTheme(t.id)}
                    title={t.name}
                    className={`h-7 rounded-xl flex items-center justify-center transition-all cursor-pointer relative ${t.color} ${
                      isSelected ? 'ring-2 ring-white scale-110 shadow-lg' : 'opacity-70 hover:opacity-100 hover:scale-105'
                    }`}
                  >
                    {isSelected && <Check className="h-3.5 w-3.5 text-slate-950 font-bold" />}
                  </button>
                );
              })}
            </div>
          </div>
        ) : (
          <button
            onClick={() => setTheme(currentThemeId === 'light' ? 'default-blue' : 'light')}
            className={`w-full p-2.5 rounded-2xl flex items-center justify-center transition-all cursor-pointer ${themeConfig.badgeClass}`}
            title="Toggle Theme"
          >
            <Palette className="h-5 w-5" />
          </button>
        )}
      </div>

    </div>
  );

  return (
    <>
      {/* Desktop Sticky Sidebar */}
      <aside
        className={`hidden md:flex flex-col shrink-0 sticky top-16 h-[calc(100vh-4rem)] border-r transition-all duration-300 z-20 ${
          isCollapsed ? 'w-20' : 'w-64'
        } ${
          isLight
            ? 'bg-slate-50 border-slate-200 text-slate-900'
            : `${themeConfig.sidebarBgClass || 'bg-[#05060b]'} ${themeConfig.borderClass} text-slate-200`
        }`}
      >
        {renderContent()}
      </aside>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {isMobileOpen && (
          <div className="fixed inset-0 z-50 md:hidden flex">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm"
            />

            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className={`relative w-72 h-full z-10 border-r ${
                isLight ? 'bg-white border-slate-200' : `${themeConfig.cardBgClass} ${themeConfig.borderClass}`
              }`}
            >
              <button
                onClick={() => setIsMobileOpen(false)}
                className="absolute top-4 right-4 p-2 rounded-xl bg-slate-900 text-slate-400 hover:text-white border border-slate-800"
              >
                <X className="h-5 w-5" />
              </button>
              {renderContent()}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

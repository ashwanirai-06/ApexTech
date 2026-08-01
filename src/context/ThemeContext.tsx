import React, { createContext, useContext, useState, useEffect } from 'react';
import { ThemeConfig, PREDEFINED_THEMES, getThemeConfig } from '../utils/themeSystem';

export type SidebarBgStyle = 'dark' | 'pitch' | 'indigo' | 'purple' | 'oled' | 'light';
export type AccentColor = 'cyan' | 'emerald' | 'purple' | 'amber' | 'rose' | 'blue';

export interface ThemeContextState {
  // App Global Theme
  currentThemeId: string;
  themeConfig: ThemeConfig;
  setTheme: (themeId: string) => void;
  allThemes: ThemeConfig[];

  // Sidebar Specific Settings
  bgStyle: SidebarBgStyle;
  accentColor: AccentColor;
  sidebarWidth: 'normal' | 'wide' | 'compact';
  isCollapsed: boolean;
  themeMode: 'dark' | 'light';
  toggleCollapse: () => void;
  setBgStyle: (style: SidebarBgStyle) => void;
  setAccentColor: (accent: AccentColor) => void;
  setSidebarWidth: (width: 'normal' | 'wide' | 'compact') => void;
  setThemeMode: (mode: 'dark' | 'light') => void;
  isMobileOpen: boolean;
  setIsMobileOpen: (open: boolean) => void;
}

const defaultContext: ThemeContextState = {
  currentThemeId: 'default-blue',
  themeConfig: PREDEFINED_THEMES['default-blue'],
  setTheme: () => {},
  allThemes: Object.values(PREDEFINED_THEMES),
  bgStyle: 'dark',
  accentColor: 'cyan',
  sidebarWidth: 'normal',
  isCollapsed: false,
  themeMode: 'dark',
  toggleCollapse: () => {},
  setBgStyle: () => {},
  setAccentColor: () => {},
  setSidebarWidth: () => {},
  setThemeMode: () => {},
  isMobileOpen: false,
  setIsMobileOpen: () => {},
};

const ThemeContext = createContext<ThemeContextState>(defaultContext);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Global App Theme
  const [currentThemeId, setCurrentThemeIdState] = useState<string>(() => {
    return localStorage.getItem('apextech_app_theme') || localStorage.getItem('apextech_theme') || 'default-blue';
  });

  const [themeConfig, setThemeConfig] = useState<ThemeConfig>(() => getThemeConfig(currentThemeId));

  // Sidebar theme states
  const [bgStyle, setBgStyleState] = useState<SidebarBgStyle>(() => {
    return (localStorage.getItem('apextech_sidebar_bg') as SidebarBgStyle) || 'dark';
  });

  const [accentColor, setAccentColorState] = useState<AccentColor>(() => {
    return (localStorage.getItem('apextech_sidebar_accent') as AccentColor) || 'cyan';
  });

  const [sidebarWidth, setSidebarWidthState] = useState<'normal' | 'wide' | 'compact'>(() => {
    return (localStorage.getItem('apextech_sidebar_width') as 'normal' | 'wide' | 'compact') || 'normal';
  });

  const [isCollapsed, setIsCollapsed] = useState<boolean>(() => {
    return localStorage.getItem('apextech_sidebar_collapsed') === 'true';
  });

  const [themeMode, setThemeModeState] = useState<'dark' | 'light'>(() => {
    return (localStorage.getItem('apextech_mode') as 'dark' | 'light') || 'dark';
  });

  const [isMobileOpen, setIsMobileOpen] = useState(false);

  // Sync theme changes
  const applyThemeToDOM = (config: ThemeConfig) => {
    document.documentElement.style.setProperty('--app-bg', config.bgHex);
    document.documentElement.style.setProperty('--app-accent', config.accentHex);
    document.documentElement.style.setProperty('--app-glow', config.glowColor);
    document.body.style.backgroundColor = config.bgHex;
    document.body.style.color = config.mode === 'light' ? '#0f172a' : '#cbd5e1';

    if (config.mode === 'light') {
      document.documentElement.classList.add('light');
    } else {
      document.documentElement.classList.remove('light');
    }
  };

  const setTheme = (themeId: string) => {
    setCurrentThemeIdState(themeId);
    const newConfig = getThemeConfig(themeId);
    setThemeConfig(newConfig);
    localStorage.setItem('apextech_app_theme', themeId);
    localStorage.setItem('apextech_theme', themeId);

    if (newConfig.mode === 'light') {
      setThemeModeState('light');
    } else {
      setThemeModeState('dark');
    }

    applyThemeToDOM(newConfig);
  };

  useEffect(() => {
    // Initial sync
    const config = getThemeConfig(currentThemeId);
    setThemeConfig(config);
    applyThemeToDOM(config);
  }, [currentThemeId]);

  useEffect(() => {
    localStorage.setItem('apextech_sidebar_bg', bgStyle);
  }, [bgStyle]);

  useEffect(() => {
    localStorage.setItem('apextech_sidebar_accent', accentColor);
  }, [accentColor]);

  useEffect(() => {
    localStorage.setItem('apextech_sidebar_width', sidebarWidth);
  }, [sidebarWidth]);

  useEffect(() => {
    localStorage.setItem('apextech_sidebar_collapsed', String(isCollapsed));
  }, [isCollapsed]);

  useEffect(() => {
    localStorage.setItem('apextech_mode', themeMode);
  }, [themeMode]);

  const toggleCollapse = () => setIsCollapsed((prev) => !prev);
  const setBgStyle = (style: SidebarBgStyle) => setBgStyleState(style);
  const setAccentColor = (accent: AccentColor) => setAccentColorState(accent);
  const setSidebarWidth = (width: 'normal' | 'wide' | 'compact') => setSidebarWidthState(width);
  const setThemeMode = (mode: 'dark' | 'light') => {
    setThemeModeState(mode);
    if (mode === 'light') {
      setTheme('light');
    } else if (currentThemeId === 'light') {
      setTheme('default-blue');
    }
  };

  return (
    <ThemeContext.Provider
      value={{
        currentThemeId,
        themeConfig,
        setTheme,
        allThemes: Object.values(PREDEFINED_THEMES),
        bgStyle,
        accentColor,
        sidebarWidth,
        isCollapsed,
        themeMode,
        toggleCollapse,
        setBgStyle,
        setAccentColor,
        setSidebarWidth,
        setThemeMode,
        isMobileOpen,
        setIsMobileOpen,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
export const useSidebarTheme = () => useContext(ThemeContext);
export const SidebarThemeProvider = ThemeProvider;

/**
 * Centralized Theme Customization System for ApexTech AI Platform
 * Defines 11 predefined color palettes and styling tokens.
 */

export interface ThemeConfig {
  id: string;
  name: string;
  description: string;
  mode: 'dark' | 'light';
  bgClass: string;
  bgHex: string;
  cardBgClass: string;
  sidebarBgClass: string;
  accentGradient: string;
  accentHex: string;
  borderClass: string;
  textAccentClass: string;
  activeTabClass: string;
  badgeClass: string;
  buttonClass: string;
  glowColor: string;
  previewColors: string[];
}

export const PREDEFINED_THEMES: Record<string, ThemeConfig> = {
  'default-blue': {
    id: 'default-blue',
    name: 'Default Blue',
    description: 'Cyberpunk Deep Blue & Electric Cyan',
    mode: 'dark',
    bgClass: 'bg-[#020204]',
    bgHex: '#020204',
    cardBgClass: 'bg-[#0a0f1d]',
    sidebarBgClass: 'bg-[#05060b]',
    accentGradient: 'from-cyan-500 to-blue-600',
    accentHex: '#06b6d4',
    borderClass: 'border-cyan-500/30',
    textAccentClass: 'text-cyan-400',
    activeTabClass: 'bg-cyan-500/15 text-cyan-400 border-cyan-500/40',
    badgeClass: 'bg-cyan-950/80 text-cyan-300 border-cyan-800',
    buttonClass: 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 hover:brightness-110 shadow-cyan-500/20',
    glowColor: 'rgba(6, 182, 212, 0.15)',
    previewColors: ['#020204', '#06b6d4', '#2563eb']
  },
  'yellow': {
    id: 'yellow',
    name: 'Cyber Gold & Yellow ⚡',
    description: 'High-contrast Gold, Amber & Cyber Yellow',
    mode: 'dark',
    bgClass: 'bg-[#181402]',
    bgHex: '#181402',
    cardBgClass: 'bg-[#261f03]',
    sidebarBgClass: 'bg-[#120f01]',
    accentGradient: 'from-yellow-400 to-amber-500',
    accentHex: '#eab308',
    borderClass: 'border-yellow-500/40',
    textAccentClass: 'text-yellow-400',
    activeTabClass: 'bg-yellow-500/15 text-yellow-300 border-yellow-500/40',
    badgeClass: 'bg-yellow-950/80 text-yellow-300 border-yellow-800',
    buttonClass: 'bg-gradient-to-r from-yellow-400 to-amber-500 text-slate-950 hover:brightness-110 shadow-yellow-500/20',
    glowColor: 'rgba(234, 179, 8, 0.15)',
    previewColors: ['#181402', '#eab308', '#f59e0b']
  },
  'green': {
    id: 'green',
    name: 'Emerald Academic & Matrix 🔋',
    description: 'Emerald Green & Matrix Cyber Lines',
    mode: 'dark',
    bgClass: 'bg-[#02120b]',
    bgHex: '#02120b',
    cardBgClass: 'bg-[#052215]',
    sidebarBgClass: 'bg-[#010c07]',
    accentGradient: 'from-emerald-400 to-teal-500',
    accentHex: '#10b981',
    borderClass: 'border-emerald-500/30',
    textAccentClass: 'text-emerald-400',
    activeTabClass: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/40',
    badgeClass: 'bg-emerald-950/80 text-emerald-300 border-emerald-800',
    buttonClass: 'bg-gradient-to-r from-emerald-500 to-teal-600 text-slate-950 hover:brightness-110 shadow-emerald-500/20',
    glowColor: 'rgba(16, 185, 129, 0.15)',
    previewColors: ['#02120b', '#10b981', '#14b8a6']
  },
  'magenta': {
    id: 'magenta',
    name: 'Cyber Magenta & Fuchsia 💖',
    description: 'Vibrant Magenta, Neon Pink & Cyber Fuchsia',
    mode: 'dark',
    bgClass: 'bg-[#1a0515]',
    bgHex: '#1a0515',
    cardBgClass: 'bg-[#290821]',
    sidebarBgClass: 'bg-[#10020d]',
    accentGradient: 'from-fuchsia-500 to-pink-600',
    accentHex: '#d946ef',
    borderClass: 'border-fuchsia-500/30',
    textAccentClass: 'text-fuchsia-400',
    activeTabClass: 'bg-fuchsia-500/15 text-fuchsia-300 border-fuchsia-500/40',
    badgeClass: 'bg-fuchsia-950/80 text-fuchsia-300 border-fuchsia-800',
    buttonClass: 'bg-gradient-to-r from-fuchsia-500 to-pink-600 text-white hover:brightness-110 shadow-fuchsia-500/20',
    glowColor: 'rgba(217, 70, 239, 0.15)',
    previewColors: ['#1a0515', '#d946ef', '#ec4899']
  },
  'sky-blue': {
    id: 'sky-blue',
    name: 'Sky Blue 🩵',
    description: 'Atmospheric Azure & Soft Sky Blue',
    mode: 'dark',
    bgClass: 'bg-[#031322]',
    bgHex: '#031322',
    cardBgClass: 'bg-[#072138]',
    sidebarBgClass: 'bg-[#020b14]',
    accentGradient: 'from-sky-400 to-blue-500',
    accentHex: '#38bdf8',
    borderClass: 'border-sky-500/30',
    textAccentClass: 'text-sky-400',
    activeTabClass: 'bg-sky-500/15 text-sky-300 border-sky-500/40',
    badgeClass: 'bg-sky-950/80 text-sky-300 border-sky-800',
    buttonClass: 'bg-gradient-to-r from-sky-400 to-blue-500 text-slate-950 hover:brightness-110 shadow-sky-500/20',
    glowColor: 'rgba(56, 189, 248, 0.15)',
    previewColors: ['#031322', '#38bdf8', '#3b82f6']
  },
  'navy-blue': {
    id: 'navy-blue',
    name: 'Navy Blue 🌌',
    description: 'Midnight Navy & Deep Royal Blue',
    mode: 'dark',
    bgClass: 'bg-[#050b1e]',
    bgHex: '#050b1e',
    cardBgClass: 'bg-[#0a1538]',
    sidebarBgClass: 'bg-[#030612]',
    accentGradient: 'from-blue-600 to-indigo-600',
    accentHex: '#2563eb',
    borderClass: 'border-blue-500/30',
    textAccentClass: 'text-blue-400',
    activeTabClass: 'bg-blue-500/15 text-blue-300 border-blue-500/40',
    badgeClass: 'bg-blue-950/80 text-blue-300 border-blue-800',
    buttonClass: 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:brightness-110 shadow-blue-500/20',
    glowColor: 'rgba(37, 99, 235, 0.15)',
    previewColors: ['#050b1e', '#2563eb', '#4f46e5']
  },
  'ocean': {
    id: 'ocean',
    name: 'Ocean Teal 🌊',
    description: 'Deep Ocean Teal & Aqua Waves',
    mode: 'dark',
    bgClass: 'bg-[#02181a]',
    bgHex: '#02181a',
    cardBgClass: 'bg-[#052b2e]',
    sidebarBgClass: 'bg-[#010e10]',
    accentGradient: 'from-teal-400 to-cyan-500',
    accentHex: '#14b8a6',
    borderClass: 'border-teal-500/30',
    textAccentClass: 'text-teal-400',
    activeTabClass: 'bg-teal-500/15 text-teal-300 border-teal-500/40',
    badgeClass: 'bg-teal-950/80 text-teal-300 border-teal-800',
    buttonClass: 'bg-gradient-to-r from-teal-400 to-cyan-500 text-slate-950 hover:brightness-110 shadow-teal-500/20',
    glowColor: 'rgba(20, 184, 166, 0.15)',
    previewColors: ['#02181a', '#14b8a6', '#06b6d4']
  },
  'purple': {
    id: 'purple',
    name: 'Purple Royal Amethyst 💜',
    description: 'Royal Amethyst & Cyber Purple',
    mode: 'dark',
    bgClass: 'bg-[#0c061a]',
    bgHex: '#0c061a',
    cardBgClass: 'bg-[#1a0e36]',
    sidebarBgClass: 'bg-[#070310]',
    accentGradient: 'from-purple-500 to-violet-600',
    accentHex: '#a855f7',
    borderClass: 'border-purple-500/30',
    textAccentClass: 'text-purple-400',
    activeTabClass: 'bg-purple-500/15 text-purple-300 border-purple-500/40',
    badgeClass: 'bg-purple-950/80 text-purple-300 border-purple-800',
    buttonClass: 'bg-gradient-to-r from-purple-500 to-violet-600 text-white hover:brightness-110 shadow-purple-500/20',
    glowColor: 'rgba(168, 85, 247, 0.15)',
    previewColors: ['#0c061a', '#a855f7', '#7c3aed']
  },
  'red': {
    id: 'red',
    name: 'Sunset Red & Crimson 🌹',
    description: 'Sunset Crimson & Cyber Red',
    mode: 'dark',
    bgClass: 'bg-[#1c0409]',
    bgHex: '#1c0409',
    cardBgClass: 'bg-[#310811]',
    sidebarBgClass: 'bg-[#110205]',
    accentGradient: 'from-rose-500 to-red-600',
    accentHex: '#f43f5e',
    borderClass: 'border-rose-500/30',
    textAccentClass: 'text-rose-400',
    activeTabClass: 'bg-rose-500/15 text-rose-300 border-rose-500/40',
    badgeClass: 'bg-rose-950/80 text-rose-300 border-rose-800',
    buttonClass: 'bg-gradient-to-r from-rose-500 to-red-600 text-white hover:brightness-110 shadow-rose-500/20',
    glowColor: 'rgba(244, 63, 94, 0.15)',
    previewColors: ['#1c0409', '#f43f5e', '#dc2626']
  },
  'dark': {
    id: 'dark',
    name: 'OLED Obsidian Dark 🖤',
    description: 'Pure OLED Black & Minimal Slate Accents',
    mode: 'dark',
    bgClass: 'bg-black',
    bgHex: '#000000',
    cardBgClass: 'bg-[#0a0a0a]',
    sidebarBgClass: 'bg-[#000000]',
    accentGradient: 'from-slate-200 to-slate-400',
    accentHex: '#e2e8f0',
    borderClass: 'border-slate-800',
    textAccentClass: 'text-slate-200',
    activeTabClass: 'bg-slate-800/80 text-white border-slate-700',
    badgeClass: 'bg-slate-900 text-slate-300 border-slate-700',
    buttonClass: 'bg-slate-200 text-slate-950 hover:bg-white shadow-slate-200/20',
    glowColor: 'rgba(226, 232, 240, 0.12)',
    previewColors: ['#000000', '#334155', '#e2e8f0']
  },
  'light': {
    id: 'light',
    name: 'Studio Clean Light ☀️',
    description: 'High-contrast Clean Studio Light UI',
    mode: 'light',
    bgClass: 'bg-slate-100',
    bgHex: '#f1f5f9',
    cardBgClass: 'bg-white',
    sidebarBgClass: 'bg-slate-50',
    accentGradient: 'from-blue-600 to-cyan-600',
    accentHex: '#2563eb',
    borderClass: 'border-slate-300',
    textAccentClass: 'text-blue-700',
    activeTabClass: 'bg-blue-100 text-blue-800 border-blue-300 font-bold',
    badgeClass: 'bg-blue-100 text-blue-800 border-blue-300',
    buttonClass: 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white hover:brightness-110 shadow-blue-500/20',
    glowColor: 'rgba(37, 99, 235, 0.08)',
    previewColors: ['#f1f5f9', '#2563eb', '#0284c7']
  }
};

export function getThemeConfig(themeId?: string): ThemeConfig {
  if (!themeId || !PREDEFINED_THEMES[themeId]) {
    return PREDEFINED_THEMES['default-blue'];
  }
  return PREDEFINED_THEMES[themeId];
}

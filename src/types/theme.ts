export type ThemeId = 'candy' | 'forest' | 'space' | 'ocean' | 'pony' | 'eggy';

export interface ThemeConfig {
  id: ThemeId;
  name: string;
  subtitle: string;
  emoji: string;
  mascotName: string;
  mascotType: 'bunny' | 'bear' | 'cat' | 'dolphin' | 'pony' | 'eggy';
  colors: {
    bgGradient: string;
    cardBg: string;
    cardBorder: string;
    textPrimary: string;
    textSecondary: string;
    primaryBtn: string;
    primaryBtnHover: string;
    accentBg: string;
    orpColor: string; // Color of the focus letter
    navBg: string;
    progressBar: string;
    badgeBg: string;
  };
}

export const THEMES: Record<ThemeId, ThemeConfig> = {
  candy: {
    id: 'candy',
    name: '糖果乐园',
    subtitle: '草莓甜心 · 粉萌马卡龙',
    emoji: '🍬',
    mascotName: '萌萌兔 (Pip)',
    mascotType: 'bunny',
    colors: {
      bgGradient: 'from-pink-100 via-rose-50 to-pink-200',
      cardBg: 'bg-white/90 backdrop-blur-md',
      cardBorder: 'border-pink-200',
      textPrimary: 'text-pink-950',
      textSecondary: 'text-pink-600',
      primaryBtn: 'bg-gradient-to-r from-pink-500 to-rose-400 text-white shadow-pink-300',
      primaryBtnHover: 'hover:from-pink-600 hover:to-rose-500',
      accentBg: 'bg-pink-100 text-pink-700',
      orpColor: '#E11D48', // Rose 600
      navBg: 'bg-white/80 border-pink-200',
      progressBar: 'from-pink-400 to-rose-500',
      badgeBg: 'bg-rose-100 text-rose-700 border-rose-200',
    },
  },
  pony: {
    id: 'pony',
    name: '小马宝莉',
    subtitle: '友谊就是魔法 · 柔柔/小蝶 (Fluttershy)',
    emoji: '🦋',
    mascotName: '小蝶 (Fluttershy)',
    mascotType: 'pony',
    colors: {
      bgGradient: 'from-amber-100/70 via-rose-50 to-pink-100',
      cardBg: 'bg-white/95 backdrop-blur-md',
      cardBorder: 'border-pink-300',
      textPrimary: 'text-amber-950',
      textSecondary: 'text-pink-600',
      primaryBtn: 'bg-gradient-to-r from-pink-400 via-rose-400 to-amber-300 text-white shadow-pink-200',
      primaryBtnHover: 'hover:from-pink-500 hover:to-rose-500',
      accentBg: 'bg-pink-100 text-pink-700',
      orpColor: '#EC4899', // Pink 500 - Fluttershy's butterfly pink
      navBg: 'bg-white/85 border-pink-200',
      progressBar: 'from-amber-300 via-pink-400 to-rose-400',
      badgeBg: 'bg-pink-100 text-pink-700 border-pink-200',
    },
  },
  eggy: {
    id: 'eggy',
    name: '蛋仔派对',
    subtitle: '撞走不开心 · 蛋小黄经典白毛衣 (Eggy Party)',
    emoji: '🍳',
    mascotName: '蛋小黄 (Eggie)',
    mascotType: 'eggy',
    colors: {
      bgGradient: 'from-yellow-200 via-amber-100 to-orange-100',
      cardBg: 'bg-white/95 backdrop-blur-md',
      cardBorder: 'border-amber-400',
      textPrimary: 'text-amber-950',
      textSecondary: 'text-amber-800',
      primaryBtn: 'bg-gradient-to-r from-yellow-400 via-amber-400 to-amber-500 text-amber-950 font-black shadow-amber-300',
      primaryBtnHover: 'hover:from-yellow-500 hover:to-amber-500',
      accentBg: 'bg-amber-100 text-amber-900',
      orpColor: '#EA580C', // Orange 600
      navBg: 'bg-white/85 border-amber-300',
      progressBar: 'from-yellow-400 via-amber-400 to-orange-500',
      badgeBg: 'bg-amber-100 text-amber-900 border-amber-300',
    },
  },
  forest: {
    id: 'forest',
    name: '森林探险',
    subtitle: '抹茶微风 · 治愈原木',
    emoji: '🌲',
    mascotName: '布布熊 (Barnaby)',
    mascotType: 'bear',
    colors: {
      bgGradient: 'from-emerald-100 via-green-50 to-amber-100',
      cardBg: 'bg-white/90 backdrop-blur-md',
      cardBorder: 'border-emerald-200',
      textPrimary: 'text-emerald-950',
      textSecondary: 'text-emerald-700',
      primaryBtn: 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-emerald-300',
      primaryBtnHover: 'hover:from-emerald-600 hover:to-teal-600',
      accentBg: 'bg-emerald-100 text-emerald-800',
      orpColor: '#D97706', // Amber 600
      navBg: 'bg-white/80 border-emerald-200',
      progressBar: 'from-emerald-400 to-teal-500',
      badgeBg: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    },
  },
  space: {
    id: 'space',
    name: '星际漫游',
    subtitle: '浩瀚星海 · 璀璨荧光',
    emoji: '🚀',
    mascotName: '星际猫 (Astro Nova)',
    mascotType: 'cat',
    colors: {
      bgGradient: 'from-slate-900 via-indigo-950 to-purple-950',
      cardBg: 'bg-slate-800/80 backdrop-blur-md',
      cardBorder: 'border-indigo-500/30',
      textPrimary: 'text-indigo-100',
      textSecondary: 'text-indigo-300',
      primaryBtn: 'bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white shadow-indigo-900',
      primaryBtnHover: 'hover:from-indigo-600 hover:to-purple-600',
      accentBg: 'bg-indigo-900/60 text-indigo-200',
      orpColor: '#FACC15', // Yellow 400
      navBg: 'bg-slate-900/80 border-indigo-500/30',
      progressBar: 'from-indigo-400 via-purple-400 to-amber-400',
      badgeBg: 'bg-indigo-950 text-indigo-300 border-indigo-700',
    },
  },
  ocean: {
    id: 'ocean',
    name: '深海奇遇',
    subtitle: '清透浪花 · 梦幻珊瑚',
    emoji: '🌊',
    mascotName: '波波豚 (Bubbles)',
    mascotType: 'dolphin',
    colors: {
      bgGradient: 'from-sky-100 via-cyan-50 to-blue-200',
      cardBg: 'bg-white/90 backdrop-blur-md',
      cardBorder: 'border-cyan-200',
      textPrimary: 'text-cyan-950',
      textSecondary: 'text-cyan-700',
      primaryBtn: 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-cyan-300',
      primaryBtnHover: 'hover:from-cyan-600 hover:to-blue-600',
      accentBg: 'bg-cyan-100 text-cyan-800',
      orpColor: '#EF4444', // Red 500
      navBg: 'bg-white/80 border-cyan-200',
      progressBar: 'from-cyan-400 to-blue-500',
      badgeBg: 'bg-cyan-100 text-cyan-800 border-cyan-200',
    },
  },
};

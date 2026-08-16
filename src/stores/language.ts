import { atom } from 'nanostores';
import en from '../content/en.json';
import zh from '../content/zh.json';
import type { Content } from '../types/content';

export type Lang = 'en' | 'zh';

export const $lang = atom<Lang>('en');
export const $content = atom<Content>(en);

export function setLanguage(lang: Lang) {
  $lang.set(lang);
  $content.set(lang === 'zh' ? zh : en);
  if (typeof window !== 'undefined') {
    localStorage.setItem('lang', lang);
  }
}

export function initializeLanguage() {
  if (typeof window === 'undefined') return;
  const saved = localStorage.getItem('lang') as Lang | null;
  const preferred = saved || (navigator.language.startsWith('zh') ? 'zh' : 'en');
  setLanguage(preferred);
}

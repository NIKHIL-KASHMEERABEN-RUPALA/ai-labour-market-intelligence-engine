import { DivergingGapCategory, Language } from '../types';

export const GAP_COLORS = {
  acute_shortage: '#B42318', // Deep Red
  shortage: '#F79009',       // Orange
  balanced: '#12B76A',       // Soft Green
  oversupply: '#2E90FA',     // Blue
  chronic_surplus: '#1849A9', // Deep Blue
} as const;

export function getGapCategory(gapPercent: number): DivergingGapCategory {
  if (gapPercent <= -25) return 'acute_shortage';
  if (gapPercent < -5) return 'shortage';
  if (gapPercent <= 10) return 'balanced';
  if (gapPercent <= 30) return 'oversupply';
  return 'chronic_surplus';
}

export function getGapColor(gapPercentOrCategory: number | DivergingGapCategory): string {
  const category =
    typeof gapPercentOrCategory === 'string'
      ? gapPercentOrCategory
      : getGapCategory(gapPercentOrCategory);
  return GAP_COLORS[category] || '#98A2B3';
}

export function getGapBadgeClasses(gapPercent: number): {
  bg: string;
  text: string;
  border: string;
  dot: string;
} {
  const category = getGapCategory(gapPercent);
  switch (category) {
    case 'acute_shortage':
      return {
        bg: 'bg-red-50',
        text: 'text-[#B42318]',
        border: 'border-red-200',
        dot: 'bg-[#B42318]',
      };
    case 'shortage':
      return {
        bg: 'bg-amber-50',
        text: 'text-[#B54708]',
        border: 'border-amber-200',
        dot: 'bg-[#F79009]',
      };
    case 'balanced':
      return {
        bg: 'bg-emerald-50',
        text: 'text-[#027A48]',
        border: 'border-emerald-200',
        dot: 'bg-[#12B76A]',
      };
    case 'oversupply':
      return {
        bg: 'bg-blue-50',
        text: 'text-[#175CD3]',
        border: 'border-blue-200',
        dot: 'bg-[#2E90FA]',
      };
    case 'chronic_surplus':
      return {
        bg: 'bg-indigo-50',
        text: 'text-[#1849A9]',
        border: 'border-indigo-200',
        dot: 'bg-[#1849A9]',
      };
  }
}

export function getGapLabel(category: DivergingGapCategory, lang: Language = 'en'): string {
  const labels: Record<DivergingGapCategory, Record<Language, string>> = {
    acute_shortage: {
      en: 'Acute Shortage',
      hi: 'तीव्र कमी',
      gu: 'તીવ્ર અછત',
      ta: 'கடுமையான பற்றாக்குறை',
      mr: 'तीव्र तुटवडा',
    },
    shortage: {
      en: 'Shortage',
      hi: 'कमी',
      gu: 'અછત',
      ta: 'பற்றாக்குறை',
      mr: 'तुटवडा',
    },
    balanced: {
      en: 'Balanced',
      hi: 'संतुलित',
      gu: 'સંતુલિત',
      ta: 'சமநிலை',
      mr: 'संतुलित',
    },
    oversupply: {
      en: 'Oversupply',
      hi: 'अधिशेष',
      gu: 'વધારે પુરવઠો',
      ta: 'அதிக விநியோகம்',
      mr: 'जादा पुरवठा',
    },
    chronic_surplus: {
      en: 'Chronic Surplus',
      hi: 'गंभीर अधिशेष',
      gu: 'ક્રોનિક સરપ્લસ',
      ta: 'நீண்டகால உபரி',
      mr: 'तीव्र अतिरिक्तता',
    },
  };

  return labels[category]?.[lang] || labels[category].en;
}

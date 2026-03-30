export const CATEGORIES = ['All', 'Food Apps', 'SaaS', 'Design', 'Real Estate', 'Minimal', 'Dark Sophisticated'] as const;
export type Category = typeof CATEGORIES[number];

import type { JobWithMatch } from './matchScore';
import type { DailyDigest, DigestJob } from '../types/digest';
import { DIGEST_STORAGE_KEY } from '../types/digest';

/**
 * Get today's date in YYYY-MM-DD format
 */
export const getTodayDateString = (): string => {
  const today = new Date();
  return today.toISOString().split('T')[0];
};

/**
 * Generate storage key for a specific date
 */
export const getDigestStorageKey = (date: string): string => {
  return `${DIGEST_STORAGE_KEY}_${date}`;
};

/**
 * Get digest for a specific date from localStorage
 */
export const getDigest = (date: string): DailyDigest | null => {
  try {
    const key = getDigestStorageKey(date);
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : null;
  } catch {
    return null;
  }
};

/**
 * Get today's digest from localStorage
 */
export const getTodayDigest = (): DailyDigest | null => {
  return getDigest(getTodayDateString());
};

/**
 * Save digest to localStorage
 */
export const saveDigest = (digest: DailyDigest): void => {
  try {
    const key = getDigestStorageKey(digest.date);
    localStorage.setItem(key, JSON.stringify(digest));
  } catch {
    // Silently fail if localStorage is not available
  }
};

/**
 * Check if digest exists for today
 */
export const hasTodayDigest = (): boolean => {
  return getTodayDigest() !== null;
};

/**
 * Generate digest from jobs
 * Selects top 10 jobs sorted by:
 * 1) matchScore descending
 * 2) postedDaysAgo ascending
 */
export const generateDigest = (jobs: JobWithMatch[]): DailyDigest => {
  const sortedJobs = [...jobs].sort((a, b) => {
    // Primary: matchScore descending
    if (b.matchScore !== a.matchScore) {
      return b.matchScore - a.matchScore;
    }
    // Secondary: postedDaysAgo ascending
    return a.postedDaysAgo - b.postedDaysAgo;
  });

  const topJobs = sortedJobs.slice(0, 10);

  const digestJobs: DigestJob[] = topJobs.map((job) => ({
    id: job.id,
    title: job.title,
    company: job.company,
    location: job.location,
    experience: job.experience,
    matchScore: job.matchScore,
    applyUrl: job.applyUrl,
  }));

  const digest: DailyDigest = {
    date: getTodayDateString(),
    generatedAt: new Date().toISOString(),
    jobs: digestJobs,
  };

  saveDigest(digest);
  return digest;
};

/**
 * Format digest as plain text for clipboard
 */
export const formatDigestAsText = (digest: DailyDigest): string => {
  const date = new Date(digest.date).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  let text = `Top 10 Jobs For You — 9AM Digest\n`;
  text += `${date}\n`;
  text += `\n`;

  digest.jobs.forEach((job, index) => {
    text += `${index + 1}. ${job.title}\n`;
    text += `   Company: ${job.company}\n`;
    text += `   Location: ${job.location}\n`;
    text += `   Experience: ${job.experience}\n`;
    text += `   Match Score: ${job.matchScore}%\n`;
    text += `   Apply: ${job.applyUrl}\n`;
    text += `\n`;
  });

  text += `---\n`;
  text += `This digest was generated based on your preferences.\n`;

  return text;
};

/**
 * Create mailto URL for email draft
 */
export const createEmailDraft = (digest: DailyDigest): string => {
  const subject = encodeURIComponent('My 9AM Job Digest');
  const body = encodeURIComponent(formatDigestAsText(digest));
  return `mailto:?subject=${subject}&body=${body}`;
};

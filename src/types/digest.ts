

export interface DigestJob {
  id: string;
  title: string;
  company: string;
  location: string;
  experience: string;
  matchScore: number;
  applyUrl: string;
}

export interface DailyDigest {
  date: string;
  generatedAt: string;
  jobs: DigestJob[];
}

export const DIGEST_STORAGE_KEY = 'jobTrackerDigest';

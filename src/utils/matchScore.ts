import type { Job } from '../types/job';
import type { UserPreferences } from '../types/preferences';

export interface JobWithMatch extends Job {
  matchScore: number;
}

/**
 * Calculate match score for a job based on user preferences.
 * 
 * Scoring Rules:
 * +25 if any roleKeyword appears in job.title (case-insensitive)
 * +15 if any roleKeyword appears in job.description
 * +15 if job.location matches preferredLocations
 * +10 if job.mode matches preferredMode
 * +10 if job.experience matches experienceLevel
 * +15 if overlap between job.skills and user.skills (any match)
 * +5 if postedDaysAgo <= 2
 * +5 if source is LinkedIn
 * 
 * Cap score at 100.
 */
export const calculateMatchScore = (
  job: Job,
  preferences: UserPreferences
): number => {
  let score = 0;

  // +25 if any roleKeyword appears in job.title (case-insensitive)
  if (preferences.roleKeywords.length > 0) {
    const titleLower = job.title.toLowerCase();
    const hasKeywordInTitle = preferences.roleKeywords.some((keyword) =>
      titleLower.includes(keyword.toLowerCase())
    );
    if (hasKeywordInTitle) {
      score += 25;
    }
  }

  // +15 if any roleKeyword appears in job.description
  if (preferences.roleKeywords.length > 0) {
    const descLower = job.description.toLowerCase();
    const hasKeywordInDesc = preferences.roleKeywords.some((keyword) =>
      descLower.includes(keyword.toLowerCase())
    );
    if (hasKeywordInDesc) {
      score += 15;
    }
  }

  // +15 if job.location matches preferredLocations
  if (
    preferences.preferredLocations.length > 0 &&
    preferences.preferredLocations.includes(job.location)
  ) {
    score += 15;
  }

  // +10 if job.mode matches preferredMode
  if (
    preferences.preferredModes.length > 0 &&
    preferences.preferredModes.includes(job.mode)
  ) {
    score += 10;
  }

  // +10 if job.experience matches experienceLevel
  if (
    preferences.experienceLevel !== '' &&
    job.experience === preferences.experienceLevel
  ) {
    score += 10;
  }

  // +15 if overlap between job.skills and user.skills (any match)
  if (preferences.skills.length > 0) {
    const hasSkillMatch = preferences.skills.some((userSkill) =>
      job.skills.some(
        (jobSkill) => jobSkill.toLowerCase() === userSkill.toLowerCase()
      )
    );
    if (hasSkillMatch) {
      score += 15;
    }
  }

  // +5 if postedDaysAgo <= 2
  if (job.postedDaysAgo <= 2) {
    score += 5;
  }

  // +5 if source is LinkedIn
  if (job.source === 'LinkedIn') {
    score += 5;
  }

  // Cap score at 100
  return Math.min(score, 100);
};

/**
 * Get color class for match score badge
 * 80-100: green
 * 60-79: amber
 * 40-59: neutral
 * <40: subtle grey
 */
export const getMatchScoreColor = (score: number): string => {
  if (score >= 80) return 'match-score-high';
  if (score >= 60) return 'match-score-medium';
  if (score >= 40) return 'match-score-neutral';
  return 'match-score-low';
};

/**
 * Add match scores to jobs
 */
export const addMatchScores = (
  jobs: Job[],
  preferences: UserPreferences
): JobWithMatch[] => {
  return jobs.map((job) => ({
    ...job,
    matchScore: calculateMatchScore(job, preferences),
  }));
};

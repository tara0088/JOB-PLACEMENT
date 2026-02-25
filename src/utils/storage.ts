const SAVED_JOBS_KEY = 'jobNotificationTracker_savedJobs';

export const getSavedJobs = (): string[] => {
  try {
    const saved = localStorage.getItem(SAVED_JOBS_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
};

export const saveJob = (jobId: string): void => {
  try {
    const saved = getSavedJobs();
    if (!saved.includes(jobId)) {
      saved.push(jobId);
      localStorage.setItem(SAVED_JOBS_KEY, JSON.stringify(saved));
    }
  } catch {
    // Silently fail if localStorage is not available
  }
};

export const unsaveJob = (jobId: string): void => {
  try {
    const saved = getSavedJobs();
    const updated = saved.filter(id => id !== jobId);
    localStorage.setItem(SAVED_JOBS_KEY, JSON.stringify(updated));
  } catch {
    // Silently fail if localStorage is not available
  }
};

export const isJobSaved = (jobId: string): boolean => {
  const saved = getSavedJobs();
  return saved.includes(jobId);
};

import type { UserPreferences } from '../types/preferences';
import { DEFAULT_PREFERENCES } from '../types/preferences';

const PREFERENCES_KEY = 'jobTrackerPreferences';

export const getPreferences = (): UserPreferences => {
  try {
    const saved = localStorage.getItem(PREFERENCES_KEY);
    if (saved) {
      return { ...DEFAULT_PREFERENCES, ...JSON.parse(saved) };
    }
  } catch {
    // Silently fail if localStorage is not available
  }
  return DEFAULT_PREFERENCES;
};

export const savePreferences = (preferences: UserPreferences): void => {
  try {
    localStorage.setItem(PREFERENCES_KEY, JSON.stringify(preferences));
  } catch {
    // Silently fail if localStorage is not available
  }
};

export const hasPreferences = (): boolean => {
  const prefs = getPreferences();
  return (
    prefs.roleKeywords.length > 0 ||
    prefs.preferredLocations.length > 0 ||
    prefs.preferredModes.length > 0 ||
    prefs.experienceLevel !== '' ||
    prefs.skills.length > 0
  );
};

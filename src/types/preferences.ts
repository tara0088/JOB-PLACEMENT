export type WorkModePreference = 'Remote' | 'Hybrid' | 'Onsite';
export type ExperienceLevelPreference = 'Fresher' | '0-1' | '1-3' | '3-5';

export interface UserPreferences {
  roleKeywords: string[];
  preferredLocations: string[];
  preferredModes: WorkModePreference[];
  experienceLevel: ExperienceLevelPreference | '';
  skills: string[];
  minMatchScore: number;
}

export const DEFAULT_PREFERENCES: UserPreferences = {
  roleKeywords: [],
  preferredLocations: [],
  preferredModes: [],
  experienceLevel: '',
  skills: [],
  minMatchScore: 40,
};

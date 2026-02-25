export type WorkMode = 'Remote' | 'Hybrid' | 'Onsite';
export type ExperienceLevel = 'Fresher' | '0-1' | '1-3' | '3-5';
export type JobSource = 'LinkedIn' | 'Naukri' | 'Indeed';

export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  mode: WorkMode;
  experience: ExperienceLevel;
  skills: string[];
  source: JobSource;
  postedDaysAgo: number;
  salaryRange: string;
  applyUrl: string;
  description: string;
}

export interface Filters {
  keyword: string;
  location: string;
  mode: WorkMode | '';
  experience: ExperienceLevel | '';
  source: JobSource | '';
  sort: 'latest' | 'oldest' | 'salary-high' | 'salary-low';
}

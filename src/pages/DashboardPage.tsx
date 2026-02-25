import type { FC } from 'react';
import { useState, useMemo, useCallback, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { jobs } from '../data/jobs';
import type { Filters } from '../types/job';
import type { JobWithMatch } from '../utils/matchScore';
import { addMatchScores } from '../utils/matchScore';
import { JobCard, JobModal, FilterBar } from '../components/jobs';
import { EmptyState } from '../components/feedback/EmptyState';
import { Alert } from '../components/feedback/Alert';
import { getSavedJobs } from '../utils/storage';
import { getPreferences, hasPreferences } from '../utils/preferences';

export const DashboardPage: FC = () => {
  const [selectedJob, setSelectedJob] = useState<JobWithMatch | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [, setSavedJobIds] = useState<string[]>(getSavedJobs());
  const [showOnlyMatches, setShowOnlyMatches] = useState(false);
  const [prefsExist, setPrefsExist] = useState(hasPreferences());
  const [filters, setFilters] = useState<Filters>({
    keyword: '',
    location: '',
    mode: '',
    experience: '',
    source: '',
    sort: 'latest',
  });

  // Re-check preferences on mount and when modal closes
  useEffect(() => {
    setPrefsExist(hasPreferences());
  }, [isModalOpen]);

  // Calculate match scores for all jobs
  const jobsWithMatch = useMemo(() => {
    const preferences = getPreferences();
    return addMatchScores(jobs, preferences);
  }, []);

  const filteredJobs = useMemo(() => {
    const preferences = getPreferences();
    let result = [...jobsWithMatch];

    // Apply "show only matches" filter first
    if (showOnlyMatches) {
      result = result.filter((job) => job.matchScore >= preferences.minMatchScore);
    }

    // Keyword filter (title or company) - AND logic
    if (filters.keyword) {
      const keyword = filters.keyword.toLowerCase();
      result = result.filter(
        (job) =>
          job.title.toLowerCase().includes(keyword) ||
          job.company.toLowerCase().includes(keyword)
      );
    }

    // Location filter - AND logic
    if (filters.location) {
      result = result.filter((job) => job.location === filters.location);
    }

    // Mode filter - AND logic
    if (filters.mode) {
      result = result.filter((job) => job.mode === filters.mode);
    }

    // Experience filter - AND logic
    if (filters.experience) {
      result = result.filter((job) => job.experience === filters.experience);
    }

    // Source filter - AND logic
    if (filters.source) {
      result = result.filter((job) => job.source === filters.source);
    }

    // Sort
    switch (filters.sort) {
      case 'latest':
        result.sort((a, b) => a.postedDaysAgo - b.postedDaysAgo);
        break;
      case 'oldest':
        result.sort((a, b) => b.postedDaysAgo - a.postedDaysAgo);
        break;
      case 'salary-high':
        result.sort((a, b) => {
          const getMaxSalary = (salary: string): number => {
            const match = salary.match(/(\d+)/g);
            return match ? parseInt(match[match.length - 1]) : 0;
          };
          return getMaxSalary(b.salaryRange) - getMaxSalary(a.salaryRange);
        });
        break;
      case 'salary-low':
        result.sort((a, b) => {
          const getMinSalary = (salary: string): number => {
            const match = salary.match(/(\d+)/g);
            return match ? parseInt(match[0]) : 0;
          };
          return getMinSalary(a.salaryRange) - getMinSalary(b.salaryRange);
        });
        break;
    }

    return result;
  }, [filters, showOnlyMatches, jobsWithMatch]);

  const handleViewJob = useCallback((job: JobWithMatch) => {
    setSelectedJob(job);
    setIsModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
    setSelectedJob(null);
  }, []);

  const handleSaveToggle = useCallback((jobId: string, isSaved: boolean) => {
    if (isSaved) {
      setSavedJobIds((prev) => [...prev, jobId]);
    } else {
      setSavedJobIds((prev) => prev.filter((id) => id !== jobId));
    }
  }, []);

  const preferences = getPreferences();

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1 className="page-title">Dashboard</h1>
        <p className="page-subtitle">
          Browse {jobs.length} opportunities from top Indian companies
        </p>
      </div>

      {!prefsExist && (
        <div className="dashboard-banner">
          <Alert variant="warning" title="Set your preferences">
            <Link to="/settings" className="dashboard-banner-link">
              Set your preferences
            </Link>{' '}
            to activate intelligent matching.
          </Alert>
        </div>
      )}

      <div className="dashboard-controls">
        <FilterBar filters={filters} onFilterChange={setFilters} />
        
        <div className="dashboard-toggle">
          <label className="toggle-label">
            <input
              type="checkbox"
              className="toggle-input"
              checked={showOnlyMatches}
              onChange={(e) => setShowOnlyMatches(e.target.checked)}
            />
            <span className="toggle-slider"></span>
            <span className="toggle-text">
              Show only jobs above my threshold ({preferences.minMatchScore}%)
            </span>
          </label>
        </div>
      </div>

      <div className="dashboard-content">
        {filteredJobs.length > 0 ? (
          <div className="jobs-grid">
            {filteredJobs.map((job) => (
              <JobCard
                key={job.id}
                job={job}
                onView={handleViewJob}
                onSaveToggle={handleSaveToggle}
              />
            ))}
          </div>
        ) : (
          <EmptyState
            title="No roles match your criteria"
            description="Adjust filters or lower your match threshold to see more results."
            actionLabel="Go to Settings"
            onAction={() => window.location.href = '/settings'}
          />
        )}
      </div>

      <JobModal
        job={selectedJob}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
};

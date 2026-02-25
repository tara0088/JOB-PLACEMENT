import type { FC } from 'react';
import { useState, useMemo, useCallback } from 'react';
import { jobs } from '../data/jobs';
import type { Job, Filters } from '../types/job';
import { JobCard, JobModal, FilterBar } from '../components/jobs';
import { EmptyState } from '../components/feedback/EmptyState';
import { getSavedJobs } from '../utils/storage';

export const DashboardPage: FC = () => {
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [, setSavedJobIds] = useState<string[]>(getSavedJobs());
  const [filters, setFilters] = useState<Filters>({
    keyword: '',
    location: '',
    mode: '',
    experience: '',
    source: '',
    sort: 'latest',
  });

  const filteredJobs = useMemo(() => {
    let result = [...jobs];

    // Keyword filter
    if (filters.keyword) {
      const keyword = filters.keyword.toLowerCase();
      result = result.filter(
        (job) =>
          job.title.toLowerCase().includes(keyword) ||
          job.company.toLowerCase().includes(keyword)
      );
    }

    // Location filter
    if (filters.location) {
      result = result.filter((job) => job.location === filters.location);
    }

    // Mode filter
    if (filters.mode) {
      result = result.filter((job) => job.mode === filters.mode);
    }

    // Experience filter
    if (filters.experience) {
      result = result.filter((job) => job.experience === filters.experience);
    }

    // Source filter
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
        // Approximate sorting by parsing salary ranges
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
  }, [filters]);

  const handleViewJob = useCallback((job: Job) => {
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

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1 className="page-title">Dashboard</h1>
        <p className="page-subtitle">
          Browse {jobs.length} opportunities from top Indian companies
        </p>
      </div>

      <FilterBar filters={filters} onFilterChange={setFilters} />

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
            title="No jobs match your search"
            description="Try adjusting your filters to see more results."
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

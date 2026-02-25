import type { FC } from 'react';
import { useState, useMemo, useCallback } from 'react';
import { jobs } from '../data/jobs';
import type { JobWithMatch } from '../utils/matchScore';
import { addMatchScores } from '../utils/matchScore';
import { JobCard, JobModal } from '../components/jobs';
import { EmptyState } from '../components/feedback/EmptyState';
import { getSavedJobs, unsaveJob } from '../utils/storage';
import { getPreferences } from '../utils/preferences';

export const SavedPage: FC = () => {
  const [savedJobIds, setSavedJobIds] = useState<string[]>(getSavedJobs());
  const [selectedJob, setSelectedJob] = useState<JobWithMatch | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const savedJobs = useMemo(() => {
    const preferences = getPreferences();
    const allJobsWithMatch = addMatchScores(jobs, preferences);
    return allJobsWithMatch.filter((job) => savedJobIds.includes(job.id));
  }, [savedJobIds]);

  const handleViewJob = useCallback((job: JobWithMatch) => {
    setSelectedJob(job);
    setIsModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
    setSelectedJob(null);
  }, []);

  const handleSaveToggle = useCallback((jobId: string, isSaved: boolean) => {
    if (!isSaved) {
      unsaveJob(jobId);
      setSavedJobIds((prev) => prev.filter((id) => id !== jobId));
    }
  }, []);

  return (
    <div className="saved-container">
      <div className="saved-header">
        <h1 className="page-title">Saved</h1>
        <p className="page-subtitle">
          {savedJobs.length > 0
            ? `${savedJobs.length} job${savedJobs.length === 1 ? '' : 's'} saved for later`
            : 'Jobs you have bookmarked for later review.'}
        </p>
      </div>

      <div className="saved-content">
        {savedJobs.length > 0 ? (
          <div className="jobs-grid">
            {savedJobs.map((job) => (
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
            title="No saved jobs"
            description="Save interesting opportunities from your dashboard to review them later."
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

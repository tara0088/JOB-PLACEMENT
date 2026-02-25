import type { FC } from 'react';
import type { JobWithMatch } from '../../utils/matchScore';
import { getMatchScoreColor } from '../../utils/matchScore';
import { Button } from '../ui/Button';
import { isJobSaved, saveJob, unsaveJob } from '../../utils/storage';

interface JobCardProps {
  job: JobWithMatch;
  onView: (job: JobWithMatch) => void;
  onSaveToggle: (jobId: string, isSaved: boolean) => void;
}

export const JobCard: FC<JobCardProps> = ({ job, onView, onSaveToggle }) => {
  const saved = isJobSaved(job.id);

  const handleSave = () => {
    if (saved) {
      unsaveJob(job.id);
      onSaveToggle(job.id, false);
    } else {
      saveJob(job.id);
      onSaveToggle(job.id, true);
    }
  };

  const handleApply = () => {
    window.open(job.applyUrl, '_blank', 'noopener,noreferrer');
  };

  const formatPostedDate = (days: number): string => {
    if (days === 0) return 'Today';
    if (days === 1) return '1 day ago';
    return `${days} days ago`;
  };

  const matchScoreColorClass = getMatchScoreColor(job.matchScore);

  return (
    <div className="job-card">
      <div className="job-card-header">
        <div className="job-card-title-section">
          <div className="job-card-title-row">
            <h3 className="job-card-title">{job.title}</h3>
            <span className={`match-score-badge ${matchScoreColorClass}`}>
              {job.matchScore}%
            </span>
          </div>
          <span className="job-card-company">{job.company}</span>
        </div>
        <span className={`job-card-source job-card-source-${job.source.toLowerCase()}`}>
          {job.source}
        </span>
      </div>

      <div className="job-card-details">
        <div className="job-card-detail">
          <span className="job-card-detail-label">Location:</span>
          <span className="job-card-detail-value">{job.location} • {job.mode}</span>
        </div>
        <div className="job-card-detail">
          <span className="job-card-detail-label">Experience:</span>
          <span className="job-card-detail-value">{job.experience}</span>
        </div>
        <div className="job-card-detail">
          <span className="job-card-detail-label">Salary:</span>
          <span className="job-card-detail-value job-card-salary">{job.salaryRange}</span>
        </div>
      </div>

      <div className="job-card-footer">
        <span className="job-card-posted">{formatPostedDate(job.postedDaysAgo)}</span>
        <div className="job-card-actions">
          <Button variant="secondary" size="sm" onClick={() => onView(job)}>
            View
          </Button>
          <Button
            variant={saved ? 'primary' : 'secondary'}
            size="sm"
            onClick={handleSave}
          >
            {saved ? 'Saved' : 'Save'}
          </Button>
          <Button variant="primary" size="sm" onClick={handleApply}>
            Apply
          </Button>
        </div>
      </div>
    </div>
  );
};

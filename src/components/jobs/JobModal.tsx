import type { FC } from 'react';
import type { Job } from '../../types/job';
import { Button } from '../ui/Button';

interface JobModalProps {
  job: Job | null;
  isOpen: boolean;
  onClose: () => void;
}

export const JobModal: FC<JobModalProps> = ({ job, isOpen, onClose }) => {
  if (!isOpen || !job) return null;

  const handleApply = () => {
    window.open(job.applyUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="job-modal-overlay" onClick={onClose}>
      <div className="job-modal" onClick={(e) => e.stopPropagation()}>
        <div className="job-modal-header">
          <h2 className="job-modal-title">{job.title}</h2>
          <button className="job-modal-close" onClick={onClose} aria-label="Close">
            ×
          </button>
        </div>

        <div className="job-modal-content">
          <div className="job-modal-section">
            <span className="job-modal-company">{job.company}</span>
            <span className={`job-modal-source job-modal-source-${job.source.toLowerCase()}`}>
              {job.source}
            </span>
          </div>

          <div className="job-modal-details">
            <div className="job-modal-detail">
              <span className="job-modal-detail-label">Location:</span>
              <span className="job-modal-detail-value">{job.location} • {job.mode}</span>
            </div>
            <div className="job-modal-detail">
              <span className="job-modal-detail-label">Experience:</span>
              <span className="job-modal-detail-value">{job.experience}</span>
            </div>
            <div className="job-modal-detail">
              <span className="job-modal-detail-label">Salary:</span>
              <span className="job-modal-detail-value job-modal-salary">{job.salaryRange}</span>
            </div>
            <div className="job-modal-detail">
              <span className="job-modal-detail-label">Posted:</span>
              <span className="job-modal-detail-value">
                {job.postedDaysAgo === 0 ? 'Today' : `${job.postedDaysAgo} days ago`}
              </span>
            </div>
          </div>

          <div className="job-modal-section">
            <h3 className="job-modal-section-title">Description</h3>
            <p className="job-modal-description">{job.description}</p>
          </div>

          <div className="job-modal-section">
            <h3 className="job-modal-section-title">Required Skills</h3>
            <div className="job-modal-skills">
              {job.skills.map((skill, index) => (
                <span key={index} className="job-modal-skill">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="job-modal-footer">
          <Button variant="secondary" onClick={onClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleApply}>
            Apply Now
          </Button>
        </div>
      </div>
    </div>
  );
};

import type { FC } from 'react';
import { useState, useMemo, useCallback } from 'react';

import { jobs } from '../data/jobs';
import { addMatchScores } from '../utils/matchScore';
import { getPreferences, hasPreferences } from '../utils/preferences';
import {
  getTodayDigest,
  generateDigest,
  formatDigestAsText,
  createEmailDraft,
  hasTodayDigest,
} from '../utils/digest';
import type { DailyDigest } from '../types/digest';
import { Button } from '../components/ui/Button';
import { EmptyState } from '../components/feedback/EmptyState';
import { getMatchScoreColor } from '../utils/matchScore';

export const DigestPage: FC = () => {
  const prefsExist = hasPreferences();
  const [digest, setDigest] = useState<DailyDigest | null>(getTodayDigest());
  const [copied, setCopied] = useState(false);

  const jobsWithMatch = useMemo(() => {
    const preferences = getPreferences();
    return addMatchScores(jobs, preferences);
  }, []);

  const handleGenerateDigest = useCallback(() => {
    // Check if digest already exists for today
    const existingDigest = getTodayDigest();
    if (existingDigest) {
      setDigest(existingDigest);
    } else {
      const newDigest = generateDigest(jobsWithMatch);
      setDigest(newDigest);
    }
  }, [jobsWithMatch]);

  const handleCopyToClipboard = useCallback(async () => {
    if (!digest) return;
    const text = formatDigestAsText(digest);
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  }, [digest]);

  const handleCreateEmailDraft = useCallback(() => {
    if (!digest) return;
    const mailtoUrl = createEmailDraft(digest);
    window.location.href = mailtoUrl;
  }, [digest]);

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  // No preferences set - blocking message
  if (!prefsExist) {
    return (
      <div className="digest-page">
        <div className="digest-page-header">
          <h1 className="page-title">Digest</h1>
          <p className="page-subtitle">
            Your daily summary of top-matching opportunities.
          </p>
        </div>

        <div className="digest-blocking-message">
          <EmptyState
            title="Set preferences to generate a personalized digest"
            description="Configure your job preferences to receive a curated daily summary of your best matches."
            actionLabel="Go to Settings"
            onAction={() => window.location.href = '/settings'}
          />
        </div>
      </div>
    );
  }

  // No digest generated yet
  if (!digest) {
    return (
      <div className="digest-page">
        <div className="digest-page-header">
          <h1 className="page-title">Digest</h1>
          <p className="page-subtitle">
            Your daily summary of top-matching opportunities.
          </p>
        </div>

        <div className="digest-generate-section">
          <div className="digest-simulation-note">
            Demo Mode: Daily 9AM trigger simulated manually.
          </div>
          <Button variant="primary" size="lg" onClick={handleGenerateDigest}>
            {hasTodayDigest()
              ? 'Load Today\'s 9AM Digest'
              : 'Generate Today\'s 9AM Digest (Simulated)'}
          </Button>
        </div>
      </div>
    );
  }

  // No matches found
  if (digest.jobs.length === 0) {
    return (
      <div className="digest-page">
        <div className="digest-page-header">
          <h1 className="page-title">Digest</h1>
          <p className="page-subtitle">
            Your daily summary of top-matching opportunities.
          </p>
        </div>

        <div className="digest-content">
          <EmptyState
            title="No matching roles today"
            description="Check again tomorrow for new opportunities that match your preferences."
          />
          <div className="digest-actions">
            <Button variant="secondary" onClick={handleGenerateDigest}>
              Regenerate Digest
            </Button>
          </div>
        </div>

        <div className="digest-simulation-note">
          Demo Mode: Daily 9AM trigger simulated manually.
        </div>
      </div>
    );
  }

  // Digest with jobs - email-style layout
  return (
    <div className="digest-page">
      <div className="digest-page-header">
        <h1 className="page-title">Digest</h1>
        <p className="page-subtitle">
          Your daily summary of top-matching opportunities.
        </p>
      </div>

      <div className="digest-email-container">
        <div className="digest-email-card">
          {/* Header */}
          <div className="digest-email-header">
            <h2 className="digest-email-title">
              Top {digest.jobs.length} Jobs For You — 9AM Digest
            </h2>
            <p className="digest-email-date">{formatDate(digest.date)}</p>
          </div>

          {/* Job List */}
          <div className="digest-email-jobs">
            {digest.jobs.map((job, index) => {
              const scoreColorClass = getMatchScoreColor(job.matchScore);
              return (
                <div key={job.id} className="digest-email-job">
                  <div className="digest-email-job-header">
                    <span className="digest-email-job-number">{index + 1}.</span>
                    <h3 className="digest-email-job-title">{job.title}</h3>
                    <span className={`digest-email-job-score ${scoreColorClass}`}>
                      {job.matchScore}%
                    </span>
                  </div>
                  <div className="digest-email-job-details">
                    <p className="digest-email-job-company">{job.company}</p>
                    <p className="digest-email-job-meta">
                      {job.location} • {job.experience}
                    </p>
                  </div>
                  <div className="digest-email-job-action">
                    <a
                      href={job.applyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-primary btn-sm"
                    >
                      Apply
                    </a>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Footer */}
          <div className="digest-email-footer">
            <p>This digest was generated based on your preferences.</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="digest-actions-bar">
          <Button
            variant="secondary"
            onClick={handleCopyToClipboard}
          >
            {copied ? 'Copied!' : 'Copy Digest to Clipboard'}
          </Button>
          <Button variant="primary" onClick={handleCreateEmailDraft}>
            Create Email Draft
          </Button>
        </div>
      </div>

      <div className="digest-simulation-note">
        Demo Mode: Daily 9AM trigger simulated manually.
      </div>
    </div>
  );
};

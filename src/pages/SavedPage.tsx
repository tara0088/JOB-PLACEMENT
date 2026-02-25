import type { FC } from 'react';
import { EmptyState } from '../components/feedback/EmptyState';

export const SavedPage: FC = () => {
  return (
    <div className="saved-container">
      <div className="saved-header">
        <h1 className="page-title">Saved</h1>
        <p className="page-subtitle">
          Jobs you have bookmarked for later review.
        </p>
      </div>

      <div className="saved-content">
        <EmptyState
          title="No saved jobs"
          description="Save interesting opportunities from your dashboard to review them later."
        />
      </div>
    </div>
  );
};

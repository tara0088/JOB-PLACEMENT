import type { FC } from 'react';
import { EmptyState } from '../components/feedback/EmptyState';

export const DigestPage: FC = () => {
  return (
    <div className="digest-container">
      <div className="digest-header">
        <h1 className="page-title">Digest</h1>
        <p className="page-subtitle">
          Your daily summary of new and relevant opportunities.
        </p>
      </div>

      <div className="digest-content">
        <EmptyState
          title="Daily digest coming soon"
          description="This feature will deliver a curated summary of new matches every morning at 9AM."
        />
      </div>
    </div>
  );
};

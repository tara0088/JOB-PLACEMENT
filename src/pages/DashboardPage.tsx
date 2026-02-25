import type { FC } from 'react';
import { EmptyState } from '../components/feedback/EmptyState';

export const DashboardPage: FC = () => {
  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1 className="page-title">Dashboard</h1>
        <p className="page-subtitle">
          Your personalized job matches will appear here.
        </p>
      </div>

      <div className="dashboard-content">
        <EmptyState
          title="No jobs yet"
          description="In the next step, you will load a realistic dataset."
        />
      </div>
    </div>
  );
};

import React from 'react';
import { StatusBadge, type StatusType } from '../ui/StatusBadge';

interface TopBarProps {
  appName?: string;
  currentStep?: number;
  totalSteps?: number;
  status?: StatusType;
}

export const TopBar: React.FC<TopBarProps> = ({
  appName = 'Job Notification App',
  currentStep = 1,
  totalSteps = 5,
  status = 'not-started',
}) => {
  return (
    <header className="top-bar">
      <div className="top-bar-left">
        <span className="app-name">{appName}</span>
      </div>
      
      <div className="top-bar-center">
        <div className="progress-indicator">
          <span>Step {currentStep} / {totalSteps}</span>
          <div className="progress-indicator-dots">
            {Array.from({ length: totalSteps }).map((_, index) => (
              <span
                key={index}
                className={`progress-dot ${
                  index < currentStep - 1 ? 'completed' : ''
                } ${index === currentStep - 1 ? 'active' : ''}`}
              />
            ))}
          </div>
        </div>
      </div>
      
      <div className="top-bar-right">
        <StatusBadge status={status} />
      </div>
    </header>
  );
};

import type { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';

export const HomePage: FC = () => {
  const navigate = useNavigate();

  const handleStartTracking = () => {
    navigate('/settings');
  };

  return (
    <div className="landing-container">
      <div className="landing-content">
        <h1 className="landing-headline">
          Stop Missing The Right Jobs.
        </h1>
        <p className="landing-subtext">
          Precision-matched job discovery delivered daily at 9AM.
        </p>
        <div className="landing-cta">
          <Button variant="primary" size="lg" onClick={handleStartTracking}>
            Start Tracking
          </Button>
        </div>
      </div>
    </div>
  );
};

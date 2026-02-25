import type { FC } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';

export const NotFoundPage: FC = () => {
  return (
    <div className="page-container">
      <div className="page-content not-found-content">
        <h1 className="page-title">Page Not Found</h1>
        <p className="page-subtitle">
          The page you are looking for does not exist.
        </p>
        <div className="not-found-action">
          <Link to="/">
            <Button variant="primary">Go Home</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

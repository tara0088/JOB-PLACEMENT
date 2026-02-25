import type { FC, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { TopNavigation } from './TopNavigation';
import { MobileNavigation } from './MobileNavigation';

interface NavigationShellProps {
  children: ReactNode;
}

export const NavigationShell: FC<NavigationShellProps> = ({ children }) => {
  return (
    <div className="app">
      <header className="navigation-shell-header">
        <div className="navigation-shell-brand">
          <Link to="/" className="navigation-shell-logo">
            Job Notification App
          </Link>
        </div>
        <div className="navigation-shell-nav">
          <TopNavigation />
        </div>
        <div className="navigation-shell-mobile">
          <MobileNavigation />
        </div>
      </header>
      <main className="navigation-shell-main">
        {children}
      </main>
    </div>
  );
};

import type { FC } from 'react';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';

interface NavItem {
  path: string;
  label: string;
}

const navItems: NavItem[] = [
  { path: '/dashboard', label: 'Dashboard' },
  { path: '/saved', label: 'Saved' },
  { path: '/digest', label: 'Digest' },
  { path: '/settings', label: 'Settings' },
  { path: '/proof', label: 'Proof' },
];

export const MobileNavigation: FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <div className="mobile-navigation">
      <button
        className="mobile-navigation-toggle"
        onClick={toggleMenu}
        aria-expanded={isOpen}
        aria-label="Toggle navigation menu"
      >
        <span className={`hamburger-line ${isOpen ? 'open' : ''}`} />
        <span className={`hamburger-line ${isOpen ? 'open' : ''}`} />
        <span className={`hamburger-line ${isOpen ? 'open' : ''}`} />
      </button>

      {isOpen && (
        <div className="mobile-navigation-overlay" onClick={closeMenu} />
      )}

      <nav className={`mobile-navigation-panel ${isOpen ? 'open' : ''}`}>
        <ul className="mobile-navigation-list">
          {navItems.map((item) => (
            <li key={item.path} className="mobile-navigation-item">
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `mobile-navigation-link ${isActive ? 'active' : ''}`
                }
                onClick={closeMenu}
                end={item.path === '/dashboard'}
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

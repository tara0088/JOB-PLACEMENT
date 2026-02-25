import type { FC } from 'react';
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

export const TopNavigation: FC = () => {
  return (
    <nav className="top-navigation">
      <ul className="top-navigation-list">
        {navItems.map((item) => (
          <li key={item.path} className="top-navigation-item">
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                `top-navigation-link ${isActive ? 'active' : ''}`
              }
              end={item.path === '/dashboard'}
            >
              {item.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

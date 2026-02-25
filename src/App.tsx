import type { FC } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { NavigationShell } from './components/navigation';
import {
  HomePage,
  DashboardPage,
  SavedPage,
  DigestPage,
  SettingsPage,
  ProofPage,
  NotFoundPage,
} from './pages';
import './styles/design-system.css';
import './styles/components.css';
import './styles/layout.css';
import './styles/navigation.css';

const App: FC = () => {
  return (
    <BrowserRouter>
      <NavigationShell>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/saved" element={<SavedPage />} />
          <Route path="/digest" element={<DigestPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/proof" element={<ProofPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </NavigationShell>
    </BrowserRouter>
  );
};

export default App;

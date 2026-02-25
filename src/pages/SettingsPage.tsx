import type { FC } from 'react';
import { Card } from '../components/ui/Card';
import { InputGroup } from '../components/ui/InputGroup';
import { Button } from '../components/ui/Button';

export const SettingsPage: FC = () => {
  return (
    <div className="settings-container">
      <div className="settings-header">
        <h1 className="page-title">Settings</h1>
        <p className="page-subtitle">
          Configure your job preferences to receive personalized matches.
        </p>
      </div>

      <div className="settings-content">
        <Card title="Job Preferences">
          <div className="settings-form">
            <InputGroup
              label="Role Keywords"
              name="roleKeywords"
              hint="e.g. Frontend Engineer, Product Manager, Data Scientist"
              inputProps={{
                type: 'text',
                placeholder: 'Enter role keywords...',
              }}
            />

            <InputGroup
              label="Preferred Locations"
              name="locations"
              hint="e.g. San Francisco, New York, London"
              inputProps={{
                type: 'text',
                placeholder: 'Enter preferred locations...',
              }}
            />

            <div className="settings-field">
              <label className="input-label">Work Mode</label>
              <div className="settings-options">
                <label className="settings-option">
                  <input type="radio" name="workMode" value="remote" className="radio" />
                  <span className="radio-label">Remote</span>
                </label>
                <label className="settings-option">
                  <input type="radio" name="workMode" value="hybrid" className="radio" />
                  <span className="radio-label">Hybrid</span>
                </label>
                <label className="settings-option">
                  <input type="radio" name="workMode" value="onsite" className="radio" />
                  <span className="radio-label">Onsite</span>
                </label>
              </div>
            </div>

            <div className="settings-field">
              <label className="input-label">Experience Level</label>
              <select className="input select" name="experienceLevel">
                <option value="">Select experience level...</option>
                <option value="entry">Entry Level (0-2 years)</option>
                <option value="mid">Mid Level (3-5 years)</option>
                <option value="senior">Senior Level (6+ years)</option>
                <option value="lead">Lead / Staff</option>
              </select>
            </div>
          </div>
        </Card>

        <div className="settings-actions">
          <Button variant="secondary">Cancel</Button>
          <Button variant="primary">Save Preferences</Button>
        </div>
      </div>
    </div>
  );
};

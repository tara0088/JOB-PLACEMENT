import type { FC } from 'react';
import { useState, useEffect } from 'react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { locations } from '../data/jobs';
import type { UserPreferences, WorkModePreference, ExperienceLevelPreference } from '../types/preferences';
import { DEFAULT_PREFERENCES } from '../types/preferences';
import { getPreferences, savePreferences } from '../utils/preferences';

export const SettingsPage: FC = () => {
  const [preferences, setPreferences] = useState<UserPreferences>(DEFAULT_PREFERENCES);
  const [roleKeywordsInput, setRoleKeywordsInput] = useState('');
  const [skillsInput, setSkillsInput] = useState('');
  const [saved, setSaved] = useState(false);

  // Load preferences on mount
  useEffect(() => {
    const savedPrefs = getPreferences();
    setPreferences(savedPrefs);
    setRoleKeywordsInput(savedPrefs.roleKeywords.join(', '));
    setSkillsInput(savedPrefs.skills.join(', '));
  }, []);

  const handleRoleKeywordsChange = (value: string) => {
    setRoleKeywordsInput(value);
    const keywords = value
      .split(',')
      .map((k) => k.trim())
      .filter((k) => k.length > 0);
    setPreferences((prev) => ({ ...prev, roleKeywords: keywords }));
  };

  const handleSkillsChange = (value: string) => {
    setSkillsInput(value);
    const skills = value
      .split(',')
      .map((s) => s.trim())
      .filter((s) => s.length > 0);
    setPreferences((prev) => ({ ...prev, skills }));
  };

  const handleLocationToggle = (location: string) => {
    setPreferences((prev) => {
      const newLocations = prev.preferredLocations.includes(location)
        ? prev.preferredLocations.filter((l) => l !== location)
        : [...prev.preferredLocations, location];
      return { ...prev, preferredLocations: newLocations };
    });
  };

  const handleModeToggle = (mode: WorkModePreference) => {
    setPreferences((prev) => {
      const newModes = prev.preferredModes.includes(mode)
        ? prev.preferredModes.filter((m) => m !== mode)
        : [...prev.preferredModes, mode];
      return { ...prev, preferredModes: newModes };
    });
  };

  const handleExperienceChange = (value: ExperienceLevelPreference | '') => {
    setPreferences((prev) => ({ ...prev, experienceLevel: value }));
  };

  const handleMinScoreChange = (value: number) => {
    setPreferences((prev) => ({ ...prev, minMatchScore: value }));
  };

  const handleSave = () => {
    savePreferences(preferences);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleCancel = () => {
    const savedPrefs = getPreferences();
    setPreferences(savedPrefs);
    setRoleKeywordsInput(savedPrefs.roleKeywords.join(', '));
    setSkillsInput(savedPrefs.skills.join(', '));
  };

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
            {/* Role Keywords */}
            <div className="settings-field">
              <label className="input-label">Role Keywords</label>
              <input
                type="text"
                className="input"
                placeholder="e.g. Frontend, Backend, React, Java"
                value={roleKeywordsInput}
                onChange={(e) => handleRoleKeywordsChange(e.target.value)}
              />
              <span className="input-hint">
                Enter keywords separated by commas
              </span>
            </div>

            {/* Preferred Locations */}
            <div className="settings-field">
              <label className="input-label">Preferred Locations</label>
              <div className="settings-multi-select">
                {locations.map((location) => (
                  <label key={location} className="settings-checkbox-option">
                    <input
                      type="checkbox"
                      className="checkbox"
                      checked={preferences.preferredLocations.includes(location)}
                      onChange={() => handleLocationToggle(location)}
                    />
                    <span className="checkbox-label">{location}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Work Mode */}
            <div className="settings-field">
              <label className="input-label">Preferred Work Mode</label>
              <div className="settings-options">
                {(['Remote', 'Hybrid', 'Onsite'] as WorkModePreference[]).map((mode) => (
                  <label key={mode} className="settings-checkbox-option">
                    <input
                      type="checkbox"
                      className="checkbox"
                      checked={preferences.preferredModes.includes(mode)}
                      onChange={() => handleModeToggle(mode)}
                    />
                    <span className="checkbox-label">{mode}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Experience Level */}
            <div className="settings-field">
              <label className="input-label">Experience Level</label>
              <select
                className="input select"
                value={preferences.experienceLevel}
                onChange={(e) => handleExperienceChange(e.target.value as ExperienceLevelPreference | '')}
              >
                <option value="">Any experience level</option>
                <option value="Fresher">Fresher</option>
                <option value="0-1">0-1 years</option>
                <option value="1-3">1-3 years</option>
                <option value="3-5">3-5 years</option>
              </select>
            </div>

            {/* Skills */}
            <div className="settings-field">
              <label className="input-label">Your Skills</label>
              <input
                type="text"
                className="input"
                placeholder="e.g. React, Java, Python, SQL"
                value={skillsInput}
                onChange={(e) => handleSkillsChange(e.target.value)}
              />
              <span className="input-hint">
                Enter skills separated by commas for matching
              </span>
            </div>

            {/* Min Match Score */}
            <div className="settings-field">
              <label className="input-label">
                Minimum Match Score: {preferences.minMatchScore}%
              </label>
              <input
                type="range"
                className="settings-slider"
                min="0"
                max="100"
                value={preferences.minMatchScore}
                onChange={(e) => handleMinScoreChange(parseInt(e.target.value))}
              />
              <div className="settings-slider-labels">
                <span>0%</span>
                <span>50%</span>
                <span>100%</span>
              </div>
              <span className="input-hint">
                Jobs below this score will be filtered when "Show only matches" is enabled
              </span>
            </div>
          </div>
        </Card>

        <div className="settings-actions">
          <Button variant="secondary" onClick={handleCancel}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSave}>
            {saved ? 'Saved!' : 'Save Preferences'}
          </Button>
        </div>
      </div>
    </div>
  );
};

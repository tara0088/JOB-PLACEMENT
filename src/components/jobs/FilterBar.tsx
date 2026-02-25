import type { FC } from 'react';
import type { Filters } from '../../types/job';
import { locations, modes, experiences, sources } from '../../data/jobs';

interface FilterBarProps {
  filters: Filters;
  onFilterChange: (filters: Filters) => void;
}

export const FilterBar: FC<FilterBarProps> = ({ filters, onFilterChange }) => {
  const handleChange = (key: keyof Filters, value: string) => {
    onFilterChange({ ...filters, [key]: value });
  };

  const handleClearFilters = () => {
    onFilterChange({
      keyword: '',
      location: '',
      mode: '',
      experience: '',
      source: '',
      sort: 'latest',
    });
  };

  const hasActiveFilters =
    filters.keyword ||
    filters.location ||
    filters.mode ||
    filters.experience ||
    filters.source;

  return (
    <div className="filter-bar">
      <div className="filter-bar-row">
        <div className="filter-bar-search">
          <input
            type="text"
            className="input"
            placeholder="Search by title or company..."
            value={filters.keyword}
            onChange={(e) => handleChange('keyword', e.target.value)}
          />
        </div>

        <div className="filter-bar-filters">
          <select
            className="input select"
            value={filters.location}
            onChange={(e) => handleChange('location', e.target.value)}
          >
            <option value="">All Locations</option>
            {locations.map((loc) => (
              <option key={loc} value={loc}>
                {loc}
              </option>
            ))}
          </select>

          <select
            className="input select"
            value={filters.mode}
            onChange={(e) => handleChange('mode', e.target.value)}
          >
            <option value="">All Modes</option>
            {modes.map((mode) => (
              <option key={mode} value={mode}>
                {mode}
              </option>
            ))}
          </select>

          <select
            className="input select"
            value={filters.experience}
            onChange={(e) => handleChange('experience', e.target.value)}
          >
            <option value="">All Experience</option>
            {experiences.map((exp) => (
              <option key={exp} value={exp}>
                {exp}
              </option>
            ))}
          </select>

          <select
            className="input select"
            value={filters.source}
            onChange={(e) => handleChange('source', e.target.value)}
          >
            <option value="">All Sources</option>
            {sources.map((source) => (
              <option key={source} value={source}>
                {source}
              </option>
            ))}
          </select>

          <select
            className="input select"
            value={filters.sort}
            onChange={(e) => handleChange('sort', e.target.value)}
          >
            <option value="latest">Latest First</option>
            <option value="oldest">Oldest First</option>
            <option value="salary-high">Salary: High to Low</option>
            <option value="salary-low">Salary: Low to High</option>
          </select>
        </div>
      </div>

      {hasActiveFilters && (
        <div className="filter-bar-actions">
          <button className="filter-bar-clear" onClick={handleClearFilters}>
            Clear all filters
          </button>
        </div>
      )}
    </div>
  );
};

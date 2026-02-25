import React from 'react';
import { Input } from './Input';

interface InputGroupProps {
  label: string;
  name: string;
  hint?: string;
  error?: string;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
}

export const InputGroup: React.FC<InputGroupProps> = ({
  label,
  name,
  hint,
  error,
  inputProps = {},
}) => {
  return (
    <div className="input-group">
      <label htmlFor={name} className="input-label">
        {label}
      </label>
      <Input
        id={name}
        name={name}
        error={error}
        {...inputProps}
      />
      {error && <span className="input-error-message">{error}</span>}
      {!error && hint && <span className="input-hint">{hint}</span>}
    </div>
  );
};

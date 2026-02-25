import React from 'react';

interface ContextHeaderProps {
  title: string;
  subtitle?: string;
}

export const ContextHeader: React.FC<ContextHeaderProps> = ({
  title,
  subtitle,
}) => {
  return (
    <div className="context-header">
      <h1 className="context-header-title">{title}</h1>
      {subtitle && <p className="context-header-subtitle">{subtitle}</p>}
    </div>
  );
};

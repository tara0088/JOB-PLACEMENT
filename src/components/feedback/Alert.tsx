import React from 'react';

export type AlertVariant = 'error' | 'warning' | 'success';

interface AlertProps {
  variant: AlertVariant;
  title?: string;
  children: React.ReactNode;
}

const variantIcons: Record<AlertVariant, string> = {
  error: '⚠',
  warning: '⚡',
  success: '✓',
};

export const Alert: React.FC<AlertProps> = ({
  variant,
  title,
  children,
}) => {
  return (
    <div className={`alert alert-${variant}`} role="alert">
      <span aria-hidden="true">{variantIcons[variant]}</span>
      <div>
        {title && <div className="alert-title">{title}</div>}
        <p className="alert-message">{children}</p>
      </div>
    </div>
  );
};

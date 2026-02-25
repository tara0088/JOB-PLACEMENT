import React from 'react';

interface PanelCardProps {
  title: string;
  children: React.ReactNode;
}

export const PanelCard: React.FC<PanelCardProps> = ({
  title,
  children,
}) => {
  return (
    <div className="panel-card">
      <h4 className="panel-card-title">{title}</h4>
      <div className="panel-card-content">
        {children}
      </div>
    </div>
  );
};

import React from 'react';

interface SecondaryPanelProps {
  children: React.ReactNode;
}

export const SecondaryPanel: React.FC<SecondaryPanelProps> = ({
  children,
}) => {
  return (
    <aside className="secondary-panel">
      {children}
    </aside>
  );
};

import React from 'react';

interface PrimaryWorkspaceProps {
  children: React.ReactNode;
}

export const PrimaryWorkspace: React.FC<PrimaryWorkspaceProps> = ({
  children,
}) => {
  return (
    <main className="primary-workspace">
      {children}
    </main>
  );
};

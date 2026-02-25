import React from 'react';

export type StatusType = 'not-started' | 'in-progress' | 'shipped';

interface StatusBadgeProps {
  status: StatusType;
}

const statusLabels: Record<StatusType, string> = {
  'not-started': 'Not Started',
  'in-progress': 'In Progress',
  'shipped': 'Shipped',
};

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  return (
    <span className={`badge badge-${status}`}>
      {statusLabels[status]}
    </span>
  );
};

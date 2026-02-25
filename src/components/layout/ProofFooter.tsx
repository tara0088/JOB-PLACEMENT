import React from 'react';

interface ChecklistItem {
  label: string;
  completed: boolean;
}

interface ProofFooterProps {
  items?: ChecklistItem[];
}

const defaultItems: ChecklistItem[] = [
  { label: 'UI Built', completed: false },
  { label: 'Logic Working', completed: false },
  { label: 'Test Passed', completed: false },
  { label: 'Deployed', completed: false },
];

export const ProofFooter: React.FC<ProofFooterProps> = ({
  items = defaultItems,
}) => {
  return (
    <footer className="proof-footer">
      <div className="proof-footer-content">
        <span className="proof-footer-label">Proof</span>
        <ul className="checklist">
          {items.map((item, index) => (
            <li
              key={index}
              className={`checklist-item ${item.completed ? 'completed' : ''}`}
            >
              <span className="checklist-box" />
              <span>{item.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
};

import React, { useState } from 'react';

interface PromptBoxProps {
  code: string;
}

export const PromptBox: React.FC<PromptBoxProps> = ({ code }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="prompt-box" onClick={handleCopy}>
      <pre className="prompt-box-code">{code}</pre>
      <button className="prompt-box-copy">
        {copied ? 'Copied' : 'Copy'}
      </button>
    </div>
  );
};

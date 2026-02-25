import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className = '', error, ...props }, ref) => {
    const baseClass = 'input';
    const errorClass = error ? 'input-error' : '';
    
    const combinedClass = [baseClass, errorClass, className]
      .filter(Boolean)
      .join(' ');

    return (
      <input ref={ref} className={combinedClass} {...props} />
    );
  }
);

Input.displayName = 'Input';

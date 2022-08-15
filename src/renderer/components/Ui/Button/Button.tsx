import clsx from 'clsx';
import React from 'react';

export interface ButtonProps {
  children?: React.ReactNode;
  className?: string;
}

/**
 * Button Component
 */
export const Button: React.FC<
  ButtonProps & JSX.IntrinsicElements['button']
> = ({ children, className, ...props }) => {
  return (
    <button
      {...props}
      className={clsx(
        'inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary hover:opacity-75',
        className
      )}
    >
      {children}
    </button>
  );
};

export default Button;

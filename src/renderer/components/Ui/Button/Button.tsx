import React from 'react';
import clsx from 'clsx';

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
        'inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500',
        className
      )}
    >
      {children}
    </button>
  );
};

export default Button;

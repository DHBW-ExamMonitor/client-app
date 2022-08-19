import clsx from 'clsx';
import React from 'react';

export interface ButtonProps {
  children?: React.ReactNode;
  className?: string;
  secondary?: boolean;
  loading?: boolean;
}

/**
 * Button Component
 */
export const Button: React.FC<
  ButtonProps & JSX.IntrinsicElements['button']
> = ({ children, className, secondary, loading, ...props }) => {
  return (
    <button
      {...props}
      disabled={loading}
      className={clsx(
        'inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary hover:opacity-75',
        className
      )}
    >
      {!loading ? children : 'Lädt...'}
    </button>
  );
};

export default Button;

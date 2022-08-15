import clsx from 'clsx';
import { Field, FieldProps } from 'formik';
import React from 'react';

export interface DropdownProps {
  children?: React.ReactNode;
  className?: string;
  field: FieldProps['field'];
  meta: FieldProps['meta'];
  label: string;
  optional?: boolean;
}

/**
 * Dropdown Component
 */
export const Dropdown: React.FC<DropdownProps> = ({
  children,
  className,
  field,
  meta,
  label,
  optional,
}) => {
  return (
    <div className={className}>
      {optional ? (
        <div className="flex justify-between">
          <label
            htmlFor={field.name}
            className={
              meta.touched && meta.error
                ? 'block text-sm font-medium text-red-500'
                : 'color-primary block text-sm font-medium'
            }
          >
            {label}
          </label>
          <span
            className={clsx(
              meta.touched && meta.error
                ? 'text-sm text-red-500'
                : 'text-sm text-gray-500'
            )}
          >
            Optional
          </span>
        </div>
      ) : (
        <label
          htmlFor={field.name}
          className={clsx(
            meta.touched && meta.error ? 'text-red-500' : 'color-primary',
            'block text-sm font-medium'
          )}
        >
          {label}
        </label>
      )}

      <Field
        as="select"
        name={field.name}
        className={clsx(
          'border-gray-300',
          'mt-1 text-sm block font-medium w-full rounded-md text-gray-900 shadow-sm focus:border-gray-500 focus:ring-gray-500'
        )}
      >
        {children}
      </Field>
      {meta.touched && meta.error ? (
        <p className="mt-1 block text-xs font-medium text-red-500">
          {meta.error}
        </p>
      ) : null}
    </div>
  );
};

export default Dropdown;

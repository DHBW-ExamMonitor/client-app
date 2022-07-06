import clsx from 'clsx';
import { FieldProps } from 'formik';
import React from 'react';

export interface InputFieldProps {
  className?: string;
  field: FieldProps['field'];
  meta: FieldProps['meta'];
  label: string;
  optional?: boolean;
}

/**
 * InputField Component
 */
export const InputField: React.FC<
  InputFieldProps & JSX.IntrinsicElements['input']
> = ({ className, field, meta, label, optional, ...props }) => {
  return (
    <div className={clsx(className)}>
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
      <div className="mt-1">
        <input
          {...field}
          {...props}
          id={field.name}
          name={field.name}
          className={clsx(
            meta.touched && meta.error
              ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
              : 'border-gray-300 focus:border-primary focus:ring-primary',
            'block w-full rounded-md shadow-sm text-sm'
          )}
        />
        {meta.touched && meta.error ? (
          <p className="mt-1 block text-xs font-medium text-red-500">
            {meta.error}
          </p>
        ) : null}
      </div>
    </div>
  );
};

export default InputField;

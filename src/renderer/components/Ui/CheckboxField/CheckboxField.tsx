import React from 'react';
import clsx from 'clsx';
import { FieldProps } from 'formik';

export interface CheckboxFieldProps {
  className?: string;
  field: FieldProps['field'];
  meta: FieldProps['meta'];
  label: string;
  text?: string;
}

/**
 * CheckboxField Component
 */
export const CheckboxField: React.FC<
  CheckboxFieldProps & JSX.IntrinsicElements['input']
> = ({ className, field, meta, label, text, ...props }) => {
  return (
    <div className={clsx('relative flex items-start', className)}>
      <div className="flex h-5 items-center">
        <input
          {...field}
          {...props}
          checked={field.value}
          type="checkbox"
          className="h-4 w-4 rounded border-gray-300 text-primary"
        />
        {meta.touched && meta.error ? (
          <p className="mt-1 block text-xs font-medium text-red-500">
            {meta.error}
          </p>
        ) : null}
      </div>
      <div className="ml-3 text-sm">
        <label htmlFor={field.name} className="font-medium text-gray-700">
          {label}
        </label>
        <p id="comments-description" className="text-gray-500">
          {text}
        </p>
      </div>
    </div>
  );
};

export default CheckboxField;

import clsx from 'clsx';
import { FieldProps } from 'formik';
import React from 'react';

export interface TextAreaFieldProps {
  field: FieldProps['field'];
  meta: FieldProps['meta'];
  label: string;
  maxChars?: number;
  labelDark?: boolean;
  labelSmall?: boolean;
}

/**
 * TextAreaField Component
 */
export const TextAreaField: React.FC<
  TextAreaFieldProps & JSX.IntrinsicElements['textarea']
> = ({ field, meta, label, maxChars, labelDark, labelSmall, ...props }) => {
  return (
    <div>
      <div className="flex justify-between">
        <label
          htmlFor={field.name}
          className={clsx(
            meta.touched && meta.error
              ? 'block text-sm font-medium text-red-500'
              : 'color-primary block text-sm font-medium'
          )}
        >
          {label}
        </label>
      </div>
      <div className="mt-1">
        <textarea
          {...field}
          {...props}
          id={field.name}
          name={field.name}
          className={clsx(
            meta.touched && meta.error
              ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
              : 'border-gray-300 focus:border-primary focus:ring-primary',
            'block w-full shadow-sm sm:text-sm rounded-md'
          )}
        />
        <div className="flex justify-between">
          {meta.touched && meta.error ? (
            <p className="mt-1 block text-xs font-medium text-primary">
              {meta.error}
            </p>
          ) : (
            <div></div>
          )}

          <p
            className={clsx(
              meta.touched && meta.error ? 'text-primary' : 'text-gray-500',
              'mt-1 block text-xs font-medium'
            )}
          >
            {meta.value.length} / {maxChars}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TextAreaField;

import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, SelectorIcon } from '@heroicons/react/outline';
import clsx from 'clsx';
import { FieldProps, useFormikContext } from 'formik';
import React, { Fragment } from 'react';

export type MultiselectValue = {
  label: string;
  value: string;
};

export interface MultiselectDropdownProps {
  field: FieldProps['field'];
  meta: FieldProps['meta'];
  label: string;
  data: MultiselectValue[];
}

/**
 * MultiselectDropdown Component
 */
export const MultiselectDropdown: React.FC<MultiselectDropdownProps> = ({
  field,
  meta,
  label,
  data,
}) => {
  const form = useFormikContext();

  return (
    <>
      <Listbox
        value={field.value}
        onChange={(e) => {
          const v: MultiselectValue[] = field.value;

          if (!v.some((a) => a.value === e.value)) {
            v.push(e);
          } else {
            const index = v.findIndex((a) => a.value === e.value);
            v.splice(index, 1);
          }
          form.setFieldValue(field.name, v);
        }}
      >
        {({ open }) => (
          <div>
            <Listbox.Label
              className={clsx(
                'block text-sm font-medium ',
                meta.touched && meta.error ? 'text-red-800' : 'text-gray-700'
              )}
            >
              {label}
            </Listbox.Label>
            {data && data.length ? (
              <div className="relative">
                <Listbox.Button
                  className={clsx(
                    'bg-white relative w-full border rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 sm:text-sm',
                    meta.touched && meta.error
                      ? 'focus:ring-red-800 focus:border-red-800 border-red-800'
                      : 'border-gray-300 focus:ring-secondary focus:border-secondary'
                  )}
                >
                  <span className="block truncate">
                    {field.value.length ? (
                      <p className="sm:text-sm">
                        {field.value
                          .map((v: MultiselectValue) => v.label)
                          .join(', ')}
                      </p>
                    ) : (
                      'Auswählen...'
                    )}
                  </span>
                  <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                    <SelectorIcon
                      className="h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                  </span>
                </Listbox.Button>

                <Transition
                  show={open}
                  as={Fragment}
                  leave="transition ease-in duration-100"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <Listbox.Options className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                    {data.map((v: MultiselectValue) => (
                      <Listbox.Option
                        key={v.value}
                        className={({ active }) =>
                          clsx(
                            active ? 'text-white bg-primary' : 'text-gray-900',
                            'cursor-default select-none relative py-2 pl-3 pr-9 group'
                          )
                        }
                        value={v}
                      >
                        <>
                          <span
                            className={clsx(
                              field.value.some(
                                (a: MultiselectValue) => a.value === v.value
                              )
                                ? 'font-semibold'
                                : 'font-normal',
                              'block truncate'
                            )}
                          >
                            {v.label}
                          </span>

                          {field.value.some(
                            (a: MultiselectValue) => a.value === v.value
                          ) ? (
                            <span
                              className={clsx(
                                'group-hover:text-white',
                                'absolute inset-y-0 right-0 flex items-center pr-4'
                              )}
                            >
                              <CheckIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                            </span>
                          ) : null}
                        </>
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </Transition>
              </div>
            ) : (
              <div className="block text-sm font-medium text-primary">
                Keine Kurse vorhanden.
              </div>
            )}
          </div>
        )}
      </Listbox>

      {meta.touched && meta.error && (
        <p className="mt-1 block text-xs font-medium text-red-800">
          {meta.error}
        </p>
      )}
    </>
  );
};

export default MultiselectDropdown;

import React, { Dispatch, SetStateAction } from 'react';
import clsx from 'clsx';

export interface SwitchProps {
  className?: string;
  values: string[];
  selectedIndex: number;
  setSelectedIndex: Dispatch<SetStateAction<number>>;
}

/**
 * Switch Component
 */
export const Switch: React.FC<SwitchProps> = ({
  className,
  values,
  selectedIndex,
  setSelectedIndex,
}) => {
  return (
    <div className={clsx('h-16 w-96', className)}>
      <div className="flex items-center justify-between bg-gray-200 p-1 rounded-xl space-x-1">
        {values.map((value, i) => (
          <button
            key={value}
            type="button"
            className={clsx(
              'h-12 w-[50%] rounded-xl flex items-center justify-center',
              {
                'bg-primary text-white': i === selectedIndex,
                'bg-gray-100': i !== selectedIndex,
              }
            )}
            onClick={() => setSelectedIndex(i)}
          >
            <p className="text-sm">{value}</p>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Switch;

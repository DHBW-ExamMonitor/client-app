import React from 'react';
import clsx from 'clsx';

export interface TableDataProps {
  data: string;
  className?: string;
}

/**
 * TableHead Component
 */
export const TableData: React.FC<TableDataProps> = ({ data, className }) => {
  return (
    <div className={clsx('', className)}>
      <td
        className={clsx(
          'whitespace-nowrap px-3 py-4 text-sm text-gray-500',
          className
        )}
      >
        {data}
      </td>
    </div>
  );
};

export default TableData;

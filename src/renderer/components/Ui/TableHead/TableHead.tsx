import React from 'react';
import clsx from 'clsx';

export interface TableHeadProps {
  name: string;
  className?: string;
}

/**
 * TableHead Component
 */
export const TableHead: React.FC<TableHeadProps> = ({ name, className }) => {
  return (
    <th
      scope="col"
      className={clsx(
        'py-3.5 pl-3 pr-3 text-left text-sm font-semibold text-gray-900',
        className
      )}
    >
      {name}
    </th>
  );
};

export default TableHead;

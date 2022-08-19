import { PencilAltIcon, TrashIcon } from '@heroicons/react/outline';
import clsx from 'clsx';
import React from 'react';

export interface ActionIconsProps {
  className?: string;
  editAction?: () => void;
  deleteAction?: () => void;
}

/**
 * Actions Component
 */
export const ActionIcons: React.FC<ActionIconsProps> = ({
  className,
  editAction,
  deleteAction,
}) => {
  return (
    <div className={clsx('flex justify-end', className)}>
      <button onClick={editAction}>
        <PencilAltIcon className="h-5 w-5 hover:text-green-700" />
      </button>
      <button onClick={deleteAction}>
        <TrashIcon className="h-5 w-5 ml-2 hover:text-red-700" />
      </button>
    </div>
  );
};

export default ActionIcons;

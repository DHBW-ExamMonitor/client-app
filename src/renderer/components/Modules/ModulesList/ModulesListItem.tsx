import React from 'react';
import UpdateModuleModal from 'renderer/components/Modals/UpdateModuleModal';
import { Module } from 'renderer/types/module';

export interface ModulesListItemProps {
  module: Module;
}

/**
 * ModulesListItem Component
 */
export const ModulesListItem: React.FC<ModulesListItemProps> = ({ module }) => {
  const [updateModuleModalOpen, setUpdateModuleModalOpen] =
    React.useState(false);

  return (
    <>
      <tr>
        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
          {module.name}
        </td>
        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
          {module.vorlesungen}
        </td>
        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
          {module.aktiv ? 'JA' : 'NEIN'}
        </td>
        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
          <button
            className="text-indigo-600 hover:text-indigo-900"
            onClick={() => setUpdateModuleModalOpen(true)}
          >
            Bearbeiten
          </button>
          <div className="text-red-600 hover:text-red-900">Löschen</div>
        </td>
      </tr>
      <UpdateModuleModal
        open={updateModuleModalOpen}
        setOpen={setUpdateModuleModalOpen}
        module={module}
      />
    </>
  );
};

export default ModulesListItem;
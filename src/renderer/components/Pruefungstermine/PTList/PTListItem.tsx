import { format } from 'date-fns';
import React, { useState } from 'react';
import UpdatePruefungsterminModal from 'renderer/components/Modals/UpdatePruefungsterminModal';
import { Modules } from 'renderer/types/module';
import { Pruefungstermin } from 'renderer/types/pruefungstermin';

export interface PTListItemProps {
  pruefungstermin: Pruefungstermin;
  modules?: Modules;
}

/**
 * ModulesListItem Component
 */
export const PTListItem: React.FC<PTListItemProps> = ({
  pruefungstermin,
  modules,
}) => {
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  return (
    <>
      <tr>
        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
          {pruefungstermin.name}
        </td>
        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
          {pruefungstermin.modul.name}
        </td>
        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
          {pruefungstermin.hilfsmittel}
        </td>
        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
          {pruefungstermin.raeume}
        </td>
        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
          {pruefungstermin.aufsichtsPersonen}
        </td>
        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
          {pruefungstermin.notizen}
        </td>
        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
          {format(new Date(pruefungstermin.dateTime), 'dd.MM.yyyy HH:mm')}
        </td>
        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
          <button
            className="text-indigo-600 hover:text-indigo-900"
            onClick={() => setUpdateModalOpen(true)}
          >
            Bearbeiten
          </button>
          <div className="text-red-600 hover:text-red-900">Löschen</div>
        </td>
      </tr>
      <UpdatePruefungsterminModal
        open={updateModalOpen}
        setOpen={setUpdateModalOpen}
        modules={modules}
        pruefungstermin={pruefungstermin}
      />
    </>
  );
};

export default PTListItem;

import { format } from 'date-fns';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import CopyPruefungsterminModal from 'renderer/components/Modals/CopyPruefungsterminModal';
import UpdatePruefungsterminModal from 'renderer/components/Modals/UpdatePruefungsterminModal';
import ActionIcons from 'renderer/components/Ui/ActionIcons';
import Button from 'renderer/components/Ui/Button';
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
  const [updateModalOpen, setUpdateModalOpen] = useState<boolean>(false);
  const [copyModalOpen, setCopyModalOpen] = useState<boolean>(false);
  return (
    <>
      <tr>
        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
          <Link to={`/teilnahmen/${pruefungstermin.id}`}>
            <Button type="button">{pruefungstermin.name}</Button>
          </Link>
        </td>
        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
          {pruefungstermin.modul.name}
        </td>
        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
          {pruefungstermin.kurse.map((kurs) => kurs.name).join(', ')}
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
          <ActionIcons
            copyButton
            editAction={() => setUpdateModalOpen(true)}
            copyAction={() => setCopyModalOpen(true)}
            // deleteAction={() => setOpenWarningDialog(true)}
          />
        </td>
      </tr>
      <UpdatePruefungsterminModal
        open={updateModalOpen}
        setOpen={setUpdateModalOpen}
        modules={modules}
        pruefungstermin={pruefungstermin}
      />
      <CopyPruefungsterminModal
        open={copyModalOpen}
        setOpen={setCopyModalOpen}
        termin={pruefungstermin}
      />
    </>
  );
};

export default PTListItem;

import { format } from 'date-fns';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { queryClient } from 'renderer/api/api';
import { deletePruefungstermin } from 'renderer/api/pruefungstermine';
import UpdatePruefungsterminModal from 'renderer/components/Modals/UpdatePruefungsterminModal';
import ActionIcons from 'renderer/components/Ui/ActionIcons';
import Button from 'renderer/components/Ui/Button';
import WarningDialog from 'renderer/components/Ui/WarningDialog';
import { Modules } from 'renderer/types/module';
import { Pruefungstermin } from 'renderer/types/pruefungstermin';

export interface PTListItemProps {
  pruefungstermin: Pruefungstermin;
  modules?: Modules;
  disableActions?: boolean;
}

/**
 * ModulesListItem Component
 */
export const PTListItem: React.FC<PTListItemProps> = ({
  pruefungstermin,
  modules,
  disableActions,
}) => {
  const [updateModalOpen, setUpdateModalOpen] = React.useState(false);
  const [openWarningDialog, setOpenWarningDialog] = React.useState(false);
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

        {!disableActions && (
          <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
            <ActionIcons
              editAction={() => setUpdateModalOpen(true)}
              deleteAction={() => setOpenWarningDialog(true)}
            />
          </td>
        )}
      </tr>
      <UpdatePruefungsterminModal
        open={updateModalOpen}
        setOpen={setUpdateModalOpen}
        modules={modules}
        pruefungstermin={pruefungstermin}
      />
      <WarningDialog
        open={openWarningDialog}
        setOpen={setOpenWarningDialog}
        title={`Prüfungstermin "${pruefungstermin.name}" wirklich löschen?`}
        message="Beim Löschen eines Prüfungstermins werden alle zugehörigen Prüfungsteilnahmen gelöscht. Sind Sie sicher?"
        action={async () => {
          try {
            await deletePruefungstermin(pruefungstermin.id);
            toast.success(
              `Prüfungstermin "${pruefungstermin.name}" erfolgreich gelöscht.`
            );
          } catch (error) {
            console.error(error);
            toast.error('Prüfungstermin konnte nicht gelöscht werden.');
          } finally {
            setOpenWarningDialog(false);
            queryClient.invalidateQueries('pruefungstermine');
          }
        }}
        actionText="Löschen"
      />
    </>
  );
};

export default PTListItem;

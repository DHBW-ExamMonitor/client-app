import { format } from 'date-fns';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { queryClient } from 'renderer/api/api';
import { deletePruefungstermin } from 'renderer/api/pruefungstermine';
import CopyPruefungsterminModal from 'renderer/components/Modals/CopyPruefungsterminModal';
import UpdatePruefungsterminModal from 'renderer/components/Modals/UpdatePruefungsterminModal';
import ActionIcons from 'renderer/components/Ui/ActionIcons';
import Button from 'renderer/components/Ui/Button';
import WarningDialog from 'renderer/components/Ui/WarningDialog';
import { Modules } from 'renderer/types/module';
import { Pruefungstermin } from 'renderer/types/pruefungstermin';
import * as ics from 'ics';
import downloadFile from 'renderer/downloadFile';
import TableData from 'renderer/components/Ui/TableData';

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
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [openWarningDialog, setOpenWarningDialog] = useState<boolean>(false);
  const [copyModalOpen, setCopyModalOpen] = useState<boolean>(false);

  const download = () => {
    const start = new Date(pruefungstermin.dateTime);

    ics.createEvent(
      {
        title: pruefungstermin.name,
        description: ` Kurse: ${pruefungstermin.kurse
          .map((k) => k.name)
          .join(', ')}\n Modul: ${pruefungstermin.modul.name}\n Notizen: ${
          pruefungstermin.notizen
        }\n Aufsichtspersonen: ${
          pruefungstermin.aufsichtsPersonen
        }\n Hilfsmittel: ${pruefungstermin.hilfsmittel}\n Räume: ${
          pruefungstermin.raeume
        }`,
        busyStatus: 'FREE',
        start: [
          start.getFullYear(),
          start.getMonth(),
          start.getDate(),
          start.getHours(),
          start.getMinutes(),
        ],
        duration: { minutes: 120 },
      },
      (error, value) => {
        if (error) {
          console.log(error);
        }
        downloadFile({
          mimeType: 'text/calendar',
          fileContents: value,
          fileName: `${pruefungstermin.name}.ics`,
        });
      }
    );
  };

  return (
    <>
      <tr>
        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
          <Link to={`/pruefungstermine/${pruefungstermin.id}`}>
            <Button type="button">{pruefungstermin.name}</Button>
          </Link>
        </td>
        <TableData
          data={format(new Date(pruefungstermin.dateTime), 'dd.MM.yyyy HH:mm')}
        />
        <TableData data={pruefungstermin.modul.name} />
        <TableData
          data={pruefungstermin.kurse.map((kurs) => kurs.name).join(', ')}
        />
        <TableData data={pruefungstermin.hilfsmittel ?? ''} />
        <TableData data={pruefungstermin.raeume} />
        <TableData data={pruefungstermin.aufsichtsPersonen} />
        <TableData data={pruefungstermin.notizen} />

        {!disableActions && (
          <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
            <ActionIcons
              copyButton
              downloadButton
              editAction={() => setUpdateModalOpen(true)}
              copyAction={() => setCopyModalOpen(true)}
              downloadAction={download}
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
      <CopyPruefungsterminModal
        open={copyModalOpen}
        setOpen={setCopyModalOpen}
        termin={pruefungstermin}
      />
    </>
  );
};

export default PTListItem;

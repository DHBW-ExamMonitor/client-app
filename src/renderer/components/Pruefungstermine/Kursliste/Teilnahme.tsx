import { useState } from 'react';
import toast from 'react-hot-toast';
import { queryClient } from 'renderer/api/api';
import { deletePruefungsteilnahme } from 'renderer/api/pruefungsteilnahme';
import CreatePruefungsteilnahmeModal from 'renderer/components/Modals/CreatePruefungsteilnahmeModal';
import UpdatePruefungsteilnahmeModal from 'renderer/components/Modals/UpdatePruefungsteilnahmeModal';
import ActionIcons from 'renderer/components/Ui/ActionIcons';
import Button from 'renderer/components/Ui/Button';
import WarningDialog from 'renderer/components/Ui/WarningDialog';
import { Pruefungsteilnahme } from 'renderer/types/pruefungsteilnahme';
import { Student } from 'renderer/types/student';

export interface TeilnahmeProps {
  student: Student;
  teilnahme?: Pruefungsteilnahme;
  terminId: string;
}

export const Teilnahme: React.FC<TeilnahmeProps> = ({
  student,
  teilnahme,
  terminId,
}) => {
  const [edit, setEdit] = useState<boolean>(false);
  const [add, setAdd] = useState<boolean>(false);
  const [deleteOpen, setDeleteOpen] = useState<boolean>(false);

  return (
    <>
      <tr>
        <td className="whitespace-nowrap px-3 py-4 pl-6 text-sm text-gray-500">
          {student.name}
        </td>
        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
          {teilnahme ? (
            <>{teilnahme.versuch}</>
          ) : (
            <>
              <div>Keine Teilnahme</div>
            </>
          )}
        </td>
        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
          {teilnahme ? (
            <>{teilnahme.pruefungsteilnahmeStatus}</>
          ) : (
            <>
              <div>Kein Status</div>
            </>
          )}
        </td>
        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
          {student.studentenStatus !== 'EXMATRIKULIERT' && (
            <>
              {!teilnahme?.versuch ? (
                <Button type="button" onClick={() => setAdd(true)}>
                  Hinzufügen
                </Button>
              ) : (
                <ActionIcons
                  editAction={() => setEdit(true)}
                  deleteAction={() => setDeleteOpen(true)}
                />
              )}
            </>
          )}
          {student.studentenStatus === 'EXMATRIKULIERT' && (
            <Button
              className="hover:cursor-default"
              type="button"
              secondary
              disabled
            >
              exmatrikuliert
            </Button>
          )}
        </td>
      </tr>
      <CreatePruefungsteilnahmeModal
        open={add}
        setOpen={setAdd}
        student={student}
        terminId={terminId}
      />
      {teilnahme && (
        <>
          <UpdatePruefungsteilnahmeModal
            open={edit}
            setOpen={setEdit}
            teilnahme={teilnahme}
          />
          <WarningDialog
            open={deleteOpen}
            setOpen={setDeleteOpen}
            title={`Teilnahme von "${student.name}" wirklich löschen?`}
            message="Beim Löschen einer Teilnahme werden keine weiteren Objekte gelöscht."
            actionText="Löschen"
            action={async () => {
              try {
                await deletePruefungsteilnahme(teilnahme.id);
                toast.success(
                  `Teilnahme von "${student.name}" erfolgreich gelöscht.`
                );
              } catch (error) {
                console.error(error);
                toast.error('Teilnahme konnte nicht gelöscht werden.');
              } finally {
                setDeleteOpen(false);
                queryClient.invalidateQueries(['teilnahmen']);
              }
            }}
          />
        </>
      )}
    </>
  );
};

export default Teilnahme;

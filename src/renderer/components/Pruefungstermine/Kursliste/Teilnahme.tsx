import { useState } from 'react';
import CreatePruefungsteilnahmeModal from 'renderer/components/Modals/CreatePruefungsteilnahmeModal';
import UpdatePruefungsteilnahmeModal from 'renderer/components/Modals/UpdatePruefungsteilnahmeModal';
import ActionIcons from 'renderer/components/Ui/ActionIcons';
import Button from 'renderer/components/Ui/Button';
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
  return (
    <>
      <div className="mt-4 flex-row flex items-center">
        <div className="w-48 mr-8">{student.name}</div>
        <div className="w-48 mr-8">
          {teilnahme ? (
            <>{teilnahme.versuch}</>
          ) : (
            <>
              <div>Keine Teilnahme</div>
            </>
          )}
        </div>
        {!teilnahme ? (
          <Button className="mr-8" type="button" onClick={() => setAdd(true)}>
            Hinzufügen
          </Button>
        ) : (
          <ActionIcons
            editAction={() => setEdit(true)}
            // deleteAction={() => setOpenWarningDialog(true)}
          />
        )}
      </div>
      <CreatePruefungsteilnahmeModal
        open={add}
        setOpen={setAdd}
        student={student}
        terminId={terminId}
      />
      {teilnahme && (
        <UpdatePruefungsteilnahmeModal
          open={edit}
          setOpen={setEdit}
          teilnahme={teilnahme}
        />
      )}
    </>
  );
};

export default Teilnahme;

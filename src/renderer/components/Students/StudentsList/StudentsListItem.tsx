import React from 'react';
import toast from 'react-hot-toast';
import { useQuery } from 'react-query';
import { queryClient } from 'renderer/api/api';
import { getCourses } from 'renderer/api/courses';
import { deleteStudent } from 'renderer/api/students';
import UpdateStudentModal from 'renderer/components/Modals/UpdateStudentModal';
import ActionIcons from 'renderer/components/Ui/ActionIcons';
import WarningDialog from 'renderer/components/Ui/WarningDialog';
import { Student } from 'renderer/types/student';

export interface StudentsListItemProps {
  student: Student;
}

/**
 * StudentsListItem Component
 */
export const StudentsListItem: React.FC<StudentsListItemProps> = ({
  student,
}) => {
  const { data } = useQuery('courses', getCourses);
  const [updateStudentModalOpen, setUpdateStudentModalOpen] =
    React.useState(false);
  const [openWarningDialog, setOpenWarningDialog] = React.useState(false);

  const course = data?.find((c) => c.id === student.kursId);

  return (
    <>
      <UpdateStudentModal
        student={student}
        open={updateStudentModalOpen}
        setOpen={setUpdateStudentModalOpen}
      />
      <WarningDialog
        open={openWarningDialog}
        setOpen={setOpenWarningDialog}
        title={`Kurs "${student.name}" wirklich löschen?`}
        message="Beim Löschen eines Kurses werden alle zugehörigen Studierenden inklusive ihrer Prüfungsteilnahmen und den zugehörigen Terminen gelöscht. Sind Sie sicher?"
        action={async () => {
          try {
            await deleteStudent(student.id);
            toast.success(
              `Studierende/r "${student.name}" erfolgreich gelöscht.`
            );
          } catch (error) {
            console.error(error);
            toast.error('Studierender konnte nicht gelöscht werden.');
          } finally {
            setOpenWarningDialog(false);
            queryClient.invalidateQueries('students');
          }
        }}
        actionText="Löschen"
      />
      <tr>
        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
          {student.matrikelnummer}
        </td>
        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
          {student.name}
        </td>
        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
          {student.studentenStatus.toLowerCase()}
        </td>
        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
          {course?.name}
        </td>
        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
          <ActionIcons
            editAction={() => setUpdateStudentModalOpen(true)}
            deleteAction={() => setOpenWarningDialog(true)}
          />
        </td>
      </tr>
    </>
  );
};

export default StudentsListItem;

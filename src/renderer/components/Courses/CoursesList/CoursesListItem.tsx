import { format } from 'date-fns';
import React from 'react';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { queryClient } from 'renderer/api/api';
import { deleteCourse } from 'renderer/api/courses';
import UpdateCourseModal from 'renderer/components/Modals/UpdateCourseModal';
import ActionIcons from 'renderer/components/Ui/ActionIcons';
import Button from 'renderer/components/Ui/Button';
import TableData from 'renderer/components/Ui/TableData';
import WarningDialog from 'renderer/components/Ui/WarningDialog';
import { Course } from 'renderer/types/course';

export interface CoursesListItemProps {
  course: Course;
}

/**
 * StudentsListItem Component
 */
export const CoursesListItem: React.FC<CoursesListItemProps> = ({ course }) => {
  const [openUpdateCourseModal, setOpenUpdateCourseModal] =
    React.useState(false);
  const [openWarningDialog, setOpenWarningDialog] = React.useState(false);

  return (
    <>
      <UpdateCourseModal
        course={course}
        open={openUpdateCourseModal}
        setOpen={setOpenUpdateCourseModal}
      />
      <WarningDialog
        open={openWarningDialog}
        setOpen={setOpenWarningDialog}
        title={`Kurs "${course.name}" wirklich löschen?`}
        message="Beim Löschen eines Kurses werden alle zugehörigen Studierenden inklusive ihrer Prüfungsteilnahmen und den zugehörigen Terminen gelöscht. Sind Sie sicher?"
        action={async () => {
          try {
            await deleteCourse(course.id);
            toast.success(`Kurs "${course.name}" erfolgreich gelöscht.`);
          } catch (error) {
            console.error(error);
            toast.error('Kurs konnte nicht gelöscht werden.');
          } finally {
            setOpenWarningDialog(false);
            queryClient.invalidateQueries('courses');
          }
        }}
        actionText="Löschen"
      />
      <tr>
        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
          <Link to={`/kurse/${course.id}`}>
            <Button>{course.name}</Button>
          </Link>
        </td>
        <TableData data={format(new Date(course.studienende), 'dd.MM.yyyy')} />
        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
          <ActionIcons
            editAction={() => setOpenUpdateCourseModal(true)}
            deleteAction={() => setOpenWarningDialog(true)}
          />
        </td>
      </tr>
    </>
  );
};

export default CoursesListItem;

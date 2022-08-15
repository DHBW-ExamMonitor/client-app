import React from 'react';
import { useQuery } from 'react-query';
import { getCourses } from 'renderer/api/courses';
import UpdateStudentModal from 'renderer/components/Modals/UpdateStudentModal';
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

  const course = data?.find((c) => c.id === student.kursId);

  return (
    <>
      <UpdateStudentModal
        student={student}
        open={updateStudentModalOpen}
        setOpen={setUpdateStudentModalOpen}
      />
      <tr>
        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
          {student.matrikelnummer}
        </td>
        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
          {student.name}
        </td>
        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
          {student.studentenStatus}
        </td>
        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
          {course?.name}
        </td>
        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
          <button
            className="text-indigo-600 hover:text-indigo-900"
            onClick={() => setUpdateStudentModalOpen(true)}
          >
            Bearbeiten
          </button>
          <div className="text-red-600 hover:text-red-900">
            Löschen
            <span className="sr-only">, {student.matrikelnummer}</span>
          </div>
        </td>
      </tr>
    </>
  );
};

export default StudentsListItem;

import React from 'react';
import UpdateCourseModal from 'renderer/components/Modals/UpdateCourseModal';
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
  return (
    <>
      <UpdateCourseModal
        course={course}
        open={openUpdateCourseModal}
        setOpen={setOpenUpdateCourseModal}
      />
      <tr>
        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
          {course.name}
        </td>
        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
          {course.jahrgang}
        </td>
        {/*
      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
      {course.studentenStatus}
      </td>
      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
      {course?.name}
    </td> */}
        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
          <button
            className="text-indigo-600 hover:text-indigo-900"
            onClick={() => setOpenUpdateCourseModal(true)}
          >
            Bearbeiten
          </button>
          <div className="text-red-600 hover:text-red-900">Löschen</div>
        </td>
      </tr>
    </>
  );
};

export default CoursesListItem;

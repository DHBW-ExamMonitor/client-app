import React, { useState } from 'react';
import Button from 'renderer/components/Ui/Button';
import { Courses } from 'renderer/types/course';
import CoursesListItem from './CoursesListItem';

export interface CoursesListProps {
  data?: Courses;
}

/**
 * StudentsList Component
 */
export const CoursesList: React.FC<CoursesListProps> = ({ data }) => {
  const [showInactive, setShowInactive] = useState<boolean>(false);

  if (!data || !data.length)
    return (
      <div>
        <p>Keine Kurse gefunden.</p>
      </div>
    );

  return (
    <>
      <Button
        type="button"
        className="mb-4"
        secondary={showInactive}
        onClick={() => {
          setShowInactive(!showInactive);
        }}
      >
        {showInactive ? 'zeige Aktuelle' : 'zeige Vergangene'}
      </Button>
      <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
        <table className="min-w-full divide-y divide-gray-300">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
              >
                Name
              </th>
              <th
                scope="col"
                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
              >
                Studienende
              </th>
              <th
                scope="col"
                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
              >
                {' '}
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {data?.map((course) => {
              if (
                (showInactive &&
                  new Date(course.studienende) <= new Date(Date.now())) ||
                (!showInactive &&
                  new Date(course.studienende) > new Date(Date.now()))
              ) {
                return <CoursesListItem key={course.id} course={course} />;
              }
              return null;
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default CoursesList;

import React from 'react';
import { Courses } from 'renderer/types/course';
import CoursesListItem from './CoursesListItem';

export interface CoursesListProps {
  data?: Courses;
}

/**
 * StudentsList Component
 */
export const CoursesList: React.FC<CoursesListProps> = ({ data }) => {
  if (!data || !data.length)
    return (
      <div>
        <p>Keine Studierenden gefunden.</p>
      </div>
    );

  return (
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
              Jahrgang
            </th>
            {/*
            <th
              scope="col"
              className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
            >
              Status
            </th>
            <th
              scope="col"
              className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
            >
              Kurs-ID
            </th>
            <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
              <span className="sr-only">Edit</span>
            </th> */}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {data?.map((student) => (
            <CoursesListItem course={student} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CoursesList;

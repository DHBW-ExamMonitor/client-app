import React, { useState } from 'react';
import Switch from 'renderer/components/Ui/Switch';
import TableHead from 'renderer/components/Ui/TableHead';
import { Courses } from 'renderer/types/course';
import CoursesListItem from './CoursesListItem';

export interface CoursesListProps {
  data?: Courses;
}

/**
 * StudentsList Component
 */
export const CoursesList: React.FC<CoursesListProps> = ({ data }) => {
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  const filteredData = data?.filter((a) => {
    if (selectedIndex === 1) {
      return new Date(a.studienende) <= new Date(Date.now());
    }
    if (selectedIndex === 0) {
      return new Date(a.studienende) > new Date(Date.now());
    }
    return true;
  });

  return (
    <>
      <Switch
        values={['Aktuelle', 'Vergangene']}
        selectedIndex={selectedIndex}
        setSelectedIndex={setSelectedIndex}
      />
      {!filteredData || !filteredData.length ? (
        <div className="mt-6">
          <p>Keine Kurse gefunden.</p>
        </div>
      ) : (
        <div className="mt-6 overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
          <table className="min-w-full divide-y divide-gray-300">
            <thead className="bg-gray-50">
              <tr>
                <TableHead name="Name" className="sm:pl-6" />
                <TableHead name="Studienende" />
                <TableHead name="" />
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              <>
                {filteredData.map((course) => {
                  return <CoursesListItem key={course.id} course={course} />;
                })}
              </>
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default CoursesList;

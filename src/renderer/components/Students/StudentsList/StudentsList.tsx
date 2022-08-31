import React from 'react';
import TableHead from 'renderer/components/Ui/TableHead';
import { Students } from 'renderer/types/student';
import StudentsListItem from './StudentsListItem';

export interface StudentsListProps {
  data?: Students;
}

/**
 * StudentsList Component
 */
export const StudentsList: React.FC<StudentsListProps> = ({ data }) => {
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
            <TableHead name="Matrikelnummer" className="sm:pl-6" />
            <TableHead name="Name" />
            <TableHead name="Status" />
            <TableHead name="Kurs" />
            <TableHead name="" />
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {data?.map((student) => (
            <StudentsListItem key={student.id} student={student} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentsList;

import React from 'react';
import { useQuery } from 'react-query';
import { getStudents } from 'renderer/api/students';
import PageLayout from 'renderer/components/PageLayout';
import AddStudentModal from 'renderer/components/Students';

/**
 * Students Component
 */
export const Students: React.FC = () => {
  const { data } = useQuery('courses', getStudents);
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <AddStudentModal open={open} setOpen={setOpen} />
      <PageLayout
        title="Studierende"
        subTitle="Alle Studenten mit Matrikelnummer."
        buttonText="Neuer Student"
        buttonAction={() => setOpen(true)}
      >
        <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
          <table className="min-w-full divide-y divide-gray-300">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                >
                  Matrikelnummer
                </th>
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
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {data?.map((student) => (
                <tr key={student.id}>
                  <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                    {student.matrikelnummer}
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {student.studentenStatus}
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {student.kursId}
                  </td>
                  <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                    <div className="text-indigo-600 hover:text-indigo-900">
                      Bearbeiten
                      <span className="sr-only">
                        , {student.matrikelnummer}
                      </span>
                    </div>
                    <div className="text-red-600 hover:text-red-900">
                      Löschen
                      <span className="sr-only">
                        , {student.matrikelnummer}
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </PageLayout>
    </>
  );
};

export default Students;

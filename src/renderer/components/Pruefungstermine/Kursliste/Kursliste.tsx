import { useMutation, useQuery } from 'react-query';
import { queryClient } from 'renderer/api/api';
import {
  CreateOrUpdatePruefungsteilnahmeDto,
  createPruefungsteilnahme,
} from 'renderer/api/pruefungsteilnahme';
import { getStudentsByCourse } from 'renderer/api/students';
import Button from 'renderer/components/Ui/Button';
import { Course } from 'renderer/types/course';
import { Pruefungsteilnahmen } from 'renderer/types/pruefungsteilnahme';
import Teilnahme from './Teilnahme';

export interface KurslisteProps {
  kurs: Course;
  teilnahmen: Pruefungsteilnahmen;
  terminId: string;
}

export const Kursliste: React.FC<KurslisteProps> = ({
  kurs,
  teilnahmen,
  terminId,
}) => {
  const { data } = useQuery(['kurs', kurs.id], ({ queryKey }) =>
    getStudentsByCourse(queryKey[1])
  );

  const { mutate } = useMutation(
    (values: CreateOrUpdatePruefungsteilnahmeDto) =>
      createPruefungsteilnahme(values),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['teilnahmen']);
      },
      onError: (err) => {
        // eslint-disable-next-line no-alert
        console.log(err);
      },
    }
  );

  const addAllStudents = async () => {
    if (data) {
      data
        .filter((s) => s.studentenStatus !== 'EXMATRIKULIERT')
        .forEach((student) => {
          mutate({
            versuch: 'ERSTVERSUCH',
            studentId: student.id,
            pruefungsterminId: terminId,
            pruefungsteilnahmeStatus: 'KEIN_STATUS',
          });
        });
    }
  };

  return (
    <div className="mb-16">
      <div className="flex flex-row items-center mb-8">
        <div className="w-48 mr-8 text-xl font-semibold text-gray-900">
          {kurs.name}
        </div>
        <Button type="button" onClick={addAllStudents}>
          Alle hinzufügen
        </Button>
      </div>
      {data &&
        data.filter((s) => teilnahmen.find((v) => v.studentId === s.id))
          .length > 0 && (
          <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg mb-8">
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
                    Versuch
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
                    Notizen
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
                {data
                  ?.filter((s) => teilnahmen.find((v) => v.studentId === s.id))
                  .map((student) => (
                    <Teilnahme
                      key={student.id}
                      student={student}
                      teilnahme={teilnahmen.find(
                        (v) => v.studentId === student.id
                      )}
                      terminId={terminId}
                    />
                  ))}
              </tbody>
            </table>
          </div>
        )}

      {data &&
        data?.filter((s) => !teilnahmen.find((v) => v.studentId === s.id))
          .length > 0 && (
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
                    Versuch
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
                    Notizen
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
                {data
                  ?.filter((s) => !teilnahmen.find((v) => v.studentId === s.id))
                  .map((student) => (
                    <Teilnahme
                      key={student.id}
                      student={student}
                      teilnahme={teilnahmen.find(
                        (v) => v.studentId === student.id
                      )}
                      terminId={terminId}
                    />
                  ))}
              </tbody>
            </table>
          </div>
        )}
    </div>
  );
};

export default Kursliste;

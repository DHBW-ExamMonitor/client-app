import { useMutation, useQuery } from 'react-query';
import { queryClient } from 'renderer/api/api';
import {
  CreateOrUpdatePruefungsteilnahmeDto,
  createPruefungsteilnahme,
} from 'renderer/api/pruefungsteilnahme';
import { getStudentsByCourse } from 'renderer/api/students';
import Button from 'renderer/components/Ui/Button';
import TableHead from 'renderer/components/Ui/TableHead';
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
      data.forEach((student) => {
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
        {data &&
          data.filter((s) => teilnahmen.find((v) => v.studentId === s.id))
            .length !== data?.length && (
            <Button type="button" onClick={addAllStudents}>
              {kurs.name} hinzufügen
            </Button>
          )}
      </div>
      {data &&
        data.length > 0 &&
        data.filter((s) => teilnahmen.find((v) => v.studentId === s.id))
          .length > 0 && (
          <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg mb-8">
            <table className="min-w-full divide-y divide-gray-300">
              <thead className="bg-gray-50">
                <tr>
                  <TableHead name="Name" className="sm:pl-6" />
                  <TableHead name="Versuch" />
                  <TableHead name="Status" />
                  <TableHead name="Notizen" />
                  <TableHead name="" />
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
                  <TableHead name="Name" className="sm:pl-6" />
                  <TableHead name="Versuch" />
                  <TableHead name="Status" />
                  <TableHead name="Notizen" />
                  <TableHead name="" />
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

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
      data.forEach((student) => {
        mutate({
          versuch: 'ERSTVERSUCH',
          studentId: student.id,
          pruefungsterminId: terminId,
        });
      });
    }
  };

  return (
    <div className="mb-16">
      <div className="flex flex-row items-center">
        <div className="w-28 mr-8 text-xl font-semibold text-gray-900">
          {kurs.name}
        </div>
        <Button type="button" onClick={addAllStudents}>
          Alle Studenten des Kurses hinzufügen
        </Button>
      </div>

      {data?.map((student) => (
        <Teilnahme
          key={student.id}
          student={student}
          teilnahme={teilnahmen.find((v) => v.studentId === student.id)}
          terminId={terminId}
        />
      ))}
    </div>
  );
};

export default Kursliste;

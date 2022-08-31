import { Importer, ImporterField } from 'react-csv-importer';

// include the widget CSS file whichever way your bundler supports it
import 'react-csv-importer/dist/index.css';
import toast from 'react-hot-toast';

import { useNavigate } from 'react-router-dom';
import { createStudent, CreateStudentDto } from 'renderer/api/students';

export interface StudentsImporterProps {
  kursId: string;
}

export const StudentsImporter: React.FC<StudentsImporterProps> = ({
  kursId,
}) => {
  const navigate = useNavigate();
  console.log(kursId);

  return (
    <>
      <h1 className="text-xl font-semibold text-gray-900 my-4">
        Studierende importieren:
      </h1>
      <Importer
        assumeNoHeaders={false}
        restartable={false}
        delimiter=";"
        processChunk={async (rows) => {
          // eslint-disable-next-line no-restricted-syntax
          for await (const row of rows) {
            const student: CreateStudentDto = {
              kursId,
              name: row.name as string,
              matrikelnummer: row.matrikelnr as string,
              studentenStatus: 'IMMATRIKULIERT',
            };
            try {
              await createStudent(student);
            } catch (e) {
              toast.error(
                `Studierende/r mit Matrikelnummer ${row.matrikelnr} konnte nicht hinzugefügt werden. Bitte überprüfen Sie die Daten (z.B. eindeutige Matrikelnummer).`
              );
            }
          }
        }}
        onClose={() => {
          navigate(`/kurse`);
        }}
      >
        <ImporterField name="name" label="Name" />
        <ImporterField name="matrikelnr" label="Matrikelnummer" />
      </Importer>
    </>
  );
};

export default StudentsImporter;

import React from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import api from 'renderer/api/api';
import { getPruefungsteilnahme } from 'renderer/api/pruefungsteilnahme';
import { getPruefungstermin } from 'renderer/api/pruefungstermine';
import capitalize from 'renderer/capitalize';
import PageLayout from 'renderer/components/PageLayout';
import Kursliste from 'renderer/components/Pruefungstermine/Kursliste';
import Termininfo from 'renderer/components/Pruefungstermine/Termininfo';
import Button from 'renderer/components/Ui/Button';
import downloadFile from 'renderer/downloadFile';

/**
 * Teilnahmen Component
 */
export const Teilnahmen: React.FC = () => {
  const { id } = useParams();
  const { data } = useQuery(
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    ['pruefungstermin', id!],
    ({ queryKey }) => getPruefungstermin(queryKey[1])
  );
  const teilnahmen = useQuery(
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    ['teilnahmen', id!],
    ({ queryKey }) => getPruefungsteilnahme(queryKey[1])
  );

  const downloadCSV = async () => {
    const csv = await api.get(`/pruefungstermine/${id}/teilnahmen`);
    const csvData = csv.data;
    let csvContent =
      'Student;Pruefungstermin;Versuch;Status;Notizen;Anwesend\r\n';

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    csvData.forEach((student: any) => {
      const row = `${student.Student};${student.Pruefungstermin};${
        student.Versuch
      };${capitalize(student.Status)};${student.Notizen ?? ''};${
        student.Anwesend
      }`;
      csvContent += `${row}\r\n`;
    });
    downloadFile({
      fileContents: csvContent,
      fileName: `Teilnehmerliste ${data?.name}`,
      mimeType: 'text/csv',
    });
  };

  return (
    <>
      <PageLayout title="Teilnahmen" subTitle="" hideButton navigateBack>
        <Termininfo termin={data} />
        <div className="mb-8">
          <Button type="button" onClick={downloadCSV}>
            Teilnehmerliste herunterladen
          </Button>
        </div>
        {data?.kurse.map((kurs) => (
          <Kursliste
            key={kurs.id}
            kurs={kurs}
            teilnahmen={teilnahmen.data ?? []}
            terminId={data.id}
          />
        ))}
      </PageLayout>
    </>
  );
};

export default Teilnahmen;

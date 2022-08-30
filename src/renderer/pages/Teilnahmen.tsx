import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { getPruefungsteilnahme } from 'renderer/api/pruefungsteilnahme';
import { getPruefungstermin } from 'renderer/api/pruefungstermine';
import { getStudent } from 'renderer/api/students';
import PageLayout from 'renderer/components/PageLayout';
import Kursliste from 'renderer/components/Pruefungstermine/Kursliste';
import Termininfo from 'renderer/components/Pruefungstermine/Termininfo';
import CsvLink from 'renderer/components/Ui/CsvLink';
import { Pruefungsteilnahmen } from 'renderer/types/pruefungsteilnahme';
import { Pruefungstermin } from 'renderer/types/pruefungstermin';

/**
 * Teilnahmen Component
 */
export const Teilnahmen: React.FC = () => {
  const { id } = useParams();
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const { data } = useQuery(['pruefungstermin', id!], ({ queryKey }) =>
    getPruefungstermin(queryKey[1])
  );
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const teilnahmen = useQuery(['teilnahmen', id!], ({ queryKey }) =>
    getPruefungsteilnahme(queryKey[1])
  );

  const [csvData, setCsvData] = useState<object[]>([]);

  const fillCsvData = async (tn: Pruefungsteilnahmen, d: Pruefungstermin) => {
    const temp: object[] = [];
    // eslint-disable-next-line no-restricted-syntax
    for await (const t of tn) {
      const student = await getStudent(t.studentId);
      temp.push({
        Student: student.name,
        Pruefungstermin: d.name,
        Versuch: t.versuch,
        Status: t.pruefungsteilnahmeStatus,
        Notizen: t.notizen,
        Anwesend: '',
      });
    }
    setCsvData(temp);
  };

  useEffect(() => {
    if (teilnahmen.data && data) {
      fillCsvData(teilnahmen.data, data);
    }
  }, [teilnahmen, data]);

  return (
    <>
      <PageLayout title="Teilnahmen" subTitle="" hideButton navigateBack>
        <Termininfo termin={data} />
        <div className="mb-8">
          <CsvLink
            data={csvData}
            filename={`Teilnehmerliste ${data?.name}`}
            buttonText="Teilnehmerliste herunterladen"
          />
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

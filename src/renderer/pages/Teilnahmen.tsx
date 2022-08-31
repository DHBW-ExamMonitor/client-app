import React, { useEffect } from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import api from 'renderer/api/api';
import { getPruefungsteilnahme } from 'renderer/api/pruefungsteilnahme';
import { getPruefungstermin } from 'renderer/api/pruefungstermine';
import PageLayout from 'renderer/components/PageLayout';
import Kursliste from 'renderer/components/Pruefungstermine/Kursliste';
import Termininfo from 'renderer/components/Pruefungstermine/Termininfo';
import CsvLink from 'renderer/components/Ui/CsvLink';

/**
 * Teilnahmen Component
 */
export const Teilnahmen: React.FC = () => {
  const { id } = useParams();
  const { data } = useQuery(
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    ['pruefungstermin', id!],
    ({ queryKey }) => getPruefungstermin(queryKey[1]),
    {
      onError: (error) => {
        console.log(error);
      },
    }
  );
  const teilnahmen = useQuery(
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    ['teilnahmen', id!],
    ({ queryKey }) => getPruefungsteilnahme(queryKey[1]),
    {
      onError: (error) => {
        console.log(error);
      },
    }
  );

  const { data: csvData, isLoading } = useQuery(['csvdata'], async () => {
    // console.log(tn);
    const csv = await api.get(`/pruefungstermine/${id}/teilnahmen`);
    console.log(csv);
    return csv.data;
  });

  // // useEffect(() => {
  // //   mutate(teilnahmen.data ?? []);
  // // }, [mutate, teilnahmen.data]);

  // useEffect(() => {
  //   console.log(csvData);
  // });

  return (
    <>
      <PageLayout title="Teilnahmen" subTitle="" hideButton navigateBack>
        <Termininfo termin={data} />
        {isLoading ? (
          <div>Lädt</div>
        ) : (
          <div className="mb-8">
            <CsvLink
              data={csvData ?? []}
              filename={`Teilnehmerliste ${data?.name}`}
              buttonText="Teilnehmerliste herunterladen"
            />
          </div>
        )}
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

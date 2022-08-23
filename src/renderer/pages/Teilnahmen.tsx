import React from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import getPruefungsteilnahme from 'renderer/api/pruefungsteilnahme';
import { getPruefungstermin } from 'renderer/api/pruefungstermine';
import PageLayout from 'renderer/components/PageLayout';
import Kursliste from 'renderer/components/Pruefungstermine/Kursliste';
import Termininfo from 'renderer/components/Pruefungstermine/Termininfo';

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

  return (
    <>
      <PageLayout
        title="Teilnahmen"
        subTitle=""
        hideButton
        navigateBackTo="/pruefungstermine"
      >
        <Termininfo termin={data} />
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

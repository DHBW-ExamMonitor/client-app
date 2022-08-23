import React from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { getPruefungstermin } from 'renderer/api/pruefungstermine';
import PageLayout from 'renderer/components/PageLayout';
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
  return (
    <>
      <PageLayout
        title="Teilnahmen"
        subTitle=""
        hideButton
        navigateBackTo="/pruefungstermine"
      >
        <Termininfo termin={data} />
      </PageLayout>
    </>
  );
};

export default Teilnahmen;

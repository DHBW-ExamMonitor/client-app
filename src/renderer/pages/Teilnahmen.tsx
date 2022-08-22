import React from 'react';
import { useParams } from 'react-router-dom';
import PageLayout from 'renderer/components/PageLayout';

/**
 * Teilnahmen Component
 */
export const Teilnahmen: React.FC = () => {
  const { id } = useParams();
  return (
    <>
      <PageLayout
        title="Teilnahmen"
        subTitle=""
        hideButton
        navigateBackTo="/pruefungstermine"
      >
        <div>{id}</div>
      </PageLayout>
    </>
  );
};

export default Teilnahmen;

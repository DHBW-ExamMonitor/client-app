import React from 'react';
import { useQuery } from 'react-query';
import { getModules } from 'renderer/api/modules';
import { getPruefungstermine } from 'renderer/api/pruefungstermine';
import CreatePruefungsterminModal from 'renderer/components/Modals/CreatePruefungsterminModal';
import PageLayout from 'renderer/components/PageLayout';
import PTList from 'renderer/components/Pruefungstermine/PTList';

/**
 * Pruefungstermine Component
 */
export const Modules: React.FC = () => {
  const { data } = useQuery('pruefungstermine', getPruefungstermine);
  const modules = useQuery('modules', getModules);
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <CreatePruefungsterminModal
        open={open}
        setOpen={setOpen}
        modules={modules.data}
      />
      <PageLayout
        title="Prüfungstermine"
        subTitle="Alle Prüfungstermine."
        buttonText="Neuer Prüfungstermin"
        buttonAction={() => setOpen(true)}
      >
        <PTList data={data} modules={modules.data} />
      </PageLayout>
    </>
  );
};

export default Modules;

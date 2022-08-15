import React from 'react';
import { useQuery } from 'react-query';
import { getModules } from 'renderer/api/modules';
import CreateModuleModal from 'renderer/components/Modals/CreateModuleModal';
import ModulesList from 'renderer/components/Modules/ModulesList';
import PageLayout from 'renderer/components/PageLayout';

/**
 * Modules Component
 */
export const Modules: React.FC = () => {
  const { data } = useQuery('modules', getModules);
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <CreateModuleModal open={open} setOpen={setOpen} />
      <PageLayout
        title="Module"
        subTitle="Alle Module."
        buttonText="Neues Modul"
        buttonAction={() => setOpen(true)}
      >
        <ModulesList data={data} />
      </PageLayout>
    </>
  );
};

export default Modules;

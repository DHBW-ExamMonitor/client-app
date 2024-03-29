import React from 'react';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { queryClient } from 'renderer/api/api';
import { deleteModule } from 'renderer/api/modules';
import UpdateModuleModal from 'renderer/components/Modals/UpdateModuleModal';
import ActionIcons from 'renderer/components/Ui/ActionIcons';
import Button from 'renderer/components/Ui/Button';
import TableData from 'renderer/components/Ui/TableData';
import WarningDialog from 'renderer/components/Ui/WarningDialog';
import { Module } from 'renderer/types/module';

export interface ModulesListItemProps {
  module: Module;
}

/**
 * ModulesListItem Component
 */
export const ModulesListItem: React.FC<ModulesListItemProps> = ({ module }) => {
  const [updateModuleModalOpen, setUpdateModuleModalOpen] =
    React.useState(false);
  const [openWarningDialog, setOpenWarningDialog] = React.useState(false);

  return (
    <>
      <tr>
        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
          <Link to={`/module/${module.id}`}>
            <Button>{module.name}</Button>
          </Link>
        </td>
        <TableData data={module.vorlesungen} />
        <TableData data={module.aktiv ? 'Ja' : 'Nein'} />
        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
          <ActionIcons
            editAction={() => setUpdateModuleModalOpen(true)}
            deleteAction={() => setOpenWarningDialog(true)}
          />
        </td>
      </tr>
      <UpdateModuleModal
        open={updateModuleModalOpen}
        setOpen={setUpdateModuleModalOpen}
        module={module}
      />
      <WarningDialog
        open={openWarningDialog}
        setOpen={setOpenWarningDialog}
        title={`Modul "${module.name}" wirklich löschen?`}
        message="Dieser Schritt ist irreversibel. Sind Sie sicher?"
        action={async () => {
          try {
            await deleteModule(module.id);
            toast.success(`Modul "${module.name}" erfolgreich gelöscht.`);
          } catch (error) {
            console.error(error);
            toast.error('Modul konnte nicht gelöscht werden.');
          } finally {
            setOpenWarningDialog(false);
            queryClient.invalidateQueries('modules');
          }
        }}
        actionText="Löschen"
      />
    </>
  );
};

export default ModulesListItem;

import React, { useState } from 'react';
import Switch from 'renderer/components/Ui/Switch';
import TableHead from 'renderer/components/Ui/TableHead';
import { Modules } from 'renderer/types/module';
import ModulesListItem from './ModulesListItem';

export interface ModulesListProps {
  data?: Modules;
}

/**
 * ModulesList Component
 */
export const ModulesList: React.FC<ModulesListProps> = ({ data }) => {
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  const filteredData = data?.filter((a) => {
    if (selectedIndex === 1) {
      return a.aktiv === false;
    }
    if (selectedIndex === 0) {
      return a.aktiv === true;
    }
    return true;
  });

  return (
    <>
      <Switch
        values={['Aktive', 'Inaktive']}
        selectedIndex={selectedIndex}
        setSelectedIndex={setSelectedIndex}
      />

      {!filteredData || !filteredData.length ? (
        <div className="mt-6">
          <p>Keine Module gefunden.</p>
        </div>
      ) : (
        <div className="mt-6 overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
          <table className="min-w-full divide-y divide-gray-300">
            <thead className="bg-gray-50">
              <tr>
                <TableHead name="Name" className="sm:pl-6" />
                <TableHead name="Vorlesungen" />
                <TableHead name="Aktiv" />
                <TableHead name="" />
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {filteredData?.map((module) => (
                <ModulesListItem key={module.id} module={module} />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default ModulesList;

import React, { useState } from 'react';
import Switch from 'renderer/components/Ui/Switch';
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
                <th
                  scope="col"
                  className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                >
                  Name
                </th>
                <th
                  scope="col"
                  className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                >
                  Vorlesungen
                </th>
                <th
                  scope="col"
                  className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                >
                  Aktiv
                </th>
                <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {filteredData?.map((module) => {
                return <ModulesListItem key={module.id} module={module} />;
              })}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default ModulesList;

import React from 'react';
import { Modules } from 'renderer/types/module';
import ModulesListItem from './ModulesListItem';

export interface ModulesListProps {
  children?: React.ReactNode;
  className?: string;
  data?: Modules;
}

/**
 * ModulesList Component
 */
export const ModulesList: React.FC<ModulesListProps> = ({
  children,
  className,
  data,
}) => {
  if (!data || !data.length)
    return (
      <div>
        <p>Keine Module gefunden.</p>
      </div>
    );

  return (
    <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
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
          {data?.map((module) => (
            <ModulesListItem module={module} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ModulesList;

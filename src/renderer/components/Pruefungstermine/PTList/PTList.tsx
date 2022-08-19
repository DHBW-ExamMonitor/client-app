import { Modules } from 'renderer/types/module';
import { Pruefungstermine } from 'renderer/types/pruefungstermin';
import PTListItem from './PTListItem';

type PTListProps = {
  data?: Pruefungstermine;
  modules?: Modules;
};

export const PTList: React.FC<PTListProps> = ({ data, modules }) => {
  if (!data || !data.length)
    return (
      <div>
        <p>Keine Prüfungstermine gefunden.</p>
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
              Modul
            </th>
            <th
              scope="col"
              className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
            >
              Hilfsmittel
            </th>
            <th
              scope="col"
              className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
            >
              Räume
            </th>
            <th
              scope="col"
              className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
            >
              Aufsichtspersonen
            </th>
            <th
              scope="col"
              className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
            >
              Notizen
            </th>
            <th
              scope="col"
              className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
            >
              Termin
            </th>

            <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
              <span className="sr-only">Edit</span>
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {data?.map((pruefungstermin) => (
            <PTListItem
              key={pruefungstermin.id}
              pruefungstermin={pruefungstermin}
              modules={modules}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PTList;

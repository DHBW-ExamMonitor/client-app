import TableHead from 'renderer/components/Ui/TableHead';
import { Modules } from 'renderer/types/module';
import { Pruefungstermine } from 'renderer/types/pruefungstermin';
import PTListItem from './PTListItem';

type PTListProps = {
  data?: Pruefungstermine;
  modules?: Modules;
  disableActions?: boolean;
};

export const PTList: React.FC<PTListProps> = ({
  data,
  modules,
  disableActions,
}) => {
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
            <TableHead name="Name" className="sm:pl-6" />
            <TableHead name="Termin" />
            <TableHead name="Modul" />
            <TableHead name="Kurse" />
            <TableHead name="Hilfsmittel" />
            <TableHead name="Räume" />
            <TableHead name="Aufsichtspersonen" />
            <TableHead name="Notizen" />
            {!disableActions && <TableHead name="" />}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {data?.map((pruefungstermin) => (
            <PTListItem
              key={pruefungstermin.id}
              pruefungstermin={pruefungstermin}
              modules={modules}
              disableActions={disableActions}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PTList;

import { format } from 'date-fns';
import { Pruefungstermin } from 'renderer/types/pruefungstermin';

export interface TermininfoProps {
  termin?: Pruefungstermin;
}

export const Termininfo: React.FC<TermininfoProps> = ({ termin }) => {
  if (!termin) {
    return null;
  }

  return (
    <div className="grid grid-cols-3">
      <div className="flex flex-row mb-8">
        <div className="text-sm text-gray-800 mr-6 flex-col">
          <div>Terminname:</div>
          <div>Modul:</div>
          <div>Kurse:</div>
          <div>Hilfsmittel:</div>
          <div>Räume:</div>
          <div>Aufsichtspersonen:</div>
          <div>Termin:</div>
        </div>
        <div className="text-sm text-gray-500 flex-col">
          <div>{termin?.name}</div>
          <div>{termin?.modul.name}</div>
          <div>
            {termin?.kurse.length
              ? termin?.kurse.map((kurs) => kurs.name).join(', ')
              : '-'}
          </div>
          <div>{termin?.hilfsmittel?.length ? termin?.hilfsmittel : '-'}</div>
          <div>{termin?.raeume?.length ? termin?.raeume : '-'}</div>
          <div>
            {termin?.aufsichtsPersonen.length ? termin?.aufsichtsPersonen : '-'}
          </div>

          <div>{format(new Date(termin?.dateTime), 'dd.MM.yyyy HH:mm')}</div>
        </div>
      </div>
      <div className="text-sm text-gray-800">
        <div>Notizen:</div>
        <div className="text-gray-500">
          {termin?.notizen.length ? (
            termin?.notizen.split('\n').map((item) => <p key={item}>{item}</p>)
          ) : (
            <p className="italic">Keine Notizen gefunden</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Termininfo;

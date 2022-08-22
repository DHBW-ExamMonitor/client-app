import { Pruefungstermin } from 'renderer/types/pruefungstermin';

export interface TermininfoProps {
  termin?: Pruefungstermin;
}

export const Termininfo: React.FC<TermininfoProps> = ({ termin }) => {
  return (
    <>
      <div>Termininfo</div>
      <div>{termin?.name}</div>
    </>
  );
};

export default Termininfo;

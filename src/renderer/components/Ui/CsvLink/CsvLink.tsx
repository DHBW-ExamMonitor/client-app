import { CSVLink } from 'react-csv';
import Button from '../Button';

export interface CSVLinkProps {
  data: object[];
  filename: string;
}

export const CsvLink: React.FC<CSVLinkProps> = ({ data, filename }) => {
  return (
    <CSVLink data={data} separator=";" filename={filename}>
      <Button type="button">Teilnehmerliste herunterladen</Button>
    </CSVLink>
  );
};

export default CsvLink;

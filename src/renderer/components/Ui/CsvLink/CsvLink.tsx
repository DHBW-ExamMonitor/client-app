import { CSVLink } from 'react-csv';
import Button from '../Button';

export interface CSVLinkProps {
  data: object[];
  filename: string;
  buttonText: string;
}

export const CsvLink: React.FC<CSVLinkProps> = ({
  data,
  filename,
  buttonText,
}) => {
  return (
    <CSVLink data={data} separator=";" filename={filename}>
      <Button type="button">{buttonText}</Button>
    </CSVLink>
  );
};

export default CsvLink;

import { useQuery } from 'react-query';
import { getPruefungstermine } from 'renderer/api/pruefungstermine';
import PageLayout from 'renderer/components/PageLayout';
import PTList from 'renderer/components/Pruefungstermine/PTList';

export type DashboardProps = {
  pageTitle: string;
};

export const Dashboard: React.FC<DashboardProps> = ({ pageTitle }) => {
  const { data } = useQuery('pruefungstermine', getPruefungstermine);

  const nextThreeMonths = data
    ?.filter(
      (pt) =>
        new Date(pt.dateTime) > new Date() &&
        new Date(pt.dateTime) <
          new Date(new Date().setMonth(new Date().getMonth() + 3))
    )
    .sort(
      (a, b) => new Date(a.dateTime).getTime() - new Date(b.dateTime).getTime()
    );

  return (
    <>
      <PageLayout title={pageTitle} subTitle="Prüfungen der nächsten 3 Monate.">
        <PTList data={nextThreeMonths} disableActions />
      </PageLayout>
    </>
  );
};

export default Dashboard;

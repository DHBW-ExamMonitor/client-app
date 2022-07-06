import { Outlet } from 'react-router-dom';

export type DashboardProps = {
  pageTitle: string;
};

export const Dashboard: React.FC<DashboardProps> = ({ pageTitle }) => {
  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <h1 className="text-2xl font-semibold text-gray-900">{pageTitle}</h1>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <Outlet />
      </div>
    </>
  );
};

export default Dashboard;

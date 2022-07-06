import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

/**
 * Layout Component
 */

export const Layout: React.FC = () => {
  return (
    <div>
      {/* Static sidebar for desktop */}
      <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
        <Sidebar />
      </div>
      <div className="md:pl-64 flex flex-col flex-1">
        <main className="flex-1">
          <div className="py-6">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;

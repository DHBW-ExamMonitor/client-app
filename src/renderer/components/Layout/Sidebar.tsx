import {
  AcademicCapIcon,
  CalendarIcon,
  CogIcon,
  HomeIcon,
  InformationCircleIcon,
  TableIcon,
  UsersIcon,
} from '@heroicons/react/outline';

import clsx from 'clsx';
import { useQuery } from 'react-query';
import { Link, useLocation } from 'react-router-dom';
import getStatus from 'renderer/api/status';
import logo from '../../../../assets/logo.png';

const navigation = [
  { name: 'Dashboard', href: '/', icon: HomeIcon },
  { name: 'Kurse', href: '/kurse', icon: UsersIcon },
  { name: 'Studierende', href: '/studenten', icon: AcademicCapIcon },
  { name: 'Module', href: '/module', icon: TableIcon },
  {
    name: 'Prüfungstermin',
    href: '/pruefungstermine',
    icon: CalendarIcon,
  },
];

export const SideBar: React.FC = () => {
  const location = useLocation();

  const { isSuccess } = useQuery('status', getStatus);

  return (
    <div className="flex-1 flex flex-col min-h-0 border-r border-gray-200 bg-white">
      <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
        <div className="flex items-center flex-shrink-0 px-4">
          <img className="h-10 w-auto" src={logo} alt="Workflow" />
        </div>
        <nav className="mt-5 flex-1 px-2 bg-white space-y-1">
          {navigation.map((item) => (
            <Link key={item.name} to={item.href}>
              <div
                key={item.name}
                className={clsx(
                  item.href === location.pathname ||
                    (item.href !== '/' && location.pathname.includes(item.href))
                    ? 'bg-gray-100 text-gray-900'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                  'group flex items-center px-2 py-2 text-sm font-medium rounded-md'
                )}
              >
                <item.icon
                  className={clsx(
                    item.href === location.pathname ||
                      (item.href !== '/' &&
                        location.pathname.includes(item.href))
                      ? 'text-gray-500'
                      : 'text-gray-400 group-hover:text-gray-500',
                    'mr-3 flex-shrink-0 h-6 w-6'
                  )}
                  aria-hidden="true"
                />
                {item.name}
              </div>
            </Link>
          ))}
        </nav>
      </div>
      <div className="px-4 pb-5 flex items-center text-gray-600 text-sm font-medium">
        <InformationCircleIcon className="mr-3 flex-shrink-0 h-6 w-6 text-gray-500" />
        Serverstatus:
        {isSuccess ? (
          <div className="ml-2 h-2 w-2 bg-green-500 rounded-full" />
        ) : (
          <div className="ml-2 h-2 w-2 bg-red-500 rounded-full" />
        )}
      </div>
      <nav className="mb-5 px-2 bg-white space-y-1">
        <Link to="/settings">
          <div
            className={clsx(
              location.pathname === '/settings' ||
                location.pathname.includes('/settings')
                ? 'bg-gray-100 text-gray-900'
                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
              'group flex items-center px-2 py-2 text-sm font-medium rounded-md'
            )}
          >
            <CogIcon className="mr-3 flex-shrink-0 h-6 w-6 text-gray-500" />
            Einstellungen
          </div>
        </Link>
      </nav>
    </div>
  );
};

export default SideBar;

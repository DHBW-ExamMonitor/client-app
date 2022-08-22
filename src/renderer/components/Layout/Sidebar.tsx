import {
  CalendarIcon,
  FolderIcon,
  HomeIcon,
  InboxIcon,
  UsersIcon,
} from '@heroicons/react/outline';

import clsx from 'clsx';
import { Link, useLocation } from 'react-router-dom';
import logo from '../../../../assets/logo.png';

const navigation = [
  { name: 'Dashboard', href: '/', icon: HomeIcon },
  { name: 'Kurse', href: '/kurse', icon: UsersIcon },
  { name: 'Studierende', href: '/studenten', icon: FolderIcon },
  { name: 'Module', href: '/module', icon: CalendarIcon },
  {
    name: 'Prüfungstermin',
    href: '/pruefungstermine',
    icon: InboxIcon,
  },
];

export const SideBar: React.FC = () => {
  const location = useLocation();

  return (
    <div className="flex-1 flex flex-col min-h-0 border-r border-gray-200 bg-white">
      <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
        <div className="flex items-center flex-shrink-0 px-4">
          <img className="h-10 w-auto" src={logo} alt="Workflow" />
        </div>
        <nav className="mt-5 flex-1 px-2 bg-white space-y-1">
          {navigation.map((item) => (
            <Link key={item.href} to={item.href}>
              <div
                key={item.name}
                className={clsx(
                  item.href === location.pathname
                    ? 'bg-gray-100 text-gray-900'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                  'group flex items-center px-2 py-2 text-sm font-medium rounded-md'
                )}
              >
                <item.icon
                  className={clsx(
                    item.href === location.pathname
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
    </div>
  );
};

export default SideBar;

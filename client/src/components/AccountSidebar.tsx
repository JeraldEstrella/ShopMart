import type { LucideIcon } from 'lucide-react';
import {
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { useLocation, Link } from 'react-router-dom';
import UserAvatar from './UserAvatar';
import type { UserData } from '../types/user.types';
import { useState } from 'react';

interface SidebarChild {
  id: string;
  label: string;
  href: string;
}

interface SidebarItem {
  id: number; // Keep track via this unique ID
  label: string;
  icon: LucideIcon;
  href?: string;
  children: SidebarChild[];
}

interface SidebarProps {
  entries: SidebarItem[];
  userData: UserData;
}

const AccountSidebar = ({ entries, userData }: SidebarProps) => {
  const { pathname } = useLocation();
  const [isOpen, setIsOpen] = useState(true);

  const [expandedMenus, setExpandedMenus] = useState<Record<number, boolean>>(
    {}
  );

  const toggleSubMenu = (id: number) => {
    setExpandedMenus((prev) => ({
      ...prev,
      [id]: prev[id] ? false : true,
    }));
  };

  return (
    <div
      className={`relative flex flex-col gap-6 p-4 shrink-0 border-r border-neutral-200 dark:border-neutral-700 transition-all duration-300 ${
        isOpen ? 'w-35' : 'w-16 items-center'
      }`}
    >
      {/* Sidebar Expand/Collapse Toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className='absolute -right-3 top-6 flex h-6 w-6 items-center justify-center rounded-full border border-neutral-200 bg-white dark:border-neutral-700 dark:bg-neutral-800 text-neutral-500 hover:text-primary-500 cursor-pointer shadow-sm z-10'
      >
        {isOpen ? <ChevronLeft size={14} /> : <ChevronRight size={14} />}
      </button>

      {/* User info */}
      {userData && (
        <div
          className={`flex items-center gap-3 pb-4 border-b border-neutral-200 dark:border-neutral-700 w-full ${!isOpen && 'justify-center'}`}
        >
          <UserAvatar username={userData.email} avatar={userData.avatar} />
          {isOpen && (
            <div className='flex flex-col gap-0.5 overflow-hidden'>
              <span className='text-sm font-medium text-neutral-900 dark:text-neutral-100 truncate'>
                {userData.email.split('@')[0]}
              </span>
              <button
                title='edit-profile'
                className='text-xs text-primary-500 hover:underline text-left cursor-pointer w-fit'
              >
                Edit profile
              </button>
            </div>
          )}
        </div>
      )}

      {/* Navigation */}
      <div className='flex flex-col gap-5 w-full'>
        {entries.map((entry) => {
          const hasChildren = entry.children?.length > 0;
          const isExpanded = expandedMenus[entry.id];

          return (
            <div key={entry.id} className='flex flex-col gap-1.5 w-full'>
              {/* Parent item layout wrapper */}
              <div
                className={`flex items-center justify-between w-full text-sm font-semibold text-neutral-900 dark:text-neutral-100 hover:text-primary-500 transition ${
                  !isOpen && 'justify-center'
                }`}
                title={!isOpen ? entry.label : undefined}
              >
                {entry.href ? (
                  <Link
                    to={entry.href}
                    className='flex items-center gap-2.5 flex-1'
                  >
                    <entry.icon
                      size={16}
                      className='text-primary-500 shrink-0'
                    />
                    {isOpen && <span>{entry.label}</span>}
                  </Link>
                ) : (
                  <button
                    onClick={() => hasChildren && toggleSubMenu(entry.id)}
                    className='flex items-center gap-2.5 flex-1 text-left cursor-pointer'
                  >
                    <entry.icon
                      size={16}
                      className='text-primary-500 shrink-0'
                    />
                    {isOpen && <span>{entry.label}</span>}
                  </button>
                )}

                {isOpen && hasChildren && (
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      toggleSubMenu(entry.id);
                    }}
                    className='text-neutral-400 hover:text-primary-500 transition p-1 cursor-pointer'
                  >
                    {isExpanded ? (
                      <ChevronUp size={16} />
                    ) : (
                      <ChevronDown size={16} />
                    )}
                  </button>
                )}
              </div>

              {isOpen && hasChildren && isExpanded && (
                <div className='flex flex-col gap-1 pl-6 border-l border-neutral-100 dark:border-neutral-800 ml-2'>
                  {entry.children.map((child) => (
                    <Link
                      key={child.id}
                      to={child.href}
                      className={`text-xs py-0.5 transition ${
                        pathname === child.href
                          ? 'text-primary-500 font-semibold'
                          : 'text-neutral-500 dark:text-neutral-400 hover:text-primary-500'
                      }`}
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AccountSidebar;

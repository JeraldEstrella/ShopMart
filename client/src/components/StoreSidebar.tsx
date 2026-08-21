import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface StoreSidebarLink {
  label: string;
  href: string;
  icon: LucideIcon;
}

interface StoreSidebarProps {
  storeName: string;
  sidebarLinks: StoreSidebarLink[];
}

const StoreSidebar = ({ storeName, sidebarLinks }: StoreSidebarProps) => {
  const { pathname } = useLocation();
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div
      className={`relative shrink-0 border-r border-neutral-200 dark:border-neutral-700 flex flex-col transition-all duration-300 ${
        isOpen ? 'w-44' : 'w-16'
      }`}
    >
      {/* Collapse Toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className='absolute -right-3 top-5 z-10 flex h-6 w-6 items-center justify-center rounded-full border border-neutral-200 bg-white dark:bg-neutral-800 dark:border-neutral-700 shadow-sm text-neutral-500 hover:text-primary-500'
      >
        {isOpen ? <ChevronLeft size={14} /> : <ChevronRight size={14} />}
      </button>

      {/* Store Info */}
      <div
        className={`px-4 py-4 border-b border-neutral-200 dark:border-neutral-700 ${
          !isOpen && 'flex flex-col items-center px-2'
        }`}
      >
        <p className='text-sm font-semibold text-neutral-900 dark:text-neutral-100 truncate'>
          {isOpen ? 'Shopmart Seller' : 'SM'}
        </p>

        {isOpen && (
          <p className='text-xs text-neutral-400 truncate'>{storeName}</p>
        )}
      </div>

      {/* Navigation */}
      <div className='flex flex-col flex-1 py-2'>
        {sidebarLinks.map(({ icon: Icon, label, href }) => {
          const active = pathname === href;

          return (
            <Link
              key={label}
              to={href}
              title={!isOpen ? label : undefined}
              className={`flex items-center gap-2.5 px-4 py-2.5 transition ${
                !isOpen && 'justify-center px-0'
              } ${
                active
                  ? 'bg-primary-500/10 text-primary-500 font-semibold'
                  : 'text-neutral-500 dark:text-neutral-400 hover:bg-primary-500/10 hover:text-primary-500'
              }`}
            >
              <Icon size={16} className='shrink-0' />

              {isOpen && <span className='text-xs'>{label}</span>}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default StoreSidebar;

import Sidebar from '../../components/AccountSidebar';
import type { UserData } from '../../types/user.types';
import { UserCircle, ClipboardList, Bell, Ticket, Coins } from 'lucide-react';
import { Outlet } from 'react-router-dom';

const accountNav = [
  {
    id: 1,
    label: 'Account',
    icon: UserCircle,
    children: [
      { id: 'profile', label: 'Profile', href: '/account' },
      { id: 'addresses', label: 'Addresses', href: '/account/address' },
      {
        id: 'change-password',
        label: 'Change Password',
        href: '/account/change-password',
      },
      { id: 'privacy', label: 'Privacy Settings', href: '/account/privacy' },
      {
        id: 'notifications-settings',
        label: 'Notification Settings',
        href: '/account/notifications-settings',
      },
      {
        id: 'order-settings',
        label: 'Order Settings',
        href: '/account/order-settings',
      },
    ],
  },
  {
    id: 2,
    label: 'My Purchase',
    icon: ClipboardList,
    href: '/account/purchase',
    children: [],
  },
  {
    id: 3,
    label: 'Notifications',
    icon: Bell,
    href: '/account/notifications',
    children: [],
  },
  {
    id: 4,
    label: 'My Vouchers',
    icon: Ticket,
    href: '/account/vouchers',
    children: [],
  },
  {
    id: 5,
    label: 'My Shopmart Coins',
    icon: Coins,
    href: '/account/coins',
    children: [],
  },
];

const exampleUserData: UserData = {
  id: '1',
  username: 'jerald',
  email: 'jerald@example.com',
  phone: '09394932703',
  avatar: undefined,
  gender: 'male',
  dob: '2003-05-20',
};

const MyAccount = () => {
  if (!exampleUserData) return null;
  return (
    <div className='flex w-full min-h-[calc(100vh-70px)] mt-2 bg-neutral-50 dark:bg-neutral-900'>
      <Sidebar entries={accountNav} userData={exampleUserData} />

      <main className='flex-1 overflow-hidden'>
        <Outlet />
      </main>
    </div>
  );
};

export default MyAccount;

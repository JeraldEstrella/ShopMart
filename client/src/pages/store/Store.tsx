import { Outlet } from 'react-router-dom';
import StoreSidebar from '../../components/StoreSidebar';
import { useParams } from 'react-router-dom';
import {
  LayoutDashboard,
  Package,
  ClipboardList,
  BarChart2,
  Truck,
  Ticket,
  Star,
  MessageCircle,
  Settings,
} from 'lucide-react';

const Store = () => {
  const { storename } = useParams();

  let sidebarLinks = [
    {
      icon: LayoutDashboard,
      label: 'Dashboard',
      href: `/store/${storename}`,
    },
    { icon: Package, label: 'Products', href: `/store/${storename}/products` },
    {
      icon: ClipboardList,
      label: 'Orders',
      href: `/store/${storename}/orders`,
    },
    { icon: BarChart2, label: 'Analytics', href: '/seller/analytics' },
    { icon: Truck, label: 'Shipping', href: `/store/${storename}/shipping` },
    { icon: Ticket, label: 'Vouchers', href: '/seller/vouchers' },
    { icon: Star, label: 'Reviews', href: '/seller/reviews' },
    { icon: MessageCircle, label: 'Chat', href: '/seller/chat' },
    { icon: Settings, label: 'Settings', href: '/seller/settings' },
  ];

  return (
    <div className='flex min-h-screen'>
      <StoreSidebar storeName='jerald' sidebarLinks={sidebarLinks} />
      <main className='flex-1 overflow-hidden'>
        <Outlet />
      </main>
    </div>
  );
};

export default Store;

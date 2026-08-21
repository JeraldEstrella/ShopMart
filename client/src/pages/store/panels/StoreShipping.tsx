import { useState } from 'react';
import {
  Download,
  Truck,
  Package,
  Search,
  CheckCircle,
  RotateCcw,
  ChevronsUpDown,
} from 'lucide-react';

const tabs = [
  'All Shipments',
  'To Ship (38)',
  'In Transit (14)',
  'Delivered',
  'Failed / Returned (6)',
];

const metrics = [
  {
    label: 'To Ship',
    value: 38,
    sub: 'Awaiting pickup',
    color: 'text-blue-500',
  },
  {
    label: 'In Transit',
    value: 14,
    sub: 'Out for delivery',
    color: 'text-primary-500',
  },
  {
    label: 'Delivered',
    value: 1398,
    sub: 'This month',
    color: 'text-success-500',
  },
  {
    label: 'Failed / Returned',
    value: 6,
    sub: 'Needs action',
    color: 'text-secondary-500',
  },
];

const shipments = [
  {
    id: '#10485',
    date: 'Jul 22, 2026',
    product: 'Canvas Backpack',
    variant: 'Qty: 2 · Brown',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=80',
    customer: 'Jay Patel',
    address: 'Imus, Cavite',
    courier: 'J&T Express',
    status: 'To Ship',
    actions: ['Ship Now'],
  },
  {
    id: '#10483',
    date: 'Jul 20, 2026',
    product: 'Wireless Headphones',
    variant: 'Qty: 1 · Black',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=80',
    customer: 'Anna Reyes',
    address: 'Bacoor, Cavite',
    courier: 'Ninja Van',
    status: 'In Transit',
    actions: ['Track', 'Details'],
  },
  {
    id: '#10486',
    date: 'Jul 22, 2026',
    product: 'Wear Saka Long Pants',
    variant: 'Qty: 1 · M · Black',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=80',
    customer: 'Maria Santos',
    address: 'Dasmarinas, Cavite',
    courier: 'LBC',
    status: 'Delivered',
    actions: ['Details'],
  },
  {
    id: '#10482',
    date: 'Jul 19, 2026',
    product: 'Steel Water Bottle 1L',
    variant: 'Qty: 3 · Silver',
    image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=80',
    customer: 'Tom Lee',
    address: 'General Trias, Cavite',
    courier: 'J&T Express',
    status: 'Failed',
    actions: ['Reship', 'Refund'],
  },
];

const couriers = [
  { name: 'J&T Express', sub: '2–4 days · COD available', enabled: true },
  { name: 'LBC', sub: '3–5 days · Nationwide', enabled: true },
  { name: 'Ninja Van', sub: '2–3 days · Real-time tracking', enabled: false },
];

const statusStyle: Record<string, string> = {
  'To Ship': 'bg-blue-500/10 text-blue-500',
  'In Transit': 'bg-primary-500/10 text-primary-500',
  Delivered: 'bg-success-500/10 text-success-500',
  Failed: 'bg-secondary-500/10 text-secondary-500',
};

const primaryAction: Record<string, boolean> = { 'Ship Now': true };

const StoreShipping = () => {
  const [couierList, setCourierList] = useState(couriers);

  const toggleCourier = (index: number) => {
    setCourierList((prev) =>
      prev.map((c, i) => (i === index ? { ...c, enabled: !c.enabled } : c))
    );
  };

  return (
    <div className='flex flex-col gap-4 p-5'>
      {/* Header */}
      <div className='flex items-center justify-between'>
        <div>
          <p className='text-base font-semibold text-neutral-900 dark:text-neutral-100'>
            Shipping
          </p>
          <p className='text-xs text-neutral-400'>
            Manage shipments and courier settings
          </p>
        </div>
        <div className='flex gap-2'>
          <button className='flex items-center gap-1.5 text-xs px-3 py-2 border border-neutral-200 dark:border-neutral-700 text-neutral-600 dark:text-neutral-300 hover:border-primary-500 hover:text-primary-500 transition cursor-pointer'>
            <Download size={13} /> Export
          </button>
          <button className='flex items-center gap-1.5 text-xs px-3 py-2 bg-primary-500 hover:bg-primary-600 text-white transition cursor-pointer'>
            <Truck size={13} /> Arrange Pickup
          </button>
        </div>
      </div>

      {/* Metrics */}
      <div className='grid grid-cols-4 gap-3'>
        {metrics.map(({ label, value, sub, color }) => (
          <div
            key={label}
            className='bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 p-3 flex flex-col gap-1'
          >
            <div className='flex items-center justify-between'>
              <span className='text-[11px] text-neutral-400'>{label}</span>
              <Truck size={13} className='text-primary-500' />
            </div>
            <span className={`text-xl font-semibold ${color}`}>
              {value.toLocaleString()}
            </span>
            <span className='text-[10px] text-neutral-400'>{sub}</span>
          </div>
        ))}
      </div>

      {/* Shipment table */}
      <div className='bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700'>
        {/* Tabs */}
        <div className='flex border-b border-neutral-200 dark:border-neutral-700 overflow-x-auto'>
          {tabs.map((tab, i) => (
            <button
              key={tab}
              className={`px-4 py-2.5 text-xs font-medium whitespace-nowrap border-b-2 transition cursor-pointer ${
                i === 0
                  ? 'border-primary-500 text-primary-500'
                  : 'border-transparent text-neutral-500 dark:text-neutral-400 hover:text-primary-500'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Toolbar */}
        <div className='flex items-center gap-2 px-4 py-3 border-b border-neutral-200 dark:border-neutral-700'>
          <div className='flex-1 flex items-center gap-2 border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900 px-3 py-1.5'>
            <Search size={13} className='text-neutral-400 shrink-0' />
            <input
              placeholder='Search by tracking number, order ID or customer...'
              className='text-xs bg-transparent focus:outline-none text-neutral-700 dark:text-neutral-300 placeholder:text-neutral-400 flex-1'
            />
          </div>
          <div className='relative'>
            <select className='appearance-none text-xs pl-3 pr-7 py-1.5 border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900 text-neutral-500 cursor-pointer focus:outline-none focus:border-primary-500'>
              <option>All Couriers</option>
              <option>J&T Express</option>
              <option>LBC</option>
              <option>Ninja Van</option>
            </select>
            <ChevronsUpDown
              size={12}
              className='pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-neutral-400'
            />
          </div>
        </div>

        {/* Table head */}
        <div className='grid grid-cols-[30px_90px_1.4fr_1fr_110px_110px_130px] gap-3 px-4 py-2 bg-neutral-50 dark:bg-neutral-900 text-[11px] font-semibold text-neutral-400 border-b border-neutral-200 dark:border-neutral-700'>
          <div>
            <input type='checkbox' className='accent-primary-500 w-3 h-3' />
          </div>
          <div>Order ID</div>
          <div>Product</div>
          <div>Customer</div>
          <div>Courier</div>
          <div>Status</div>
          <div>Actions</div>
        </div>

        {/* Rows */}
        {shipments.map((s) => (
          <div
            key={s.id}
            className='grid grid-cols-[30px_90px_1.4fr_1fr_110px_110px_130px] items-center gap-3 px-4 py-3 border-b border-neutral-200 dark:border-neutral-700 last:border-b-0 hover:bg-neutral-50 dark:hover:bg-neutral-900 transition text-xs'
          >
            <input type='checkbox' className='accent-primary-500 w-3 h-3' />

            <div className='flex flex-col gap-0.5'>
              <span className='font-medium text-neutral-900 dark:text-neutral-100'>
                {s.id}
              </span>
              <span className='text-[10px] text-neutral-400'>{s.date}</span>
            </div>

            <div className='flex items-center gap-2'>
              <img
                src={s.image}
                alt={s.product}
                className='w-9 h-9 object-cover shrink-0 border border-neutral-200 dark:border-neutral-700'
              />
              <div>
                <p className='font-medium text-neutral-900 dark:text-neutral-100 leading-snug'>
                  {s.product}
                </p>
                <p className='text-[10px] text-neutral-400'>{s.variant}</p>
              </div>
            </div>

            <div>
              <p className='font-medium text-neutral-900 dark:text-neutral-100'>
                {s.customer}
              </p>
              <p className='text-[10px] text-neutral-400'>{s.address}</p>
            </div>

            <div className='flex items-center gap-1.5'>
              <Truck size={12} className='text-neutral-400 shrink-0' />
              <span className='text-neutral-700 dark:text-neutral-300'>
                {s.courier}
              </span>
            </div>

            <span
              className={`text-[10px] font-semibold px-2 py-0.5 w-fit ${statusStyle[s.status]}`}
            >
              {s.status}
            </span>

            <div className='flex gap-1.5'>
              {s.actions.map((action) => (
                <button
                  key={action}
                  className={`text-[11px] px-2.5 py-1 border transition cursor-pointer ${
                    primaryAction[action]
                      ? 'bg-primary-500 hover:bg-primary-600 text-white border-primary-500'
                      : 'border-neutral-200 dark:border-neutral-700 text-neutral-600 dark:text-neutral-300 hover:border-primary-500 hover:text-primary-500'
                  }`}
                >
                  {action}
                </button>
              ))}
            </div>
          </div>
        ))}

        {/* Pagination */}
        <div className='flex items-center justify-between px-4 py-3 border-t border-neutral-200 dark:border-neutral-700'>
          <span className='text-xs text-neutral-400'>
            Showing 4 of 1,456 shipments
          </span>
          <div className='flex gap-1'>
            {['← Prev', '1', '2', '3', 'Next →'].map((p) => (
              <button
                key={p}
                className={`text-xs px-2.5 py-1 border transition cursor-pointer ${
                  p === '1'
                    ? 'bg-primary-500 text-white border-primary-500'
                    : 'border-neutral-200 dark:border-neutral-700 text-neutral-500 hover:border-primary-500 hover:text-primary-500'
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Courier settings */}
      <div className='bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700'>
        <div className='px-4 py-3 border-b border-neutral-200 dark:border-neutral-700'>
          <p className='text-xs font-semibold text-neutral-900 dark:text-neutral-100'>
            Courier Settings
          </p>
          <p className='text-[11px] text-neutral-400'>
            Enable or disable couriers for your store
          </p>
        </div>
        <div className='grid grid-cols-3'>
          {couierList.map(({ name, sub, enabled }, i) => (
            <div
              key={name}
              className={`flex items-center justify-between gap-3 p-4 ${
                i < couierList.length - 1
                  ? 'border-r border-neutral-200 dark:border-neutral-700'
                  : ''
              }`}
            >
              <div className='flex items-center gap-3'>
                <div className='w-9 h-9 border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900 flex items-center justify-center shrink-0'>
                  <Truck
                    size={16}
                    className={
                      enabled ? 'text-primary-500' : 'text-neutral-400'
                    }
                  />
                </div>
                <div>
                  <p className='text-xs font-medium text-neutral-900 dark:text-neutral-100'>
                    {name}
                  </p>
                  <p className='text-[10px] text-neutral-400'>{sub}</p>
                </div>
              </div>
              <button
                onClick={() => toggleCourier(i)}
                className={`w-9 h-5 relative transition cursor-pointer shrink-0 ${
                  enabled
                    ? 'bg-primary-500'
                    : 'bg-neutral-200 dark:bg-neutral-700'
                }`}
                style={{ borderRadius: 10 }}
              >
                <div
                  className='w-4 h-4 bg-white absolute top-0.5 transition-all'
                  style={{
                    borderRadius: '50%',
                    left: enabled ? 'calc(100% - 18px)' : '2px',
                  }}
                />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StoreShipping;

import { Download, Search } from 'lucide-react';

const tabs = [
  { label: 'All', count: 1482 },
  { label: 'Pending', count: 24 },
  { label: 'To Ship', count: 38 },
  { label: 'Shipped', count: null },
  { label: 'Completed', count: 1398 },
  { label: 'Cancelled', count: 22 },
  { label: 'Return / Refund', count: null },
];

const metrics = [
  {
    label: 'All Orders',
    value: '1,482',
    color: 'text-neutral-900 dark:text-neutral-100',
  },
  { label: 'Pending', value: '24', color: 'text-warning-500' },
  { label: 'To Ship', value: '38', color: 'text-blue-500' },
  { label: 'Completed', value: '1,398', color: 'text-success-500' },
  { label: 'Cancelled', value: '22', color: 'text-secondary-500' },
];

const orders = [
  {
    id: '#10486',
    date: 'Jul 22, 2026',
    product: 'Wear Saka Long Pants',
    variant: 'Qty: 1 · Size: M · Black',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=80',
    customer: 'Maria Santos',
    phone: '+63 912 345 6789',
    amount: '₱ 225',
    status: 'Completed',
    actions: ['View', 'Receipt'],
  },
  {
    id: '#10485',
    date: 'Jul 22, 2026',
    product: 'Canvas Backpack',
    variant: 'Qty: 2 · Brown',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=80',
    customer: 'Jay Patel',
    phone: '+63 917 222 3333',
    amount: '₱ 798',
    status: 'To Ship',
    actions: ['View', 'Ship'],
  },
  {
    id: '#10484',
    date: 'Jul 21, 2026',
    product: 'Sports Sunglasses UV400',
    variant: 'Qty: 1 · Red',
    image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=80',
    customer: 'Liu Wei',
    phone: '+63 920 111 4444',
    amount: '₱ 90',
    status: 'Pending',
    actions: ['View', 'Accept'],
  },
  {
    id: '#10483',
    date: 'Jul 20, 2026',
    product: 'Wireless Headphones BT5',
    variant: 'Qty: 1 · Black',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=80',
    customer: 'Anna Reyes',
    phone: '+63 945 888 7777',
    amount: '₱ 620',
    status: 'Shipped',
    actions: ['View', 'Track'],
  },
  {
    id: '#10482',
    date: 'Jul 19, 2026',
    product: 'Steel Water Bottle 1L',
    variant: 'Qty: 3 · Silver',
    image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=80',
    customer: 'Tom Lee',
    phone: '+63 933 555 6666',
    amount: '₱ 540',
    status: 'Cancelled',
    actions: ['View', 'Refund'],
  },
];

const statusStyle: Record<string, string> = {
  Completed: 'bg-success-500/10 text-success-500',
  'To Ship': 'bg-blue-500/10 text-blue-500',
  Pending: 'bg-warning-500/10 text-warning-500',
  Shipped: 'bg-primary-500/10 text-primary-500',
  Cancelled: 'bg-secondary-500/10 text-secondary-500',
};

const primaryAction: Record<string, boolean> = {
  Ship: true,
  Accept: true,
};

const StoreOrders = () => {
  return (
    <div className='flex flex-col gap-4 p-5'>
      {/* Header */}
      <div className='flex items-center justify-between'>
        <div>
          <p className='text-base font-semibold text-neutral-900 dark:text-neutral-100'>
            Orders
          </p>
          <p className='text-xs text-neutral-400'>
            Track and manage customer orders
          </p>
        </div>
        <button className='flex items-center gap-1.5 text-xs px-3 py-2 border border-neutral-200 dark:border-neutral-700 text-neutral-600 dark:text-neutral-300 hover:border-primary-500 hover:text-primary-500 transition cursor-pointer'>
          <Download size={13} /> Export
        </button>
      </div>

      {/* Metrics */}
      <div className='flex flex-wrap justify-between gap-3'>
        {metrics.map(({ label, value, color }) => (
          <div
            key={label}
            className='flex-1 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 p-3 flex flex-col gap-1'
          >
            <span className='text-[11px] text-neutral-400'>{label}</span>
            <span className={`text-lg font-semibold ${color}`}>{value}</span>
          </div>
        ))}
      </div>

      {/* Table card */}
      <div className='bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700'>
        {/* Tabs */}
        <div className='flex flex-wrap border-b border-neutral-200 dark:border-neutral-700 overflow-x-auto'>
          {tabs.map(({ label, count }, i) => (
            <button
              key={label}
              className={`px-4 py-2.5 text-xs font-medium whitespace-nowrap border-b-2 transition cursor-pointer ${
                i === 0
                  ? 'border-primary-500 text-primary-500'
                  : 'border-transparent text-neutral-500 dark:text-neutral-400 hover:text-primary-500'
              }`}
            >
              {label}
              {count !== null ? ` (${count.toLocaleString()})` : ''}
            </button>
          ))}
        </div>

        {/* Toolbar */}
        <div className='flex items-center gap-2 px-4 py-3 border-b border-neutral-200 dark:border-neutral-700'>
          <div className='flex-1 flex items-center gap-2 border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900 px-3 py-1.5'>
            <Search size={13} className='text-neutral-400 shrink-0' />
            <input
              placeholder='Search by Order ID, customer or product...'
              className='text-xs bg-transparent focus:outline-none text-neutral-700 dark:text-neutral-300 placeholder:text-neutral-400 flex-1'
            />
          </div>
          <select className='text-xs px-2 py-1.5 border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900 text-neutral-500 cursor-pointer focus:outline-none'>
            <option>All Dates</option>
            <option>Today</option>
            <option>Last 7 days</option>
            <option>Last 30 days</option>
          </select>
          <select className='text-xs px-2 py-1.5 border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900 text-neutral-500 cursor-pointer focus:outline-none'>
            <option>Sort: Newest</option>
            <option>Sort: Oldest</option>
            <option>Sort: Amount ↑</option>
            <option>Sort: Amount ↓</option>
          </select>
        </div>

        {/* Table head */}
        <div className='grid grid-cols-[30px_90px_1.8fr_1fr_80px_100px_140px] gap-3 px-4 py-2 bg-neutral-50 dark:bg-neutral-900 text-[11px] font-semibold text-neutral-400 border-b border-neutral-200 dark:border-neutral-700'>
          <div>
            <input type='checkbox' className='accent-primary-500 w-3 h-3' />
          </div>
          <div>Order ID</div>
          <div>Product</div>
          <div>Customer</div>
          <div>Amount</div>
          <div>Status</div>
          <div>Actions</div>
        </div>

        {/* Rows */}
        {orders.map((order) => (
          <div
            key={order.id}
            className='grid grid-cols-[30px_90px_1.8fr_1fr_80px_100px_140px] items-center gap-3 px-4 py-3 border-b border-neutral-200 dark:border-neutral-700 last:border-b-0 hover:bg-neutral-50 dark:hover:bg-neutral-900 transition text-xs'
          >
            <input type='checkbox' className='accent-primary-500 w-3 h-3' />

            <div className='flex flex-col gap-0.5'>
              <span className='font-medium text-neutral-900 dark:text-neutral-100'>
                {order.id}
              </span>
              <span className='text-[10px] text-neutral-400'>{order.date}</span>
            </div>

            <div className='flex items-center gap-2'>
              <img
                src={order.image}
                alt={order.product}
                className='w-9 h-9 object-cover shrink-0 border border-neutral-200 dark:border-neutral-700'
              />
              <div>
                <p className='font-medium text-neutral-900 dark:text-neutral-100 leading-snug'>
                  {order.product}
                </p>
                <p className='text-[10px] text-neutral-400'>{order.variant}</p>
              </div>
            </div>

            <div className='flex flex-col gap-0.5'>
              <span className='font-medium text-neutral-900 dark:text-neutral-100'>
                {order.customer}
              </span>
              <span className='text-[10px] text-neutral-400'>
                {order.phone}
              </span>
            </div>

            <span className='font-semibold text-primary-600 dark:text-primary-400'>
              {order.amount}
            </span>

            <span
              className={`text-[10px] font-semibold px-2 py-0.5 w-fit ${statusStyle[order.status]}`}
            >
              {order.status}
            </span>

            <div className='flex gap-1.5'>
              {order.actions.map((action) => (
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
            Showing 5 of 1,482 orders
          </span>
          <div className='flex gap-1'>
            {['← Prev', '1', '2', '3', 'Next →'].map((p, i) => (
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
    </div>
  );
};

export default StoreOrders;

import { useMemo, useState } from 'react';
import { metrics, salesData, topProducts, orders } from '../storedata';
import { TrendingUp, TrendingDown, ChevronsUpDown } from 'lucide-react';

const statusStyle: Record<string, string> = {
  Completed: 'bg-success-500/10 text-success-500',
  Shipped: 'bg-blue-500/10 text-blue-500',
  Pending: 'bg-warning-500/10 text-warning-500',
  Cancelled: 'bg-secondary-500/10 text-secondary-500',
};

const StoreDashboard = () => {
  const [filter, setFilter] = useState<Number>(0);

  const handleFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilter(Number(e));
  };

  return (
    <div className='flex flex-col gap-4 p-5 overflow-y-auto'>
      {/* Header */}
      <div className='flex-wrap flex items-center justify-between'>
        <div>
          <p className='text-base font-semibold text-neutral-900 dark:text-neutral-100'>
            Dashboard
          </p>
          <p className='text-xs text-neutral-400'>Welcome back, Jerald 👋</p>
        </div>
        <div className='relative'>
          <select
            onChange={() => handleFilter}
            className='appearance-none text-xs pl-3 pr-8 py-2 border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 hover:border-primary-500 focus:outline-none focus:border-primary-500 transition cursor-pointer w-full'
          >
            <option value='all'>All</option>
            <option value={7}>Last 7 days</option>
            <option value={30}>Last 30 days</option>
          </select>

          <ChevronsUpDown
            size={14}
            className='pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-neutral-400'
          />
        </div>
      </div>

      {/* Metrics */}
      <div className='flex flex-wrap justify-between gap-1'>
        {metrics.map(({ label, value, trend, up, icon: Icon }) => (
          <div
            key={label}
            className='flex-1 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 p-4 flex flex-col gap-2'
          >
            <div className='flex justify-between items-start'>
              <p className='text-xs text-neutral-500 dark:text-neutral-400'>
                {label}
              </p>
              <Icon size={15} className='text-primary-500' />
            </div>
            <p className='text-xl font-semibold text-neutral-900 dark:text-neutral-100'>
              {value}
            </p>
            <div className='flex items-center gap-1'>
              {up ? (
                <TrendingUp size={12} className='text-success-500' />
              ) : (
                <TrendingDown size={12} className='text-secondary-500' />
              )}
              <span
                className={`text-xs ${up ? 'text-success-500' : 'text-secondary-500'}`}
              >
                {trend}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Chart + Top Products */}
      <div className='flex flex-wrap gap-1'>
        {/* Sales chart */}
        <div className='flex-1 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 p-4'>
          <div className='flex justify-between items-center mb-4'>
            <p className='text-xs font-semibold text-neutral-900 dark:text-neutral-100'>
              Sales this week
            </p>
            <span className='text-xs text-neutral-400'>₱ 84,230 total</span>
          </div>
          <div className='flex items-end gap-2 h-28'>
            {salesData.map(({ day, percent }) => (
              <div
                key={day}
                className='flex flex-col items-center gap-1.5 flex-1 h-full justify-end'
              >
                <div
                  className={`w-full transition-all ${percent === 96 ? 'bg-primary-500' : 'bg-primary-500/30 dark:bg-primary-500/20'}`}
                  style={{
                    height: `${percent}%`,
                    borderRadius: '2px 2px 0 0',
                  }}
                />
                <span className='text-[10px] text-neutral-400'>{day}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Top products */}
        <div className='w-full md:w-2/5 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 p-4'>
          <p className='text-xs font-semibold text-neutral-900 dark:text-neutral-100 mb-4'>
            Top Products
          </p>
          <div className='flex flex-col gap-3'>
            {topProducts.map(({ rank, title, sold, image }) => (
              <div key={rank} className='flex items-center gap-2.5'>
                <span className='text-xs text-neutral-400 w-3'>{rank}</span>
                <img
                  src={image}
                  alt={title}
                  className='w-8 h-8 object-cover shrink-0'
                />
                <div className='flex flex-col min-w-0'>
                  <p className='text-xs text-neutral-900 dark:text-neutral-100 truncate'>
                    {title}
                  </p>
                  <p className='text-[10px] text-neutral-400'>{sold} sold</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent orders */}
      <div className='flex flex-col bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 p-4'>
        <div className='flex justify-between items-center mb-4'>
          <p className='text-xs font-semibold text-neutral-900 dark:text-neutral-100'>
            Recent Orders
          </p>
          <button className='text-xs text-primary-500 hover:underline cursor-pointer'>
            View all →
          </button>
        </div>
        <table className='w-full text-xs border-collapse'>
          <thead>
            <tr className='border-b border-neutral-200 dark:border-neutral-700'>
              {['Order ID', 'Product', 'Customer', 'Status', 'Amount'].map(
                (h) => (
                  <th
                    key={h}
                    className={`py-2 px-1 text-neutral-400 font-medium ${h === 'Amount' ? 'text-right' : 'text-left'}`}
                  >
                    {h}
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr
                key={order.id}
                className='border-b border-neutral-200 dark:border-neutral-700 last:border-b-0'
              >
                <td className='py-2.5 px-1 text-neutral-400'>{order.id}</td>
                <td className='py-2.5 px-1 text-neutral-900 dark:text-neutral-100'>
                  {order.product}
                </td>
                <td className='py-2.5 px-1 text-neutral-900 dark:text-neutral-100'>
                  {order.customer}
                </td>
                <td className='py-2.5 px-1'>
                  <span
                    className={`text-[10px] font-semibold px-2 py-0.5 ${statusStyle[order.status]}`}
                  >
                    {order.status}
                  </span>
                </td>
                <td className='py-2.5 px-1 text-right text-neutral-900 dark:text-neutral-100'>
                  {order.amount}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StoreDashboard;

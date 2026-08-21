import { useState } from 'react';
import { Plus, Search } from 'lucide-react';
import {
  products,
  productStats,
  productTabs,
  productCategories,
  productSortOptions,
  type ProductStatus,
} from '../storedata';
import ProductForm from '../../../components/ProductForm';

const statusStyle: Record<ProductStatus, string> = {
  active: 'bg-success-500/10 text-success-500',
  'low-stock': 'bg-warning-500/10 text-warning-500',
  unlisted: 'bg-secondary-500/10 text-secondary-500',
};

const statusLabel: Record<ProductStatus, string> = {
  active: 'Active',
  'low-stock': 'Low Stock',
  unlisted: 'Unlisted',
};

const StoreProducts = () => {
  const [addModal, setAddModal] = useState(false);
  const [activeTab, setActiveTab] = useState('All');
  const [selected, setSelected] = useState<string[]>([]);

  const toggleSelected = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  return (
    <div className='flex min-h-screen'>
      <div className='flex-1 flex flex-col gap-4 p-5 overflow-y-auto'>
        {/* Header */}
        <div className='flex-wrap flex items-center justify-between'>
          <div>
            <p className='text-base font-semibold text-neutral-900 dark:text-neutral-100'>
              Products
            </p>
            <p className='text-xs text-neutral-400'>
              Manage your store listings
            </p>
          </div>
          <button
            onClick={() => setAddModal((prev) => !prev)}
            className='flex items-center gap-1.5 text-xs px-3 py-2 bg-primary-500 hover:bg-primary-600 text-white transition cursor-pointer'
          >
            <Plus size={12} /> Add Product
          </button>
        </div>

        {/* Stats */}
        <div className='flex flex-wrap justify-between gap-1'>
          {productStats.map(({ label, value, color }) => (
            <div
              key={label}
              className='flex-1 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 p-4 flex flex-col gap-1'
            >
              <span className='text-xs text-neutral-500 dark:text-neutral-400'>
                {label}
              </span>
              <span className={`text-xl font-semibold ${color}`}>{value}</span>
            </div>
          ))}
        </div>

        {/* Filters + Table */}
        <div className='bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700'>
          {/* Tabs */}
          <div className='flex border-b border-neutral-200 dark:border-neutral-700'>
            {productTabs.map(({ label, count }) => (
              <button
                key={label}
                onClick={() => setActiveTab(label)}
                className={`px-3.5 py-2.5 text-xs font-medium border-b-2 transition cursor-pointer ${
                  activeTab === label
                    ? 'text-primary-500 border-primary-500'
                    : 'text-neutral-500 dark:text-neutral-400 border-transparent hover:text-primary-500'
                }`}
              >
                {label} ({count})
              </button>
            ))}
          </div>

          {/* Toolbar */}
          <div className='flex flex-wrap items-center gap-2 p-3 border-b border-neutral-200 dark:border-neutral-700'>
            <div className='flex-1 min-w-[160px] flex items-center gap-2 border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900 px-2.5 py-1.5'>
              <Search size={14} className='text-neutral-400 shrink-0' />
              <input
                placeholder='Search products...'
                className='flex-1 bg-transparent text-xs text-neutral-900 dark:text-neutral-100 outline-none'
              />
            </div>
            <select className='text-xs px-2.5 py-1.5 border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900 text-neutral-600 dark:text-neutral-300 cursor-pointer'>
              {productCategories.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
            <select className='text-xs px-2.5 py-1.5 border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900 text-neutral-600 dark:text-neutral-300 cursor-pointer'>
              {productSortOptions.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </div>

          {/* Table */}
          <table className='w-full text-xs border-collapse'>
            <thead>
              <tr className='bg-neutral-50 dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-700'>
                <th className='py-2 px-3.5 w-8'>
                  <input
                    type='checkbox'
                    className='accent-primary-500 w-3.5 h-3.5 cursor-pointer'
                  />
                </th>
                {[
                  'Product',
                  'Price',
                  'Stock',
                  'Sales',
                  'Status',
                  'Actions',
                ].map((h) => (
                  <th
                    key={h}
                    className='py-2 px-1 text-left text-neutral-400 font-medium'
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {products.map((product) => {
                const checked = selected.includes(product.id);
                const isUnlisted = product.status === 'unlisted';

                return (
                  <tr
                    key={product.id}
                    className='border-b border-neutral-200 dark:border-neutral-700 last:border-b-0 hover:bg-neutral-50 dark:hover:bg-neutral-900'
                  >
                    <td className='py-2.5 px-3.5'>
                      <input
                        type='checkbox'
                        checked={checked}
                        onChange={() => toggleSelected(product.id)}
                        className='accent-primary-500 w-3.5 h-3.5 cursor-pointer'
                      />
                    </td>
                    <td className='py-2.5 px-1'>
                      <div className='flex items-center gap-2.5'>
                        <img
                          src={product.image}
                          alt={product.name}
                          className='w-10 h-10 object-cover shrink-0'
                        />
                        <div className='min-w-0'>
                          <p className='text-neutral-900 dark:text-neutral-100 font-medium truncate'>
                            {product.name}
                          </p>
                          <p className='text-[10px] text-neutral-400'>
                            {product.category} · SKU #{product.sku}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className='py-2.5 px-1 text-primary-500 font-semibold'>
                      ₱ {product.price}
                    </td>
                    <td
                      className={`py-2.5 px-1 ${
                        product.status === 'low-stock'
                          ? 'text-warning-500 font-semibold'
                          : 'text-neutral-900 dark:text-neutral-100'
                      }`}
                    >
                      {product.stock}
                    </td>
                    <td className='py-2.5 px-1 text-neutral-900 dark:text-neutral-100'>
                      {product.sales}
                    </td>
                    <td className='py-2.5 px-1'>
                      <span
                        className={`inline-flex px-2 py-0.5 rounded-full text-[10px] font-semibold ${statusStyle[product.status]}`}
                      >
                        {statusLabel[product.status]}
                      </span>
                    </td>
                    <td className='py-2.5 px-1'>
                      <div className='flex gap-1'>
                        <button className='text-[11px] px-2.5 py-1 border border-neutral-200 dark:border-neutral-700 text-neutral-500 dark:text-neutral-400 hover:border-primary-500 hover:text-primary-500 transition cursor-pointer'>
                          Edit
                        </button>
                        {isUnlisted ? (
                          <button className='text-[11px] px-2.5 py-1 border border-neutral-200 dark:border-neutral-700 text-neutral-500 dark:text-neutral-400 hover:border-primary-500 hover:text-primary-500 transition cursor-pointer'>
                            List
                          </button>
                        ) : (
                          <button className='text-[11px] px-2.5 py-1 border border-neutral-200 dark:border-neutral-700 text-neutral-500 dark:text-neutral-400 hover:border-secondary-500 hover:text-secondary-500 transition cursor-pointer'>
                            Delete
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {/* Pagination */}
          <div className='flex items-center justify-between p-3 border-t border-neutral-200 dark:border-neutral-700'>
            <span className='text-xs text-neutral-400'>
              Showing {products.length} of 64 products
            </span>
            <div className='flex gap-1'>
              <button className='text-xs px-2.5 py-1 border border-neutral-200 dark:border-neutral-700 text-neutral-400 hover:border-primary-500 hover:text-primary-500 transition cursor-pointer'>
                ← Prev
              </button>
              {[1, 2, 3].map((page) => (
                <button
                  key={page}
                  className={`text-xs px-2.5 py-1 border transition cursor-pointer ${
                    page === 1
                      ? 'bg-primary-500 border-primary-500 text-white'
                      : 'border-neutral-200 dark:border-neutral-700 text-neutral-600 dark:text-neutral-300 hover:border-primary-500 hover:text-primary-500'
                  }`}
                >
                  {page}
                </button>
              ))}
              <button className='text-xs px-2.5 py-1 border border-neutral-200 dark:border-neutral-700 text-neutral-400 hover:border-primary-500 hover:text-primary-500 transition cursor-pointer'>
                Next →
              </button>
            </div>
          </div>
        </div>
      </div>
      {addModal && <ProductForm setModal={setAddModal} />}
    </div>
  );
};

export default StoreProducts;

import { Search, ShoppingCart, MessageCircle } from 'lucide-react';
import { items } from '../../../sampleData/items';
import { useEffect, useState } from 'react';
import type { Product } from '../../../types/product.types';

const MyPurchase = () => {
  const [search, setSearch] = useState('');
  const [result, setResult] = useState<Product[]>([]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    const foundItems = items.filter((item) => {
      if (!search) return true;

      if (/^[0-9]+$/.test(search)) {
        return item.id === Number(search);
      }

      return item.title.toLowerCase().includes(search.toLowerCase());
    });

    setResult(foundItems);
  }, [search, items]);

  return (
    <div className='flex flex-col gap-4 h-full overflow-y-auto p-4'>
      {/* Search */}
      <div className='flex items-center gap-2 border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 px-3 py-1'>
        <Search size={14} className='text-neutral-400 shrink-0' />
        <input
          type='text'
          onChange={handleSearch}
          className='flex-1 text-xs py-1.5 bg-transparent focus:outline-none text-neutral-700 dark:text-neutral-300 placeholder:text-neutral-400'
          placeholder='Search by Seller Name, Order ID or Product Name'
        />
      </div>

      {/* Order list */}
      <div className='flex flex-col gap-3'>
        <div className='flex flex-col gap-3'>
          {result.length > 0 ? (
            result.map((item) => (
              <div
                key={item.id}
                className='flex flex-col bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700'
              >
                {/* Order header */}
                <div className='flex items-center justify-between px-4 py-2 border-b border-neutral-200 dark:border-neutral-700'>
                  <span className='text-xs text-neutral-500 dark:text-neutral-400'>
                    Shopmart Store
                  </span>

                  <span className='text-xs font-medium text-success-500'>
                    Completed
                  </span>
                </div>

                {/* Item row */}
                <div className='flex items-center gap-4 p-4'>
                  <img
                    src={item.image}
                    alt={item.title}
                    className='w-16 h-16 object-cover shrink-0 border border-neutral-200 dark:border-neutral-700'
                  />

                  <div className='flex flex-col gap-1 flex-1 min-w-0'>
                    <span className='text-sm text-neutral-900 dark:text-neutral-100 line-clamp-2 leading-snug'>
                      {item.title}
                    </span>

                    <span className='text-xs text-neutral-400'>x1</span>

                    <span className='text-sm font-semibold text-primary-600 dark:text-primary-400'>
                      ${item.price.toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Footer */}
                <div className='flex flex-wrap items-center justify-between px-4 py-3 border-t border-neutral-200 dark:border-neutral-700'>
                  <span className='text-xs text-neutral-400'>
                    Order Total:
                    <span className='text-sm font-semibold text-neutral-900 dark:text-neutral-100 ml-1'>
                      ${item.price.toFixed(2)}
                    </span>
                  </span>

                  <div className='flex gap-2'>
                    <button className='flex items-center gap-1.5 px-3 py-1.5 border border-neutral-200 dark:border-neutral-700 text-xs text-neutral-600 dark:text-neutral-300 hover:border-primary-500 hover:text-primary-500 transition cursor-pointer'>
                      <MessageCircle size={12} />
                      Contact Seller
                    </button>

                    <button className='flex items-center gap-1.5 px-3 py-1.5 bg-primary-500 hover:bg-primary-600 text-white text-xs transition cursor-pointer'>
                      <ShoppingCart size={12} />
                      Buy Again
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className='text-center py-10 text-sm text-neutral-400'>
              No orders found
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyPurchase;

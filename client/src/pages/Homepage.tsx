import { categories } from '../sampleData/categories';
import { Gift, ZapIcon } from 'lucide-react';
import ProductGrid from '../components/ProductGrid';
import { items } from '../sampleData/items';
import SaleTimer from '../components/SaleTag';

const Homepage = () => {
  return (
    <div className='flex flex-col gap-2 md:gap-5 p-2 bg-neutral-50 dark:bg-gray-900 min-h-screen'>
      {/* Categories */}
      <div className='flex justify-between overflow-x-auto mt-4 gap-3 md:gap-0 '>
        {categories.map(({ id, label, icon: Icon, href }) => (
          <div
            key={id}
            className='flex flex-col items-center justify-between cursor-pointer'
          >
            <div className='w-8 h-8 md:w-12 md:h-12 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center hover:bg-primary-500 dark:hover:bg-primary-500 transition'>
              <Icon
                size={22}
                className='text-neutral-500 dark:text-neutral-400 transition'
              />
            </div>
            <span className='text-xs text-neutral-500 dark:text-neutral-400 text-center transition'>
              {label}
            </span>
          </div>
        ))}
      </div>

      {/* Sale Banner */}
      <div className='flex items-center justify-between bg-primary-500 dark:bg-primary-600 p-5'>
        <div className='flex flex-col gap-3'>
          <div>
            <h2 className='text-3xl font-bold text-white'>
              Mid-year mega sale
            </h2>
            <p className='text-sm text-white/80 mt-1'>
              Up to 70% off, free shipping over $20
            </p>
          </div>
          <button className='w-fit px-4 py-2 bg-white text-primary-600 text-sm font-semibold rounded-full hover:bg-neutral-100 transition cursor-pointer'>
            Shop now
          </button>
        </div>
        <Gift className='size-20 text-white/90 shrink-0' />
      </div>

      {/* Flash Sale */}
      <div className='flex justify-between items-center gap-1 p-2'>
        <div className='flex items-center gap-2'>
          <ZapIcon className='text-primary-500 fill-primary-500 size-5' />
          <h3 className='md:text-2xl text-orange-400 dark:text-orange-300 font-bold'>
            Flash Sale
          </h3>
        </div>
        <div>
          <SaleTimer />
        </div>
      </div>

      <ProductGrid items={items} isSale={<SaleTimer />} />

      <ProductGrid
        title='Recommended for you'
        items={items}
        emptyMessage='No products found.'
      />
    </div>
  );
};

export default Homepage;

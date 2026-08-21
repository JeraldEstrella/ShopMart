import { useState } from 'react';

const ratings = [
  { star: 5, percent: 70 },
  { star: 4, percent: 20 },
  { star: 3, percent: 7 },
  { star: 2, percent: 2 },
  { star: 1, percent: 1 },
];

const ProductDetails = () => {
  const [activeTab, setActiveTab] = useState<'description' | 'reviews'>(
    'description'
  );

  const overAllRating = ratings.reduce(
    (sum, r) => sum + (r.star * r.percent) / 100,
    0
  );

  return (
    <div className='flex flex-col gap-4 border-t border-neutral-200 dark:border-neutral-700 pt-4'>
      <div className='flex gap-2'>
        <button
          onClick={() => setActiveTab('description')}
          className={`px-4 py-2 text-sm font-medium rounded-lg border transition cursor-pointer ${
            activeTab === 'description'
              ? 'bg-white dark:bg-neutral-800 border-neutral-300 dark:border-neutral-600 text-neutral-900 dark:text-neutral-100'
              : 'border-transparent text-neutral-500 dark:text-neutral-400 hover:text-neutral-700'
          }`}
        >
          Description
        </button>
        <button
          onClick={() => setActiveTab('reviews')}
          className={`px-4 py-2 text-sm font-medium rounded-lg border transition cursor-pointer ${
            activeTab === 'reviews'
              ? 'bg-white dark:bg-neutral-800 border-neutral-300 dark:border-neutral-600 text-neutral-900 dark:text-neutral-100'
              : 'border-transparent text-neutral-500 dark:text-neutral-400 hover:text-neutral-700'
          }`}
        >
          Reviews (128)
        </button>
      </div>

      {activeTab === 'description' && (
        <p className='text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed'>
          Experience studio-quality sound with deep bass, crisp highs, and
          active noise cancellation. Designed for all-day comfort with premium
          cushioned ear cups and a foldable headband. Up to 30 hours battery
          life, fast charge support, and seamless Bluetooth 5.3 connectivity.
        </p>
      )}

      {activeTab === 'reviews' && (
        <div className='flex flex-col gap-4'>
          <p className='text-sm font-semibold text-neutral-900 dark:text-neutral-100'>
            Customer reviews
          </p>
          <div className='flex items-center gap-6'>
            <div className='flex flex-col items-center gap-1 min-w-16'>
              <span className='text-4xl font-semibold text-neutral-900 dark:text-neutral-100'>
                {overAllRating}
              </span>
              <span className='text-xs text-neutral-400'>128 reviews</span>
            </div>
            <div className='flex flex-col gap-1.5 flex-1'>
              {ratings.map(({ star, percent }) => (
                <div key={star} className='flex items-center gap-2'>
                  <span className='text-xs text-neutral-500 dark:text-neutral-400 w-2'>
                    {star}
                  </span>
                  <div className='flex-1 h-1.5 bg-neutral-200 dark:bg-neutral-700 rounded-full overflow-hidden'>
                    <div
                      className='h-full bg-amber-400 rounded-full transition-all duration-500'
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                  <span className='text-xs text-neutral-400 w-7 text-right'>
                    {percent}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;

import { ShoppingCart, BadgeCheck } from 'lucide-react';

interface CardItem {
  id: number;
  img: string;
  title: string;
  price: number;
  discount?: number;
  rating?: number;
  sold?: number;
  isChoice?: boolean;
  bundleDeal?: string;
  payLater?: boolean;
}

const Card = ({
  img,
  title,
  price,
  discount,
  rating,
  sold,
  isChoice,
  bundleDeal,
  payLater,
}: CardItem) => {
  return (
    <div className='w-30 md:w-48 min-w-20 shrink-0 border border-neutral-200 overflow-hidden hover:shadow-md transition cursor-pointer group'>
      {/* Image */}
      <div className='relative w-full md:h-48 bg-neutral-100'>
        <img
          src={img}
          alt={title}
          className='h-30 object-cover group-hover:scale-105 transition md:h-full md:w-full duration-500'
        />

        {/* Choice badge — top left */}
        {isChoice && (
          <div className='absolute top-2 left-2 flex items-center gap-1 bg-primary-500 text-white text-[10px] font-semibold px-2 py-0.5 rounded-md'>
            <BadgeCheck size={10} />
            Choice
          </div>
        )}

        {/* Discount badge — top right */}
        {discount && (
          <span className='absolute top-2 right-2 bg-secondary-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-md'>
            -{discount}%
          </span>
        )}

        {/* Bundle deal badge — below discount */}
        {bundleDeal && (
          <span className='absolute top-7 right-2 bg-secondary-600 text-white text-[9px] font-semibold px-1.5 py-0.5 rounded-md text-center leading-tight'>
            {bundleDeal}
          </span>
        )}

        {/* SPayLater badge — bottom left */}
        {payLater && (
          <div className='absolute bottom-2 left-2 bg-neutral-900/80 text-white text-[9px] font-semibold px-2 py-0.5 rounded-md'>
            <span className='text-primary-400'>SPayLater</span>
            <br />
            <span>0% INTEREST</span>
          </div>
        )}
      </div>

      {/* Details */}
      <div className='p-3 flex flex-col gap-1.5'>
        {/* Choice label */}
        {isChoice && (
          <div className='flex items-center gap-1 w-fit border border-primary-500 text-primary-500 text-[10px] font-semibold px-2 py-0.5 rounded-md'>
            <BadgeCheck size={10} />
            Choice
          </div>
        )}

        <p className='text-xs md:text-sm text-neutral-700 dark:text-neutral-300 leading-snug line-clamp-2'>
          {title}
        </p>

        {/* Bundle deal pill */}
        {bundleDeal && (
          <span className='w-fit border border-primary-400 text-primary-500 text-[10px] px-2 py-0.5 rounded-full'>
            Any 2 enjoy 5% off
          </span>
        )}

        {/* Price row */}
        <div className='flex items-center justify-between mt-1'>
          <p className='text-xs md:text-sm font-bold text-primary-600 dark:text-primary-400'>
            ₱{price.toFixed(0)}
          </p>

          {/* Cart button */}
          <button
            onClick={(e) => e.stopPropagation()}
            className='w-8 h-8 rounded-full bg-primary-500 hover:bg-primary-600 flex items-center justify-center transition cursor-pointer'
            aria-label='add to cart'
          >
            <ShoppingCart size={14} className='text-white' />
          </button>
        </div>

        {(rating || sold) && (
          <div className='text-xs md:text-sm flex items-center gap-1 text-[11px] text-neutral-500'>
            {rating && <span>⭐ {rating}</span>}
            {sold && <span>· {sold.toLocaleString()} sold</span>}
          </div>
        )}
      </div>
    </div>
  );
};

export default Card;

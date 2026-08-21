import Card from './Card';
import type { CardItem } from '../sampleData/items';

interface ProductGridProps {
  items: CardItem[];
  title?: string;
  isSale?: React.ReactNode;
  emptyMessage?: string;
}

const ProductGrid = ({
  items,
  title,
  isSale,
  emptyMessage = 'No products available.',
}: ProductGridProps) => {
  return (
    <div className='flex flex-col gap-2'>
      {title && (
        <div className='flex items-center justify-between p-2'>
          <h3 className='md:text-2xl font-bold text-neutral-900 dark:text-neutral-100'>
            {title}
          </h3>
          {isSale && <div>{isSale}</div>}
        </div>
      )}

      {items.length === 0 ? (
        <p className='text-sm text-neutral-500 dark:text-neutral-400 text-center py-10'>
          {emptyMessage}
        </p>
      ) : (
        <div className='flex flex-wrap flex-row items-center justify-around md:justify-between gap-1'>
          {items.map((item) => (
            <Card
              key={item.id}
              id={item.id}
              title={item.title}
              img={item.image}
              price={item.price}
              discount={item.discount}
              rating={item.rating}
              sold={item.sold}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductGrid;

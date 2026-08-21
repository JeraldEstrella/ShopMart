import { useState } from 'react';
import Comment, { type commentData } from '../components/CommentCard';
import ProductDetails from '../components/ProductDetails';
import { threadedComments } from '../sampleData/comment';
import {
  Heart,
  ArrowLeftIcon,
  ArrowRightIcon,
  Star,
  ShoppingCart,
  Minus,
  Plus,
  Truck,
  ShieldCheck,
  RotateCcw,
} from 'lucide-react';

const images = [
  'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800',
  'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800',
  'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800',
];

const colors = ['#18181b', '#f97316', '#0a7de1'];
const sizes = ['S', 'M', 'L', 'XL'];

const SelectedItem = () => {
  const [wislist, setWishlist] = useState(false);
  const [activeImage, setActiveImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedSize, setSelectedSize] = useState('M');
  const [quantity, setQuantity] = useState(1);

  const nextImage = () =>
    setActiveImage(() =>
      activeImage === images.length - 1 ? 0 : activeImage + 1
    );

  const prevImage = () =>
    setActiveImage(() =>
      activeImage === 0 ? images.length - 1 : activeImage - 1
    );

  return (
    <div className='flex flex-col gap-6 pt-6 px-2'>
      <div className='flex flex-col md:flex-row gap-6'>
        <div className='flex flex-col'>
          <div className='w-full md:w-90 min-w-20 shrink-0 border border-neutral-200 dark:border-neutral-700 shadow-2xl rounded-xl overflow-hidden relative'>
            <button
              title='add-wishlist'
              onClick={() => setWishlist((prev) => !prev)}
              className='absolute top-2 right-2 z-10 w-8 h-8 rounded-full bg-white dark:bg-neutral-700 flex items-center justify-center shadow cursor-pointer'
            >
              <Heart
                className={`${wislist ? 'text-red-400 fill-red-400' : 'text-neutral-400'}`}
                size={16}
              />
            </button>
            <div className='relative w-full h-60 md:h-80 bg-neutral-100 dark:bg-neutral-800'>
              <img
                src={images[activeImage]}
                alt='product'
                className='object-cover h-full w-full transition duration-500'
              />
              <div className='flex px-4 w-full justify-between absolute bottom-1'>
                <button
                  title='left-icon'
                  onClick={prevImage}
                  className='w-8 h-8 rounded-full bg-white dark:bg-neutral-700 flex items-center justify-center shadow-2xl cursor-pointer duration-300 hover:scale-105'
                >
                  <ArrowLeftIcon size={16} />
                </button>
                <button
                  title='right-icon'
                  onClick={nextImage}
                  className='w-8 h-8 rounded-full bg-white dark:bg-neutral-700 flex items-center justify-center shadow cursor-pointer duration-300 hover:scale-105'
                >
                  <ArrowRightIcon size={16} />
                </button>
              </div>
            </div>
          </div>

          <div className='flex flex-wrap p-2 gap-2'>
            {images.map((img, i) => (
              <div
                key={i}
                onClick={() => setActiveImage(i)}
                className={`w-15 h-15 border rounded-2xl overflow-hidden cursor-pointer transition ${
                  activeImage === i
                    ? 'border-primary-500 border-2'
                    : 'border-neutral-400 dark:border-neutral-600'
                }`}
              >
                <img
                  src={img}
                  alt='product thumbnail'
                  className='object-cover w-full h-full'
                />
              </div>
            ))}
          </div>
        </div>

        {/* Product details */}
        <div className='flex flex-col gap-4 flex-1'>
          <h1 className='text-xl font-bold text-neutral-900 dark:text-neutral-100 leading-snug'>
            Premium Wireless Noise-Cancelling Headphones
          </h1>

          <div className='flex items-center gap-2'>
            {[1, 2, 3, 4, 5].map((s) => (
              <Star
                key={s}
                size={14}
                className={
                  s <= 4 ? 'fill-amber-400 text-amber-400' : 'text-neutral-300'
                }
              />
            ))}
            <span className='text-sm font-medium text-neutral-700 dark:text-neutral-300'>
              4.8
            </span>
            <span className='text-xs text-neutral-400'>
              · 128 reviews · 3,200 sold
            </span>
          </div>

          <div className='flex items-center gap-3'>
            <p className='text-3xl font-bold text-primary-600'>$62.99</p>
            <p className='text-base text-neutral-400 line-through'>$89.99</p>
          </div>

          <div className='flex flex-col gap-2'>
            <p className='text-sm font-semibold text-neutral-700 dark:text-neutral-300'>
              Color
            </p>
            <div className='flex gap-2'>
              {colors.map((color, i) => (
                <button
                  title='select-variant-color'
                  key={i}
                  onClick={() => setSelectedColor(i)}
                  style={{ backgroundColor: color }}
                  className={`w-8 h-8 rounded-full border-2 transition cursor-pointer ${
                    selectedColor === i
                      ? 'border-primary-500 scale-110'
                      : 'border-neutral-200 dark:border-neutral-700'
                  }`}
                />
              ))}
            </div>
          </div>

          <div className='flex flex-col gap-2'>
            <p className='text-sm font-semibold text-neutral-700 dark:text-neutral-300'>
              Size
            </p>
            <div className='flex gap-2 flex-wrap'>
              {sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-4 py-1.5 rounded-lg text-sm font-medium border transition cursor-pointer ${
                    selectedSize === size
                      ? 'bg-primary-500 text-white border-primary-500'
                      : 'bg-white dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border-neutral-200 dark:border-neutral-700 hover:border-primary-500'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div className='flex flex-col gap-2'>
            <p className='text-sm font-semibold text-neutral-700 dark:text-neutral-300'>
              Quantity
            </p>
            <div className='flex items-center gap-3'>
              <button
                title='quantity-minus'
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className='w-8 h-8 rounded-full border border-neutral-200 dark:border-neutral-700 flex items-center justify-center hover:border-primary-500 transition cursor-pointer'
              >
                <Minus
                  size={14}
                  className='text-neutral-700 dark:text-neutral-300'
                />
              </button>
              <span className='text-base font-semibold text-neutral-900 dark:text-neutral-100 w-6 text-center'>
                {quantity}
              </span>
              <button
                title='quantity-plus'
                onClick={() => setQuantity((q) => q + 1)}
                className='w-8 h-8 rounded-full border border-neutral-200 dark:border-neutral-700 flex items-center justify-center hover:border-primary-500 transition cursor-pointer'
              >
                <Plus
                  size={14}
                  className='text-neutral-700 dark:text-neutral-300'
                />
              </button>
            </div>
          </div>

          <div className='flex gap-3 mt-2'>
            <button className='flex-1 py-3 bg-primary-500 hover:bg-primary-600 text-white text-sm font-semibold rounded-full transition cursor-pointer'>
              Buy now
            </button>
            <button className='flex-1 py-3 border-2 border-primary-500 text-primary-500 text-sm font-semibold rounded-full hover:bg-primary-500 hover:text-white transition cursor-pointer flex items-center justify-center gap-2'>
              <ShoppingCart size={16} />
              Add to cart
            </button>
          </div>

          <div className='flex flex-col gap-2 border border-neutral-200 dark:border-neutral-700 rounded-xl p-3'>
            <div className='flex items-center gap-2'>
              <Truck size={16} className='text-primary-500 shrink-0' />
              <span className='text-xs text-neutral-600 dark:text-neutral-400'>
                Free shipping on orders over $20
              </span>
            </div>
            <div className='flex items-center gap-2'>
              <ShieldCheck size={16} className='text-primary-500 shrink-0' />
              <span className='text-xs text-neutral-600 dark:text-neutral-400'>
                Shopmart buyer protection guaranteed
              </span>
            </div>
            <div className='flex items-center gap-2'>
              <RotateCcw size={16} className='text-primary-500 shrink-0' />
              <span className='text-xs text-neutral-600 dark:text-neutral-400'>
                Free returns within 30 days
              </span>
            </div>
          </div>
        </div>
      </div>

      <ProductDetails />

      <div className='flex flex-col gap-5'>
        {threadedComments.map((comment: commentData) => (
          <Comment key={comment.id} comment={comment} />
        ))}
      </div>
    </div>
  );
};

export default SelectedItem;

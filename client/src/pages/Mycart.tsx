import {
  Store,
  Ticket,
  Coins,
  Pencil,
  Trash2,
  ChevronRight,
  Plus,
} from 'lucide-react';
import { useMemo, useState } from 'react';

interface CartItem {
  id: number;
  title: string;
  image: string;
  price: number;
  originalPrice: number;
  discount: number;
}

interface CartStore {
  id: number;
  name: string;
  items: CartItem[];
}

const initialStores: CartStore[] = [
  {
    id: 1,
    name: 'Wear Saka Store',
    items: [
      {
        id: 1,
        title: 'Wear Saka Long Pants',
        image:
          'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200',
        price: 225000,
        originalPrice: 290000,
        discount: 15,
      },
    ],
  },
  {
    id: 2,
    name: 'Casio Official Store',
    items: [
      {
        id: 2,
        title: 'Casio Original F94WA 8D',
        image:
          'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200',
        price: 178000,
        originalPrice: 275000,
        discount: 35,
      },
    ],
  },
];

const formatRp = (n: number) => '₱ ' + n.toLocaleString('id-ID');

const Cart = () => {
  const [stores] = useState<CartStore[]>(initialStores);

  const [selected, setSelected] = useState<{
    itemId: number[];
    storeId: number[];
    quantity: Record<number, number>;
  }>({
    itemId: [],
    storeId: [],
    quantity: {},
  });

  const handleQuantity = (itemId: number, delta: number) => {
    setSelected((prev) => ({
      ...prev,
      quantity: {
        ...prev.quantity,
        [itemId]: Math.max(1, (prev.quantity[itemId] || 1) + delta),
      },
    }));
  };

  // =========================
  // Selected Items
  // =========================

  const selectedItems = useMemo(() => {
    return stores.flatMap((store) =>
      store.items.filter(
        (item) =>
          selected.itemId.includes(item.id) ||
          selected.storeId.includes(store.id)
      )
    );
  }, [selected, stores]);

  // =========================
  // Pricing
  // =========================

  const subTotal = useMemo(() => {
    return selectedItems.reduce(
      (total, item) =>
        total + item.originalPrice * (selected.quantity[item.id] || 1),
      0
    );
  }, [selectedItems, selected.quantity]);

  const totalDiscount = useMemo(() => {
    return selectedItems.reduce(
      (total, item) =>
        total +
        (item.originalPrice - item.price) * (selected.quantity[item.id] || 1),
      0
    );
  }, [selectedItems, selected.quantity]);

  const total = subTotal - totalDiscount;

  // =========================
  // Selection
  // =========================

  const handleFilter = ({
    id,
    type,
  }: {
    id: number | 'all';
    type?: 'itemId' | 'storeId';
  }) => {
    // Select all
    if (id === 'all') {
      const allSelected = selected.storeId.length === stores.length;

      return setSelected({
        storeId: allSelected ? [] : stores.map((store) => store.id),

        itemId: allSelected
          ? []
          : stores.flatMap((store) => store.items.map((item) => item.id)),

        quantity: allSelected
          ? {}
          : stores.reduce(
              (acc, store) => {
                store.items.forEach((item) => {
                  acc[item.id] = 1;
                });

                return acc;
              },
              {} as Record<number, number>
            ),
      });
    }

    // Item selection
    if (type === 'itemId') {
      return setSelected((prev) => {
        const exists = prev.itemId.includes(id);

        return {
          ...prev,

          itemId: exists
            ? prev.itemId.filter((itemId) => itemId !== id)
            : [...prev.itemId, id],

          quantity: {
            ...prev.quantity,
            ...(exists
              ? {}
              : {
                  [id]: 1,
                }),
          },
        };
      });
    }

    // Store selection
    if (type === 'storeId') {
      const store = stores.find((store) => store.id === id);

      if (!store) return;

      setSelected((prev) => {
        const exists = prev.storeId.includes(id);

        const itemIds = store.items.map((item) => item.id);

        const newQuantity = {
          ...prev.quantity,
        };

        if (!exists) {
          itemIds.forEach((itemId) => {
            newQuantity[itemId] = 1;
          });
        }

        return {
          storeId: exists
            ? prev.storeId.filter((storeId) => storeId !== id)
            : [...prev.storeId, id],

          itemId: exists
            ? prev.itemId.filter((itemId) => !itemIds.includes(itemId))
            : [...prev.itemId, ...itemIds],

          quantity: newQuantity,
        };
      });
    }
  };
  return (
    <div className='flex flex-wrap gap-4 p-4 items-start'>
      <div className='flex w-full flex-col gap-3 flex-1'>
        {/* Select all */}
        <div className='flex items-center gap-3 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 px-4 py-3'>
          <input
            type='checkbox'
            className='accent-primary-500 w-3.5 h-3.5'
            checked={selected.storeId.length === stores.length}
            onChange={() => handleFilter({ id: 'all' })}
          />

          <span className='text-sm font-medium text-neutral-900 dark:text-neutral-100'>
            All Products
          </span>
        </div>

        {/* Stores */}
        {stores.map((store) => (
          <div
            key={store.id}
            className='bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700'
          >
            {/* Store header */}
            <div className='flex items-center gap-2 px-4 py-3 border-b border-neutral-200 dark:border-neutral-700'>
              <input
                type='checkbox'
                checked={selected.storeId.includes(store.id)}
                onChange={() =>
                  handleFilter({
                    id: store.id,
                    type: 'storeId',
                  })
                }
                className='accent-primary-500 w-3.5 h-3.5'
              />

              <Store size={14} className='text-primary-500' />

              <span className='text-sm font-medium text-neutral-900 dark:text-neutral-100'>
                {store.name}
              </span>

              <button className='ml-auto flex items-center gap-1 text-xs text-primary-500 cursor-pointer hover:underline'>
                <Plus size={11} />
                Add combo
              </button>
            </div>

            {/* Items */}
            {store.items.map((item) => (
              <div
                key={item.id}
                className='flex items-center gap-3 px-4 py-3 border-b border-neutral-200 dark:border-neutral-700 last:border-b-0'
              >
                <input
                  type='checkbox'
                  className='accent-primary-500 w-3.5 h-3.5 shrink-0'
                  checked={
                    selected.itemId.includes(item.id) ||
                    selected.storeId.includes(store.id)
                  }
                  onChange={() =>
                    handleFilter({
                      id: item.id,
                      type: 'itemId',
                    })
                  }
                />

                <img
                  src={item.image}
                  alt={item.title}
                  className='w-16 h-16 object-cover border border-neutral-200 dark:border-neutral-700 shrink-0'
                />

                <div className='flex flex-col gap-1 flex-1 min-w-0'>
                  <p className='text-sm text-neutral-900 dark:text-neutral-100 line-clamp-2 leading-snug'>
                    {item.title}
                  </p>

                  <div className='flex items-center gap-2'>
                    <span className='text-[10px] font-semibold bg-secondary-500/10 text-secondary-500 px-1.5 py-0.5'>
                      {item.discount}%
                    </span>

                    <span className='text-xs text-neutral-400 line-through'>
                      {formatRp(item.originalPrice)}
                    </span>
                  </div>

                  <p className='text-sm font-semibold text-primary-600 dark:text-primary-400'>
                    {formatRp(item.price)}
                  </p>
                </div>

                {/* Quantity */}
                <div className='flex items-center gap-1'>
                  <button
                    onClick={() => handleQuantity(item.id, -1)}
                    className='w-6 h-6 border border-neutral-200 dark:border-neutral-700 flex items-center justify-center text-neutral-700 dark:text-neutral-300 hover:border-primary-500 transition cursor-pointer text-sm'
                  >
                    −
                  </button>

                  <span className='text-xs w-5 text-center text-neutral-900 dark:text-neutral-100'>
                    {selected.quantity[item.id] || 1}
                  </span>

                  <button
                    onClick={() => handleQuantity(item.id, 1)}
                    className='w-6 h-6 border border-neutral-200 dark:border-neutral-700 flex items-center justify-center text-neutral-700 dark:text-neutral-300 hover:border-primary-500 transition cursor-pointer text-sm'
                  >
                    +
                  </button>
                </div>

                {/* Actions */}
                <div className='flex gap-2 ml-2'>
                  <button className='text-neutral-400 hover:text-primary-500 transition cursor-pointer'>
                    <Pencil size={14} />
                  </button>

                  <button className='text-neutral-400 hover:text-secondary-500 transition cursor-pointer'>
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Summary */}
      <div className='w-full md:w-56 shrink-0 flex-col gap-3'>
        <div className='bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 p-4 flex flex-col gap-3'>
          <p className='text-xs font-semibold text-neutral-900 dark:text-neutral-100'>
            Voucher &amp; Promo
          </p>

          <div className='flex items-center justify-between border border-neutral-200 dark:border-neutral-700 px-3 py-2 cursor-pointer hover:border-primary-500 transition'>
            <div className='flex items-center gap-2'>
              <Ticket size={14} className='text-primary-500' />

              <span className='text-xs text-primary-500'>
                2 vouchers available
              </span>
            </div>

            <ChevronRight size={13} className='text-neutral-400' />
          </div>
        </div>

        <div className='bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 p-4 flex flex-col gap-3'>
          <p className='text-xs font-semibold text-neutral-900 dark:text-neutral-100'>
            Shopmart Coins
          </p>

          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-2'>
              <Coins size={15} className='text-warning-500' />

              <span className='text-sm text-neutral-900 dark:text-neutral-100'>
                {formatRp(45000)}
              </span>
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className='bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 p-4 flex flex-col gap-2'>
          <p className='text-xs font-semibold text-neutral-900 dark:text-neutral-100 mb-1'>
            Order Summary
          </p>

          <div className='flex justify-between text-xs text-neutral-500 dark:text-neutral-400'>
            <span>Subtotal ({selectedItems.length} items)</span>

            <span className='text-neutral-900 dark:text-neutral-100'>
              {formatRp(subTotal)}
            </span>
          </div>

          <div className='flex justify-between text-xs text-neutral-500 dark:text-neutral-400'>
            <span>Total Discount</span>

            <span className='text-secondary-500'>
              − {formatRp(totalDiscount)}
            </span>
          </div>

          <hr className='border-neutral-200 dark:border-neutral-700 my-1' />

          <div className='flex justify-between items-center'>
            <span className='text-sm font-semibold text-neutral-900 dark:text-neutral-100'>
              Total
            </span>

            <span className='text-base font-bold text-primary-600 dark:text-primary-400'>
              {formatRp(total)}
            </span>
          </div>

          <button className='mt-2 w-full py-2.5 bg-primary-500 hover:bg-primary-600 text-white text-sm font-medium transition cursor-pointer'>
            Checkout ({selectedItems.length})
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;

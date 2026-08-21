import { useState } from 'react';
import { MapPin, Pencil, Trash2, X, Plus } from 'lucide-react';

const addresses = [
  {
    id: 1,
    name: 'Jerald Estrella',
    label: 'Home',
    address:
      'Duplex Bukid Duplex Homes, Esguerra Compound, Molino IV, Bacoor, Cavite, South Luzon, 4103',
    phone: '+639123456789',
    isDefault: true,
  },
  {
    id: 2,
    name: 'Jerald Estrella',
    label: 'Work',
    address:
      'Cavite State University - Imus Campus, Palico IV, Imus, Cavite, 4103',
    phone: '+639876543210',
    isDefault: false,
  },
  {
    id: 3,
    name: 'Maria Estrella',
    label: 'Parents House',
    address: 'Block 12 Lot 8 Sampaguita Street, Dasmarinas, Cavite, 4114',
    phone: '+639556677889',
    isDefault: false,
  },
  {
    id: 4,
    name: 'Maria Estrella',
    label: 'Parents House',
    address: 'Block 12 Lot 8 Sampaguita Street, Dasmarinas, Cavite, 4114',
    phone: '+639556677889',
    isDefault: false,
  },
  {
    id: 5,
    name: 'Maria Estrella',
    label: 'Parents House',
    address: 'Block 12 Lot 8 Sampaguita Street, Dasmarinas, Cavite, 4114',
    phone: '+639556677889',
    isDefault: false,
  },
];

const inputCls =
  'w-full border border-neutral-200 dark:border-neutral-700 bg-neutral-100 dark:bg-neutral-900 p-2 text-sm text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-primary-500 transition';

const Address = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className='ml-1 h-full flex-1 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 p-6 flex flex-col gap-5'>
      {/* Header */}
      <div className='flex justify-between items-start border-b border-neutral-200 dark:border-neutral-700 pb-4'>
        <div>
          <p className='text-base font-semibold text-neutral-900 dark:text-neutral-100'>
            My Address
          </p>
          <p className='text-xs text-neutral-400 mt-0.5'>
            Manage your saved addresses
          </p>
        </div>

        <button
          onClick={() => setOpen(true)}
          className='flex items-center gap-1.5 bg-primary-500 hover:bg-primary-600 px-4 py-2 text-xs font-medium text-white cursor-pointer transition'
        >
          <Plus size={13} />
          Add address
        </button>
      </div>

      {/* Address list */}
      <div className='flex-1 min-h-0 flex flex-col gap-0 overflow-y-auto'>
        {addresses.map((address) => (
          <div
            key={address.id}
            className='flex items-start justify-between gap-4 py-4 border-b border-neutral-200 dark:border-neutral-700 last:border-b-0'
          >
            {/* Icon */}
            <div className='pt-0.5 shrink-0'>
              <MapPin size={15} className='text-primary-500' />
            </div>

            {/* Info */}
            <div className='flex flex-col gap-1 flex-1'>
              <div className='flex items-center gap-2'>
                <span className='text-xs font-semibold text-neutral-900 dark:text-neutral-100'>
                  {address.name}
                </span>
                <span className='text-[10px] border border-neutral-300 dark:border-neutral-600 text-neutral-500 dark:text-neutral-400 px-1.5 py-0.5'>
                  {address.label}
                </span>
                {address.isDefault && (
                  <span className='text-[10px] border border-primary-500 text-primary-500 px-1.5 py-0.5'>
                    Default
                  </span>
                )}
              </div>
              <p className='text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed'>
                {address.address}
              </p>
              <p className='text-xs text-neutral-500 dark:text-neutral-400'>
                {address.phone}
              </p>
            </div>

            {/* Actions */}
            <div className='flex flex-col items-end gap-2 shrink-0'>
              <div className='flex items-center gap-3'>
                <button className='flex items-center gap-1 text-xs text-blue-500 hover:text-blue-700 dark:text-blue-400 cursor-pointer transition'>
                  <Pencil size={12} /> Edit
                </button>
                <div className='w-px h-3 bg-neutral-300 dark:bg-neutral-600' />
                <button className='flex items-center gap-1 text-xs text-secondary-500 hover:text-secondary-600 cursor-pointer transition'>
                  <Trash2 size={12} /> Delete
                </button>
              </div>
              {!address.isDefault && (
                <button className='text-xs text-neutral-600 dark:text-neutral-300 px-2 py-1 border border-neutral-300 dark:border-neutral-600 hover:border-primary-500 hover:text-primary-500 cursor-pointer transition'>
                  Set default
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Add Address Modal */}
      {open && (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50'>
          <div className='w-full max-w-md bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 p-6 flex flex-col gap-5'>
            {/* Modal header */}
            <div className='flex items-center justify-between'>
              <p className='text-base font-semibold text-neutral-900 dark:text-neutral-100'>
                Add Address
              </p>
              <button
                onClick={() => setOpen(false)}
                className='text-neutral-400 hover:text-secondary-500 transition cursor-pointer'
              >
                <X size={18} />
              </button>
            </div>

            <hr className='border-neutral-200 dark:border-neutral-700' />

            {/* Form */}
            <div className='flex flex-col gap-3'>
              <div className='flex flex-col gap-1'>
                <label className='text-xs text-neutral-500 dark:text-neutral-400'>
                  Full Name
                </label>
                <input
                  placeholder='e.g. Jerald Estrella'
                  className={inputCls}
                />
              </div>

              <div className='flex flex-col gap-1'>
                <label className='text-xs text-neutral-500 dark:text-neutral-400'>
                  Phone Number
                </label>
                <input
                  placeholder='e.g. +63 912 345 6789'
                  className={inputCls}
                />
              </div>

              <div className='flex flex-col gap-1'>
                <label className='text-xs text-neutral-500 dark:text-neutral-400'>
                  Complete Address
                </label>
                <textarea
                  rows={3}
                  placeholder='Street, Barangay, City, Province, ZIP'
                  className={inputCls}
                />
              </div>

              <label className='flex items-center gap-2 text-xs text-neutral-500 dark:text-neutral-400 cursor-pointer'>
                <input
                  type='checkbox'
                  className='accent-primary-500 w-3.5 h-3.5'
                />
                Set as default address
              </label>

              <hr className='border-neutral-200 dark:border-neutral-700' />

              <div className='flex gap-2'>
                <button
                  onClick={() => setOpen(false)}
                  className='flex-1 py-2 border border-neutral-200 dark:border-neutral-700 text-sm text-neutral-600 dark:text-neutral-300 hover:border-primary-500 hover:text-primary-500 transition cursor-pointer'
                >
                  Cancel
                </button>
                <button className='flex-1 py-2 bg-primary-500 hover:bg-primary-600 text-white text-sm font-medium transition cursor-pointer'>
                  Save Address
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Address;

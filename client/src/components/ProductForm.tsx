import { X, Upload, Plus, Trash2, ChevronDown, ChevronUp } from 'lucide-react';
import { useState, type ChangeEvent } from 'react';
import { toast } from 'sonner';

type Status = 'active' | 'low-stock' | 'unlisted';

type Variant = {
  color: string;
  size: string;
  price: number | '';
};

type ProductFormProps = {
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const defaultVariant: Variant = {
  color: '',
  size: '',
  price: '',
};

const ProductForm = ({ setModal }: ProductFormProps) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState<number | ''>('');
  const [stock, setStock] = useState<number | ''>('');
  const [discount, setDiscount] = useState<number | ''>('');
  const [status, setStatus] = useState<Status>('unlisted');
  const [images, setImages] = useState<File[]>([]);
  const [variants, setVariants] = useState<Variant[]>([]);
  const [showVariants, setShowVariants] = useState(false);

  const handlePreview = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const fileArray = Array.from(e.target.files);
    if (images.length + fileArray.length > 5) {
      toast.error('You can upload a maximum of 5 images.');
      return;
    }
    const invalidFile = fileArray.find((file) => file.size > 5 * 1024 * 1024);
    if (invalidFile) {
      toast.error('Each image must be less than 5MB.');
      return;
    }
    setImages((prev) => [...prev, ...fileArray]);
  };

  const handleRemoveImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const addVariant = () => {
    if (variants.length >= 10) {
      toast.error('Maximum of 10 variants for products');
      return;
    }
    setShowVariants(true);
    setVariants((prev) => [...prev, defaultVariant]);
  };

  const removeVariant = (index: number) => {
    setVariants((prev) => prev.filter((_, i) => i !== index));
  };

  const updateVariant = (
    index: number,
    field: keyof Variant,
    value: string
  ) => {
    setVariants((prev) =>
      prev.map((v, i) =>
        index === i
          ? {
              ...v,
              [field]:
                field === 'price' ? (value === '' ? '' : Number(value)) : value,
            }
          : v
      )
    );
  };

  const handleToggleVariants = () => {
    if (showVariants) {
      setVariants([]);
    }
    setShowVariants((prev) => !prev);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!name.trim()) return toast.error('Please enter a product name.');
    if (!category) return toast.error('Please select a category.');
    if (!description.trim()) return toast.error('Please enter a description.');
    if (price === '' || price < 0)
      return toast.error('Please enter a valid price.');
    if (stock === '' || stock < 0)
      return toast.error('Please enter a valid stock.');
    if (images.length === 0)
      return toast.error('Please upload at least one image.');

    if (showVariants) {
      const invalidVariant = variants.find(
        (v) => !v.color.trim() || !v.size.trim() || v.price === ''
      );
      if (invalidVariant) {
        toast.error('Please fill in all variant fields.');
        return;
      }
    }

    const formData = new FormData();
    formData.append('categoryId', category);
    formData.append('name', name);
    formData.append('description', description);
    formData.append('price', String(price));
    formData.append('status', status);
    formData.append('stock', String(stock));
    formData.append('discount', String(discount === '' ? 0 : discount));

    if (showVariants) {
      formData.append('variants', JSON.stringify(variants));
    }

    images.forEach((img) => formData.append('images', img));

    console.log('Submitting:', {
      categoryId: category,
      name,
      description,
      price,
      status,
      stock,
      discount: discount === '' ? 0 : discount,
      variants: showVariants ? variants : [],
    });

    toast.success('Product ready to be added.');
  };

  const inputCls =
    'text-xs px-2.5 py-2 border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 outline-none focus:border-primary-500 transition w-full';

  const labelCls = 'text-xs text-neutral-500 dark:text-neutral-400 font-medium';

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-neutral-900/40 p-4'>
      <div className='w-full max-w-lg bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 max-h-[90vh] overflow-y-auto'>
        {/* Header */}
        <div className='flex items-center justify-between p-4 border-b border-neutral-200 dark:border-neutral-700 sticky top-0 bg-white dark:bg-neutral-800 z-10'>
          <div>
            <p className='text-sm font-semibold text-neutral-900 dark:text-neutral-100'>
              Add Product
            </p>
            <p className='text-xs text-neutral-400'>
              Fill in the details to list a new product
            </p>
          </div>
          <button
            type='button'
            onClick={() => setModal(false)}
            className='p-1 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200 transition cursor-pointer'
          >
            <X size={16} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className='flex flex-col gap-4 p-4'>
          {/* Image Upload */}
          <div className='flex items-start gap-3'>
            <label className='w-16 h-16 shrink-0 flex items-center justify-center border border-dashed border-neutral-300 dark:border-neutral-600 text-neutral-400 cursor-pointer hover:border-primary-500 hover:text-primary-500 transition'>
              <Upload size={16} />
              <input
                onChange={handlePreview}
                type='file'
                accept='image/png,image/jpeg,image/jpg'
                multiple
                className='hidden'
              />
            </label>
            <div className='flex flex-col gap-2'>
              <div>
                <p className='text-xs text-neutral-600 dark:text-neutral-300 font-medium'>
                  Product images
                </p>
                <p className='text-[10px] text-neutral-400'>
                  PNG or JPG · max 5MB · up to 5 images
                </p>
              </div>
              <div className='flex flex-row gap-1 flex-wrap'>
                {images.map((img, index) => (
                  <div
                    key={`${img.name}-${index}`}
                    className='relative w-15 h-15'
                  >
                    <img
                      className='w-full h-full object-cover border border-neutral-200 dark:border-neutral-700'
                      src={URL.createObjectURL(img)}
                      alt={img.name}
                    />
                    <button
                      type='button'
                      onClick={() => handleRemoveImage(index)}
                      className='absolute -top-1.5 -right-1.5 w-4 h-4 flex items-center justify-center bg-red-500 text-white rounded-full cursor-pointer'
                    >
                      <X size={10} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Name */}
          <div className='flex flex-col gap-1'>
            <label className={labelCls}>
              Product name <span className='text-secondary-500'>*</span>
            </label>
            <input
              type='text'
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder='e.g. Wireless Mouse'
              className={inputCls}
            />
          </div>

          {/* Description */}
          <div className='flex flex-col gap-1'>
            <label className={labelCls}>
              Description <span className='text-secondary-500'>*</span>
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder='Describe your product — material, features, dimensions...'
              rows={3}
              className={`${inputCls} resize-none`}
            />
          </div>

          {/* Category */}
          <div className='flex flex-col gap-1'>
            <label className={labelCls}>
              Category <span className='text-secondary-500'>*</span>
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className={inputCls}
            >
              <option value=''>Select category</option>
              <option value='1'>Electronics</option>
              <option value='2'>Clothing</option>
              <option value='3'>Shoes</option>
              <option value='4'>Accessories</option>
              <option value='5'>Home</option>
            </select>
          </div>

          {/* Price + Stock */}
          <div className='flex gap-3'>
            <div className='flex-1 flex flex-col gap-1'>
              <label className={labelCls}>
                Price (₱) <span className='text-secondary-500'>*</span>
              </label>
              <input
                type='number'
                min='0'
                step='0.01'
                value={price}
                onChange={(e) =>
                  setPrice(e.target.value === '' ? '' : Number(e.target.value))
                }
                placeholder='0.00'
                className={inputCls}
              />
            </div>
            <div className='flex-1 flex flex-col gap-1'>
              <label className={labelCls}>
                Stock <span className='text-secondary-500'>*</span>
              </label>
              <input
                type='number'
                min='0'
                value={stock}
                onChange={(e) =>
                  setStock(e.target.value === '' ? '' : Number(e.target.value))
                }
                placeholder='0'
                className={inputCls}
              />
            </div>
          </div>

          {/* Discount */}
          <div className='flex flex-col gap-1'>
            <label className={labelCls}>Discount (%)</label>
            <input
              type='number'
              min='0'
              max='100'
              step='1'
              value={discount}
              onChange={(e) =>
                setDiscount(e.target.value === '' ? '' : Number(e.target.value))
              }
              placeholder='0'
              className={inputCls}
            />
          </div>

          {/* Variants */}
          <div className='flex flex-col gap-2 border border-neutral-200 dark:border-neutral-700'>
            {/* Toggle header */}
            <button
              type='button'
              onClick={handleToggleVariants}
              className='flex items-center justify-between w-full px-3 py-2.5 text-xs font-medium text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-900 transition cursor-pointer'
            >
              <div className='flex items-center gap-2'>
                <span>Variants</span>
                <span className='text-[10px] text-neutral-400 font-normal'>
                  {showVariants
                    ? `${variants.length} added`
                    : 'optional — color, size, price per variant'}
                </span>
              </div>
              {showVariants ? (
                <ChevronUp size={14} className='text-neutral-400' />
              ) : (
                <ChevronDown size={14} className='text-neutral-400' />
              )}
            </button>

            {/* Variant inputs */}
            {showVariants && (
              <div className='flex flex-col gap-2 px-3 pb-3'>
                {variants.length > 0 && (
                  <div className='grid grid-cols-[1fr_1fr_80px_28px] gap-1.5 text-[10px] font-semibold text-neutral-400'>
                    <span>Color</span>
                    <span>Size</span>
                    <span>Price (₱)</span>
                    <span></span>
                  </div>
                )}

                {variants.map((v, i) => (
                  <div
                    key={i}
                    className='grid grid-cols-[1fr_1fr_80px_28px] gap-1.5 items-center'
                  >
                    <input
                      type='text'
                      value={v.color}
                      onChange={(e) =>
                        updateVariant(i, 'color', e.target.value)
                      }
                      placeholder='e.g. Black'
                      className={inputCls}
                    />
                    <input
                      type='text'
                      value={v.size}
                      onChange={(e) => updateVariant(i, 'size', e.target.value)}
                      placeholder='e.g. M'
                      className={inputCls}
                    />
                    <input
                      type='number'
                      min='0'
                      step='0.01'
                      value={v.price}
                      onChange={(e) =>
                        updateVariant(i, 'price', e.target.value)
                      }
                      placeholder='0.00'
                      className={inputCls}
                    />
                    <button
                      type='button'
                      onClick={() => removeVariant(i)}
                      className='w-7 h-7 flex items-center justify-center border border-neutral-200 dark:border-neutral-700 text-neutral-400 hover:border-secondary-500 hover:text-secondary-500 transition cursor-pointer'
                    >
                      <Trash2 size={12} />
                    </button>
                  </div>
                ))}

                <button
                  type='button'
                  onClick={addVariant}
                  className='flex items-center gap-1 text-xs text-primary-500 border border-dashed border-primary-500 px-2 py-1.5 hover:bg-primary-500 hover:text-white transition cursor-pointer w-fit mt-1'
                >
                  <Plus size={11} /> Add row
                </button>
              </div>
            )}
          </div>

          {/* Status */}
          <div className='flex flex-col gap-1'>
            <label className={labelCls}>Status</label>
            <div className='flex gap-2'>
              {(['active', 'low-stock', 'unlisted'] as Status[]).map((s) => (
                <button
                  key={s}
                  type='button'
                  onClick={() => setStatus(s)}
                  className={`flex-1 text-xs px-2.5 py-1.5 border transition cursor-pointer capitalize ${
                    status === s
                      ? 'bg-primary-500 border-primary-500 text-white'
                      : 'border-neutral-200 dark:border-neutral-700 text-neutral-600 dark:text-neutral-300 hover:border-primary-500 hover:text-primary-500'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className='flex justify-end gap-2 pt-2 border-t border-neutral-200 dark:border-neutral-700 mt-1'>
            <button
              type='button'
              onClick={() => setModal(false)}
              className='text-xs px-3.5 py-2 border border-neutral-200 dark:border-neutral-700 text-neutral-600 dark:text-neutral-300 hover:border-primary-500 hover:text-primary-500 transition cursor-pointer'
            >
              Cancel
            </button>
            <button
              type='submit'
              className='text-xs px-3.5 py-2 bg-primary-500 hover:bg-primary-600 text-white transition cursor-pointer'
            >
              Add Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductForm;

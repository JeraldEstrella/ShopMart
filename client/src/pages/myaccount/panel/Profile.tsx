import { useState, useRef } from 'react';
import { Camera, Eye, EyeOff, Info } from 'lucide-react';
import CheckNumber from '../../../utils/checkNumber';
import type { UserData } from '../../../types/user.types';

const exampleUserData: UserData = {
  id: '1',
  username: 'jerald',
  email: 'jerald@example.com',
  phone: '09394932703',
  avatar: undefined,
  gender: 'male',
  dob: '2003-05-20',
};

const Profile = () => {
  const [user, setUser] = useState<UserData>(exampleUserData);
  const [showEmail, setShowEmail] = useState(false);
  const [showNumber, setShowNumber] = useState(false);
  const [editEmail, setEditEmail] = useState(false);
  const [editPhone, setEditPhone] = useState(false);
  const [editDob, setEditDob] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const maskedEmail = user.email
    ? user.email.slice(0, 2) +
      '*'.repeat(Math.max(user.email.split('@')[0].length - 3, 1)) +
      '@' +
      user.email.split('@')[1]
    : '';

  const phoneNumber = CheckNumber(user.phone);
  const maskedPhone =
    phoneNumber.slice(0, 3) + ' ' + '*'.repeat(phoneNumber.slice(3).length);

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUser((prev) => ({ ...prev, avatar: URL.createObjectURL(file) }));
  };

  const handleSave = () => {
    setEditEmail(false);
    setEditPhone(false);
    setEditDob(false);
  };

  const inputCls =
    'w-full px-3 py-2 bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-sm text-neutral-700 dark:text-neutral-300 focus:outline-none focus:ring-2 focus:ring-primary-500 transition';

  const labelCls =
    'text-xs text-neutral-500 dark:text-neutral-400 text-right pt-2';

  return (
    <div className='flex flex-col flex-1 h-full'>
      <div className='flex flex-col md:flex-row  p-1 h-full'>
        {/* FORM */}
        <div className='flex-1 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 p-6 flex flex-col gap-5'>
          {/* Header */}
          <div>
            <p className='text-base font-semibold text-neutral-900 dark:text-neutral-100'>
              My Profile
            </p>
            <p className='text-xs text-neutral-400 mt-0.5'>
              Manage and protect your account
            </p>
          </div>

          <hr className='border-neutral-200 dark:border-neutral-700' />

          {/* Username */}
          <div className='grid grid-cols-[110px_1fr] items-center gap-4'>
            <label className={labelCls}>Username</label>
            <input
              value={user.username}
              onChange={(e) =>
                setUser((prev) => ({ ...prev, username: e.target.value }))
              }
              className={inputCls}
            />
          </div>

          {/* Email */}
          <div className='grid grid-cols-[110px_1fr] items-center gap-4'>
            <label className={labelCls}>Email</label>
            <div className='flex items-center gap-2'>
              {editEmail ? (
                <input
                  value={user.email}
                  onChange={(e) =>
                    setUser((prev) => ({ ...prev, email: e.target.value }))
                  }
                  className={inputCls}
                />
              ) : (
                <span className='text-sm text-neutral-700 dark:text-neutral-300 tracking-wide'>
                  {showEmail ? user.email : maskedEmail}
                </span>
              )}
              {!editEmail && (
                <button
                  title='show email'
                  onClick={() => setShowEmail((prev) => !prev)}
                  className='text-neutral-400 hover:text-primary-500 transition cursor-pointer'
                >
                  {showEmail ? <EyeOff size={14} /> : <Eye size={14} />}
                </button>
              )}
              <button
                onClick={() => setEditEmail((prev) => !prev)}
                className='text-xs text-primary-500 font-medium hover:underline cursor-pointer shrink-0'
              >
                {editEmail ? 'Done' : 'Change'}
              </button>
            </div>
          </div>

          {/* Phone */}
          <div className='grid grid-cols-[110px_1fr] items-center gap-4'>
            <label className={labelCls}>Phone</label>
            <div className='flex items-center gap-2'>
              {editPhone ? (
                <input
                  value={user.phone}
                  onChange={(e) =>
                    setUser((prev) => ({ ...prev, phone: e.target.value }))
                  }
                  className={inputCls}
                />
              ) : (
                <span className='text-sm text-neutral-700 dark:text-neutral-300 tracking-wide'>
                  {showNumber ? user.phone : maskedPhone}
                </span>
              )}
              {!editPhone && (
                <button
                  title='show phone'
                  onClick={() => setShowNumber((prev) => !prev)}
                  className='text-neutral-400 hover:text-primary-500 transition cursor-pointer'
                >
                  {showNumber ? <EyeOff size={14} /> : <Eye size={14} />}
                </button>
              )}
              <button
                onClick={() => setEditPhone((prev) => !prev)}
                className='text-xs text-primary-500 font-medium hover:underline cursor-pointer shrink-0'
              >
                {editPhone ? 'Done' : 'Change'}
              </button>
            </div>
          </div>

          {/* Gender */}
          <div className='grid grid-cols-[110px_1fr] items-center gap-4'>
            <label className={labelCls}>Gender</label>
            <div className='flex gap-4'>
              {['male', 'female', 'other'].map((gender) => (
                <label
                  key={gender}
                  className='flex items-center gap-1.5 text-sm text-neutral-700 dark:text-neutral-300 cursor-pointer'
                >
                  <input
                    type='radio'
                    name='gender'
                    checked={user.gender === gender}
                    onChange={() => setUser((prev) => ({ ...prev, gender }))}
                    className='accent-primary-500'
                  />
                  {gender.charAt(0).toUpperCase() + gender.slice(1)}
                </label>
              ))}
            </div>
          </div>

          {/* DOB */}
          <div className='grid grid-cols-[110px_1fr] items-center gap-4'>
            <label className={labelCls}>Date of birth</label>
            <div className='flex items-center gap-2'>
              {editDob ? (
                <input
                  type='date'
                  value={user.dob}
                  onChange={(e) =>
                    setUser((prev) => ({ ...prev, dob: e.target.value }))
                  }
                  className={inputCls}
                  style={{ width: 'auto' }}
                />
              ) : (
                <span className='text-sm text-neutral-700 dark:text-neutral-300'>
                  {user.dob ?? '**/**/****'}
                </span>
              )}
              <button
                onClick={() => setEditDob((prev) => !prev)}
                className='text-xs text-primary-500 font-medium hover:underline cursor-pointer shrink-0'
              >
                {editDob ? 'Done' : 'Change'}
              </button>
            </div>
          </div>

          <hr className='border-neutral-200 dark:border-neutral-700' />

          {/* Save */}
          <button
            onClick={handleSave}
            className='w-fit px-6 py-2 bg-primary-500 hover:bg-primary-600 text-white text-sm font-medium transition cursor-pointer'
          >
            Save changes
          </button>
        </div>

        {/* AVATAR */}
        <div className='w-full md:w-48 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 p-5 flex flex-col items-center gap-4'>
          <p className='text-xs font-medium text-neutral-700 dark:text-neutral-300 self-start'>
            Profile Photo
          </p>

          <div className='relative'>
            <div className='w-24 h-24 rounded-full bg-neutral-100 dark:bg-neutral-700 border-2 border-primary-500 overflow-hidden flex items-center justify-center'>
              {user.avatar ? (
                <img
                  src={user.avatar}
                  alt='avatar'
                  className='w-full h-full object-cover'
                />
              ) : (
                <Camera
                  size={32}
                  className='text-neutral-300 dark:text-neutral-600'
                />
              )}
            </div>
            <button
              title='change avatar'
              onClick={() => fileRef.current?.click()}
              className='absolute inset-0 rounded-full bg-black/30 flex items-center justify-center opacity-0 hover:opacity-100 transition cursor-pointer'
            >
              <Camera size={20} className='text-white' />
            </button>
          </div>

          <input
            ref={fileRef}
            type='file'
            hidden
            accept='.png,.jpg,.jpeg'
            onChange={handleImage}
          />

          <button
            onClick={() => fileRef.current?.click()}
            className='w-full py-1.5 border border-neutral-200 dark:border-neutral-700 text-xs text-neutral-700 dark:text-neutral-300 hover:border-primary-500 hover:text-primary-500 transition cursor-pointer'
          >
            Select Image
          </button>

          <hr className='border-neutral-200 dark:border-neutral-700 w-full' />

          <div className='w-full flex flex-col gap-1.5'>
            <p className='text-[11px] text-neutral-400 flex items-center gap-1.5'>
              <Info size={11} /> Max size: 1 MB
            </p>
            <p className='text-[11px] text-neutral-400 flex items-center gap-1.5'>
              <Info size={11} /> .JPEG, .PNG only
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

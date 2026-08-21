import { ShoppingCart, Search, UserCircle, Moon, Sun } from 'lucide-react';
import { useState } from 'react';
import UserAvatar from './UserAvatar';
import { useNavigate, Link } from 'react-router-dom';
import type { UserData } from '../types/user.types';
import { useAuth } from '../context/AuthContext';

const exampleUserData: UserData = {
  id: '1',
  username: 'jerald',
  email: 'jerald@example.com',
  phone: '09394932703',
  avatar: undefined,
  gender: 'male',
  dob: '2003-05-20',
};

export default function Navbar() {
  const { isDarkmode, setDarkMode } = useAuth();
  const [searching, setSearching] = useState(false);
  const navigate = useNavigate();

  return (
    <div className='flex items-center gap-3 px-4 py-3 bg-neutral-50 dark:bg-gray-900 border-b border-neutral-200 dark:border-neutral-800 shadow-sm'>
      <p
        className={`${searching ? 'hidden' : 'flex'} text-primary-600 font-bold text-xl whitespace-nowrap tracking-tight`}
      >
        <Link to={'/'}>Shopmart</Link>
      </p>

      <div className='flex-1 relative'>
        <Search
          className='absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500 pointer-events-none'
          size={16}
        />
        <input
          title='search-bar'
          onFocus={() => setSearching(true)}
          onBlur={() => setSearching(false)}
          type='text'
          placeholder='Search products, brands and shops...'
          className='w-full pl-9 pr-4 py-2 bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-sm text-neutral-700 dark:text-neutral-100 placeholder:text-neutral-500 dark:placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition'
        />
      </div>

      <div className={`${searching ? 'hidden' : 'flex'} items-center gap-2`}>
        {/* Dark mode toggle */}
        <button
          title='toggle-theme'
          onClick={() => setDarkMode((prev) => !prev)}
          className='p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 transition cursor-pointer'
        >
          {isDarkmode ? (
            <Sun size={20} className='text-primary-500' />
          ) : (
            <Moon size={20} className='text-neutral-700' />
          )}
        </button>

        <Link
          to={'/my-cart'}
          title='cart'
          className='relative p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 transition cursor-pointer'
        >
          <ShoppingCart
            size={20}
            className='text-neutral-700 dark:text-neutral-200'
          />
          <span className='absolute top-0.5 right-0.5 w-4 h-4 flex items-center justify-center rounded-full bg-primary-500 text-white text-[10px] font-semibold'>
            3
          </span>
        </Link>

        <button
          title='user-settings'
          onClick={() => navigate('/account')}
          className='p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 transition cursor-pointer'
        >
          {exampleUserData ? (
            <UserAvatar
              avatar={exampleUserData.avatar}
              username={exampleUserData.email}
            />
          ) : (
            <UserCircle
              size={20}
              className='text-neutral-700 dark:text-neutral-200'
            />
          )}
        </button>
      </div>
    </div>
  );
}

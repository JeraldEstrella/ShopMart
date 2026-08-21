import { Link } from 'react-router-dom';
import { ShieldCheck, Mail } from 'lucide-react';
import Loading from '../../../components/Loading';
import { useState } from 'react';

const Changepassword = () => {
  const [isLoading, setLoading] = useState(true);
  setInterval(() => {
    setLoading(false);
  }, 5000);

  return (
    <div className='relative h-full overflow-auto w-full flex flex-col items-center px-4 py-16 bg-neutral-50 dark:bg-neutral-950 scrollbar-thin scrollbar-track-neutral-200 dark:scrollbar-track-neutral-800 scrollbar-thumb-neutral-400 dark:scrollbar-thumb-neutral-600 hover:scrollbar-thumb-neutral-500 dark:hover:scrollbar-thumb-neutral-500'>
      {isLoading ? (
        <div className='flex flex-col gap-2 items-center absolute m-auto self-center top-35'>
          <Loading
            children={<ShieldCheck size={100} className='text-primary-500' />}
            size={200}
          />
          <p className='text-neutral-600'>Verifying your account...</p>
        </div>
      ) : (
        <div className='w-full max-w-md'>
          <div className='bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-sm px-8 py-10 flex flex-col items-center text-center'>
            <div className='w-16 h-16 flex items-center justify-center bg-primary-500/10 mb-6'>
              <ShieldCheck
                size={36}
                strokeWidth={2}
                className='text-primary-500'
              />
            </div>

            <p className='text-sm leading-relaxed text-neutral-700 dark:text-neutral-300 max-w-xs'>
              To protect your account security, please verify your identity with
              one of the methods below.
            </p>

            <button
              type='button'
              className='mt-8 w-full flex items-center justify-center gap-3 px-4 py-3 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 text-sm font-medium text-neutral-700 dark:text-neutral-300 hover:border-primary-500 hover:text-primary-500 transition cursor-pointer'
            >
              <Mail size={18} className='text-neutral-400' />
              Verify by Email Link
            </button>
          </div>

          <div className='mt-10 space-y-6'>
            <div className='text-sm'>
              <p className='text-neutral-700 dark:text-neutral-300'>
                <span className='font-medium'>Q:</span> Why am I asked to verify
                my account?
              </p>
              <p className='mt-1 text-neutral-500 dark:text-neutral-400'>
                <span className='font-medium'>A:</span> Your account security is
                important to us. Shopee asks for additional verification to let
                no one but you into your account.
              </p>
            </div>

            <div className='text-sm'>
              <p className='text-neutral-700 dark:text-neutral-300'>
                <span className='font-medium'>Q:</span> What can I do if I am
                unable to verify my account?
              </p>
              <p className='mt-1 text-neutral-500 dark:text-neutral-400'>
                <span className='font-medium'>A:</span> Please contact Shopee{' '}
                <Link
                  to='/verify'
                  className='text-sky-500 hover:underline cursor-pointer'
                >
                  Customer Service
                </Link>
                for assistance to log in to your account.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Changepassword;

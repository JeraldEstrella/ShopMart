import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useAuth } from '../context/AuthContext';
import AuthService from '../services/auth.service';

const Login = () => {
  const AuthContext = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [signUp, setSignUp] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  const inputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (
    provider: 'email&password' | 'google' | 'facebook'
  ) => {
    try {
      if (provider === 'email&password') {
        if (signUp) {
          await AuthService.signUpWithEmail(formData);
        } else {
          await AuthService.signInWithEmail(formData);
        }

        toast.success('Welcome!');
        navigate('/');
      }

      if (provider === 'google' || provider === 'facebook') {
        await AuthService.signInWithProvider(provider);
      }
    } catch (error) {
      toast.error((error as Error).message);
    }
  };

  return (
    <div className='flex items-center justify-center min-h-screen bg-neutral-50 dark:bg-neutral-900 p-4'>
      <div className='w-full max-w-sm bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-2xl p-8 flex flex-col gap-5'>
        <div className='text-center flex flex-col gap-1'>
          <p className='text-2xl font-bold text-primary-600'>Shopmart</p>
          <p className='text-sm text-neutral-500 dark:text-neutral-400'>
            Welcome back, sign in to continue
          </p>
        </div>

        <div className='flex flex-col gap-1.5'>
          <label className='text-xs font-semibold text-neutral-600 dark:text-neutral-300'>
            Email
          </label>
          <input
            type='email'
            name='email'
            placeholder='name@email.com'
            value={formData.email}
            onChange={inputChange}
            className='w-full px-3 py-2 rounded-lg bg-neutral-100 dark:bg-neutral-700 border border-neutral-200 dark:border-neutral-600 text-sm text-neutral-700 dark:text-neutral-100 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition'
          />
        </div>

        <div className='flex flex-col gap-1.5'>
          <label className='text-xs font-semibold text-neutral-600 dark:text-neutral-300'>
            Password
          </label>
          <div className='relative'>
            <input
              type={showPassword ? 'text' : 'password'}
              name='password'
              placeholder='Enter your password'
              value={formData.password}
              onChange={inputChange}
              className='w-full px-3 py-2 pr-10 rounded-lg bg-neutral-100 dark:bg-neutral-700 border border-neutral-200 dark:border-neutral-600 text-sm text-neutral-700 dark:text-neutral-100 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition'
            />
            <button
              type='button'
              onClick={() => setShowPassword(!showPassword)}
              className='absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200 transition cursor-pointer'
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </div>

        <div className='flex items-center justify-between'>
          <label className='flex items-center gap-2 text-xs text-neutral-500 dark:text-neutral-400 cursor-pointer'>
            <input
              type='checkbox'
              checked={rememberMe}
              onChange={() => setRememberMe(!rememberMe)}
              className='w-3.5 h-3.5 accent-primary-500'
            />
            Remember me
          </label>
          <a href='#' className='text-xs text-primary-500 hover:underline'>
            Forgot password?
          </a>
        </div>

        <button
          type='submit'
          className='w-full py-2.5 rounded-full bg-primary-500 hover:bg-primary-600 text-white text-sm font-semibold transition cursor-pointer'
          onClick={() => handleSubmit('email&password')}
        >
          {signUp ? 'Sign up' : 'Sign in'}
        </button>

        <div className='flex items-center gap-3'>
          <div className='flex-1 h-px bg-neutral-200 dark:bg-neutral-700' />
          <span className='text-xs text-neutral-400'>or continue with</span>
          <div className='flex-1 h-px bg-neutral-200 dark:bg-neutral-700' />
        </div>

        <div className='flex gap-3'>
          <button
            type='button'
            className='flex-1 py-2 rounded-lg border border-neutral-200 dark:border-neutral-600 flex items-center justify-center gap-2 text-xs text-neutral-700 dark:text-neutral-200 hover:bg-neutral-50 dark:hover:bg-neutral-700 transition cursor-pointer'
            onClick={() => handleSubmit('google')}
          >
            Google
          </button>
          <button
            type='button'
            className='flex-1 py-2 rounded-lg border border-neutral-200 dark:border-neutral-600 flex items-center justify-center gap-2 text-xs text-neutral-700 dark:text-neutral-200 hover:bg-neutral-50 dark:hover:bg-neutral-700 transition cursor-pointer'
            onClick={() => handleSubmit('facebook')}
          >
            Facebook
          </button>
        </div>

        <p className='text-center text-xs text-neutral-500 dark:text-neutral-400'>
          Don't have an account?{' '}
          <button
            className='text-primary-500 font-semibold hover:underline'
            onClick={() => setSignUp((prev) => !prev)}
          >
            {signUp ? 'Sign in' : 'Sign up'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;

import { Outlet } from 'react-router-dom';
import NavigationBar from './components/NavigationBar';
import { useAuth } from './context/AuthContext';

const App = () => {
  const { isDarkmode } = useAuth();

  return (
    <div
      data-theme={isDarkmode ? 'dark' : 'light'}
      className='w-full dark:bg-gray-900 min-h-screen'
    >
      <div className='md:max-w-9/12 m-auto bg-neutral-50 dark:bg-gray-900 min-h-screen'>
        <NavigationBar />
        <Outlet />
      </div>
    </div>
  );
};

export default App;

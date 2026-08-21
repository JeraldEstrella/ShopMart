import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Toaster } from 'sonner';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './context/AuthContext';
import './index.css';
import App from './App.tsx';
import Homepage from './pages/Homepage.tsx';
import SelectedItem from './pages/SelectedItem.tsx';
import Login from './pages/Login.tsx';
import MyAccount from './pages/myaccount/MyAccount.tsx';
import Profile from './pages/myaccount/panel/Profile.tsx';
import Address from './pages/myaccount/panel/Address.tsx';
import Changepassword from './pages/myaccount/panel/Changepassword.tsx';
import Mypurchase from './pages/myaccount/panel/Mypurchase.tsx';
import Mycart from './pages/Mycart.tsx';
import Store from './pages/store/Store.tsx';
import StoreProducts from './pages/store/panels/StoreProducts.tsx';
import StoreDashboard from './pages/store/panels/StoreDashboard.tsx';
import StoreOrders from './pages/store/panels/StoreOrders.tsx';
import StoreShipping from './pages/store/panels/StoreShipping.tsx';

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: '/',
        element: <Homepage />,
      },
      {
        path: '/product',
        element: <SelectedItem />,
      },
      {
        path: 'my-cart',
        element: <Mycart />,
      },
      {
        path: '/store/:storename',
        element: <Store />,
        children: [
          { index: true, element: <StoreDashboard /> },
          { path: 'products', element: <StoreProducts /> },
          { path: 'orders', element: <StoreOrders /> },
          { path: 'ship', element: <StoreShipping /> },
        ],
      },
      {
        path: '/account',
        element: <MyAccount />,
        children: [
          {
            index: true,
            element: <Profile />,
          },
          {
            path: 'address',
            element: <Address />,
          },
          {
            path: 'change-password',
            element: <Changepassword />,
          },
          {
            path: 'purchase',
            element: <Mypurchase />,
          },
        ],
      },
      {
        path: '/login',
        element: <Login />,
      },
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <Toaster />
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>
);

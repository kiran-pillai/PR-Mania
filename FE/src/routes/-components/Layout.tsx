import { Outlet, useNavigate } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import TopBar from './Topbar';
import Sidebar from './Sidebar';
import { useAuthContext } from '@/context/authContext';
import { useEffect } from 'react';
import { Toaster } from '@/components/ui/sonner';
const Layout = () => {
  const { userIsAuthenticated } = useAuthContext();
  const navigate = useNavigate();
  useEffect(() => {
    if (!userIsAuthenticated && userIsAuthenticated !== 'idle')
      navigate({ to: '/login' });
  }, [userIsAuthenticated]);
  return (
    <>
      <Toaster
        position="top-right"
        richColors
        toastOptions={{ duration: 4000 }}
      />
      <div className="flex flex-col">
        <TopBar />
        <Sidebar>
          <Outlet />
        </Sidebar>
      </div>
      <hr />
      <TanStackRouterDevtools />
    </>
  );
};
export default Layout;

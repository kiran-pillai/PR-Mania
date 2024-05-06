import { Outlet, useNavigate } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import TopBar from './Topbar';
import Sidebar from './Sidebar';
import { useAuthContext } from '@/context/authContext';
import { useEffect } from 'react';
const Layout = () => {
  const { userIsAuthenticated } = useAuthContext();
  const navigate = useNavigate();
  useEffect(() => {
    if (!userIsAuthenticated && userIsAuthenticated !== 'idle')
      navigate({ to: '/login' });
  }, [userIsAuthenticated]);
  return (
    <>
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

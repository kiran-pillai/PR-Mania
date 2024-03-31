import { ModeToggle } from '@/components/mode-toggle';
import { Button } from '@/components/ui/button';
import { useAuthContext } from '@/context/authContext';
import { urlToURI } from '@/urlHandler';
import { Link, Outlet, useNavigate } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import { MessageSquareMore } from 'lucide-react';
import TopBar from './Topbar';
import Sidebar from './Sidebar';

const Layout = () => {
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

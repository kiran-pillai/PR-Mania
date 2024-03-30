import { ModeToggle } from '@/components/mode-toggle';
import { Button } from '@/components/ui/button';
import { useAuthContext } from '@/context/authContext';
import { urlToURI } from '@/urlHandler';
import {
  createRootRoute,
  Link,
  Outlet,
  useNavigate,
} from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import { MessageSquareMore } from 'lucide-react';

export const Route = createRootRoute({
  component: () => {
    const { setUserIsAuthenticated } = useAuthContext();
    const navigate = useNavigate();
    async function logout() {
      console.log('logout');
      await fetch(urlToURI('logout'));
      // localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      setUserIsAuthenticated(false);
      navigate({ to: '/login' });
    }
    return (
      <>
        <div className="p-2 flex flex-col">
          <div className="flex w-screen bg-sky-950 topbar pb-4 items-center  border-t-1 border-white-1000">
            <div className="flex ml-auto mr-5 mt-5 space-x-6">
              <div>
                <ModeToggle />
              </div>
              <Button onClick={logout} size="sm">
                Logout
              </Button>
            </div>
          </div>
          <div className="flex h-screen">
            <div className="flex flex-col space-y-4 gap-y-10 mr-10 p-12 bg-sky-950 navbar justify border-t-2 border-white">
              <Link to="/chat">
                <MessageSquareMore />
              </Link>
            </div>
            <div className="flex w-screen mt-10">
              <Outlet />
            </div>
          </div>
        </div>
        <hr />
        <TanStackRouterDevtools />
      </>
    );
  },
});

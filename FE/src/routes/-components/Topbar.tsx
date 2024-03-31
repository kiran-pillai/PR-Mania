import { ModeToggle } from '@/components/mode-toggle';
import { useTheme } from '@/components/theme-provider';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuthContext } from '@/context/authContext';
import { urlToURI } from '@/urlHandler';
import { useNavigate } from '@tanstack/react-router';
import { Search } from 'lucide-react';
import { updateBgColor } from '../../utils/tailwindUtils';
const TopBar = () => {
  const { setUserIsAuthenticated, userIsAuthenticated } = useAuthContext();
  const navigate = useNavigate();
  async function logout() {
    await fetch(urlToURI('logout'));
    // localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    setUserIsAuthenticated(false);
    navigate({ to: '/login' });
  }
  const showTopbar =
    userIsAuthenticated !== 'idle' && userIsAuthenticated === true;
  const { theme } = useTheme();
  console.log('theme', theme);

  return (
    <>
      {showTopbar ? (
        <div
          className={`flex w-screen ${updateBgColor(theme)} topbar pb-4 items-center  border-t-1 border-white-1000 py-5`}>
          <div className="flex  ml-4 space-x-2 items-center">
            <div>
              <Search />
            </div>
            <Input
              //   style={{ border: 'solid white' }}
              placeholder="Search Users"
            />
          </div>
          <div className="flex ml-auto mr-5 space-x-6">
            <div>
              <ModeToggle />
            </div>
            <Button onClick={logout} size="sm">
              Logout
            </Button>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default TopBar;

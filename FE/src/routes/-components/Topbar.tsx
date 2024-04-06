import { ModeToggle } from '@/components/mode-toggle';
import { useTheme } from '@/components/theme-provider';
import { Button } from '@/components/ui/button';
import { useAuthContext } from '@/context/authContext';
import { urlToURI } from '@/urlHandler';
import { useNavigate } from '@tanstack/react-router';
import { updateBgColor } from '../../utils/tailwindUtils';
import SearchUsers from './SearchUsers/SearchUsers';
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

  return (
    <>
      {showTopbar ? (
        <div
          className={`flex w-screen ${updateBgColor(theme)} topbar pb-4 items-center  border-t-1 border-white-1000 py-5`}>
          <SearchUsers />
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

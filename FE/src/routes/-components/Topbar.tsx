import { ModeToggle } from '@/components/mode-toggle';
import { useTheme } from '@/components/theme-provider';
import { Button } from '@/components/ui/button';
import { useAuthContext } from '@/context/authContext';
import { urlToURI } from '@/urlHandler';
import { useNavigate } from '@tanstack/react-router';
import { updateBgColor } from '../../utils/tailwindUtils';
import SearchUsers from './SearchUsers/SearchUsers';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { getAvatarInitials } from '@/utils/utils';
const TopBar = () => {
  const { setUserIsAuthenticated, userIsAuthenticated } = useAuthContext();
  const navigate = useNavigate();
  async function logout() {
    await fetch(urlToURI('logout'));
    localStorage.removeItem('refreshToken');
    setUserIsAuthenticated(false);
    navigate({ to: '/login' });
  }

  const { theme } = useTheme();
  const { userInfo } = useAuthContext();
  return (
    <>
      {userIsAuthenticated ? (
        <div
          className={`flex w-screen ${updateBgColor(theme)} topbar pb-4 items-center  border-t-1 border-white-1000 py-5`}>
          <SearchUsers />
          <div className="flex ml-auto mr-5 space-x-6">
            <ModeToggle />
            <Avatar>
              <AvatarFallback>
                {getAvatarInitials(userInfo?.name as string)}
              </AvatarFallback>
            </Avatar>
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

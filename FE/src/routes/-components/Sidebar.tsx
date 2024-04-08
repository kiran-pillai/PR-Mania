import { useTheme } from '@/components/theme-provider';
import { useAuthContext } from '@/context/authContext';
import { updateBgColor } from '@/utils/tailwindUtils';
import { Link } from '@tanstack/react-router';
import { MessageSquareMore } from 'lucide-react';

interface SidebarProps {
  children: React.ReactNode;
}
const Sidebar = (props: SidebarProps) => {
  const { children } = props;
  const { userIsAuthenticated } = useAuthContext();
  const { theme } = useTheme();
  const showSidebar =
    userIsAuthenticated !== 'idle' && userIsAuthenticated === true;

  return (
    <>
      {showSidebar ? (
        <div className="flex h-screen">
          <div
            className={`flex flex-col space-y-4 gap-y-10 mr-10 p-12 ${updateBgColor(theme)} navbar justify border-t-2}`}
            style={{
              borderTop: `solid ${theme === 'dark' ? 'white' : 'rgb(161 161 170)'}`,
            }}>
            <Link to="/chat">
              <MessageSquareMore />
            </Link>
          </div>
          <div className="flex w-screen mt-10">{children}</div>
        </div>
      ) : (
        children
      )}
    </>
  );
};

export default Sidebar;

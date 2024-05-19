import { useTheme } from '@/components/theme-provider';
import { useAuthContext } from '@/context/authContext';
import { getBorderColor, updateBgColor } from '@/utils/tailwindUtils';
import { Link } from '@tanstack/react-router';
import { MessageSquareMore } from 'lucide-react';

interface SidebarProps {
  children: React.ReactNode;
}
const Sidebar = (props: SidebarProps) => {
  const { children } = props;
  const { userIsAuthenticated } = useAuthContext();
  const { theme } = useTheme();

  const borderColor = getBorderColor(theme);
  return (
    <>
      {userIsAuthenticated ? (
        <div className="flex h-screen">
          <div
            className={`flex flex-col space-y-4 gap-y-10 p-8 ${updateBgColor(theme)} navbar justify border-r ${borderColor} border-t ${borderColor}`}>
            <Link to="/chat">
              <MessageSquareMore />
            </Link>
          </div>
          {children}
        </div>
      ) : (
        children
      )}
    </>
  );
};

export default Sidebar;

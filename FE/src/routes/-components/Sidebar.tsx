import { useAuthContext } from '@/context/authContext';
import { Link } from '@tanstack/react-router';
import { MessageSquareMore } from 'lucide-react';

interface SidebarProps {
  children: React.ReactNode;
}
const Sidebar = (props: SidebarProps) => {
  const { children } = props;
  const { userIsAuthenticated } = useAuthContext();

  const showSidebar =
    userIsAuthenticated !== 'idle' && userIsAuthenticated === true;
  return (
    <>
      {showSidebar ? (
        <div className="flex h-screen">
          <div className="flex flex-col space-y-4 gap-y-10 mr-10 p-12 bg-sky-950 navbar justify border-t-2 border-white">
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

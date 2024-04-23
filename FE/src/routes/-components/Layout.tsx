import { Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
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

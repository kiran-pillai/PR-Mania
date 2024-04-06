import { Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import TopBar from './Topbar';
import Sidebar from './Sidebar';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
const Layout = () => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex flex-col">
        <TopBar />
        <Sidebar>
          <Outlet />
        </Sidebar>
      </div>
      <hr />
      <TanStackRouterDevtools />
    </QueryClientProvider>
  );
};
export default Layout;

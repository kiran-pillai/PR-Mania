import { useAuthContext } from '@/context/authContext';
import { createLazyFileRoute, useNavigate } from '@tanstack/react-router';
import { useEffect } from 'react';

export const Route = createLazyFileRoute('/')({
  component: Index,
});
//Need to either push to /login or /chat based on user credentials

function Index() {
  const { userIsAuthenticated } = useAuthContext();
  const navigate = useNavigate();
  const navigateToView = async () => {
    if (userIsAuthenticated && userIsAuthenticated !== 'idle')
      await navigate({ to: '/chat' });
    else {
      await navigate({ to: '/login' });
    }
  };
  useEffect(() => {
    navigateToView();
  }, [userIsAuthenticated]);
  return <div className="p-2"></div>;
}

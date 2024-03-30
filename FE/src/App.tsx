// import './App.css';
import { routeTree } from './routeTree.gen';
import { createRouter } from '@tanstack/react-router';
import Login from './pages/Login';
import { useAuthContext } from './context/authContext';
import Chat from './Chat/ Chat';
import { ModeToggle } from './components/mode-toggle';
import { Button } from './components/ui/button';
import { MessageSquareMore } from 'lucide-react';

const router = createRouter({ routeTree });
// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}
function App() {
  const { userIsAuthenticated } = useAuthContext();
  return userIsAuthenticated ? (
    <div className="flex">
      <div className="flex flex-col spacel-y-4 items-center bg-sky-950 navbar justify h-screen mr-10 p-5">
        <ModeToggle />
        <MessageSquareMore />
      </div>
      <div className="my-10">
        <Chat />
      </div>
    </div>
  ) : (
    <Login />
  );
}

export default App;

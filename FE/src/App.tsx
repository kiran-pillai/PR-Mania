// import './App.css';
import { routeTree } from './routeTree.gen';
import { createRouter } from '@tanstack/react-router';
import Login from './pages/Login';
import { useAuthContext } from './context/authContext';
import Chat from './pages/Chat/ Chat';
import { ModeToggle } from './components/mode-toggle';
import { Button } from './components/ui/button';
const router = createRouter({ routeTree });
// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}
function App() {
  const { userIsAuthenticated } = useAuthContext();
  return (
    <>
      <div className="flex">
        <div className="ml-auto">
          <ModeToggle />
        </div>
      </div>
      {/* {userIsAuthenticated ? <Chat /> : <Login />} */}
    </>
  );
}

export default App;

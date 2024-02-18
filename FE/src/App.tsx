import { useEffect, useRef, useState } from 'react';
import './App.css';
import { routeTree } from './routeTree.gen';
import { createRouter } from '@tanstack/react-router';
import Login from './pages/Login';
import { fetchWithCredentials, urlToURI } from './urlHandler';
const router = createRouter({ routeTree });
// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}
function App() {
  const [data, setData] = useState('');

  async function getHelloWorld() {
    const text = await fetchWithCredentials('base', (response: any) =>
      response.text()
    );
    setData(text);
  }

  async function logout() {
    await fetch(urlToURI('logout'));
    localStorage.removeItem('token');
  }
  useEffect(() => {
    getHelloWorld();
  }, []);

  return (
    <>
      <h2>Server says {data}</h2>
      <Login />
      <button onClick={getHelloWorld}>Send a req</button>
      <button onClick={logout}>Logout</button>
    </>
  );
}

export default App;

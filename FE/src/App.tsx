import { useEffect, useRef, useState } from 'react';
import './App.css';
import { routeTree } from './routeTree.gen';
import { createRouter } from '@tanstack/react-router';
import Chat from './pages/Chat/ Chat';
import Login from './pages/Login';
const router = createRouter({ routeTree });
// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}
function App() {
  const [count, setCount] = useState(0);
  const [data, setData] = useState('');

  useEffect(() => {
    fetch('http://localhost:8000/')
      .then((response) => {
        // Checking if the response is successful
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.text(); // or response.json() if the server responds with JSON
      })
      .then((data) => {
        // Printing the response data to the screen
        setData(data);
      })
      .catch((error) => {
        // Handling any errors that occur during the fetch
        console.error(
          'There has been a problem with your fetch operation:',
          error
        );
      });
  }, []);

  return (
    <>
      <h2>Server says {data}</h2>
      <Login />
    </>
  );
}

export default App;

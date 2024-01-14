import { useEffect, useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';

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
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <h2>Server says {data}</h2>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;

import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import socket from "./lib/websocket";

function App() {
  const [count, setCount] = useState(0);
  const [serverData, setServerData] = useState<{
    title: string;
    score: number;
  } | null>(null);

  const get_data = () => {
    socket.onmessage = (data) => {
      const state = JSON.parse(data.data);
      setServerData(state);
      setCount(state.score);
    };
  };

  useEffect(() => {
    get_data();
  }, []);

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      {serverData ? (
        <h1>{serverData.title}</h1>
      ) : (
        <h1>Waiting for server data...</h1>
      )}
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

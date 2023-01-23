import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import TrpcProviders from "./utils/TrcpProviders";

function App() {
  return (
    <TrpcProviders>
      <div className="App">
        <p>Hello world.</p>
        <p className="read-the-docs">
          Click on the Vite and React logos to learn more
        </p>
      </div>
    </TrpcProviders>
  );
}

export default App;

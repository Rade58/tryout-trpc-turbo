import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import TrpcProviders from "./utils/TrcpProviders";

import ListMessages from "./components/ListMessages";

function App() {
  return (
    <TrpcProviders>
      <div className="App">
        <p>Hello world.</p>
        <br />
        <ListMessages />
      </div>
    </TrpcProviders>
  );
}

export default App;

import './App.css';

import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import Dashboard from './Components/Dashboard/Dashboard';

import { useState } from 'react';

import { Toaster } from "react-hot-toast";

function App() {

  const [screen, setScreen] = useState("login");

  return (
    <div className="App">

      <Toaster position="top-center" />

      {screen === "login" && (
        <Login setScreen={setScreen} />
      )}

      {screen === "register" && (
        <Register setScreen={setScreen} />
      )}

      {screen === "dashboard" && (
        <Dashboard setScreen={setScreen} />
      )}

    </div>
  );
}

export default App;
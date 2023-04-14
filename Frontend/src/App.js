import "./App.css";
import React from "react";
import Navbar from "./components/navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; //in router v6 swtich is routes
import Home from "./components/pages/Home";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" exact Component={Home}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;

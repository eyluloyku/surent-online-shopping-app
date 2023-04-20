import "./App.css";
import React from "react";
import Navbar from "./components/navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; //in router v6 swtich is routes
import Home from "./components/pages/Home";
import Productlisting from "./components/pages/Productlisting";
import LoginRegister from "./components/pages/LoginRegister";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" exact Component={Home}></Route>
          <Route path="/Products" exact Component={Productlisting}></Route>
          <Route path ="/Register" exact Component={LoginRegister}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;

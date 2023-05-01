import "./App.css";
import React from "react";
import Navbar from "./components/navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; //in router v6 swtich is routes
import Home from "./components/pages/Home";
import Productlisting from "./components/pages/Productlisting";
import LoginRegister from "./components/pages/LoginRegister";
import ProductsDetail from "./components/pages/ProductsDetail";
import ReviewSubmit  from "./components/pages/ReviewSubmit";


function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/Products" element={<Productlisting/>} />
          <Route path ="/Register" element={<LoginRegister/>} />
          <Route path="/products/:id" element={<ProductsDetail/>} />
          <Route path="/register" element={<LoginRegister/>} />
          <Route path="/login" element={<LoginRegister/>} />
          <Route path="/ReviewSubmit/:id" element={<ReviewSubmit/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

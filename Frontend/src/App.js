import "./App.css";
import React from "react";
import Navbar from "./components/navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; //in router v6 swtich is routes
import Home from "./components/pages/Home";
import Productlisting from "./components/pages/Productlisting";
import LoginRegister from "./components/LoginRegister";
import ProductsDetail from "./components/pages/ProductsDetail";
import ReviewSubmit  from "./components/pages/ReviewSubmit";
import LoginwFooter from "./components/pages/LoginwFooter";
import ProductSearch from "./components/pages/Search";
import Checkout from "./components/checkout/Checkout";
import Cart from "./components/cart/Cart";
import Orders from "./components/pages/OrderListing";
import Sort from "./components/pages/Sort";
import Category from "./components/pages/Category";
import Wishlist from "./components/pages/Wishlist";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/Products" element={<Productlisting/>} />
          <Route path="/Prods" element={<Productlisting/>} />
          <Route path ="/Register" element={<LoginwFooter/>} />
          <Route path="/products/:id" element={<ProductsDetail/>} />
          <Route path="/register" element={<LoginwFooter/>} />
          <Route path="/login" element={<LoginwFooter/>} />
          <Route path="/ReviewSubmit/:id" element={<ReviewSubmit/>} />
          <Route path="/GetOrders/:id" element={<Orders/>} />
	        <Route path="/search/:id" element={<ProductSearch/>} />
          <Route path="/checkout" exact element={<Checkout/>}></Route>
          <Route path="/CheckoutPage" exact element={<Cart/>}></Route>
          <Route path="/sort/:id" element={<Sort/>} />
          <Route path="/category/:id" element={<Category/>} />
          <Route path="/wishlist/:id" element={<Wishlist/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

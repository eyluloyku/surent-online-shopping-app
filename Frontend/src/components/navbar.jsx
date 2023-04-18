import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; /*link replaces an a tag */
import { Button } from "./Button";
import "./Navbar.css";
/* this app uses font awesome and some free videos and pictures provided by pexels */

function Navbar() {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);

  const handleClick = () => {
    setClick(!click); /* reverse the value whenever you click it*/
  };

  const closeMobileMenu = () => {
    setClick(false);
  };

  const toggleProducts = () => {
    let subMenu = document.getElementById("subMenu");
    subMenu.classList.toggle("open-products");
    setClick(false);
  };

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  useEffect(() => {
    showButton();
  }, []);

  window.addEventListener(
    "resize",
    showButton
  ); /*The resize event fires when the document view (window) has been resized.*/

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
            SUrent<i class="fa-solid fa-shirt" />
          </Link>
          <div className="menu-icon" onClick={handleClick}>
            <i className={click ? "fas fa-times" : "fas fa-bars"} />
          </div>
          <ul className={click ? "nav-menu active" : "nav-menu"}>
            {" "}
            {/*make nav menu dissapear */}
            <li className="nav-item">
              <Link to="/" className="nav-links" onClick={closeMobileMenu}>
                Home
              </Link>
            </li>

            <li className="nav-item">
              <Link
                to="/Login-page"
                className="nav-links"
                onClick={closeMobileMenu}
              >
                Login Page
              </Link>
            </li>

            <li className="nav-item">
              <Link
                to=""
                className="nav-links"
                onClick={toggleProducts}
              >
                Products
              </Link>

              <div class="sub-menu-wrap" id="subMenu">
                <div class="sub-menu">
                  <a class="sub-products-link" href="/shirts">
                    <img src="icons/shirts.png" class="product-icon" alt="shirts"></img>
                    <h3>Shirts</h3>
                  </a>
                  <hr></hr>

                  <a class="sub-products-link" href="/pants">
                    <img src="icons/pants.png" class="product-icon" alt="pants"></img>
                    <h3>Pants</h3>
                  </a>
                  <hr></hr>

                  <a class="sub-products-link" href="/coats">
                    <img src="icons/coats.png" class="product-icon" alt="coats"></img>
                    <h3>Coats</h3>
                  </a>
                  <hr></hr>

                  <a class="sub-products-link" href="/hats">
                    <img src="icons/hats.png" class="product-icon" alt="hats"></img>
                    <h3>Hats</h3>
                  </a>
                  <hr></hr>

                  <a class="sub-products-link" href="/shoes">
                    <img src="icons/shoes.png" class="product-icon" alt="shoes"></img>
                    <h3>Shoes</h3>
                  </a>
                  <hr></hr>

                </div>
              </div>
            </li>


            <li className="nav-item">
              <Link
                to="/Register"
                className="nav-links-mobile"
                onClick={closeMobileMenu}
              >
                Register
              </Link>
            </li>
          </ul>
          {button && <Button buttonStyle="btn--outline">Register</Button>}
        </div>
      </nav>
    </>

  );
}

export default Navbar;

import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom"; /*link replaces an a tag */
import {useNavigate} from "react-router-dom";
import "./Navbar.css";
import {Button} from "./Button";

import Cart from "./cart/Cart";
import Wishlist from "./pages/Wishlist";
/* this app uses font awesome and some free videos and pictures provided by pexels */

function Navbar() {
    const [click, setClick] = useState(false);
    const [button, setButton] = useState(true);
    const [accessToken, setAccessToken] = useState(true);
    const navigate = useNavigate();
    const [userId, setUserId] = useState("");
    
    const handleClick = () => {
        setClick(!click); /* reverse the value whenever you click it*/
    };

    const closeMobileMenu = () => {
        setClick(false);
    };

    const logout = () => {
        setAccessToken(null);
        navigate('/login');
        localStorage.removeItem("token")
        localStorage.removeItem("userId")
        localStorage.removeItem("isCustomer")
        window.location.reload()
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
    }, [accessToken]);

    useEffect(() => {
        setAccessToken(localStorage.getItem("token"));
    }, [accessToken]);
    useEffect(() => {
        setUserId(localStorage.getItem('userId'));
    });

    window.addEventListener(
        "resize",
        showButton
    ); 

    return (
        <>
            <nav className="navbar">
                <div className="navbar-container">
                    <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
                        SUrent<i className="fa-solid fa-shirt"/>
                    </Link>
                    <div className="menu-icon" onClick={handleClick}>
                        <i className={click ? "fas fa-times" : "fas fa-bars"}/>
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
                                to="/products"
                                className="nav-links"
                                onClick={closeMobileMenu}
                            >
                                Products
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link
                                className="nav-links"
                                onClick={closeMobileMenu}
                             to={Cart}>
                                <Cart/>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link
                                className="nav-links"
                                onClick={closeMobileMenu}
                             to={"/wishlist/"+userId}>
                                <i class="fa-sharp fa-solid fa-heart">&nbsp;</i>
                                Wishlist
                            </Link>
                        </li>
                        <li className="nav-item">

                            {accessToken ?
                                <Link className="nav-links-mobile" onClick={logout}>Logout</Link> :
                                <Link to="/login" className="nav-links-mobile" onClick={closeMobileMenu}> Get
                                    Started </Link>}

                        </li>
                        {accessToken? (
                        <li className="nav-item">
                            <Link
                                to= {"/GetOrders/"+userId}
                                className="nav-links"
                                onClick={closeMobileMenu}
                            >
                                Orders
                            </Link>
                        </li>
                        ):<></>}
                    </ul>
                    {button ? (
                        accessToken ? (
                            <Button onClick={logout} buttonStyle="btn--outline">
                            Logout
                            </Button>
                        ) : (
                            <Button destination="/login" buttonStyle="btn--outline">
                            Get Started
                            </Button>
                        )
                        ) : (
                        ""
                        )}
                </div>
            </nav>
        </>
    );
}

export default Navbar;
import {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import { Button, Modal } from "react-bootstrap";
import axios from "axios";
import "./Cart.css";

const Cart = () => {
    const [show, setShow] = useState(false);
    const [cart, setCart] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const fetchCart = async () => {
        setLoading(true);
        try {
            const response = await axios.get("http://localhost:8080/api/carts");
            setCart(response.data);
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCart();
    }, [cart]);

    const removeItem = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/api/carts/${id}`);
            setCart((prevCart) => ({
                ...prevCart,
                entries: prevCart.entries.filter((item) => item.id !== id),
            }));
        } catch (error) {
            console.log(error);
        }
    };

    if (loading) {
        return <p>Loading cart...</p>;
    }

    if (cart && cart.entries.length === 0) {
        setCart(null)
    }

    return (
        <>
            <button className="btn btn-primary btn-cart" onClick={handleShow}>
                Cart
            </button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Shopping Cart</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {cart ? (
                        <div>
                            <div className="cart-items">
                                {cart.entries.map((item) => (
                                    <div className="cart-item" key={item.id}>
                                        <div className="cart-item-details">
                                            <div>
                                                {item.product && <span>{item.product.name}</span>}
                                                <span> {item.totalAmount}</span>
                                            </div>
                                        </div>
                                        <Button variant="danger" onClick={() => removeItem(item.id)}>
                                            Remove
                                        </Button>
                                    </div>
                                ))}
                            </div>
                            <div className="cart-total">
                                <p>Total: {cart.totalNetPrice} TL</p>
                            </div>
                        </div>
                    ) : (
                        <p>Your cart is empty.</p>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Link to="/checkout" className="btn btn-primary">
                        Checkout
                    </Link>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default Cart;

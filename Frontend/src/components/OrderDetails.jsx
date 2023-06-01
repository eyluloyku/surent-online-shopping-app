import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./prodmanOrders.css";

function OrderList() {
  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [ordersPerPage] = useState(3);
  const [displayedPages, setDisplayedPages] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  useEffect(() => {
    updateDisplayedPages();
  }, [currentPage, orders]);

  const fetchOrders = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/orders/getOrders');
      setOrders(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const updateDisplayedPages = () => {
    const totalPages = Math.ceil(orders.length / ordersPerPage);
    const pagesToShow = 3;
    const half = Math.floor(pagesToShow / 2);

    let startPage = Math.max(currentPage - half, 1);
    let endPage = Math.min(startPage + pagesToShow - 1, totalPages);

    if (totalPages - endPage < half) {
      startPage = Math.max(endPage - pagesToShow + 1, 1);
    }

    const pages = Array.from({ length: endPage - startPage + 1 }, (_, index) => startPage + index);
    setDisplayedPages(pages);
  };

  // Get current orders for the selected page
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <h2>Order List</h2>
      {currentOrders.map((order) => (
        <div key={order._id} className="order-card">
          <div className="order-header">
            <span>Status: {order.status}</span>
            <span>Date: {new Date(order.dateOrdered).toLocaleDateString()}</span>
          </div>
          <div className="order-details">
            <div className="order-info">
              <span>Total Price: {order.totalPrice}</span>
              <span>
                Shipping Address: {order.shippingAddress.addressLine1}, {order.shippingAddress.city}, {order.shippingAddress.country}
              </span>
            </div>
            {/* Render other order details as needed */}
          </div>
        </div>
      ))}

      {/* Pagination */}
      <div className="pagination">
        <button className="arrow" disabled={currentPage === 1} onClick={() => paginate(currentPage - 1)}>
          &lt;
        </button>
        {displayedPages.map((page) => (
          <button
            key={page}
            onClick={() => paginate(page)}
            className={currentPage === page ? 'active' : ''}
          >
            {page}
          </button>
        ))}
        <button
          className="arrow"
          disabled={currentPage === Math.ceil(orders.length / ordersPerPage)}
          onClick={() => paginate(currentPage + 1)}
        >
          &gt;
        </button>
      </div>
    </div>
  );
}

export default OrderList;

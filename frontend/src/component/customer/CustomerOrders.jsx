import React, { useEffect, useState } from 'react';
import axios from 'axios';
import dayjs from 'dayjs';

export default function CustomerOrders() {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    axios.get(import.meta.env.VITE_BASEURL + "/orders")
      .then((res) => {
        console.log(res.data.data);
        setOrders(res.data.data);
      })
      .catch((err) => {
        console.log(err);
        setError("Failed to fetch orders");
      });
  }, []);

  const handleReturn = (orderId) => {
    const confirmReturn = confirm("Are you sure you want to return this order?");
    if (!confirmReturn) return;

    axios.post(import.meta.env.VITE_BASEURL + `/orders/return/${orderId}`)
      .then((res) => {
        alert("Return requested successfully!");
        // reload updated list
        setOrders(orders.map(order => 
          order._id === orderId ? { ...order, returned: true } : order
        ));
      })
      .catch((err) => {
        console.log(err);
        alert("Return failed. Please try again.");
      });
  };

  const isReturnEligible = (orderDate) => {
    const today = dayjs();
    const placedDate = dayjs(orderDate);
    return today.diff(placedDate, 'day') <= 10;
  };

  return (
    <div className="container mt-4">
      <h2 className="text-primary mb-3">📋 My Orders</h2>

      {error && <div className="alert alert-danger">{error}</div>}

      <div className="table-responsive">
        <table className="table table-bordered table-hover text-center shadow-lg">
          <thead className="table-dark">
            <tr>
              <th>#</th>
              <th>Order ID</th>
              <th>Date</th>
              <th>Subtotal</th>
              <th>Payment ID</th>
              <th>Return Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {
              orders.length > 0 ? orders.map((order, index) => {
                const eligible = isReturnEligible(order.date);
                return (
                  <tr key={order._id}>
                    <td>{index + 1}</td>
                    <td>{order._id}</td>
                    <td>{dayjs(order.date).format('DD MMM YYYY')}</td>
                    <td>₹{order.subTotal}</td>
                    <td>{order.paymentId}</td>
                    <td>
                      {order.returned 
                        ? <span className="text-success">Returned</span> 
                        : eligible 
                          ? <span className="text-warning">Eligible</span>
                          : <span className="text-danger">Expired</span>}
                    </td>
                    <td>
                      {
                        !order.returned && eligible &&
                        <button className="btn btn-danger" onClick={() => handleReturn(order._id)}>
                          Return
                        </button>
                      }
                    </td>
                  </tr>
                )
              }) : (
                <tr>
                  <td colSpan="7" className="text-center">No orders found</td>
                </tr>
              )
            }
          </tbody>
        </table>
      </div>
    </div>
  );
}

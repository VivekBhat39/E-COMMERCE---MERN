import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaShoppingCart, FaUsers, FaBoxOpen } from 'react-icons/fa';

function AdminDashboard() {
  const [orders, setOrders] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState([]);

  function loadOrders() {
    axios.get(import.meta.env.VITE_BASEURL + "/orders").then((res) => {
      // console.log(res.data.data);
      setOrders(res.data.data);
    });
  };

  function loadCustomers() {
    axios.get(import.meta.env.VITE_BASEURL + "/customers")
      .then((res) => {
        setCustomers(res.data.data);
      });
  };

  function loadProducts() {
    axios.get(import.meta.env.VITE_BASEURL + "/products")
      .then((res) => {
        // console.log(res.data.data);
        setProducts(res.data.data)
      })
  };

  useEffect(() => {
    loadOrders();
    loadCustomers();
    loadProducts();
  }, []);

  return (
    <>
      <h1>Admin Dashboard</h1>
      <div className="container mt-5">
        <div className="row">
          {/* Orders Count */}
          <div className="col-md-4">
            <div className="card text-white bg-primary mb-3 shadow">
              <div className="card-body d-flex justify-content-between align-items-center">
                <div>
                  <h5 className="card-title">Orders</h5>
                  <h2>{orders.length}</h2>
                </div>
                <FaShoppingCart size={40} />
              </div>
            </div>
          </div>

          {/* Customers Count */}
          <div className="col-md-4">
            <div className="card text-white bg-success mb-3 shadow">
              <div className="card-body d-flex justify-content-between align-items-center">
                <div>
                  <h5 className="card-title">Customers</h5>
                  <h2>{customers.length}</h2>
                </div>
                <FaUsers size={40} />
              </div>
            </div>
          </div>

          {/* Products Count */}
          <div className="col-md-4">
            <div className="card text-white bg-warning mb-3 shadow">
              <div className="card-body d-flex justify-content-between align-items-center">
                <div>
                  <h5 className="card-title">Products</h5>
                  <h2>{products.length}</h2>
                </div>
                <FaBoxOpen size={40} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminDashboard;

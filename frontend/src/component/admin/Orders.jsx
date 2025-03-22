import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import * as XLSX from "xlsx";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  function loadData() {
    axios.get(import.meta.env.VITE_BASEURL + "/orders").then((res) => {
      console.log(res.data.data);
      setOrders(res.data.data);
    });
  }

  useEffect(() => {
    loadData();
  }, []);

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(orders);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Orders");
    XLSX.writeFile(workbook, "orders.xlsx");
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB");
  };

  const filteredOrders = orders.filter((order) => {
    const orderDate = new Date(order.date).setHours(0, 0, 0, 0);
    const start = startDate ? new Date(startDate).setHours(0, 0, 0, 0) : null;
    const end = endDate ? new Date(endDate).setHours(0, 0, 0, 0) : null;
    return (
      (!start || orderDate >= start) &&
      (!end || orderDate <= end)
    );
  });

  return (
    <div className="container-fluid mt-1">
      <div className="d-flex justify-content-between mb-3">
        <h2 className="text-primary">📦 Order List</h2>
        <button className="btn btn-success" onClick={exportToExcel}>Export to Excel 📥</button>
      </div>

      <div className="d-flex mb-3">
        <input
          type="date"
          className="form-control me-2"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <input
          type="date"
          className="form-control me-2"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
      </div>

      <div className="table-responsive">
        <table className="table table-hover shadow-lg text-center">
          <thead className="table-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Payment ID</th>
              <th scope="col">Customer Name</th>
              <th scope="col">Email</th>
              <th scope="col">Mobile</th>
              <th scope="col">Order Date</th>
              <th scope="col">Total Amount (₹)</th>
              <th scope="col">Details</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order, i) => (
              <tr key={order._id}>
                <th scope="row">{i + 1}</th>
                <td>{order.paymentId}</td>
                <td>{order.customerName}</td>
                <td>{order.customerEmail}</td>
                <td>{order.customerMobile}</td>
                <td>{formatDate(order.date)}</td>
                <td className="fw-bold text-success">₹{order.subTotal}.00 /-</td>
                <td>
                  <Link to={`/order-confirmation/${order._id}`} className="btn btn-info btn-sm">
                    View Details 🔍
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredOrders.length === 0 && (
        <p className="text-center mt-3 text-danger">No orders found!</p>
      )}
    </div>
  );
}
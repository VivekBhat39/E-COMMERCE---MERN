import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function OrderConfirmation() {
    const { orderId } = useParams();
    // alert(orderId)
    const [orderDetails, setOrderDetails] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_BASEURL}/orders/${orderId}`)
            .then(response => {
                setOrderDetails(response.data);
            })
            .catch(error => console.error("Error fetching order details:", error));
    }, [orderId]);

    return (
        <div className="container text-center mt-5">
            {orderDetails ? (
                <div className="card shadow-lg p-4">
                    <h2 className="text-success">Order Confirmed!</h2>
                    <p>Thank you for your purchase, <strong>{orderDetails.customerName}</strong>!</p>
                    <p>Order ID: <strong>{orderDetails._id}</strong></p>
                    <p>Total Amount: <strong>₹{orderDetails.subTotal}.00</strong></p>

                    <h4 className="mt-4">Ordered Items:</h4>
                    <table className="table table-bordered mt-3">
                        <thead>
                            <tr>
                                <th>Sr. No.</th>
                                <th>Product</th>
                                <th>Image</th>
                                <th>Quantity</th>
                                <th>Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orderDetails.products.map((product, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{product.productName}</td>
                                    <td><img src={product.productImage} alt={product.productName} width="50" /></td>
                                    <td>{product.productQty}</td>
                                    <td>₹{product.productPrice * product.productQty}.00</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <button className="btn btn-primary mt-3" onClick={() => navigate('/admin/orders')}>Back</button>
                </div>
            ) : (
                <p>Loading order details...</p>
            )}
        </div>
    );
}

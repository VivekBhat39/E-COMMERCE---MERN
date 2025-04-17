import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'

export default function CheckOut() {
  const [customerId, setCustomerId] = useState(undefined);

  const [data, setData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    mobile: '',
    password: '',
    address: {
      address: '',
      city: '',
      state: '',
      zip: '',
    },
  });

  let navigate = useNavigate();

  const [cartProduct, setCartProduct] = useState([]);
  const [subTotal, setSubTotal] = useState(0);

  useEffect(() => {
    var userId = localStorage.getItem('_id');

    if (!userId) {
      navigate('/signin');
    } else {
      setCustomerId(userId);

      let cart = JSON.parse(localStorage.getItem('cart')) || [];
      let subTotal = JSON.parse(localStorage.getItem('subTotal')) || 0;

      setCartProduct(cart);
      setSubTotal(subTotal);
    }
  }, []);

  useEffect(() => {
    if (customerId) {
      axios.get(`${import.meta.env.VITE_BASEURL}/customers/${customerId}`)
        .then((res) => {
          const userData = res.data.data;
          setData((prevData) => ({
            ...prevData,
            firstName: userData.firstName || '',
            lastName: userData.lastName || '',
            email: userData.email || '',
            mobile: userData.mobile || '',
            address: {
              ...prevData.address,
              address: userData.address?.address || '',
              city: userData.address?.city || '',
              state: userData.address?.state || '',
              zip: userData.address?.zip || '',
            },
          }));
        })
        .catch((error) => console.error("Error fetching user data:", error));
    }
  }, [customerId]); // Add dependency to trigger when customerId updates


  function handleChange(e) {
    const { id, value } = e.target;

    if (['address', 'city', 'state', 'zip'].includes(id)) {
      setData((prevData) => ({
        ...prevData,
        address: {
          ...prevData.address,
          [id]: value,
        },
      }));
    } else {
      setData((prevData) => ({
        ...prevData,
        [id]: value,
      }));
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!data.address.address || !data.address.city || !data.address.state || !data.address.zip) {
      alert('All fields are mandatory!');
    } else {
      axios.put(`${import.meta.env.VITE_BASEURL}/customers/${customerId}`, data)
        .then(() => {
          alert('Billing Details Updated');
        });
    }
  }

  function handlePayment(e) {
    e.preventDefault();
    if (!data.address.address || !data.address.city || !data.address.state || !data.address.zip) {
      alert('All fields are mandatory!');
    } else {

      var options = {
        "key": "rzp_test_4yosHYDduPYmKN", // Enter the Key ID generated from the Dashboard
        "amount": subTotal * 100, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        "currency": "INR",
        "name": "Fashion Shoes", //your business name
        "description": "Test Transaction",
        "image": "https://lms.igaptechnologies.com/assets/images/logo.png",
        // "order_id": "order_9A33XWu170gUtm", //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
        // "callback_url": "https://eneqd3r9zrjok.x.pipedream.net/",
        "handler": function (response) {
          console.log(response.razorpay_payment_id);
          // console.log(response.razorpay_order_id);
          // console.log(response.razorpay_signature)
          // setOrder({
          //   paymentId: response.razorpay_payment_id,
          //   name: data.firstName,
          //   email: data.email,
          //   mobile: data.mobile
          // });
          // console.log(order)

          handleOrderSubmit(response.razorpay_payment_id)
        },
        "prefill": { //We recommend using the prefill parameter to auto-fill customer's contact information especially their phone number
          "name": data.firstName, //your customer's name
          "email": data.email,
          "contact": data.mobile //Provide the customer's phone number for better conversion rates 
        },
        "notes": {
          "address": "Razorpay Corporate Office"
        },
        "theme": {
          "color": "#3399cc"
        }
      };

      var rzp1 = new window.Razorpay(options);
      rzp1.open();

    }
  };

  async function handleOrderSubmit(paymentId) {
    try {
      // Step 1: Create the order
      const orderResponse = await axios.post(`${import.meta.env.VITE_BASEURL}/orders/orders`, {
        customerId,
        date: new Date().toISOString(),
        customerName: data.firstName,
        customerEmail: data.email,
        customerMobile: data.mobile,
        paymentId,
        subTotal
      });

      const orderId = orderResponse.data._id; // Get the new order's ID

      // Step 2: Add products to orderItems table
      const orderItems = cartProduct.map(product => ({
        productName: product.name,
        productPrice: product.price,
        productImage: product.image,
        productQty: product.quantity,
        orderID: orderId  // Reference to the orders table
      }));

      // Step 3: Update product stock quantities
      for (const product of cartProduct) {
        await axios.put(`${import.meta.env.VITE_BASEURL}/products/update-stock/${product._id}`, {
          quantityPurchased: product.quantity
        });
      }


      await axios.post(`${import.meta.env.VITE_BASEURL}/orders/orderItems`, orderItems);

      // alert("Order placed successfully!");
      Swal.fire({
        title: "Order placed successfully",
        text: "Please Visit again",
        icon: "success"
      });

      localStorage.removeItem("cart"); // Clear cart after successful order
      localStorage.removeItem("subTotal");
      navigate("/order-confirmation/" + orderId); // Redirect to confirmation page
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Something went wrong. Please try again.");
    }
  }


  return (
    <div>
      <div className="container">
        <h2>Billing Details</h2>

        <div className="row">
          <div className="col-lg-8">
            <form method="post" className="colorlib-form">
              <div className="row">
                <div className="col-md-6">
                  <label htmlFor="firstName">First Name</label>
                  <input
                    autoComplete="given-name"
                    onChange={handleChange}
                    value={data.firstName}
                    type="text"
                    id="firstName"
                    className="form-control"
                    placeholder="Your First Name"
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="lastName">Last Name</label>
                  <input
                    autoComplete="family-name"
                    onChange={handleChange}
                    value={data.lastName}
                    type="text"
                    id="lastName"
                    className="form-control"
                    placeholder="Your Last Name"
                  />
                </div>
                <div className="col-md-12">
                  <label htmlFor="address">Address <span className="text-danger">*</span></label>
                  <input
                    autoComplete="street-address"
                    onChange={handleChange}
                    value={data.address.address}
                    type="text"
                    id="address"
                    className="form-control"
                    placeholder="Enter Your Address"
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="city">City <span className="text-danger">*</span></label>
                  <input
                    autoComplete="address-level2"
                    onChange={handleChange}
                    value={data.address.city}
                    type="text"
                    id="city"
                    className="form-control"
                    placeholder="Enter Your City"
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="state">State <span className="text-danger">*</span></label>
                  <input
                    autoComplete="address-level1"
                    onChange={handleChange}
                    value={data.address.state}
                    type="text"
                    id="state"
                    className="form-control"
                    placeholder="Enter Your State"
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="zip">ZIP Code <span className="text-danger">*</span></label>
                  <input
                    autoComplete="postal-code"
                    onChange={handleChange}
                    value={data.address.zip}
                    type="number"
                    id="zip"
                    className="form-control"
                    placeholder="ZIP Code"
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="email">Email</label>
                  <input
                    autoComplete="email"
                    onChange={handleChange}
                    value={data.email}
                    type="email"
                    id="email"
                    className="form-control"
                    placeholder="Your Email"
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="mobile">Phone Number</label>
                  <input
                    autoComplete="tel"
                    onChange={handleChange}
                    value={data.mobile}
                    type="number"
                    id="mobile"
                    className="form-control"
                    placeholder="Your Phone Number"
                  />
                </div>

                <div className="col-md-12 text-center mt-3">
                  <button onClick={handleSubmit} className="btn btn-primary">Save Address</button>
                </div>
              </div>
            </form>
          </div>



          <div className="col-lg-4">


            <div className="cart-detail">
              <h2>Cart Total</h2>
              <ul>
                <li>
                  <span>Subtotal</span> <span>₹{subTotal}.00 /-</span>
                  <ul>
                    {cartProduct.map((eachData, i) => (
                      <li key={i}>
                        <span>{eachData.quantity} x {eachData.name}</span>
                        <span>₹{eachData.price * eachData.quantity}.00 /-</span>
                      </li>
                    ))}
                  </ul>
                </li>
                <li><span>Shipping</span> <span>₹50.00</span></li>
                <li><span>Order Total</span> <span>₹{subTotal}.00 /-</span></li>
              </ul>
            </div>

            <div className="text-center mt-3">
              <button onClick={handlePayment} className="btn btn-success">Place an Order</button>
            </div>
          </div>
        </div>




      </div>
    </div>
  );
}

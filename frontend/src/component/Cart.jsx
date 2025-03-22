import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


export default function Cart() {

	const navigate = useNavigate()

	const [cartProduct, setCartProduct] = useState([]);
	const [subtotal, setSubTotal] = useState(0);
	const [discount, setDiscount] = useState(0);
	const [discountAmount, setDiscountAmount] = useState(0);

	useEffect(() => {
		let cartProduct = JSON.parse(localStorage.getItem("cart")) || [];
		// console.log(cartProduct);
		setCartProduct(cartProduct);

	}, []);

	useEffect(() => {
		const total = cartProduct.reduce((acc, product) => acc + product.price * product.quantity, 0);
		setSubTotal(total);
	}, [cartProduct]);


	function incrementProductQuantity(id) {

		const updatedCart = cartProduct.map((product) =>
			product._id === id ? { ...product, quantity: product.quantity + 1 } : product
		);

		// Update state
		setCartProduct(updatedCart);

		// Store the updated cart back in localStorage
		localStorage.setItem("cart", JSON.stringify(updatedCart));
	};

	function decrementProductQuantity(id) {

		const updatedCart = cartProduct.map((product) =>
			product._id === id && product.quantity > 1
				? { ...product, quantity: product.quantity - 1 }
				: product
		);
		// Update state
		setCartProduct(updatedCart);

		// Store the updated cart back in localStorage
		localStorage.setItem("cart", JSON.stringify(updatedCart));
	};


	function removeCartItem(id) {
		// alert(id)
		const updatedCart = cartProduct.filter((product) => product._id != id)

		// Update state
		setCartProduct(updatedCart);

		// Store the updated cart back in localStorage
		localStorage.setItem("cart", JSON.stringify(updatedCart));
		location.reload();
	};

	function handleDiscount(e) {
		e.preventDefault();
		const discountValues = discount.match(/\d+/)?.[0] || "No number found";
		console.log(discountValues); // Logs
		setDiscountAmount(discountValues)
	};

	function proceedToCheckout() {

		localStorage.setItem("subTotal", JSON.stringify(subtotal + 50 - discountAmount)) 
		navigate('/checkout')
	}

	return (
		<div className="mt-5">
			<div className="breadcrumbs">
				<div className="container">
					<div className="row">
						<div className="col text-start">
							<p className="bread"><span><a href="index.html">Home</a></span> / <span>Shopping Cart</span></p>
						</div>
					</div>
				</div>
			</div>


			<div className="">
				<div className="container">
					<div className="row row-pb-lg">
						<div className="col-md-12">
							<div className="product-name d-flex">

								<div className="one-forth text-left px-4">
									<span>Product Details</span>
								</div>
								<div className="one-eight text-center">
									<span>Price</span>
								</div>
								<div className="one-eight text-center">
									<span>Quantity</span>
								</div>
								<div className="one-eight text-center">
									<span>Total</span>
								</div>
								<div className="one-eight text-center px-4">
									<span>Remove</span>
								</div>
							</div>


							{
								cartProduct.map((product) => {
									return (
										<div className="product-cart d-flex">
											<div className="one-forth">
												<div className="product-img" >
													<img style={{ width: "100px" }} src={product.image} alt="Product-Img" />
												</div>
												<div className="display-tc">
													<h3>{product.name}</h3>
												</div>
											</div>
											<div className="one-eight text-center">
												<div className="display-tc">
													<span className="price">₹ {product.price} /-</span>
												</div>
											</div>
											<div className="one-eight text-center">
												<div className="display-tc d-flex align-items-center justify-content-center">
													<button onClick={() => decrementProductQuantity(product._id)} className="btn btn-sm btn-outline-primary me-2">-</button>
													<input
														type="text"
														id="quantity"
														name="quantity"
														className="form-control input-number text-center"
														value={product.quantity}
														min="1"
														max="100"
														style={{ width: "50px" }} // Adjust width for better alignment
													/>
													<button onClick={() => incrementProductQuantity(product._id)} className="btn btn-sm btn-outline-primary ms-2">+</button>
												</div>
											</div>

											<div className="one-eight text-center">
												<div className="display-tc">
													<span className="price">₹ {parseInt(product.price) * product.quantity} /-</span>
												</div>
											</div>
											<div className="one-eight text-center">
												<div className="display-tc">
													<button onClick={() => removeCartItem(product._id)} className="btn btn-sm btn-outline-dark ms-2">X</button>
												</div>
											</div>
										</div>

									)
								})
							}




						</div>
					</div>


					<div className="row row-pb-lg">
						<div className="col-md-12">
							<div className="total-wrap">
								<div className="row">
									<div className="col-sm-8">
										<form action="#">
											<div className="row form-group">
												<div className="col-sm-9 d-flex">
													<input onChange={(e) => setDiscount(e.target.value)} type="text" name="quantity" className="form-control input-number" placeholder="Your Coupon Number..." />
													<button onClick={handleDiscount} className="btn btn-primary ms-2">Apply Coupon</button>
												</div>
												<div className="col-sm-5">
													{/* <input type="text" value="Apply Coupon" className="btn btn-primary" /> */}
												</div>
											</div>
										</form>
									</div>
									<div className="col-sm-4 text-center">
										<div className="total">
											<div className="sub">
												<p><span>Subtotal:</span> <span>₹ {subtotal} /-</span></p>
												<p><span>Delivery:</span> <span>₹ 50.00 /-</span></p>
												<p><span>Discount:</span> <span>₹ {discountAmount}.00 /-</span></p>
											</div>
											<div className="grand-total">
												<p><span><strong>Total:</strong></span> <span>₹ {subtotal + 50 - discountAmount} /-</span></p>
											</div>
										</div>
										<button onClick={proceedToCheckout} className="btn btn-primary mt-4">Proceed to Checkout</button>
									</div>
								</div>
							</div>
						</div>
					</div>


				</div>
			</div>



		</div>
	)
}

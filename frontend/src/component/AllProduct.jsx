import axios from 'axios';
import React, { useEffect, useState } from 'react';

function AllProduct() {

	const [data, setData] = useState([]);
	const [filteredProducts, setFilteredProducts] = useState([]);
	const [categories, setCategories] = useState([]);
	const [brands, setBrands] = useState([]);

	useEffect(() => {
		axios.get("http://localhost:8080/products")
			.then((res) => {
				setData(res.data.data);
				setFilteredProducts(res.data.data);
				const uniqueCategories = [...new Set(res.data.data.map(item => item.category))];
				setCategories(uniqueCategories);
				const uniqueBrands = [...new Set(res.data.data.map(item => item.brand))];
				setBrands(uniqueBrands);
			});
	}, []);

	function filterByCategory(category) {
		const filtered = data.filter(product => product.category === category);
		setFilteredProducts(filtered);
	}

	function filterByBrand(brand) {
		const filtered = data.filter(product => product.brand === brand);
		setFilteredProducts(filtered);
	}

	function resetFilters() {
		setFilteredProducts(data);
	}

	function addToCart(product) {
		let cartProduct = JSON.parse(localStorage.getItem("cart")) || [];
		let existingProduct = cartProduct.find(item => item._id === product._id);
		if (existingProduct) {
			existingProduct.quantity += 1;
		} else {
			product.quantity = 1;
			cartProduct.push(product);
		}
		localStorage.setItem("cart", JSON.stringify(cartProduct));
		location.reload();
	};

	return (
		<div className="mt-5">
			<div className="container">
				<div className="row">
					<div className="col-lg-3 col-xl-3">
						<div className="row">
							<div className="col-sm-12">
								<div className="side border mb-1 text-start">
									<h3 className='text-center'>Category</h3>
									<ul>
										{categories.map((category, index) => (
											<li key={index}><a href="#" onClick={() => filterByCategory(category)}>{category}</a></li>
										))}
									</ul>
								</div>
							</div>
							<div className="col-sm-12">
								<div className="side border mb-1 text-start">
									<h3 className='text-center'>Brand</h3>
									<ul>
										{brands.map((brand, index) => (
											<li key={index}><a href="#" onClick={() => filterByBrand(brand)}>{brand}</a></li>
										))}
									</ul>
								</div>
							</div>
							<div className="col-sm-12 text-center mt-2">
								<button onClick={resetFilters} className="btn btn-secondary">Reset Filters</button>
							</div>
						</div>
					</div>
					<div className="col-lg-9 col-xl-9">
						<div className="row row-pb-md">
							{filteredProducts.map((product, i) => (
								<div key={i} className="col-lg-4 mb-4 text-center">
									<div className="product-entry border">
										<a href="#" className="prod-img">
											<img style={{width: "200px", height: "200px"}} src={product.image} className="img-fluid" alt="Product" />
										</a>
										<div className="desc">
											<h2><a href="#">{product.name}</a></h2>
											<h4 className="price">₹ {product.price}/-</h4>
											<span className="price"><del>₹ {product.mrp}/-</del></span>
											<button onClick={() => addToCart(product)} className='btn btn-primary'>Add to Cart</button>
										</div>
									</div>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default AllProduct;

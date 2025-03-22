import React from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'

function Sidebar() {

    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("AdminUser");
        navigate("/");
    };

    return (
        <>
            <div className="row">
                <div className="col-lg-2">
                    <nav id="sidebarMenu" className="collapse d-lg-block sidebar collapse bg-white">
                        <div className="position-sticky">
                            <div className="list-group list-group-flush mx-3 mt-4">
                                <Link to={"/admin"}
                                    href="#"
                                    className="list-group-item list-group-item-action py-2 ripple"
                                    aria-current="true"
                                >
                                    <i className="fas fa-tachometer-alt fa-fw me-3"></i><span>Dashboard</span>
                                </Link>
                                <Link to={"/admin/addproduct"}>
                                    <a href="#" className="list-group-item list-group-item-action py-2 ripple">
                                        <i className="fas fa-chart-area fa-fw me-3"></i><span>Add Product</span>
                                    </a>
                                </Link>
                                <Link to={"/admin/products"}>
                                    <a href="#" className="list-group-item list-group-item-action py-2 ripple"
                                    ><i className="fas fa-lock fa-fw me-3"></i><span>Products</span></a
                                    >
                                </Link>
                                <Link to={"/admin/razorpaySettlements"}>
                                    <a href="#" className="list-group-item list-group-item-action py-2 ripple"
                                    ><i className="fas fa-lock fa-fw me-3"></i><span>Razorpay Settlements</span></a>
                                </Link>
                                <Link to={"/admin/orders"}>
                                    <a href="#" className="list-group-item list-group-item-action py-2 ripple"
                                    ><i className="fas fa-chart-line fa-fw me-3"></i><span>Orders</span></a
                                    >
                                </Link>
                                <Link to={"/admin/customers"} href="#" className="list-group-item list-group-item-action py-2 ripple">
                                    <i className="fas fa-chart-pie fa-fw me-3"></i><span>Customers</span>
                                </Link>
                                <button onClick={handleLogout} href="#" className="list-group-item list-group-item-action py-2 ripple"
                                ><i className="fas fa-chart-bar fa-fw me-3"></i><span>Logout</span></button >
                            </div>
                        </div>
                    </nav>
                </div >
                <div className="col-lg-10">
                    <Outlet />
                </div>
            </div >
        </>
    )
}

export default Sidebar

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import * as XLSX from "xlsx";

export default function Customers() {
    const [customers, setCustomers] = useState([]);
    const [selectedCustomer, setSelectedCustomer] = useState(null);

    function loadData() {
        axios.get(import.meta.env.VITE_BASEURL + "/customers")
            .then((res) => {
                setCustomers(res.data.data);
            });
    }

    useEffect(() => {
        loadData();
    }, []);

    const exportToExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(customers);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Customers");
        XLSX.writeFile(workbook, "customers.xlsx");
    };

    function handleDelete(id) {
        // alert(id)
        axios.delete(import.meta.env.VITE_BASEURL + "/customers/" + id)
            .then((res) => {
                loadData();
            });
    };

    return (
        <div className="container-fluid mt-1">
            <div className="d-flex justify-content-between mb-3">
                <h2 className="text-primary">👥 Customer List</h2>
                <button className="btn btn-success" onClick={exportToExcel}>Export to Excel 📥</button>
            </div>

            <div className="table-responsive">
                <table className="table table-hover shadow-lg text-center">
                    <thead className="table-dark">
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">First Name</th>
                            <th scope="col">Last Name</th>
                            <th scope="col">Email</th>
                            <th scope="col">Mobile</th>
                            <th scope="col">Password</th>
                            <th scope="col">Details</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {customers.map((customer, i) => (
                            <tr key={customer._id}>
                                <th scope="row">{i + 1}</th>
                                <td>{customer.firstName}</td>
                                <td>{customer.lastName}</td>
                                <td>{customer.email}</td>
                                <td>{customer.mobile}</td>
                                <td>{customer.password}</td>
                                <td>
                                    <button
                                        className="btn btn-info"
                                        data-bs-toggle="modal"
                                        data-bs-target="#customerModal"
                                        onClick={() => setSelectedCustomer(customer)}
                                    >
                                        View Details 🔍
                                    </button>
                                </td>
                                <td>
                                    {/* <button onClick={() => handleUpdate(customer._id)} className="btn btn-success"><i class="fa-solid fa-pencil"></i></button> */}
                                    <button onClick={() => handleDelete(customer._id)} className="btn btn-danger"><i class="fa-solid fa-trash"></i></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Bootstrap Modal */}
            <div className="modal fade" id="customerModal" tabIndex="-1" aria-labelledby="customerModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="customerModalLabel">Customer Profile</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            {
                                // console.log(selectedCustomer)

                                selectedCustomer && (
                                    <ul className="list-group">
                                        <li className="list-group-item"><strong>First Name:</strong> {selectedCustomer.firstName}</li>
                                        <li className="list-group-item"><strong>Last Name:</strong> {selectedCustomer.lastName}</li>
                                        <li className="list-group-item"><strong>Email:</strong> {selectedCustomer.email}</li>
                                        <li className="list-group-item"><strong>Mobile:</strong> {selectedCustomer.mobile}</li>
                                        <li className="list-group-item"><strong>Password:</strong> <span className="text-muted">(Hidden)</span></li>
                                        <li className="list-group-item"><strong>Company Name:</strong> {selectedCustomer.companyName || "N/A"}</li>
                                        <li className="list-group-item"><strong>Address:</strong> {selectedCustomer.address.address}, {selectedCustomer.address.city}, {selectedCustomer.address.state} - {selectedCustomer.address.zip}</li>
                                    </ul>
                                )
                            }
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
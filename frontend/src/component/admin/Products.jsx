import React, { useEffect, useState } from 'react';
import axios from 'axios';
import * as XLSX from 'xlsx';
import { Link } from 'react-router-dom';

export default function Products() {

  const [productData, setProductData] = useState(undefined);
  const [productError, setProductError] = useState("")

  function loadData() {
    axios.get(import.meta.env.VITE_BASEURL + "/products")
      .then((res) => {
        // console.log(res.data.data);
        setProductData(res.data.data)
      }).catch((err) => {
        setProductError("Server Down !!!")
      })
  };

  useEffect(() => {
    loadData();
  }, []);

  function handleDelete(id) {
    axios.delete(import.meta.env.VITE_BASEURL + "/products/" + id)
      .then((res) => {
        console.log(res.data);
        loadData();
      });
  };


  // Export Data to Excell
  function exportToExcel() {
    if (!productData || productData.length === 0) {
      alert("No data to export!");
      return;
    }
  
    const worksheet = XLSX.utils.json_to_sheet(productData.map((item, i) => ({
      SNo: i + 1,
      Name: item.name,
      Price: item.price,
      MRP: item.mrp,
      Quantity: item.pquantity,
      Image: item.image,
    })));
  
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Products");
  
    XLSX.writeFile(workbook, "products.xlsx");
  }
  


  return (

    <>

      <div className="container-fluid mt-1">
        <div className="d-flex justify-content-between mb-3">
          <h2 className="text-primary">📦 Product List</h2>
          <button className="btn btn-success" onClick={exportToExcel}>Export to Excel 📥</button>
        </div>
      </div>

      <div className='table-responsive'>
        <table className="table table-bordered table-hover shadow-lg text-center">
          <thead className='table-dark'>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Image</th>
              <th scope="col">Title</th>
              <th scope="col">Price</th>
              <th scope="col">MRP</th>
              <th scope="col">Quantity</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {

              productData

                ?

                productData.map((eachData, i) => {
                  return (
                    <tr key={i}>
                      <th scope="row">{i + 1}</th>
                      <td>
                        <img style={{ width: "50px", height: "50px" }} src={eachData.image} alt="" />
                      </td>
                      <td>{eachData.name}</td>
                      <td>{eachData.price}</td>
                      <td>{eachData.mrp}</td>
                      <td>{eachData.pquantity}</td>
                      <td>
                        <Link to={"/admin/addproduct/" + eachData._id}>
                          <button className='btn btn-primary'><i className="fa-solid fa-pencil"></i></button>
                        </Link>
                        <button onClick={() => handleDelete(eachData._id)} className='btn btn-danger'><i className="fa-solid fa-trash"></i></button>
                      </td>
                    </tr>
                  )
                })

                :
                // <div class="alert alert-danger" role="alert">
                //   A simple danger alert—check it out!
                // </div>

                <tr>
                  <td colSpan="6" className="text-center">
                    <div class="alert alert-danger" role="alert">
                      Server Down !!!
                      {/* <h1 className='text-danger'>{productError}</h1> */}
                    </div>
                  </td>
                </tr>
            }

          </tbody>
        </table>

      </div>
    </>

  )
}

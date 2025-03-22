import React, { useEffect, useState } from 'react';
import axios from 'axios';
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
        console.log(err);
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


  return (
    <div className='table-responsive'>
      <table className="table table-hover shadow-lg text-center">
        <thead className='table-dark'>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Image</th>
            <th scope="col">Title</th>
            <th scope="col">Price</th>
            <th scope="col">MRP</th>
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
                      <img style={{ width: "50px" }} src={eachData.image} alt="" />
                    </td>
                    <td>{eachData.name}</td>
                    <td>{eachData.price}</td>
                    <td>{eachData.mrp}</td>
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
  )
}

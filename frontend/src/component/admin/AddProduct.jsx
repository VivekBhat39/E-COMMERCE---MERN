import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

function AddProduct() {
  let navigate = useNavigate();
  let { productId } = useParams();

  const [imageFile, setImageFile] = useState(null);
  const [data, setData] = useState({
    name: "",
    category: "",
    price: "",
    mrp: "",
    image: "",
    brand: "",
    color: "",
    size: "",
    description: ""
  });

  const handleFileChange = (e) => {
    // console.log(e.target.files[0]);
    setImageFile(e.target.files[0]);
  };

  const handleChange = (e) => {
    setData({ ...data, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(data);

    const formData = new FormData();
    if (imageFile) formData.append("image", imageFile);
    formData.append("name", data.name);
    formData.append("category", data.category);
    formData.append("price", data.price);
    formData.append("mrp", data.mrp);
    formData.append("brand", data.brand);
    formData.append("color", data.color);
    formData.append("size", data.size);
    formData.append("description", data.description);


    console.log("Submitting Data:", Object.fromEntries(formData.entries()));
    // console.log(formData);


    try {
      if (productId) {
        await axios.put(`${import.meta.env.VITE_BASEURL}/products/${productId}`, formData, {
          headers: { "Content-Type": "multipart/form-data" }
        });

        navigate("/admin/products")
      } else {
        await axios.post(`${import.meta.env.VITE_BASEURL}/products`, formData, {
          headers: { "Content-Type": "multipart/form-data" }
        });
      }

      setData({
        name: "",
        category: "",
        price: "",
        mrp: "",
        image: "",
        brand: "",
        color: "",
        size: "",
        description: ""
      });
      setImageFile(null);
    } catch (error) {
      console.error("Error:", error.response?.data || error);
    }
  };


  useEffect(() => {

    if (productId) {
      axios.get(`${import.meta.env.VITE_BASEURL}/products/${productId}`)
        .then((res) => {
          console.log(res.data.data);

          const product = res.data.data;
          setData({
            name: product.name,
            category: product.category,
            price: product.price,
            mrp: product.mrp,
            image: product.image,
            brand: product.brand,
            color: product.color,
            size: product.size,
            description: product.description
          });
        })
        .catch((err) => console.error("Error fetching product:", err));
    }
  }, [productId]);

  return (
    <div>
      <section className="vh-100 gradient-custom">
        <div className="row justify-content-center">
          <div className="col-md-12">
            <div className="card shadow-sm card-registration" style={{ borderRadius: "15px" }}>
              <div className="card-body p-4 p-md-5">
                <form onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-md-6 mb-4">
                      <label className="form-label" htmlFor="name">Title</label>
                      <input value={data.name} onChange={handleChange} type="text" id="name" className="form-control form-control-lg" />
                    </div>
                    <div className="col-md-6 mb-4">
                      <label className="form-label" htmlFor="category">Category</label>
                      <select value={data.category} onChange={handleChange} className="form-control" id="category">
                        <option value="">Select Category</option>
                        <option value="male" id="">male</option>
                        <option value="female" id="">female</option>
                        <option value="kids" id="">kids</option>
                      </select>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-4 mb-4">
                      <label className="form-label" htmlFor="price">Price</label>
                      <input value={data.price} onChange={handleChange} type="text" className="form-control form-control-lg" id="price" />
                    </div>
                    <div className="col-md-4 mb-4">
                      <label className="form-label" htmlFor="mrp">MRP</label>
                      <input value={data.mrp} onChange={handleChange} type="text" className="form-control form-control-lg" id="mrp" />
                    </div>
                    <div className="col-md-4 mb-4">
                      <label className="form-label" htmlFor="image">Image</label>
                      <input type="file" accept="image/*" className="form-control form-control-lg" id="image" onChange={handleFileChange} />
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-4 mb-4">
                      <label className="form-label" htmlFor="brand">Brand</label>
                      <input value={data.brand} onChange={handleChange} type="text" className="form-control form-control-lg" id="brand" />
                    </div>
                    <div className="col-md-4 mb-4">
                      <label className="form-label" htmlFor="color">Color</label>
                      <input value={data.color} onChange={handleChange} type="text" className="form-control form-control-lg" id="color" />
                    </div>
                    <div className="col-md-4 mb-4">
                      <label className="form-label" htmlFor="size">Size</label>
                      <input value={data.size} onChange={handleChange} type="text" className="form-control form-control-lg" id="size" />
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6 mb-4 pb-2">
                      <label className="form-label" htmlFor="description">Description</label>
                      <textarea value={data.description} onChange={handleChange} className="form-control border border-secondary border-5" id="description"></textarea>
                    </div>
                  </div>

                  <div className="mt-4 pt-2">
                    <button type="submit" className="btn btn-primary btn-lg">Submit</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default AddProduct;

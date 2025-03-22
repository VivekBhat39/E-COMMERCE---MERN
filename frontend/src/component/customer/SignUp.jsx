import React, { useState } from 'react';
import brandImg from '../../assets/images/brand_logo.jpg';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function SignUp() {

    let navigate = useNavigate();
    const [data, setData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        mobile: "",
        password: "",
        address: ""
    });

    function handleChange(e) {
        setData({ ...data, [e.target.id]: e.target.value })
    };

    function handleSubmit(e) {
        e.preventDefault();
        // console.log(data);

        if (!data.firstName || !data.lastName || !data.email || !data.mobile || !data.password) {
            alert("All Fields are Mandatory !!!")
        } else {

            axios.post(import.meta.env.VITE_BASEURL + "/customers/signup", data)
                .then((res) => {
                    console.log(res.data.data);
                    localStorage.setItem("_id", res.data.data._id)
                    navigate("/")
                });

            setData({
                firstName: "",
                lastName: "",
                email: "",
                mobile: "",
                address: "",
                password: ""
            })
        }
    }

    return (
        <>
            <section class="bg-light p-3 p-md-4 p-xl-5">
                <div class="container">
                    <div class="row justify-content-center">
                        <div class="col-12 col-xxl-11">
                            <div class="card border-light-subtle shadow-sm">
                                <div class="row g-0">
                                    <div class="col-12 col-md-6">
                                        <img class="img-fluid rounded-start w-100 h-100 object-fit-cover" loading="lazy" src={brandImg} alt="Welcome back you've been missed!" />
                                    </div>
                                    <div class="col-12 col-md-6 d-flex align-items-center justify-content-center">
                                        {/* <div class="col-12 col-lg-11 col-xl-10"> */}
                                        <div class="">
                                            <div class="card-body p-3 p-md-4 p-xl-5">
                                                <div class="row">
                                                    <div class="col-12">
                                                        <div class="mb-5">
                                                            <div class="text-center mb-4">
                                                                <Link to={"/"}>
                                                                    <a>
                                                                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcnBZPHn2UE-Jnad9N0Kj-Lneq4QxJA4XKjA&s" alt="BootstrapBrain Logo" width="175" height="57" />
                                                                    </a>
                                                                </Link>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <form action="#!">
                                                    <div class="row gy-3 overflow-hidden">
                                                        <div class="col-12">
                                                            <div class="form-floating mb-3">
                                                                <input onChange={handleChange} value={data.firstName} type="text" class="form-control" name="firstName" id="firstName" placeholder="First Name" required />
                                                                <label for="firstName" class="form-label">First Name</label>
                                                            </div>
                                                        </div>
                                                        <div class="col-12">
                                                            <div class="form-floating mb-3">
                                                                <input onChange={handleChange} value={data.lastName} type="text" class="form-control" name="lastName" id="lastName" placeholder="First Name" required />
                                                                <label for="lastName" class="form-label">Last Name</label>
                                                            </div>
                                                        </div>
                                                        <div class="col-12">
                                                            <div class="form-floating mb-3">
                                                                <input onChange={handleChange} value={data.email} type="email" class="form-control" name="email" id="email" placeholder="name@example.com" required />
                                                                <label for="email" class="form-label">Email</label>
                                                            </div>
                                                        </div>
                                                        <div class="col-12">
                                                            <div class="form-floating mb-3">
                                                                <input onChange={handleChange} value={data.mobile} type="text" class="form-control" name="mobile" id="mobile" placeholder="Mobile" required />
                                                                <label for="password" class="form-label">Mobile</label>
                                                            </div>
                                                        </div>
                                                        <div class="col-12">
                                                            <div class="form-floating mb-3">
                                                                <input onChange={handleChange} value={data.password} type="password" class="form-control" name="password" id="password" placeholder="Password" required />
                                                                <label for="password" class="form-label">Password</label>
                                                            </div>
                                                        </div>
                                                        <div class="col-12">
                                                            <div class="form-check">
                                                                <input class="form-check-input" type="checkbox" name="iAgree" id="iAgree" required />
                                                                <label class="form-check-label text-secondary" for="iAgree" >
                                                                    I agree to the <a href="#!" class="link-primary text-decoration-none">terms and conditions</a>
                                                                </label>
                                                            </div>
                                                        </div>
                                                        <div class="col-12">
                                                            <div class="d-grid">
                                                                <button onClick={handleSubmit} class="btn btn-dark btn-lg" type="submit">Sign up</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </form>
                                                <div class="row">
                                                    <div class="col-12">
                                                        <p class="mb-0 mt-5 text-secondary text-center">Already have an account? <a class="link-primary text-decoration-none">Sign in</a></p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div >
            </section >
        </>
    )
}

export default SignUp
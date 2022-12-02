
import React, { useState } from "react";
import { json, useNavigate } from "react-router-dom";
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Signin = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const addSignin = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:8000/api/auth/signin", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ name: name, email: email, password: password, phone: phone })
            })
            const res = await response.json();
            if (res.success) {
                toast.success(res.msg, {
                    position: "top-right",
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                  });
                // localStorage.setItem("token", res.token);
                // localStorage.setItem("userId",res.userId);
                navigate("/login");
            } else {
                toast.error(res.msg, {
                    position: "top-center",
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                })
            }
        } catch (err) {
            console.log("Signin Error is ", err);
        }
    }
    return (
        <div className="container mt-5">
        <ToastContainer />
            <div className="d-flex justify-content-center">
                <form onSubmit={(e) => addSignin(e)}>
                    <div className="row text-start">
                        <h3 className="p-2 text-light bg-dark text-center">Create Account</h3>
                        <div className="col-md-6">
                            <div className="form-outline mb-4">
                                <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} className="form-control" placeholder="Enter name" />
                                <label className="form-label" htmlFor="name">
                                    Enter Name
                                </label>
                            </div>
                        </div>

                        <div className="col-md-6">
                            <div className="form-outline mb-4">
                                <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" placeholder="Enter email" />
                                <label className="form-label" htmlFor="email">
                                    Email address
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="row text-start">
                        <div className="col-md-6">
                            <div className="form-outline mb-4">
                                <input type="number" id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} className="form-control" placeholder="Enter phone Number" />
                                <label className="form-label" htmlFor="phone">
                                    Phone Number
                                </label>
                            </div>
                        </div>

                        <div className="col-md-6">
                            <div className="form-outline mb-4">
                                <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control" placeholder="Enter Password" />
                                <label className="form-label" htmlFor="password">
                                    Password
                                </label>
                            </div>
                        </div>

                        <button type="submit" className="btn btn-primary btn-block mb-4">
                            Sign in
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
export default Signin;

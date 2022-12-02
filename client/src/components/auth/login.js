import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("deepak@nirvaat.in");
  const [password, setPassword] = useState("a");

  const checkAuth = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify({ email: email, password: password })
      });

      const res = await response.json();

      if (res.success) {
        localStorage.setItem("token", res.token);
        localStorage.setItem("userId",res.userId);
        toast.success(res.msg, {
          "position": "top-center",
          "closeOnClick": true,
          "pouseOnClick": true,
          "dragable": true
        })
        navigate("/");
      } else {
        toast.error(res.msg, {
          "position": "top-center",
          "closeOnClick": true,
          "pouseOnClick": true,
          "dragable": true
        })
      }
    } catch (err) {
      console.log("Login Authentication is not working ", err)
    }

  }
  return (
    <div className="container mt-5">
    <ToastContainer />
      <div className="row d-flex justify-content-center">
        <div className="col-md-4 text-start">
          <h3 className="p-2 text-light bg-dark text-center">Login Form</h3>
          <form onSubmit={(e) => checkAuth(e)}>
            <div className="form-outline mb-4">
              <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" placeholder="Enter email" />
              <label className="form-label" htmlFor="email">Email address</label>
            </div>

            <div className="form-outline mb-4">
              <input type="password" value={password} id="password" onChange={(e) => setPassword(e.target.value)} className="form-control" placeholder="Enter Password" />
              <label className="form-label" htmlFor="password">Password</label>
            </div>

            <button type="submit" className="btn btn-primary btn-block mb-4">Sign in</button>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Login;

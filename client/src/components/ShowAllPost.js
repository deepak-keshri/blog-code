import React, { useState, useEffect } from "react";
import { NavLink } from 'react-router-dom'
import '../App.css'

const ShowAllPost = () => {
    const [data, setData] = useState(null);

    useEffect(() => {
        getAllPost();
    })
    // useEffect(() => {
    //     console.log(data);
    // },[data])

    const getAllPost = async () => {
        const response = await fetch("http://localhost:8000/api/getAllPost", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify()
        });
        const res = await response.json();
        if (res.success) {
            setData(res.data);
        }
    }

    return (
        <div className="container mt-5">
            {data && data.map((item, index) => (
                <NavLink to="/ShowPost" className="nav-link">
                    <div className="card mb-3 overflow-hidden" key={item.id} style={{maxHeight: "300px"}}>
                        <div className="card-body">
                            <h5 className="card-title">{item.title}</h5>
                            <hr />
                            <p className="card-text">{(item.content)}</p>
                            <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>
                        </div>
                    </div>
                </NavLink>
            ))}
        </div>
    )
}
export default ShowAllPost;
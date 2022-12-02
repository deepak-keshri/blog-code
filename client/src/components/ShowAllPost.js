import React, { useState, useEffect } from "react";
import { NavLink } from 'react-router-dom'
import '../App.css'
import Edit from '@mui/icons-material/Edit';
import Visibility from '@mui/icons-material/Visibility';
import Fab from '@mui/material/Fab';
// import DeleteIcon from '@mui/icons-material/Delete';

const ShowAllPost = () => {
    const [data, setData] = useState(null);
    const [isUser, setUser] = useState(null);

    useEffect(() => {
        setUser(localStorage.getItem('userId'));
        getAllPost();
    }, [])

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
                <div key={index} className="">
                    <div className="card mb-3 overflow-hidden" style={{ maxHeight: "300px" }}>
                        <div className="card-body">
                            <NavLink to={`/view/${item.id}`} key={index} className="nav-link">
                                <h5 className="card-title">{item.title}</h5>
                                <hr />
                                <p className="card-text" style={{ maxHeight: "140px", overflow: "hidden" }}>{(item.content)}</p>
                            </NavLink>
                            <p className="card-text d-flex justify-content-between">
                                <small className="text-muted">written 8 weaks ago</small>
                                {isUser === item.userId ?
                                    <small>
                                        <NavLink to={`/view/${item.id}`} >
                                            <Fab size="small" sx={{ mr: 1 }} >
                                                <Visibility color="success" />
                                            </Fab>
                                        </NavLink>
                                        <NavLink to={`/edit/${item.id}`} >
                                            <Fab size="small">
                                                <Edit color="secondary" />
                                            </Fab>
                                        </NavLink>
                                    </small>
                                    : null
                                }
                            </p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}
export default ShowAllPost;
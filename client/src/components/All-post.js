import React, { useState, useEffect } from 'react';
import { json, NavLink } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { confirmAlert } from 'react-confirm-alert'
import 'react-confirm-alert/src/react-confirm-alert.css';
// import addPost from './Add-post';

const AllPost = () => {
    const [allData, setData] = useState(null);

    useEffect(function () {
        getAllPost();
    }, [])

    const getAllPost = async () => {
        try {
            const response = await fetch("http://localhost:8000/api/allpost", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(),
            })
            const res = await response.json();
            if (res.success) {
                setData(res.data);
            }
        }
        catch (err) {
            console.log("Fetch data showing Error", err);
        }
    }

    const isDelete = (id) => {
        confirmAlert({
            title: 'Confirm Delete',
            message: 'Are you sure, you want to delete ?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => deletePost(id)
                },
                {
                    label: 'No',
                }
            ]
        });
    }
    const deletePost = async (id) => {
        const response = await fetch(`http://localhost:8000/api/delete`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ id: id })
        });
        const res = await response.json();
        if (res.success) {
            getAllPost();
        } else {
            toast.error(res.msg, {
                position: "top-center",
                closeOnClick: true,
                pouseOnClick: true,
                draggable: true

            })
        }
    }
    // const editPost = async (id) => {
    //     const response = await fetch("http://localhost:8000/api/addpost", {
    //         method: "GET",
    //         headers: {
    //             "Content-Type": "application/json"
    //         },
    //         body: JSON.stringify({ id: id })
    //     });
    //     const res = await response.json();
    //     console.log(res);
    // }
    return (
        <div className='container mt-5'>
            <ToastContainer />
            <NavLink to="/add-post" className="btn btn-info">Add POST</NavLink>

            <table className='mt-5 table table-striped table-hover table-bordered'>
                <thead className='bg-dark text-light text-center p-5'>
                    <tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Created</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {allData && allData.map((item, index) => (
                        <tr key={item.id}>
                            <td>{index + 1}</td>
                            <td>{item.title.charAt(0).toUpperCase() + item.title.slice(1)}</td>
                            <td>{item.createdAt}</td>
                            <td>
                                {/* <button className='btn btn-info'>View</button> */}
                                <NavLink to={`/view/${item.id}`} className="btn btn-info">View</NavLink>
                                {/* <button className='btn btn-primary me-2 ms-2' onClick={() => editPost(item.id)}>Edit</button> */}
                                <NavLink to={`/edit/${item.id}`} className="btn btn-primary me-2 ms-2">Edit</NavLink>
                                <button className='btn btn-danger' onClick={() => isDelete(item.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
export default AllPost;
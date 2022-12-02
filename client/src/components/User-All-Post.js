import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { confirmAlert } from 'react-confirm-alert'
import moment from 'moment';
import 'react-confirm-alert/src/react-confirm-alert.css';
import Fab from '@mui/material/Fab';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityButton from '@mui/icons-material/Visibility'
import EditIcon from '@mui/icons-material/Edit';

const AllPost = () => {
    const [allData, setData] = useState(null);
    const [auth, setAuth] = useState(localStorage.getItem("token"));

    useEffect(function () {
        // setAuth(()=>localStorage.getItem("token")); 
        getAllPost();
    }, [])

    const getAllPost = async () => {
        try {
            // console.log(localStorage.getItem("token"));
            const userId = localStorage.getItem("userId");
            const response = await fetch("http://localhost:8000/api/allpost", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ userId: userId, Auth: auth }),
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
                            <td>{moment(item.createdAt).format('DD-MMM-YYYY hh:mm A')}</td>
                            <td>
                                <NavLink to={`/view/${item.id}`}>
                                    <Fab aria-label='view' color='success' size='small'>
                                        <VisibilityButton color='' sx={{ mr: 0.2 }} />
                                    </Fab>
                                </NavLink>

                                <NavLink to={`/edit/${item.id}`}>
                                    <Fab area-label='edit' sx={{ mr: 0.6, ml: 0.6 }} color='secondary' size='small'>
                                        <EditIcon />
                                    </Fab>
                                </NavLink>

                                <Fab aria-label='delete' color='' size='small' onClick={() => isDelete(item.id)}>
                                    <DeleteIcon color='error' />
                                </Fab>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
export default AllPost;
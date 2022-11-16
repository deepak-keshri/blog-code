import React, { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const AddPost = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const navigate = useNavigate();
    
    const createPost = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:8000/api/addpost", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ title: title, content: content })
            });
            const res = await response.json();
            if (res.success) {
                toast.success(res.msg, {
                    position: "top-center",
                    closeOnClick: true,
                    pouseOnClick: true,
                    draggable: true
                });
                navigate("/all-post");
            } else {
                toast.error(res.msg, {
                    position: "top-center",
                    closeOnClick: true,
                    pouseOnClick: true,
                    draggable: true,
                })
            }
        } catch (err) {
            console.log("Here Error Occure", err)
        }
    }
    return (

        <div className='container mt-5'>
            <ToastContainer />
            <h3>Add Post</h3>
            <div className='row'>
                <Form onSubmit={(e) => createPost(e)}>
                    <Form.Group className='mb-3'>
                        <Form.Control type='text' id="title" placeholder='Enter Title' onChange={(e) => setTitle(e.target.value)} />
                    </Form.Group>

                    <Form.Group className='mb-3'>
                        <Form.Control as="textarea" id="content" rows={15} placeholder='Enter Content' onChange={(e) => setContent(e.target.value)} />
                    </Form.Group>

                    <Button variant='primary' type='submit'>Submit</Button>
                </Form>
            </div>
        </div>
    )
}
export default AddPost;
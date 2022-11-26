import { ToastContainer } from "react-toastify";
import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";


const Edit = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        getPost()
    }, []);

    const updateBlog = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:8000/api/updatepost", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ id: id })
            });
            const res = await response.json();
            console.log(res);
        } catch (err) {
            console.log(err);

        }
    }

    const getPost = async () => {
        // const response = await axios.get(`http://localhost:8000/api/getpost:${id}`);
        const response = await fetch("http://localhost:8000/api/getpost", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ id: id })
        })
        const res = await response.json();
        setTitle(res.data.title)
        setContent(res.data.content)
    }
    return (
        <div className='container mt-5'>
            <ToastContainer />
            <h3>Add Post</h3>
            <div className='row'>
                <Form onSubmit={(e) => updateBlog(e)}>
                    <Form.Group className='mb-3'>
                        <Form.Control type='text' id="title" placeholder='Enter Title' value={title} onChange={(e) => setTitle(e.target.value)} />
                    </Form.Group>

                    <Form.Group className='mb-3'>
                        <Form.Control as="textarea" id="content" rows={15} placeholder='Enter Content' value={content} onChange={(e) => setContent(e.target.value)} />
                    </Form.Group>

                    <Button variant='success' type='submit'>Update</Button>
                </Form>
            </div>
        </div>
    );
}
export default Edit;
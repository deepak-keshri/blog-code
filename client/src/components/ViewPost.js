import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";

const View = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const { id } = useParams();
    useEffect(() => {
        getBlogPost();
    }, []);

    const getBlogPost = async () => {
        const response = await fetch("http://localhost:8000/api/getpost", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ id: id })
        });
        const res = await response.json();
        setTitle(res.data.title);
        setContent(res.data.content);
    }
    return (
        <div className="container mb-2 mt-3">
            <NavLink to={`/all-post`} className="btn btn-success">Back</NavLink>
            <h2 className="mt-5">{title}</h2>
            <hr />
            <div>{content}</div>
        </div>
    );
}
export default View;
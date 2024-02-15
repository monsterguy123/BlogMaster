import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import moment from 'moment'
import './input.css'
import { AiOutlineDelete } from 'react-icons/ai';
import { MdModeEdit } from 'react-icons/md';
import { useFormik } from "formik";

const Viewpost = () => {
    const updateBlog = async () => {
        let res = await axios.put(`http://localhost:4000/api/userpost/update`, { userid: user, data: values })
        if (res.status === 202) {
            navigate(`/viewpost/${user}`)
        }
    }
    const { handleChange, values, handleSubmit } = useFormik({
        initialValues: {
            image: "",
            title: "",
            discription: "",
            PostedBy: "",
            categoary: ""
        },
        onSubmit: updateBlog,           

    });
    const [data, setData] = useState({})
    const [comment, setComment] = useState('')
    const [User, setUser] = useState([])

    const { id } = useParams()
    const Id = localStorage.getItem('userId')
    const navigate = useNavigate()

    useEffect(() => {
        return axios.get(`http://localhost:4000/api/id/${id}`)
            .then(res => setUser(res.data))
    });

    useEffect(() => {
        return axios.post(`http://localhost:4000/api/id`, { id })
            .then(res => setData(res.data.data))
    }, [id]);

    const image = data.image
    const title = data.title;
    const discription = data.discription;
    // const by = data.PostedBy
    const user = data.user

    const DeletePost = async () => {
        let res = await axios.put(`http://localhost:4000/api/id`, { userid: id })
        if (res.status === 201) {
            navigate('/')
        }
    }
    const Sendcomment = async () => {
        setComment('')
        await axios.post(`http://localhost:4000/api/userpost/comment`, { comment, user: Id, post: id, date: moment().format('MMMM Do YYYY, h:mm:ss a'), })
    }

    const DeleteComment = async (iD) => {
        await axios.put(`http://localhost:4000/api/userpost/comment/${iD}`)
    }

    return (
        <div id="main-content" className="blog-page">
            <div className="container">
                <div className="row clearfix">
                    <div className="col-lg-12 col-md-12 left-box">
                        <div className="card single_post">
                            <div className="body">
                                <div className="img-post">
                                    <img
                                        className="d-block img-fluid"
                                        src={image}
                                        alt="First slide"
                                    />
                                </div>
                                {
                                    user === Id ?
                                        <div className="action-icons">
                                            <AiOutlineDelete onClick={() => DeletePost()} />
                                            <MdModeEdit data-bs-toggle="modal" data-bs-target="#exampleModal" />
                                        </div>
                                        :
                                        null
                                }
                                <h3 className='mt-5'>
                                    <a href="blog-details.html">{title}</a>
                                </h3>
                                <p className='mt-3'>
                                    {discription}
                                </p>
                            </div>
                        </div>
                        <div className="card">
                            <div className="header">
                                {/* {comment.filter((data) => { return data.length })} */}
                                <h2>Comments ({User.length})</h2>
                            </div>
                            <div className="body">
                                <ul className="comment-reply list-unstyled">
                                    {User.map((data, index) => {
                                        return (<li key={index} className="row clearfix">
                                            <div className="icon-box col-md-1 col-4">
                                                <img
                                                    className="img-fluid img-thumbnail"
                                                    src={data.image}
                                                    alt={data.name}
                                                    height="90px"
                                                    style={{ width: 90 }}
                                                />
                                            </div>
                                            <div className="text-box col-md-10 mt-4 col-8 p-l-0 p-r-0">
                                                <h5 className="m-b-0">{data.name}</h5>
                                                <p>
                                                    {data.comment}
                                                </p>
                                                {
                                                    user === Id ?
                                                        <p><AiOutlineDelete style={{ cursor: 'pointer' }} onClick={() => DeleteComment(data._id)} /></p>
                                                        :
                                                        null
                                                }
                                                <ul className="list-inline">
                                                    <li>{data.date}</li>
                                                </ul>
                                            </div>
                                        </li>)
                                    })}
                                </ul>
                            </div>
                        </div>
                        <div className="card">
                            <div className="header">
                                <h2>Leave a comment </h2>
                            </div>
                            <div className="body">
                                <div className="comment-form">
                                    <div className="col-sm-12">
                                        <div className="form-group">
                                            <textarea
                                                rows="4"
                                                value={comment}
                                                onChange={(e) => setComment(e.target.value)} // This line was added
                                                className="form-control no-resize mb-4"
                                                placeholder="Please type what you want..."
                                            ></textarea>
                                        </div>
                                        <button onClick={() => Sendcomment()} className="btn btn-primary">SUBMIT</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={handleSubmit}>
                                    <div className="mb-3">
                                        <label htmlFor="text" className="form-label">Image</label>
                                        <input type="text"
                                            value={values.image}
                                            onChange={handleChange}
                                            name="image" className="form-control" aria-describedby="emailHelp" />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="text" className="form-label">Title</label>
                                        <input value={values.title}
                                            onChange={handleChange}
                                            name="title"
                                            type="text" className="form-control" id="text" aria-describedby="emailHelp" />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="text" className="form-label">Description</label>
                                        <input value={values.discription}
                                            onChange={handleChange}
                                            name="discription"
                                            type="text" className="form-control" id="text" aria-describedby="emailHelp" />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="text" className="form-label">Category</label>
                                        <input value={values.category}
                                            onChange={handleChange}
                                            name="categoary"
                                            type="text" className="form-control" id="text" aria-describedby="emailHelp" />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="text" className="form-label">PostedBy</label>
                                        <input tvalue={values.PostedBy}
                                            onChange={handleChange}
                                            name="PostedBy"
                                            type="text" className="form-control" id="text" aria-describedby="emailHelp" />
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Discard</button>
                                <button type="button" className="btn btn-primary" onClick={handleSubmit} >Update</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Viewpost

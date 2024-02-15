import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";
import './index.css';
import { Elipses } from "..";

const Home = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let url = "http://localhost:3000/api/userpost";
       
        const response = await axios.get(url);
        setPosts(response.data.data);
        console.log(response.data.data)
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  },[]);


  return (
    <>
      <Navbar />
     
      <div className="container">
        <div className="row mt-5">
          {posts.map((post, index) => (
            <div key={index} className="col-md-6 col-lg-4 mt-5 wow fadeInUp" data-wow-delay=".2s">
              <Link to={`/viewpost/${post._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <div className="blog-grid">
                  <div className="blog-grid-img position-relative d-flex align-items-center justify-content-center">
                    <img
                      alt="img"
                      height="250px"
                      src={post.image}
                      style={{ maxWidth: '100%' }}
                    />
                  </div>
                  <div className="blog-grid-text p-4">
                    <h3 className="h5 mb-3">
                      {post.title}
                    </h3>
                    <p className="display-30">
                      {Elipses(post.description, 45)}
                    </p>
                    <div className="meta meta-style2">
                      <ul>
                        <li>
                            <i className="fas fa-user"></i> By: {post.PostedBy}
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;

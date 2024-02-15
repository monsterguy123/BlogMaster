import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Card, CardContent, CardMedia, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import { Elipses } from '../../index'

const Posts = () => {
    const id = localStorage.getItem('userId')
    const [data, setData] = useState([]);
    useEffect(() => {
        return axios.get(`http://localhost:3000/api/userpost/${id}`)
            .then(res => setData(res.data.data))
    }, [id])
    return (
        <Card style={{ overflow: "scroll", height: 500 }}>
            {data.map((data, index) => {
                return (
                    <Link key={index} to={`/viewpost/${data._id}`}><Card key={index} style={{ width: 100, float: "left", margin: "50px 50px" }}>
                        <CardMedia
                            height={100}
                            component={"img"}
                            image={data.image}
                            alt="error"
                        />
                        <CardContent key={index} width={400}>
                            <Typography>{Elipses(data.title, 20)}</Typography>{" "}
                            <Typography>{Elipses(data.discription, 80)}</Typography>{" "}
                        </CardContent>{" "}
                    </Card>
                    </Link>
                );
            })}{" "}
        </Card>
    )
}

export default Posts
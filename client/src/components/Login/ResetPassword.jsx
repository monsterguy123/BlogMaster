import React, { useState } from 'react';
import {useNavigate,useParams} from 'react-router-dom'
import axios from 'axios'

const containerStyle = {
    maxWidth: '400px',
    margin: 'auto',
    marginTop:"200px",
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    backgroundColor: '#f9f9f9',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
};

const titleStyle = {
    fontSize: '24px',
    marginBottom: '20px',
    marginLeft:"70px",
    color: '#333',
};

const inputStyle = {
    width: '100%',
    padding: '10px',
    marginBottom: '20px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    boxSizing: 'border-box',
    fontSize: '16px',
};

const buttonStyle = {
    width: '100%',
    padding: '10px',
    backgroundColor: '#3bb19b',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
    transition: 'background-color 0.3s ease',
};

const buttonHoverStyle = {
    backgroundColor: '#0056b3',
};

const ResetPassword = () => {
    const [password,setPassword] = useState()
    const [bol,setBol] = useState(false)
    const navigate = useNavigate();

    const { userId, token } = useParams();

    const resetButton = async ()=>{
           let res = await axios.post(`http://localhost:3000/api/auth/resetpassword/${userId}/${token}`,{password});
           if(res){
                setBol(true);
                setTimeout(()=>{
                    navigate('/login')
                },3000)
           }
    }

    return (
        <div style={containerStyle}>
            <div>
                <h1 style={titleStyle}>Reset Password</h1>
            </div>
            <div>
                <input onChange={(e)=>setPassword(e.target.value)} style={inputStyle}  type="text" placeholder="change your password..." />
            </div>
            <div>
                <button onClick={resetButton} style={buttonStyle} onMouseOver={e => e.target.style.backgroundColor = buttonHoverStyle.backgroundColor} onMouseOut={e => e.target.style.backgroundColor = buttonStyle.backgroundColor}>
                      SUBMIT
                </button>
            </div>
            <div>
                {bol?<div  style={{width: "370px", padding: "15px",margin: "5px 0",fontSize: "14px",backgroundColor: "#44e752",color: "white",borderRadius: "5px",textAlign: "center",}}>Password has been changed successfully redirect you to login!!!</div>:null}
            </div>
        </div>
    );
};

export default ResetPassword;

import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const VerifyOtp = () => {
  const inputRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];
  const [otp, setOtp] = useState(['', '', '', '']);
  const [timer, setTimer] = useState(30);
  const navigate = useNavigate();

  useEffect(() => {
    let intervalId;
    if (timer > 0) {
      intervalId = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    }
    return () => clearInterval(intervalId);
  }, [timer]);

  const handleInput = (index, event) => {
    const inputLength = event.target.value.length;
    const newOtp = [...otp];
    newOtp[index] = event.target.value;
    setOtp(newOtp);
    if (inputLength === 1 && index < inputRefs.length - 1) {
      inputRefs[index + 1].current.focus();
    } else if (inputLength === 0 && index > 0) {
      inputRefs[index - 1].current.focus();
    }
  };

  const handleResendOTP = async () => {
    await resendOtp();
    setTimer(30); // Reset the timer after resending OTP
  };

  const userId = localStorage.getItem('userId');
  const email = localStorage.getItem('email');

  const sendOtp = async () => {
    const otpString = otp.join(''); 
    let response = await axios.post('http://localhost:3000/api/users/verifyOtp', { userId, otp: otpString });
    if (response.statusText === "OK") {
      window.location.href = "/signup/verified"
    }
  }

  const resendOtp = async () => {
    await axios.post('http://localhost:3000/api/users/resendOtp', { userId, email });
  }

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <h1 style={styles.title}>ENTER OTP TO VERIFY YOUR EMAIL</h1>
        <div style={styles.inputContainer}>
          {[...Array(4)].map((_, index) => (
            <input
              key={index}
              type="text"
              maxLength="1"
              autoFocus={index === 0}
              ref={inputRefs[index]}
              value={otp[index]}
              onChange={(event) => handleInput(index, event)}
              style={styles.input}
            />
          ))}
        </div>
        <div style={styles.buttonContainer}>
          <button style={styles.button} onClick={sendOtp}>Verify</button>
        </div>
        <div style={styles.buttonContainer}>
          <button style={styles.linkButton} onClick={handleResendOTP}>
            Resend OTP {timer > 0 && `(${timer}s)`}
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#f3f3f3",
  },
  content: {
    textAlign: "center",
    backgroundColor: "#fff",
    borderRadius: "20px",
    padding: "3rem",
    boxShadow: "0px 10px 40px -20px black",
  },
  title: {
    fontFamily: "Arial, sans-serif",
    fontSize: "24px",
    color: "#333",
    marginBottom: "2rem",
  },
  inputContainer: {
    display: "flex",
    justifyContent: "center",
    marginBottom: "2rem",
  },
  input: {
    marginRight: "5px",
    width: "50px",
    height: "50px",
    borderRadius: "10px",
    border: "2px solid #ccc",
    textAlign: "center",
    fontSize: "1.5rem",
    fontWeight: "bold",
    fontFamily: "Arial, sans-serif",
    color: "#333",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "center",
    marginTop: "1rem",
  },
  button: {
    padding: "15px 30px",
    margin: "0 10px",
    backgroundColor: "brown",
    color: "#fff",
    border: "none",
    borderRadius: "30px",
    cursor: "pointer",
    fontSize: "1rem",
    fontFamily: "Arial, sans-serif",
    fontWeight: "bold",
    boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.2)",
    transition: "background-color 0.3s ease",
  },
  linkButton: {
    padding: "15px 30px",
    margin: "0 10px",
    color: "black",
    border: "none",
    background: "none",
    cursor: "pointer",
    fontSize: "1rem",
    fontFamily: "Arial, sans-serif",
    textDecoration: "underline",
    transition: "color 0.3s ease",
  },
  linkButtonHover: {
    color: "blue",
  },
};

export default VerifyOtp;

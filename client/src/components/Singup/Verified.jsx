import React from 'react';

const Verified = () => {
    const redirect = () => {
        window.location.href = '/login'; // Corrected line
    }

    return (
        <div style={styles.container}>
            <div style={styles.content}>
                <h1 style={styles.title}>Email Verified Successfully!</h1>
                <p style={styles.subtitle}>You can now proceed to log in.</p>
                <div style={styles.buttonContainer}>
                    <button style={styles.button} onClick={redirect}>Log In</button>
                </div>
            </div>
        </div>
    )
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
        boxShadow: "0px 10px 40px -20px rgba(0, 0, 0, 0.2)",
    },
    title: {
        fontFamily: "Arial, sans-serif",
        fontSize: "32px",
        color: "#333",
        marginBottom: "1rem",
    },
    subtitle: {
        fontFamily: "Arial, sans-serif",
        fontSize: "18px",
        color: "#666",
        marginBottom: "2rem",
    },
    buttonContainer: {
        display: "flex",
        justifyContent: "center",
    },
    button: {
        padding: "15px 30px",
        backgroundColor: "#4CAF50",
        color: "#fff",
        border: "none",
        borderRadius: "30px",
        cursor: "pointer",
        fontSize: "1rem",
        fontFamily: "Arial, sans-serif",
        fontWeight: "bold",
        boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.1)",
        transition: "background-color 0.3s ease",
    },
};

export default Verified;

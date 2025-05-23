import React from "react";

const ContactSeller = () => {
  const seller = {
    name: "John Doe",
    phone: "+1 234 567 890",
    email: "johndoe@example.com",
  };

  const styles = {
    card: {
      maxWidth: "400px",
      margin: "40px auto",
      padding: "20px",
      border: "1px solid #ddd",
      borderRadius: "8px",
      boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
      fontFamily: "Arial, sans-serif",
    },
    heading: {
      fontSize: "24px",
      marginBottom: "20px",
      textAlign: "center",
      color: "#333",
    },
    detail: {
      marginBottom: "10px",
      fontSize: "16px",
    },
    buttons: {
      display: "flex",
      justifyContent: "space-between",
      marginTop: "20px",
    },
    button: {
      padding: "10px 20px",
      backgroundColor: "#007bff",
      color: "#fff",
      textDecoration: "none",
      borderRadius: "4px",
      fontWeight: "bold",
    },
  };

  return (
    <div style={styles.card}>
      <h2 style={styles.heading}>Contact Seller</h2>
      <div style={styles.detail}><strong>Name:</strong> {seller.name}</div>
      <div style={styles.detail}><strong>Phone:</strong> {seller.phone}</div>
      <div style={styles.detail}><strong>Email:</strong> {seller.email}</div>

      <div style={styles.buttons}>
        <a href={`tel:${seller.phone}`} style={styles.button}>Call</a>
        <a href={`mailto:${seller.email}`} style={styles.button}>Email</a>
      </div>
    </div>
  );
};

export default ContactSeller;

import React from 'react';
import { useAuth } from '../context/AuthContext';

const Departments = () => {
  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1>Department Management</h1>
        <p>Organize employees by departments</p>
      </div>

      <div style={styles.card}>
        <h2>Department List</h2>
        <p>Department management features will be implemented here.</p>
        
        <div style={styles.placeholder}>
          <p>🏢 Department CRUD operations coming soon...</p>
          <p>➕ Create new departments</p>
          <p>📋 Manage department details</p>
          <p>👥 Assign employees to departments</p>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '40px 20px',
  },
  header: {
    marginBottom: '30px',
  },
  card: {
    backgroundColor: 'white',
    padding: '30px',
    borderRadius: '12px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
  },
  placeholder: {
    textAlign: 'center',
    padding: '40px',
    color: '#666',
    lineHeight: '1.8',
  },
};

export default Departments;
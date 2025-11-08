import React from 'react';
import { useAuth } from '../context/AuthContext';

const Employees = () => {
  const { user } = useAuth();

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1>Employee Management</h1>
        <p>Manage your organization's employees</p>
      </div>

      <div style={styles.card}>
        <h2>Employee List</h2>
        <p>Employee management features will be implemented here.</p>
        <p><strong>Current Admin:</strong> {user?.name}</p>
        
        <div style={styles.placeholder}>
          <p>📊 Employee CRUD operations coming soon...</p>
          <p>👥 Add, edit, delete employees</p>
          <p>📋 Assign to departments</p>
          <p>👀 View employee details</p>
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

export default Employees;
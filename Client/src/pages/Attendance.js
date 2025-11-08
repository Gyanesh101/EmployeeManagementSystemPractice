import React from 'react';
import { useAuth } from '../context/AuthContext';

const Attendance = () => {
  const { user } = useAuth();

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1>Attendance Tracking</h1>
        <p>Track employee check-ins and check-outs</p>
      </div>

      <div style={styles.card}>
        <h2>Attendance Records</h2>
        <p>Attendance tracking features will be implemented here.</p>
        <p><strong>Current User:</strong> {user?.name}</p>
        
        <div style={styles.placeholder}>
          <p>📅 Attendance system coming soon...</p>
          <p>⏰ Check-in/check-out functionality</p>
          <p>📊 Attendance reports</p>
          <p>📈 Monthly summaries</p>
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

export default Attendance;
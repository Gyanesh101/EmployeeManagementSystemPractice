import React from 'react';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Dashboard</h1>
        <p style={styles.subtitle}>Welcome back, {user?.name}! 👋</p>
      </div>

      <div style={styles.stats}>
        <div style={styles.statCard}>
          <div style={styles.statIcon}>👥</div>
          <h3 style={styles.statNumber}>1</h3>
          <p style={styles.statLabel}>Total Employees</p>
        </div>
        <div style={styles.statCard}>
          <div style={styles.statIcon}>🏢</div>
          <h3 style={styles.statNumber}>0</h3>
          <p style={styles.statLabel}>Departments</p>
        </div>
        <div style={styles.statCard}>
          <div style={styles.statIcon}>📊</div>
          <h3 style={styles.statNumber}>0</h3>
          <p style={styles.statLabel}>Today's Attendance</p>
        </div>
        <div style={styles.statCard}>
          <div style={styles.statIcon}>👑</div>
          <h3 style={styles.statNumber}>{user?.role}</h3>
          <p style={styles.statLabel}>Your Role</p>
        </div>
      </div>

      <div style={styles.content}>
        <div style={styles.card}>
          <h2 style={styles.cardTitle}>User Information</h2>
          <div style={styles.userDetails}>
            <div style={styles.detailItem}>
              <span style={styles.detailLabel}>Name:</span>
              <span style={styles.detailValue}>{user?.name}</span>
            </div>
            <div style={styles.detailItem}>
              <span style={styles.detailLabel}>Email:</span>
              <span style={styles.detailValue}>{user?.email}</span>
            </div>
            <div style={styles.detailItem}>
              <span style={styles.detailLabel}>Role:</span>
              <span style={{...styles.detailValue, ...styles.roleBadge}}>
                {user?.role}
              </span>
            </div>
            <div style={styles.detailItem}>
              <span style={styles.detailLabel}>Join Date:</span>
              <span style={styles.detailValue}>{new Date(user?.joinDate).toLocaleDateString()}</span>
            </div>
          </div>
        </div>

        {user?.role === 'Admin' && (
          <div style={styles.card}>
            <h2 style={styles.cardTitle}>Admin Privileges</h2>
            <p style={styles.cardText}>As an Administrator, you have access to:</p>
            <div style={styles.privileges}>
              <div style={styles.privilegeItem}>
                <span style={styles.privilegeIcon}>👥</span>
                <span>Manage all employees</span>
              </div>
              <div style={styles.privilegeItem}>
                <span style={styles.privilegeIcon}>🏢</span>
                <span>Create and manage departments</span>
              </div>
              <div style={styles.privilegeItem}>
                <span style={styles.privilegeIcon}>📊</span>
                <span>View attendance reports</span>
              </div>
              <div style={styles.privilegeItem}>
                <span style={styles.privilegeIcon}>⚙️</span>
                <span>System configuration</span>
              </div>
            </div>
          </div>
        )}

        {user?.role === 'Employee' && (
          <div style={styles.card}>
            <h2 style={styles.cardTitle}>Employee Dashboard</h2>
            <p style={styles.cardText}>Welcome to your employee dashboard! You can:</p>
            <div style={styles.privileges}>
              <div style={styles.privilegeItem}>
                <span style={styles.privilegeIcon}>👤</span>
                <span>View your personal information</span>
              </div>
              <div style={styles.privilegeItem}>
                <span style={styles.privilegeIcon}>📅</span>
                <span>Check your attendance records</span>
              </div>
              <div style={styles.privilegeItem}>
                <span style={styles.privilegeIcon}>🔄</span>
                <span>Update your profile</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    padding: '40px 20px',
    fontFamily: 'Arial, sans-serif',
  },
  header: {
    textAlign: 'center',
    marginBottom: '50px',
    color: 'white',
  },
  title: {
    fontSize: '3rem',
    fontWeight: 'bold',
    marginBottom: '10px',
    textShadow: '0 2px 10px rgba(0,0,0,0.1)',
  },
  subtitle: {
    fontSize: '1.3rem',
    opacity: 0.9,
    margin: 0,
  },
  stats: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '25px',
    marginBottom: '50px',
    maxWidth: '1000px',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  statCard: {
    background: 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(10px)',
    padding: '30px 20px',
    borderRadius: '20px',
    textAlign: 'center',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.3s ease',
  },
  statIcon: {
    fontSize: '2.5rem',
    marginBottom: '15px',
  },
  statNumber: {
    fontSize: '2.5rem',
    fontWeight: 'bold',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    margin: '10px 0',
  },
  statLabel: {
    color: '#666',
    fontSize: '1rem',
    margin: 0,
    fontWeight: '500',
  },
  content: {
    maxWidth: '1000px',
    margin: '0 auto',
    display: 'grid',
    gap: '25px',
  },
  card: {
    background: 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(10px)',
    padding: '35px',
    borderRadius: '20px',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
  },
  cardTitle: {
    fontSize: '1.8rem',
    color: '#333',
    marginBottom: '20px',
    fontWeight: '600',
  },
  cardText: {
    color: '#666',
    fontSize: '1.1rem',
    marginBottom: '25px',
    lineHeight: '1.6',
  },
  userDetails: {
    display: 'grid',
    gap: '15px',
  },
  detailItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '12px 0',
    borderBottom: '1px solid #f0f0f0',
  },
  detailLabel: {
    fontWeight: '600',
    color: '#333',
    fontSize: '1rem',
  },
  detailValue: {
    color: '#666',
    fontSize: '1rem',
  },
  roleBadge: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    padding: '5px 15px',
    borderRadius: '20px',
    fontSize: '0.9rem',
    fontWeight: '500',
  },
  privileges: {
    display: 'grid',
    gap: '15px',
  },
  privilegeItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
    padding: '15px',
    backgroundColor: '#f8f9fa',
    borderRadius: '12px',
    fontSize: '1rem',
    color: '#333',
  },
  privilegeIcon: {
    fontSize: '1.3rem',
  },
};

export default Dashboard;
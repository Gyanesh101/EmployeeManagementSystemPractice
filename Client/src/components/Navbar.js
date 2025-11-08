import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav style={styles.navbar}>
      <div style={styles.container}>
        <Link to="/dashboard" style={styles.logo}>
          <span style={styles.logoIcon}>🏢</span>
          HRMS Lite
        </Link>
        
        <div style={styles.navLinks}>
          <Link 
            to="/dashboard" 
            style={{
              ...styles.navLink,
              ...(isActive('/dashboard') ? styles.activeLink : {})
            }}
          >
            <span style={styles.navIcon}>📊</span>
            Dashboard
          </Link>
          
          {user?.role === 'Admin' && (
            <>
              <Link 
                to="/employees" 
                style={{
                  ...styles.navLink,
                  ...(isActive('/employees') ? styles.activeLink : {})
                }}
              >
                <span style={styles.navIcon}>👥</span>
                Employees
              </Link>
              <Link 
                to="/departments" 
                style={{
                  ...styles.navLink,
                  ...(isActive('/departments') ? styles.activeLink : {})
                }}
              >
                <span style={styles.navIcon}>🏢</span>
                Departments
              </Link>
            </>
          )}
          
          <Link 
            to="/attendance" 
            style={{
              ...styles.navLink,
              ...(isActive('/attendance') ? styles.activeLink : {})
            }}
          >
            <span style={styles.navIcon}>📅</span>
            Attendance
          </Link>
        </div>

        <div style={styles.userSection}>
          <div style={styles.userInfo}>
            <span style={styles.userName}>{user?.name}</span>
            <span style={styles.userRole}>{user?.role}</span>
          </div>
          <button onClick={logout} style={styles.logoutBtn}>
            <span style={styles.logoutIcon}>🚪</span>
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

const styles = {
  navbar: {
    background: 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(10px)',
    padding: '1rem 0',
    boxShadow: '0 2px 20px rgba(0, 0, 0, 0.1)',
    borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    color: '#333',
    fontSize: '1.5rem',
    fontWeight: 'bold',
    textDecoration: 'none',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  logoIcon: {
    fontSize: '1.8rem',
  },
  navLinks: {
    display: 'flex',
    gap: '10px',
    alignItems: 'center',
  },
  navLink: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    color: '#666',
    textDecoration: 'none',
    padding: '10px 20px',
    borderRadius: '12px',
    transition: 'all 0.3s ease',
    fontSize: '1rem',
    fontWeight: '500',
  },
  activeLink: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
  },
  navIcon: {
    fontSize: '1.2rem',
  },
  userSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
  },
  userInfo: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
  userName: {
    fontSize: '1rem',
    fontWeight: '600',
    color: '#333',
  },
  userRole: {
    fontSize: '0.8rem',
    color: '#667eea',
    fontWeight: '500',
  },
  logoutBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '10px 20px',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    border: 'none',
    borderRadius: '12px',
    cursor: 'pointer',
    fontSize: '0.9rem',
    fontWeight: '500',
    transition: 'all 0.3s ease',
  },
  logoutIcon: {
    fontSize: '1.1rem',
  },
};

export default Navbar;
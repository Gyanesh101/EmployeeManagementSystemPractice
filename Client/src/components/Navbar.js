import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBuilding, faChartLine, faUsers, faCalendarCheck, faBars, faTimes, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [isMobile, setIsMobile] = useState(typeof window !== 'undefined' ? window.innerWidth <= 768 : false);
  const profileMenuRef = useRef(null);
  const mobileMenuRef = useRef(null);

  const isActive = (path) => location.pathname === path;

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
        setShowProfileMenu(false);
      }
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
        setShowMobileMenu(false);
      }
    };

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setShowProfileMenu(false);
        setShowMobileMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Close mobile menu when navigating
  useEffect(() => {
    setShowMobileMenu(false);
  }, [location.pathname]);

  return (
    <nav style={styles.navbar} role="navigation" aria-label="Main navigation">
      <div style={styles.container}>
        <Link to="/dashboard" style={styles.logo} aria-label="Go to dashboard">
          <span style={styles.logoIcon} aria-hidden>
            <FontAwesomeIcon icon={faBuilding} />
          </span>
          <span style={{display: 'inline-block'}}>{'EMS Lite'}</span>
        </Link>

        {/* Mobile hamburger */}
        <button
          aria-label="Toggle navigation"
          aria-expanded={showMobileMenu}
          aria-controls="main-navigation"
          onClick={() => setShowMobileMenu((s) => !s)}
          style={{...styles.mobileToggle, display: isMobile ? 'inline-flex' : 'none'}}
          className="mobile-toggle"
        >
          <span style={{fontSize: '1.25rem'}} aria-hidden>
            <FontAwesomeIcon icon={showMobileMenu ? faTimes : faBars} />
          </span>
        </button>

        <div
          id="main-navigation"
          ref={mobileMenuRef}
          style={{
            ...styles.navLinks,
            display: isMobile ? (showMobileMenu ? 'flex' : 'none') : styles.navLinks.display,
            ...(showMobileMenu ? styles.navLinksMobile : {}),
          }}
        >
          <Link
            to="/dashboard"
            style={{
              ...styles.navLink,
              ...(isActive('/dashboard') ? styles.activeLink : {}),
            }}
            className={isActive('/dashboard') ? 'nav-link active' : 'nav-link'}
          >
            <span style={styles.navIcon} aria-hidden>
              <FontAwesomeIcon icon={faChartLine} />
            </span>
            <span>Dashboard</span>
          </Link>

          {user?.role === 'Admin' && (
            <>
              <Link
                to="/employees"
                style={{
                  ...styles.navLink,
                  ...(isActive('/employees') ? styles.activeLink : {}),
                }}
                className={isActive('/employees') ? 'nav-link active' : 'nav-link'}
              >
                <span style={styles.navIcon} aria-hidden>
                  <FontAwesomeIcon icon={faUsers} />
                </span>
                <span>Employees</span>
              </Link>
              <Link
                to="/departments"
                style={{
                  ...styles.navLink,
                  ...(isActive('/departments') ? styles.activeLink : {}),
                }}
                className={isActive('/departments') ? 'nav-link active' : 'nav-link'}
              >
                <span style={styles.navIcon} aria-hidden>
                  <FontAwesomeIcon icon={faBuilding} />
                </span>
                <span>Departments</span>
              </Link>
            </>
          )}

          <Link
            to="/attendance"
            style={{
              ...styles.navLink,
              ...(isActive('/attendance') ? styles.activeLink : {}),
            }}
            className={isActive('/attendance') ? 'nav-link active' : 'nav-link'}
          >
            <span style={styles.navIcon} aria-hidden>
              <FontAwesomeIcon icon={faCalendarCheck} />
            </span>
            <span>Attendance</span>
          </Link>
        </div>

        <div style={styles.userSection} ref={profileMenuRef}>
            <button
            onClick={() => setShowProfileMenu((s) => !s)}
            style={styles.profileBtn}
            aria-haspopup="true"
            aria-expanded={showProfileMenu}
            aria-controls="profile-menu"
            title="Open user menu"
          >
            <div style={styles.profileIcon} aria-hidden>
              {user?.name?.charAt(0)?.toUpperCase() || '?'}
            </div>
          </button>

          {showProfileMenu && (
            <div id="profile-menu" style={styles.profileMenu} role="menu" aria-label="User menu">
              <div style={styles.menuHeader}>
                <div style={styles.profileAvatar} aria-hidden>
                  {user?.name?.charAt(0)?.toUpperCase() || '?'}
                </div>
                <div style={styles.profileInfo}>
                  <div style={styles.menuUserName}>{user?.name}</div>
                  <div style={styles.menuUserEmail}>{user?.role}</div>
                </div>
              </div>
              <div style={styles.menuDivider}></div>
              <button onClick={logout} style={styles.menuLogoutBtn} role="menuitem">
                <span style={styles.logoutIcon} aria-hidden>
                  <FontAwesomeIcon icon={faRightFromBracket} />
                </span>
                <span>Logout</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

const styles = {
  navbar: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    background: 'var(--glass-bg)',
    backdropFilter: 'blur(16px)',
    WebkitBackdropFilter: 'blur(16px)',
    borderBottom: '1px solid var(--glass-border)',
    boxShadow: 'var(--shadow-sm)',
    zIndex: 1000,
    padding: 'var(--space-3) 0',
  },
  container: {
    maxWidth: '1400px',
    margin: '0 auto',
    padding: '0 var(--space-6)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--space-3)',
    color: 'var(--text-primary)',
    fontSize: 'var(--font-size-xl)',
    fontWeight: 'var(--font-weight-bold)',
    textDecoration: 'none',
    background: 'var(--gradient-primary)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    transition: 'var(--transition-fast)',
  },
  logoIcon: {
    fontSize: 'var(--font-size-2xl)',
    filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1))',
  },
  navLinks: {
    display: 'flex',
    gap: 'var(--space-2)',
    alignItems: 'center',
  },
  navLink: {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--space-2)',
    color: 'var(--text-secondary)',
    textDecoration: 'none',
    padding: 'var(--space-3) var(--space-4)',
    borderRadius: 'var(--radius-lg)',
    transition: 'var(--transition-fast)',
    fontSize: 'var(--font-size-sm)',
    fontWeight: 'var(--font-weight-medium)',
    position: 'relative',
    overflow: 'hidden',
  },
  activeLink: {
    background: 'var(--gradient-primary)',
    color: 'var(--text-primary)',
    boxShadow: 'var(--shadow-sm)',
  },
  navIcon: {
    fontSize: 'var(--font-size-lg)',
  },
  mobileToggle: {
    display: 'none',
    background: 'transparent',
    border: 'none',
    color: 'var(--text-primary)',
    cursor: 'pointer',
    padding: 'var(--space-2)',
    marginLeft: 'var(--space-4)'
  },
  navLinksMobile: {
    position: 'absolute',
    top: '64px',
    left: '50%',
    transform: 'translateX(-50%)',
    width: 'calc(100% - 2rem)',
    maxWidth: '980px',
    background: 'var(--glass-bg)',
    border: '1px solid var(--glass-border)',
    borderRadius: 'var(--radius-xl)',
    padding: 'var(--space-4)',
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--space-2)',
    boxShadow: 'var(--shadow-lg)',
    zIndex: 999,
  },
  profileIcon: {
    width: '36px',
    height: '36px',
    borderRadius: '50%',
    background: 'var(--gradient-primary)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'var(--text-primary)',
    fontWeight: 'var(--font-weight-semibold)'
  },
  profileAvatar: {
    width: '48px',
    height: '48px',
    borderRadius: '50%',
    background: 'var(--gradient-primary)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'var(--text-primary)',
    fontWeight: 'var(--font-weight-semibold)'
  },
  profileInfo: {
    marginLeft: 'var(--space-3)'
  },
  userSection: {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--space-4)',
  },
  userInfo: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
  userName: {
    fontSize: 'var(--font-size-sm)',
    fontWeight: 'var(--font-weight-semibold)',
    color: 'var(--text-primary)',
    lineHeight: 'var(--line-height-tight)',
  },
  userRole: {
    fontSize: 'var(--font-size-xs)',
    color: 'var(--primary-color)',
    fontWeight: 'var(--font-weight-medium)',
    textTransform: 'capitalize',
  },
  logoutBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--space-2)',
    padding: 'var(--space-2) var(--space-4)',
    background: 'var(--error)',
    color: 'var(--text-primary)',
    border: 'none',
    borderRadius: 'var(--radius-lg)',
    cursor: 'pointer',
    fontSize: 'var(--font-size-xs)',
    fontWeight: 'var(--font-weight-medium)',
    transition: 'var(--transition-fast)',
    boxShadow: 'var(--shadow-xs)',
  },
  logoutBtnHover: {
    background: '#dc2626',
    transform: 'translateY(-1px)',
    boxShadow: 'var(--shadow-sm)',
  },
  profileBtn: {
    position: 'relative',
    background: 'var(--bg-surface)',
    border: '1px solid var(--border-medium)',
    borderRadius: 'var(--radius-full)',
    width: '44px',
    height: '44px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    transition: 'var(--transition-fast)',
    color: 'var(--text-primary)',
    fontSize: 'var(--font-size-lg)',
    fontWeight: 'var(--font-weight-semibold)',
  },
  profileMenu: {
    position: 'absolute',
    top: 'calc(100% + var(--space-2))',
    right: 0,
    background: 'var(--glass-bg)',
    backdropFilter: 'blur(16px)',
    WebkitBackdropFilter: 'blur(16px)',
    border: '1px solid var(--glass-border)',
    borderRadius: 'var(--radius-xl)',
    boxShadow: 'var(--shadow-lg)',
    minWidth: '200px',
    zIndex: 1000,
    overflow: 'hidden',
  },
  menuHeader: {
    padding: 'var(--space-4)',
    borderBottom: '1px solid var(--border-light)',
  },
  menuUserName: {
    fontSize: 'var(--font-size-base)',
    fontWeight: 'var(--font-weight-semibold)',
    color: 'var(--text-primary)',
    marginBottom: 'var(--space-1)',
  },
  menuUserEmail: {
    fontSize: 'var(--font-size-sm)',
    color: 'var(--text-tertiary)',
  },
  menuDivider: {
    height: '1px',
    background: 'var(--border-light)',
    margin: 'var(--space-2) 0',
  },
  menuItem: {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--space-3)',
    padding: 'var(--space-3) var(--space-4)',
    color: 'var(--text-secondary)',
    textDecoration: 'none',
    transition: 'var(--transition-fast)',
    cursor: 'pointer',
  },
  menuItemHover: {
    background: 'var(--bg-elevated)',
    color: 'var(--text-primary)',
  },
  menuLogoutBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--space-3)',
    padding: 'var(--space-3) var(--space-4)',
    background: 'var(--error-bg)',
    color: 'var(--error)',
    border: 'none',
    width: '100%',
    textAlign: 'left',
    cursor: 'pointer',
    fontSize: 'var(--font-size-sm)',
    fontWeight: 'var(--font-weight-medium)',
    transition: 'var(--transition-fast)',
  },
  logoutIcon: {
    fontSize: 'var(--font-size-base)',
  },
};

export default Navbar;
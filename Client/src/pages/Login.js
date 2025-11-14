import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const result = await login(formData.email, formData.password);

    if (result.success) {
      navigate('/dashboard');
    } else {
      setError(result.message);
    }

    setLoading(false);
  };

  return (
    <div style={styles.container} className="fade-in">
      {/* Animated Background Elements */}
      <div style={styles.circle1} className="scale-in"></div>
      <div style={styles.circle2} className="scale-in"></div>
      <div style={styles.circle3} className="scale-in"></div>
      
      <div style={styles.card} className="slide-up">
        {/* Gradient Top Bar */}
        <div style={styles.gradientBar}></div>
        
        {/* Header Section */}
        <div style={styles.header}>
          <div style={styles.logo} className="scale-in">
            <div style={styles.logoIcon}>EMS</div>
          </div>
          <h2 style={styles.title} className="fade-in">Welcome Back</h2>
          <p style={styles.subtitle} className="fade-in">Sign in to your EMS account</p>
        </div>

        {/* Error Message */}
        {error && (
          <div style={styles.error}>
            <span style={styles.errorIcon}>⚠</span>
            {error}
          </div>
        )}

        {/* Form Section */}
        <div onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.formGroup}>
            <label style={styles.label}>
              <span style={styles.labelIcon}>✉</span>
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              onFocus={() => setFocusedField('email')}
              onBlur={() => setFocusedField(null)}
              required
              style={{
                ...styles.input,
                ...(focusedField === 'email' ? styles.inputFocus : {})
              }}
              placeholder="Enter your email"
            />
            <div style={{
              ...styles.underline,
              ...(focusedField === 'email' ? styles.underlineFocus : {})
            }}></div>
          </div>

          <div style={styles.formGroup}>
            <div style={styles.labelContainer}>
              <label style={styles.label}>
                <span style={styles.labelIcon}>🔒</span>
                Password
              </label>
              <Link to="/forgot-password" style={styles.forgotLink}>
                Forgot password?
              </Link>
            </div>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              onFocus={() => setFocusedField('password')}
              onBlur={() => setFocusedField(null)}
              required
              style={{
                ...styles.input,
                ...(focusedField === 'password' ? styles.inputFocus : {})
              }}
              placeholder="Enter your password"
            />
            <div style={{
              ...styles.underline,
              ...(focusedField === 'password' ? styles.underlineFocus : {})
            }}></div>
          </div>

          <button 
            type="submit" 
            onClick={handleSubmit}
            style={{
              ...styles.button,
              ...(loading ? styles.buttonDisabled : {})
            }}
            disabled={loading}
          >
            {loading ? (
              <div style={styles.buttonContent}>
                <div style={styles.spinner}></div>
                Signing in...
              </div>
            ) : (
              <div style={styles.buttonContent}>
                Sign In
                <span style={styles.buttonArrow}>→</span>
              </div>
            )}
          </button>
        </div>

        {/* Footer Section */}
        <div style={styles.footer}>
          <div style={styles.divider}>
            <span style={styles.dividerText}>or</span>
          </div>
          <p style={styles.footerText}>
            Don't have an account?{' '}
            <Link to="/register" style={styles.registerLink}>
              Create account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: '100vh',
    background: 'transparent',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '14px',
    fontFamily: 'Poppins, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    position: 'relative',
    overflow: 'hidden',
  },
  circle1: {
    position: 'absolute',
    width: '220px',
    height: '220px',
    background: 'radial-gradient(circle, rgba(59,130,246,0.045) 0%, transparent 70%)',
    borderRadius: '50%',
    top: '6%',
    left: '6%',
    animation: 'float 8s ease-in-out infinite, pulse 4s ease-in-out infinite alternate',
  },
  circle2: {
    position: 'absolute',
    width: '180px',
    height: '180px',
    background: 'radial-gradient(circle, rgba(6,182,212,0.04) 0%, transparent 70%)',
    borderRadius: '50%',
    bottom: '12%',
    right: '12%',
    animation: 'float 6s ease-in-out infinite reverse, pulse 3s ease-in-out infinite alternate',
  },
  circle3: {
    position: 'absolute',
    width: '140px',
    height: '140px',
    background: 'radial-gradient(circle, rgba(16,185,129,0.035) 0%, transparent 70%)',
    borderRadius: '50%',
    top: '58%',
    left: '66%',
    animation: 'float 7s ease-in-out infinite, pulse 5s ease-in-out infinite alternate',
  },
  card: {
    background: 'var(--glass-bg)',
    backdropFilter: 'blur(8px)',
    padding: '20px',
    borderRadius: '16px',
    boxShadow: '0 6px 14px rgba(0,0,0,0.18)',
    maxWidth: '420px',
    width: '86vw',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    overflow: 'hidden',
    animation: 'slideIn 0.6s ease-out',
  },
  gradientBar: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '6px',
    borderTopLeftRadius: '16px',
    borderTopRightRadius: '16px',
    background: 'linear-gradient(90deg, rgba(255,126,182,0.18), rgba(127,127,213,0.18) 50%, rgba(6,182,212,0.14))',
  },
  header: {
    textAlign: 'center',
    marginBottom: '32px',
  },
  logo: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '24px',
  },
  logoIcon: {
    width: '48px',
    height: '48px',
    background: 'var(--gradient-primary)',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    fontSize: '16px',
    fontWeight: '700',
    boxShadow: '0 6px 14px rgba(59,130,246,0.10)',
    transform: 'rotate(-5deg)',
    position: 'relative',
    border: '1px solid rgba(255,255,255,0.04)',
  },
  title: {
    fontSize: '24px',
    fontWeight: '700',
    background: 'var(--gradient-primary)',
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    margin: '0 0 6px 0',
    letterSpacing: '-0.4px',
  },
  subtitle: {
    fontSize: '13px',
    color: 'var(--text-secondary)',
    margin: 0,
    fontWeight: '400',
  },
  form: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  formGroup: {
    marginBottom: '16px',
    position: 'relative',
  },
  labelContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '8px',
  },
  label: {
    fontSize: '14px',
    fontWeight: '600',
    color: 'var(--text-secondary)',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  labelIcon: {
    fontSize: '16px',
  },
  input: {
    width: '100%',
    padding: '10px 12px',
    border: '1px solid var(--border-medium)',
    borderRadius: '10px',
    fontSize: '14px',
    transition: 'all 0.3s ease',
    backgroundColor: 'var(--bg-surface)',
    color: 'var(--text-primary)',
    boxSizing: 'border-box',
    fontFamily: 'inherit',
  },
  inputFocus: {
    borderColor: 'var(--primary-color)',
    backgroundColor: 'var(--bg-surface)',
    boxShadow: '0 4px 12px rgba(59,130,246,0.06)',
    outline: 'none',
    transform: 'translateY(-0.5px)',
  },
  underline: {
    position: 'absolute',
    bottom: '0',
    left: '50%',
    width: '0%',
    height: '2px',
    background: 'var(--gradient-primary)',
    transition: 'all 0.3s ease',
    transform: 'translateX(-50%)',
  },
  underlineFocus: {
    width: '100%',
  },
  button: {
    width: '100%',
    padding: '12px',
    background: 'linear-gradient(90deg, rgba(127,127,213,0.18), rgba(6,182,212,0.14))',
    color: 'white',
    border: '1px solid rgba(255,255,255,0.04)',
    borderRadius: '10px',
    fontSize: '14px',
    fontWeight: '700',
    cursor: 'pointer',
    transition: 'all 0.22s ease',
    marginTop: 'auto',
    boxShadow: '0 6px 18px rgba(0,0,0,0.12)',
    letterSpacing: '0.3px',
  },
  buttonDisabled: {
    opacity: 0.7,
    cursor: 'not-allowed',
    transform: 'none',
  },
  buttonContent: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
  },
  buttonArrow: {
    fontSize: '18px',
    transition: 'transform 0.2s ease',
  },
  spinner: {
    width: '18px',
    height: '18px',
    border: '2px solid transparent',
    borderTop: '2px solid white',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
  },
  error: {
    color: 'var(--error)',
    backgroundColor: 'var(--error-bg)',
    border: '1px solid rgba(239, 68, 68, 0.18)',
    padding: '14px 18px',
    borderRadius: '12px',
    marginBottom: '24px',
    fontSize: '14px',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    animation: 'slideIn 0.3s ease-out',
  },
  errorIcon: {
    fontSize: '16px',
  },
  forgotLink: {
    fontSize: '13px',
    color: 'var(--primary-color)',
    textDecoration: 'none',
    fontWeight: '600',
  },
  footer: {
    textAlign: 'center',
    marginTop: '16px',
    paddingTop: '16px',
    borderTop: '1px solid rgba(255,255,255,0.04)',
  },
  divider: {
    position: 'relative',
    marginBottom: '14px',
  },
  dividerText: {
    backgroundColor: 'transparent',
    padding: '0 10px',
    color: 'var(--text-secondary)',
    fontSize: '13px',
    position: 'relative',
    zIndex: 1,
  },
  footerText: {
    fontSize: '14px',
    color: '#6b7280',
    margin: 0,
  },
  registerLink: {
    color: 'var(--primary-color)',
    textDecoration: 'none',
    fontWeight: '700',
  },
};

// Add CSS for animations
const styleElement = document.createElement('style');
styleElement.textContent = `
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  
  @keyframes float {
    0%, 100% { transform: translateY(0) scale(1); }
    50% { transform: translateY(-10px) scale(1.02); }
  }
  
  @keyframes pulse {
    0% { opacity: 0.45; }
    100% { opacity: 0.75; }
  }
  
  @keyframes slideIn {
    0% { 
      opacity: 0;
      transform: translateY(30px);
    }
    100% { 
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  button:hover:not(:disabled) .buttonArrow {
    transform: translateX(2px);
  }

  button:hover:not(:disabled) {
    transform: translateY(-1px);
    box-shadow: 0 8px 20px rgba(59,130,246,0.10);
  }

  input:focus {
    outline: none;
    box-shadow: 0 4px 12px rgba(59,130,246,0.06);
  }
  
  /* Accessibility: visible focus ring for keyboard users */
  input:focus-visible {
    outline: 3px solid rgba(99,102,241,0.12);
    outline-offset: 2px;
  }

  /* Responsive tweaks */
  @media (max-width: 480px) {
    .login-compact-card {
      width: 94vw !important;
      padding: 12px !important;
    }
  }
`;
document.head.appendChild(styleElement);

export default Login;
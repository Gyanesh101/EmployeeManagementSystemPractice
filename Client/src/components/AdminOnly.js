import React from 'react';
import { useAuth } from '../context/AuthContext';

// Renders children only for Admin users. If `disable` is true and children
// are a single React element, it will render a disabled clone instead.
const AdminOnly = ({ children, fallback = null, disable = false }) => {
  const { isAdmin } = useAuth();

  if (isAdmin) return <>{children}</>;

  if (disable && React.isValidElement(children)) {
    return React.cloneElement(children, {
      disabled: true,
      title: 'Restricted — Admin only',
      'aria-disabled': true,
      style: { ...(children.props.style || {}), opacity: 0.6, cursor: 'not-allowed' },
    });
  }

  return fallback;
};

export default AdminOnly;

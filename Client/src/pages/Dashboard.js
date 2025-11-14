import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import AdminOnly from '../components/AdminOnly';
import '../components/dashboard.css';
// Using Font Awesome via CDN; replace react-icons usages with <i> tags

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [attendance, setAttendance] = useState({ status: '-', time: null });
  const [totalEmployees, setTotalEmployees] = useState(null);
  const [totalAttendance, setTotalAttendance] = useState(null);
  const [departmentsCount, setDepartmentsCount] = useState(null);

  useEffect(() => {
    // Simulate loading time for better UX
    const timer = setTimeout(() => setIsLoading(false), 1500);

    // Update time every minute
    const timeInterval = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => {
      clearTimeout(timer);
      clearInterval(timeInterval);
    };
  }, []);

  useEffect(() => {
    // Fetch current user's attendance (so employees see it on dashboard)
    let mounted = true;
    const fetchAttendance = async () => {
      try {
        const res = await axios.get('/api/attendance/me');
        if (!mounted) return;
        const r = res.data.data || {};
        setAttendance({ status: r.status || 'absent', time: r.time || null });
      } catch (err) {
        // ignore silently — attendance will show as '-'
      }
    };
    fetchAttendance();
    return () => { mounted = false };
  }, []);

  useEffect(() => {
    let mounted = true;
    const fetchPublicStats = async () => {
      try {
        const res = await axios.get('/api/stats/public');
        if (!mounted) return;
        const d = res.data.data || {};
        setTotalEmployees(d.totalEmployees ?? null);
        setTotalAttendance(d.presentToday ?? null);
        setDepartmentsCount(d.departmentsCount ?? null);
      } catch (err) {
        setTotalEmployees(null);
        setTotalAttendance(null);
        setDepartmentsCount(null);
      }
    };
    fetchPublicStats();
    return () => { mounted = false };
  }, []);

  if (!user) {
    return (
      <div className="dashboard-container">
        <div className="loading-skeleton">
          <div className="skeleton-header"></div>
          <div className="skeleton-grid">
            <div className="skeleton-card"></div>
            <div className="skeleton-card"></div>
            <div className="skeleton-card"></div>
            <div className="skeleton-card"></div>
          </div>
          <div className="skeleton-content"></div>
        </div>
      </div>
    );
  }

  const quickActions = [
    {
      icon: <i className="fa-solid fa-user-plus" aria-hidden="true" title="Add Employee" />,
      title: 'Add Employee',
      description: 'Register new team member',
      color: 'var(--gradient-primary)',
      action: () => navigate('/employees', { state: { openAdd: true } })
    },
    {
      icon: <i className="fa-solid fa-calendar-check" aria-hidden="true" title="Mark Attendance" />,
      title: 'Mark Attendance',
      description: 'Record daily attendance',
      color: 'var(--gradient-secondary)',
      action: () => navigate('/attendance')
    },
    {
      icon: <i className="fa-solid fa-chart-simple" aria-hidden="true" title="View Reports" />,
      title: 'View Reports',
      description: 'Check analytics & insights',
      color: 'linear-gradient(135deg, #ff6b6b, #ee5a24)',
      action: () => console.log('View Reports')
    },
    {
      icon: <i className="fa-solid fa-cog" />,
      title: 'Settings',
      description: 'Configure preferences',
      color: 'linear-gradient(135deg, #a8edea, #fed6e3)',
      action: () => console.log('Settings')
    }
  ];

  const recentActivities = [
    {
      icon: <i className="fa-solid fa-circle-check" aria-hidden title="Success" />,
      title: 'Attendance marked',
      description: 'John Doe checked in at 9:00 AM',
      time: '2 hours ago',
      type: 'success'
    },
    {
      icon: <i className="fa-solid fa-user-plus" aria-hidden title="New Employee" />,
      title: 'New employee added',
      description: 'Sarah Wilson joined Marketing department',
      time: '4 hours ago',
      type: 'info'
    },
    {
      icon: <i className="fa-solid fa-tools" aria-hidden title="Maintenance" />,
      title: 'System maintenance',
      description: 'Scheduled maintenance completed successfully',
      time: '1 day ago',
      type: 'warning'
    }
  ];

  return (
    <div className="dashboard-container">
      {/* Header Section */}
      <div className="dashboard-header">
        <div className="header-content">
            <div className="welcome-section">
            <h1 className="welcome-title">
              Welcome back, {user.name}! 👋
            </h1>
            <p className="welcome-subtitle">
              {currentTime.toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </p>
          </div>
          {/* header actions removed: notifications and avatar intentionally hidden */}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="dashboard-grid">
        <div className="stat-card">
          <div className="stat-icon">
            <i className="fa-solid fa-users"></i>
          </div>
          <div className="stat-title">Total Employees</div>
          <div className="stat-value">{totalEmployees !== null ? totalEmployees : '-'}</div>
          <div className="stat-change positive">
            <span><i className="fa-solid fa-arrow-up" /> 12%</span> vs last month
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <i className="fa-solid fa-building"></i>
          </div>
          <div className="stat-title">Departments</div>
          <div className="stat-value">{departmentsCount !== null ? departmentsCount : '-'}</div>
          <div className="stat-change">
            <span>Total Count</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <i className="fa-solid fa-calendar-check"></i>
          </div>
          <div className="stat-title">Today's Attendance</div>
          <div className="stat-value">{totalAttendance !== null ? totalAttendance : '-'}</div>
          <div className="stat-change">
            <span>Present Today</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <i className="fa-solid fa-id-badge"></i>
          </div>
          <div className="stat-title">Your Role</div>
          <div className="stat-value">{user.role}</div>
          <div className="stat-change">
            <span>Access Level</span>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="quick-actions-section">
        <h3 className="section-title">Quick Actions</h3>
        <div className="quick-actions-grid">
          {quickActions.map((action, index) => {
            // Treat Add Employee and Settings as admin-only CRUD actions
            const isCrud = action.title === 'Add Employee' || action.title === 'Settings';
            const card = (
              <button
                key={index}
                className="quick-action-card"
                onClick={action.action}
                style={{ '--action-color': action.color }}
              >
                <div className="action-icon" style={{ background: action.color }}>
                  {action.icon}
                </div>
                <div className="action-content">
                  <h4 className="action-title">{action.title}</h4>
                  <p className="action-description">{action.description}</p>
                </div>
                <div className="action-arrow">
                  <i className="fa-solid fa-chevron-right" aria-hidden title="Go"></i>
                </div>
              </button>
            );

            return isCrud ? (
              <AdminOnly key={index} fallback={null}>
                {card}
              </AdminOnly>
            ) : (
              card
            );
          })}
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="content-grid">
        {/* User Information */}
        <div className="chart-card user-info-card">
          <div className="card-header">
            <h3 className="chart-title">Profile Information</h3>
            <AdminOnly>
              <button className="edit-btn">
                <i className="fa-solid fa-cog" aria-hidden title="Edit" ></i> Edit
              </button>
            </AdminOnly>
          </div>
          <div className="timeline">
            <div className="timeline-item">
              <div className="timeline-time">Name</div>
              <div className="timeline-content">{user.name}</div>
            </div>
            <div className="timeline-item">
              <div className="timeline-time">Email</div>
              <div className="timeline-content">{user.email}</div>
            </div>
            <div className="timeline-item">
              <div className="timeline-time">Role</div>
              <div className="timeline-content">
                <span className="role-badge">{user.role}</span>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-time">Today's Attendance</div>
              <div className="timeline-content">
                <span className={`role-badge`} style={{ background: attendance.status === 'present' ? 'rgba(16,185,129,0.12)' : 'transparent', color: attendance.status === 'present' ? 'var(--success)' : 'var(--text-secondary)' }}>
                  {attendance.status}{attendance.time ? ` — ${attendance.time}` : ''}
                </span>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-time">Join Date</div>
              <div className="timeline-content">
                {new Date(user.joinDate).toLocaleDateString()}
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activities */}
        <div className="chart-card activities-card">
          <div className="card-header">
            <h3 className="chart-title">Recent Activities</h3>
            <button className="view-all-btn">
              <i className="fa-solid fa-chart-simple" aria-hidden title="View All Reports"></i> View All
            </button>
          </div>
          <div className="activities-list">
            {recentActivities.map((activity, index) => (
              <div key={index} className="activity-item">
                <div className={`activity-icon ${activity.type}`}>
                  {activity.icon}
                </div>
                <div className="activity-content">
                  <h4 className="activity-title">{activity.title}</h4>
                  <p className="activity-description">{activity.description}</p>
                  <span className="activity-time">
                    <i className="fa-solid fa-clock"></i> {activity.time}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Role-based Content */}
      {user.role === 'Admin' && (
        <div className="chart-card admin-card">
          <h3 className="chart-title">Admin Privileges</h3>
          <div className="privileges-grid">
            <div className="privilege-item">
              <i className="fa-solid fa-users privilege-icon"></i>
              <span>Manage all employees and their records</span>
            </div>
            <div className="privilege-item">
              <i className="fa-solid fa-building privilege-icon"></i>
              <span>Create and manage departments</span>
            </div>
            <div className="privilege-item">
                <i className="fa-solid fa-chart-simple privilege-icon"></i>
              <span>View and manage attendance reports</span>
            </div>
            <div className="privilege-item">
              <i className="fa-solid fa-cog privilege-icon"></i>
              <span>Configure system settings and permissions</span>
            </div>
          </div>
        </div>
      )}

      {user.role === 'Employee' && (
        <div className="chart-card employee-card">
          <h3 className="chart-title">Employee Dashboard</h3>
          <div className="privileges-grid">
            <div className="privilege-item">
              <i className="fa-solid fa-user privilege-icon"></i>
              <span>View and update your personal information</span>
            </div>
            <div className="privilege-item">
              <i className="fa-solid fa-calendar-check privilege-icon"></i>
              <span>Check your attendance records and history</span>
            </div>
            <div className="privilege-item">
              <i className="fa-solid fa-bell privilege-icon"></i>
              <span>View department updates and announcements</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
import React, { useState } from 'react';
import '../styles/Layout.css';
import { userMenu, adminMenu } from '../Data/data';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Badge, message } from 'antd';

function Layout({ children }) {
  const navigate = useNavigate();
  const location = useLocation();

  const { user } = useSelector((state) => state.user);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleLogout = () => {
    localStorage.clear();
    message.success('Logout Successfully');
    navigate('/login');
  };

  const doctorMenu = [
    {
      name: 'Home',
      path: '/',
      icon: 'fa-solid fa-house',
    },
    {
      name: 'Appointments',
      path: '/doctor-appointments',
      icon: 'fa-solid fa-list',
    },
  ];

  const SidebarMenu = user?.isAdmin ? adminMenu : user?.isDoctor ? doctorMenu : userMenu;

  return (
    <div className="main">
      <div className="layout">
        {/* Hamburger Menu */}
       

        {/* Sidebar */}
        <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
          <p className="crossicon" style={{textAlign:'end', fontWeight:'bold', marginRight:'1rem',paddingTop:'5px'}} onClick={()=>setIsSidebarOpen(false)} >X</p>
          <div className="logo">
            <span style={{  fontSize: '1.2rem', fontWeight: 'bold', display: 'block', textAlign: 'center' }}>
              Dr. Appointment
            </span>
            <span style={{ fontSize: '8px', display: 'block', textAlign: 'end', marginRight: '1rem' }}>Founded by Ayush</span>
            <hr />
          </div>
          <div className="menu">
            {SidebarMenu.map((menu) => {
              const isActive = location.pathname === menu.path;
              return (
                <div className={`menu-item ${isActive && 'active'}`} key={menu.path}>
                  <i className={menu.icon}></i>
                  <Link to={menu.path} onClick={() => setIsSidebarOpen(false)}>
                    {menu.name}
                  </Link>
                </div>
              );
            })}
            <div className="menu-item" onClick={handleLogout}>
              <i className="fa-solid fa-right-from-bracket"></i>
              <Link to="/login">Logout</Link>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="content">
          <div className="header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div className="hamburger" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
          <i className="fa-solid fa-bars"></i>
        </div> 
            <div className="left-header">
              <img src="/Logo_DR_APP.png" alt="Logo"  />
            </div>
            <div className="header-content" style={{ cursor: 'pointer' }}>
              <Badge count={user && user.notification.length} onClick={() => navigate('/notification')}>
                <i className="fa-solid fa-bell"></i>
              </Badge>
              <h5 style={{ marginTop: '5px', cursor: 'default' }}>{user?.name}</h5>
            </div>
          </div>
          <div className="body">{children}</div>
        </div>
      </div>
    </div>
  );
}

export default Layout;
